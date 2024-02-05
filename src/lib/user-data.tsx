import { cookies } from 'next/headers';

export const getUserIp = (): string => {
  return cookies().get('user-ip')?.value ?? 'Unknown';
};
