import axios from "axios";
import { getToken } from "@/utils/auth";
import { message } from "antd";

interface IRes {
    code: number;
    msg: string;
    data: any;
}

declare module "axios" {
    interface AxiosResponse extends IRes {}
}
export const service = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

service.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) {
            message.error(res.msg);
            return Promise.reject(res);
        }
        return res;
    },
    error => {
        message.error(error.message);
        return Promise.reject(error);
    }
);
