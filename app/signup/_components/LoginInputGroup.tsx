import React, { useState } from 'react';
import styles from '../page.module.scss';
import ButtonSet from '@/components/ButtonSet/ButtonSet';
import Input from '@/components/Input/Input';
import { ILoginPayload } from '@/constants/interfaces';
import { initialLoginPayload } from '@/constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '@/utils/userAPIs.client';

const LoginInputGroup = ({ otpNeeded }: { otpNeeded: (loginPayload: ILoginPayload) => void }) => {
  const [loginPayload, setLoginPayload] = useState<ILoginPayload>(initialLoginPayload);
  const queryClient = useQueryClient();

  const updateCredentialsPayload = (key: 'username' | 'email' | 'password', value: string) => {
    if (key === 'username' || key === 'email') {
      setLoginPayload((prev) => ({ ...prev, username: value, email: value }));
    }
    setLoginPayload((prev) => ({ ...prev, [key]: value }));
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: ({ data, status }, loginPayload) => {
      if (status === 402) {
        otpNeeded(loginPayload);
        return;
      }

      if (status !== 200) return;
      queryClient.setQueryData(['auth'], data);
    },
  });

  return (
    <>
      <div className={styles['input-group-group']}>
        <div className={styles['input-group-input']}>
          <Input
            iconSize={20}
            value={loginPayload?.username}
            placeholder="Enter username or email address"
            onInputChange={(val: string | number) =>
              updateCredentialsPayload('username', val?.toString())
            }
            iconType="mail"
          />
        </div>

        <div className={styles['input-group-input']}>
          <Input
            iconSize={16}
            value={loginPayload?.password}
            inputType="password"
            placeholder="Enter your password"
            onInputChange={(val: string | number) =>
              updateCredentialsPayload('password', val?.toString())
            }
            iconType="lock"
          />
        </div>
      </div>

      <div className={styles['input-group-group']}>
        <ButtonSet primaryText="Login" onPrimaryClick={() => loginMutation.mutate(loginPayload)} />
      </div>
    </>
  );
};

export default LoginInputGroup;
