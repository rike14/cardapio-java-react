import axios from "axios";

const API_URL= import.meta.env.VITE_API_BASE_URL

export const Login = async (login: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { login, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to login');
    }
};