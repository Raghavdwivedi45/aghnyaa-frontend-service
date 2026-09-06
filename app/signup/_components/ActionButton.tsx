"use client";

import React, { useEffect, useState } from 'react';
import styles from "../page.module.scss";
import ButtonSet from '@/components/ButtonSet/ButtonSet';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ActionButton = () => {
    const router = useRouter();
    const pathname = usePathname();
    const queryParams = useSearchParams();
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const redirectToLogin = () => {
        const params = new URLSearchParams(queryParams.toString());

        if (isLogin) {
            params.delete("isLogin"); // Remove the query parameter
        } else {
            params.set("isLogin", "true"); // Add the query parameter
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    useEffect(() => {
        if (queryParams.get("isLogin")) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [queryParams])

    return (
        <div className={styles["action-btn"]}>
            <div className={styles["action-btn-text"]}>{isLogin ? "Don't have" : "Already have"} an account ?</div>
            <div>
                <ButtonSet primaryText={isLogin ? "Create Account" : "Login"} onPrimaryClick={redirectToLogin} />
            </div>
        </div>
    )
}

export default ActionButton