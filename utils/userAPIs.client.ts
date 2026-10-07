import { ILoginPayload, IUserInfo, IUserInfoResponse } from '@/constants/interfaces';
import { URLGenerator } from './helperFunctions';

export const initializeAuth = async (): Promise<IUserInfo | null> => {
  try {
    const res = await fetch(URLGenerator('USER', '/protected/v1/auth/user-info'), {
      credentials: 'include',
    });

    if (res.ok) {
      const result: { data: IUserInfo } = await res.json();
      return result?.data;
    }

    if (res.status === 401) {
      const refreshRes = await fetch(URLGenerator('USER', '/v1/auth/refresh-token'), {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        const refreshedUser: { data: IUserInfo } = await refreshRes.json();
        return refreshedUser?.data;
      }
    }

    return null;
  } catch (error) {
    console.error('Authentication initialization failed:', error);
    return null;
  }
};

export const loginUser = async (loginPayload: ILoginPayload) => {
  try {
    const res = await fetch(URLGenerator('USER', '/v1/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginPayload),
    });

    const data: { data: IUserInfoResponse } = await res.json();
    return { data: data?.data, status: res.status };
  } catch (error) {
    console.error('Login user failed:', error);
    // return null;
    // Don't return null from the API function. Throw the error instead. TanStack Query is designed to handle rejected promises as errors.
    throw error;
  }
};
