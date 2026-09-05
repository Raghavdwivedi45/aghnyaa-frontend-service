import { IUploadImageResponse } from "@/constants/interfaces";
import { URLGenerator } from "./helperFunctions";

export type Result<T> =
    | { data: T; error: null; status: number, message: string }
    | { data: null; error: Error; status: number, message: string };
// error: null vs error: Error is what callers use for that (e.g. if (error) return before touching data, or deciding toast type: success vs error styling). message alone doesn't tell you which case you're in.

export const fetchGET = async <T = unknown>(url: string, headers: Record<string, string> = {}): Promise<Result<T>> => {
    try {
        const res = await fetch(url, {
            headers: { "Content-Type": "application/json", ...headers },
            credentials: "include"
        });
        const resBody = await res.json().catch(() => null);

        if (!res.ok) {
            const message = resBody?.message ?? `Request failed with status ${res.status}`;
            return { data: null, error: new Error(message), status: res.status, message };
        }

        const message = resBody?.message ?? "";
        return { data: resBody?.data ?? resBody, error: null, status: res.status, message };
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { data: null, error: err instanceof Error ? err : new Error(message), status: 0, message };
    }
};

export const fetchPOST = async <T = unknown>(
    url: string,
    body: unknown = {},
    headers: Record<string, string> = {},
    method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
): Promise<Result<T>> => {
    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", ...headers },
            body: JSON.stringify(body),
            credentials: "include",
        });

        const resBody = await res.json().catch(() => null);

        if (!res.ok) {
            const message = resBody?.message ?? `Request failed with status ${res.status}`;
            return { data: null, error: new Error(message), status: res.status, message };
        }

        const message = resBody?.message ?? "";
        return { data: resBody?.data ?? resBody, error: null, status: res.status, message };
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { data: null, error: err instanceof Error ? err : new Error(message), status: 0, message };
    }
};

// Image upload part

const getUploadImageURL = async (file: File): Promise<Result<IUploadImageResponse>> => {
    const res = await fetch(URLGenerator("PUBLISH", `/protected/v1/articles/generate-presignedpost-s3-url/${file?.name}`), { method: "GET", credentials: "include" });
    const resBody = await res.json().catch(() => null);

    if (!res.ok) {
        const message = resBody?.message ?? `Request failed with status ${res.status}`;
        return { data: null, error: new Error(message), status: res.status, message };
    }

    const message = resBody?.message ?? "";
    return { data: resBody?.data ?? resBody, error: null, status: res.status, message };
};

export const uploadImageToS3 = async (
    coverImageFile: File
): Promise<Result<string>> => {

    const { data, error, status, message } = await getUploadImageURL(coverImageFile);

    if (!data || error || status !== 200) {
        return {
            data: null,
            error: error ?? new Error("Couldn't get presigned URL."),
            status,
            message: message || "Couldn't get presigned URL.",
        };
    }

    const formData = new FormData();

    Object.entries(data.fields).forEach(([key, value]) => {
        formData.append(key, value);
    });

    // Needed because your policy requires Content-Type
    formData.append("Content-Type", coverImageFile.type);
    formData.append("file", coverImageFile);

    const response = await fetch(data.url, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        return {
            data: null,
            error: new Error("S3 upload failed."),
            status: response.status,
            message: "S3 upload failed.",
        };
    }

    return {
        data: data.key, // Return the uploaded object's key
        error: null,
        status: response.status,
        message: ""
    };
};

// PDF Generation

export const generatePDF = async (pdfUrl: string) => {
    try {
        const response = await fetch(pdfUrl, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            console.error(response)
            return;
        }
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        // Open PDF in new tab
        window.open(url, "_blank");

        // Download PDF
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-article.pdf";

        document.body.appendChild(a);
        a.click();
        a.remove();

        // Keep URL alive for the new tab
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 60_000);

        return "PDF generated successfully."
    }
    catch (error) {
        console.error("PDF generation failed:", error);
    }

}