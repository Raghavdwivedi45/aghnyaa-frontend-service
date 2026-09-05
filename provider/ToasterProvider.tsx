"use client";

import { useEffect, useState } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import styles from "./ToasterProvider.module.scss";
import SVG from "@/components/SVG/SVG";

const EXIT_DURATION = 250;

export default function ToasterProvider({ children }: { children: React.ReactNode }) {
    const [successList, setSuccessListState] = useState<string[]>([]);
    const [errorList, setErrorListState] = useState<string[]>([]);
    const [isSuccessLeaving, setIsSuccessLeaving] = useState(false);
    const [isErrorLeaving, setIsErrorLeaving] = useState(false);

    const setSuccessList = (message: string) => {
        if (!message) return;
        setSuccessListState(prev => [...prev, message]);
    }

    const setErrorList = (message: string) => {
        if (!message) return;
        setErrorListState(prev => [...prev, message]);
    }

    const closeMessage = (type: "success" | "error") => {
        if (type === "success") {
            setIsSuccessLeaving(true);
            setTimeout(() => {
                setSuccessListState(prev => prev.slice(1));
                setIsSuccessLeaving(false);
            }, EXIT_DURATION);
        } else {
            setIsErrorLeaving(true);
            setTimeout(() => {
                setErrorListState(prev => prev.slice(1));
                setIsErrorLeaving(false);
            }, EXIT_DURATION);
        }
    }

    useEffect(() => {
        if (successList.length === 0 || isSuccessLeaving) return;
        const timer = setTimeout(() => closeMessage("success"), 2000);
        return () => clearTimeout(timer);
    }, [successList, isSuccessLeaving]);

    useEffect(() => {
        if (errorList.length === 0 || isErrorLeaving) return;
        const timer = setTimeout(() => closeMessage("error"), 2000);
        return () => clearTimeout(timer);
    }, [errorList, isErrorLeaving]);

    return (
        <ToasterContext.Provider value={{ successList, setSuccessList, errorList, setErrorList }}>
            <ul className={styles["toaster-container"]}>
                {
                    successList.length > 0 &&
                    <li className={`${styles["toaster-success-msg"]} ${isSuccessLeaving ? styles["toaster-leaving"] : ""}`}>
                        <span>{successList[0]}</span>
                        <span onClick={() => closeMessage("success")}>
                            <SVG type="cross" height={16} width={16} />
                        </span>
                    </li>
                }
                {
                    errorList.length > 0 &&
                    <li className={`${styles["toaster-error-msg"]} ${isErrorLeaving ? styles["toaster-leaving"] : ""}`}>
                        <span>{errorList[0]}</span>
                        <span onClick={() => closeMessage("error")}>
                            <SVG type="cross" height={16} width={16} />
                        </span>
                    </li>
                }
            </ul>
            {children}
        </ToasterContext.Provider>
    );
}
