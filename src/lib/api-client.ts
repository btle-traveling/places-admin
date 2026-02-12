import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"
import { getSessionToken } from "./auth"

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

export const publicApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

// Public client still gets the response interceptor for error formatting
publicApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.detail) {
            error.message = error.response.data.detail
        }
        return Promise.reject(error)
    },
)

const setupInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const result = await getSessionToken()
            if (result.success) {
                config.headers.Authorization = `Bearer ${result.data}`
            }
            return config
        },
    )

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError<any>) => {
            if (
                error.response?.data &&
                typeof error.response.data === "object" &&
                "detail" in error.response.data
            ) {
                error.message = (error.response.data as any).detail
            }
            return Promise.reject(error)
        },
    )
}


setupInterceptors(apiClient)