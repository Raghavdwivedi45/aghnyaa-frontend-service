import { cookies } from "next/headers";
import { fetchGET } from "./fetchAPIFunctions";
import { IUserSettingsInfo, IUserStreak } from "@/constants/interfaces";
import { URLGenerator } from "./helperFunctions";

export const fetchUserInfo = async () => {
    /* cookies() is a request-time API -> it has to be read per request, never cached in module scope. */
    const cookieStore = await cookies();
    const { data } = await fetchGET<IUserSettingsInfo>(URLGenerator("USER", "/protected/v1/auth/user-info"), { Cookie: cookieStore.toString() });
    return data;
}

export const fetchUserStreak = async () => {
    /* cookies() is a request-time API -> it has to be read per request, never cached in module scope. */
    const cookieStore = await cookies();
    const { data } = await fetchGET<IUserStreak>(URLGenerator("USER", "/protected/v1/auth/user-info/performance"), { Cookie: cookieStore.toString() });
    return data;
}