'use client';

import { useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { initializeAuth } from '@/utils/userAPIs.client';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  //  const { data: user, isPending, isError } = useQuery({
  const { data: user, isPending } = useQuery({
    queryKey: ['auth'],
    queryFn: initializeAuth,
    staleTime: 5 * 60 * 1000, // Don't repeatedly check authentication on every mount
    refetchOnWindowFocus: false, // Don't automatically refetch when browser window gets focus
  });

  useEffect(() => {
    if (user && pathname === '/signup') {
      router.replace('/');
    }
  }, [user, pathname, router]);

  return (
    <AuthContext.Provider value={{ user: user || null, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}
