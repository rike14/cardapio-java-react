const token = localStorage.getItem('token') as string;

const config = {
    headers: { Authorization: `Bearer ${token}` }
};
export const BearerToken = () => {
    if(!token) return null;
    return config;
};