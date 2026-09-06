"use client";

import Input from "@/components/Input/Input";
import { countryCodes, initialLoginPayload, initialSignupPayload, userRadioOptions } from "@/constants/constants";
import { ILoginPayload, ISignupPayload } from "@/constants/interfaces";
import React, { useEffect, useState } from "react";
import styles from "../page.module.scss";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import ButtonSet from "@/components/ButtonSet/ButtonSet";
import { useSearchParams } from "next/navigation";
import { fetchPOST } from "@/utils/fetchAPIFunctions";
import { URLGenerator } from "@/utils/helperFunctions";
import Dropdown from "@/components/Dropdown/Dropdown";
import OTPVerification from "./OTPVerification";
import LoginInputGroup from "./LoginInputGroup";

const SignupInputGroup = () => {
    const [signupPayload, setSignupPayload] = useState<ISignupPayload>(initialSignupPayload);
    const [loginPayload, setLoginPayload] = useState<ILoginPayload>(initialLoginPayload);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [otpState, setOtpState] = useState<boolean>(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams?.get("isLogin")) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [searchParams])


    const updateCredentialsPayload = (key: "username" | "email" | "usernameOrEmail" | "password" | "role" | "countryCode" | "phone", value: string | number) => {
        if (key === "countryCode" || key === "phone") {
            setSignupPayload((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }))
        }
        else {
            setSignupPayload((prev) => ({ ...prev, [key]: value }))
        }
    }

    const authenticateUser = async () => {
        const { data, error } = await fetchPOST(URLGenerator("USER", "/v1/auth/register"), signupPayload);
        if (error) { return; }
        setSignupPayload((prev) => ({ ...initialSignupPayload, email: prev.email }))
        setOtpState(true);
    }

    const displayOTP = (loginPayload: ILoginPayload) => {
        setOtpState(true);
        setLoginPayload(loginPayload)
    }


    if (otpState) {
        return <OTPVerification isLogin={isLogin} loginPayload={loginPayload} email={signupPayload.email} />
    }

    if (isLogin) {
        return <LoginInputGroup otpNeeded={displayOTP} />
    }

    return (
        <>
            <div className={styles["input-group-group"]}>

                <div className={styles["input-group-input"]}>
                    <Input iconSize={16} value={signupPayload?.username} placeholder="Choose a unique username" onInputChange={(val: string | number) => updateCredentialsPayload("username", val)} iconType="user-male" />
                </div>


                <div className={styles["input-group-input"]}>
                    <Input iconSize={20} value={signupPayload?.email} placeholder="Enter your email address" inputType="email" onInputChange={(val: string | number) => updateCredentialsPayload("email", val)} iconType="mail" />
                </div>

                <div className={styles["input-group-input-contact"]}>
                    <div className={styles["contact-group-dropdown"]}>
                        <Dropdown dropdownList={countryCodes}
                            onOptionSelect={(val) => updateCredentialsPayload("countryCode", val)}
                            selectedValue={signupPayload?.contact?.countryCode || "+91"} />
                    </div>
                    <div className={styles["contact-group-input"]}>
                        <Input iconSize={20} value={signupPayload?.contact?.phone} placeholder="Enter your phone number" onInputChange={(val: string | number) => updateCredentialsPayload("phone", val)} iconType="phone" />
                    </div>
                </div>

                <div className={styles["input-group-input"]}>
                    <Input iconSize={16} value={signupPayload?.password} inputType="password" placeholder="Create a strong password" onInputChange={(val: string | number) => updateCredentialsPayload("password", val)} iconType="lock" />
                </div>

                <div className={styles["input-group-input"]}>
                    <RadioGroup
                        name="role"
                        value={signupPayload?.role || ""}
                        onChange={(value) => updateCredentialsPayload("role", value)}
                        options={userRadioOptions}
                    />
                </div>
            </div>
            <div className={styles["input-group-group"]}>
                <ButtonSet primaryText="Create Account" onPrimaryClick={authenticateUser} />
            </div>
        </>
    )
}

export default SignupInputGroup