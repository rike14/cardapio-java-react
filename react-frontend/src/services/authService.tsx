import { api } from "./app";

export const Login = async (email: string, password: string) => {
    try {
        const response = await api.post(`auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to login');
    }
};