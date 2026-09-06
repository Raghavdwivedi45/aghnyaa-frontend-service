import React, { useContext, useState } from 'react'
import styles from "../page.module.scss";
import ButtonSet from '@/components/ButtonSet/ButtonSet';
import Input from '@/components/Input/Input';
import { ILoginPayload, IUserInfoResponse } from '@/constants/interfaces';
import { initialLoginPayload } from '@/constants/constants';
import { fetchPOST } from '@/utils/fetchAPIFunctions';
import { URLGenerator } from '@/utils/helperFunctions';
import { AuthContext } from '@/contexts/AuthContext';

const LoginInputGroup = ({ otpNeeded }: { otpNeeded: (loginPayload: ILoginPayload) => void }) => {
    const [loginPayload, setLoginPayload] = useState<ILoginPayload>(initialLoginPayload);
    const { setUser } = useContext(AuthContext);

    const updateCredentialsPayload = (key: "username" | "email" | "password", value: string) => {
        if (key === "username" || key === "email") {
            setLoginPayload((prev) => ({ ...prev, "username": value, "email": value }))
        }
        setLoginPayload((prev) => ({ ...prev, [key]: value }))
    }

    const loginUser = async () => {
        const { data, error, status } = await fetchPOST<IUserInfoResponse>(URLGenerator("USER", "/v1/auth/login"), loginPayload);
        if (status === 402) {
            otpNeeded(loginPayload);
        }
        if (data && ("password" in data)) {
            delete data.password;
        }
        if (data && ("otp" in data)) {
            delete data.otp;
        }
        setUser(data)
        if (error) { return; }
    }

    return (
        <>
            <div className={styles["input-group-group"]}>
                <div className={styles["input-group-input"]}>
                    <Input iconSize={20} value={loginPayload?.username} placeholder="Enter username or email address" onInputChange={(val: string | number) => updateCredentialsPayload("username", val?.toString())} iconType="mail" />
                </div>

                <div className={styles["input-group-input"]}>
                    <Input iconSize={16} value={loginPayload?.password} inputType="password" placeholder="Enter your password" onInputChange={(val: string | number) => updateCredentialsPayload("password", val?.toString())} iconType="lock" />
                </div>
            </div>

            <div className={styles["input-group-group"]}>
                <ButtonSet primaryText="Login" onPrimaryClick={loginUser} />
            </div>
        </>
    )
}

export default LoginInputGroup