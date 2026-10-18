import { cookies } from 'next/headers';

export const getPublishAuthorizationHeaders = async (): Promise<Record<string, string>> => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};
