"use client";

import ButtonSet from '@/components/ButtonSet/ButtonSet'
import Input from '@/components/Input/Input'
import React, { useState } from 'react';
import styles from "../page.module.scss";
import { fetchPOST } from '@/utils/fetchAPIFunctions';
import { URLGenerator } from '@/utils/helperFunctions';
import { ILoginPayload } from '@/constants/interfaces';
import { useRouter } from 'next/navigation';

const OTPVerification = ({ email, isLogin = false, loginPayload }: { email: string, isLogin?: boolean, loginPayload: ILoginPayload }) => {
    const [otpValue, setOtpValue] = useState<string | number>("");
    const router = useRouter();


    const verifyOTP = async () => {
        const payload = isLogin ? { otp: otpValue, ...loginPayload } : { otp: otpValue, email: email }
        const { data, error } = await fetchPOST(URLGenerator("USER", "/v1/auth/verify-otp"), payload);
        if (data) {
            router.replace("/");
        }
    }

    return (
        <>
            <div className={styles["input-group-group"]}>
                <div className={styles["input-group-input"]}>
                    <Input iconSize={16} value={otpValue} placeholder="Enter the OTP received on your mail" onInputChange={(val: string | number) => setOtpValue(val)} iconType="user-male" />
                </div>
            </div>
            <div className={styles["input-group-group"]}>
                <ButtonSet primaryText={"Verify OTP"} onPrimaryClick={verifyOTP} />
            </div>
        </>
    )
}

export default OTPVerification