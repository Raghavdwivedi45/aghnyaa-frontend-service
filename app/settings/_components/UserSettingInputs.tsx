"use client";

import React from 'react';
import styles from "../page.module.scss";
import Input from '@/components/Input/Input';
import Dropdown from '@/components/Dropdown/Dropdown';
import { languageArray, themeArray } from '@/constants/constants';
import { isLanguageType, isThemeType } from '@/utils/helperFunctions';
import { IUserInfo, IUserSettingsInfo } from '@/constants/interfaces';

const UserSettingInputs = ({ userInfo }: { userInfo: IUserSettingsInfo }) => {

    const updateTheme = (theme: string | number) => {
        if (!isThemeType(theme)) return;
    }

    const updateLanguage = (theme: string | number) => {
        if (!isLanguageType(theme)) return;
    }

    return (
        <div className={styles["user-inputs"]}>
            <Input value={userInfo?.username} iconType="username" disabled={true} />
            <Input value={userInfo?.email} iconType="mail" disabled={true} />
            <Input value={userInfo?.contact?.phone} iconType="phone" disabled={true} />
            <Input value={userInfo?.role} iconType="user-male" disabled={true} />
            <Dropdown iconType="theme" selectedValue={userInfo?.preferences?.theme} dropdownList={themeArray} onOptionSelect={updateTheme} />
            <Dropdown iconType="language" selectedValue={userInfo?.preferences?.language} dropdownList={languageArray} onOptionSelect={updateLanguage} />
        </div>
    )
}

export default UserSettingInputs