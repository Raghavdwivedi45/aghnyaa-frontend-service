"use client";

import { useEffect, useState } from "react";
import { IUserInfo } from "@/constants/interfaces";
import { AuthContext } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { URLGenerator } from "@/utils/helperFunctions";
import { fetchGET, fetchPOST } from "@/utils/fetchAPIFunctions";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUserInfo | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const fetchUser = async () => {
        const { data, status } = await fetchGET<IUserInfo>(URLGenerator("USER", "/protected/v1/auth/user-info"));
        if (status === 401 || status === 429) {
            const { data: data2, status } = await fetchPOST<IUserInfo>(URLGenerator("USER", "/v1/auth/refresh-token"));
            if (status === 200 && data2) {
                setUser(data2);
            }
        }
        if (data) {
            setUser(data)
        }
    };

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
        if (user && pathname === "/signup") {
            router.replace("/");
        }
    }, [user, pathname, router])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}