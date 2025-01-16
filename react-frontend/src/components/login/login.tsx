import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Login } from '../../services/authService';
import './login.css';

export function LoginIn() {
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        try {
            const login = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!login || !password) { 
                toast.error('Please enter both username and password');
                return;
            }
            const response = await Login(login, password);
            setToken(response.token);
            setRole(response.role);

            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            toast.success('Logged in successfully');

        } catch (error) {
            toast.error('Username or password incorrect!');
            throw new Error('Failed to login: '+ error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isLoading) return;
        if(token && role) {
            navigation('/')
        }
    }, [token, role]);

    return (
        <div className="container">
            <h1>Sign in</h1>
            <form className="form" action="/login" method="post">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button className="btn-login" disabled={isLoading} onClick={(e) => handleSubmit(e)}>Login</button>
            </form>
        </div>
    )
}