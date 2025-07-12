import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '', // 예: Supabase REST API 등
    headers: {
        'Content-Type': 'application/json',
    },
});

// 공통 에러 핸들링
const handleRequest = async <T>(
    request: Promise<AxiosResponse<T>>
    ): Promise<T | null> => {
    try {
        const response = await request;
        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError;

        console.error('[API ERROR]', err.response?.data || err.message);
        return null;
    }
};

// ✅ 각 요청 메서드별 wrapper
export const apiClient = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        handleRequest<T>(api.get(url, config)),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        handleRequest<T>(api.post(url, data, config)),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        handleRequest<T>(api.put(url, data, config)),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        handleRequest<T>(api.patch(url, data, config)),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        handleRequest<T>(api.delete(url, config)),
};