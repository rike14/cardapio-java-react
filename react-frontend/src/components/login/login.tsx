import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Login } from '../../services/authService';

import './login.css';

export function LoginIn() {
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
        
            if (!email || !password) { 
                toast.error('Please enter both username and password');
                return;
            }
            const response = await Login(email, password);
            setToken(response.token);
            setRole(response.role);

            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            toast.success('Logged in successfully');
            navigation('/', { state: 'active' });

        } catch (error) {
            toast.error('Username or password incorrect!');
            throw new Error('Failed to login: '+ error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container container-login">
            <form className="form" onSubmit={handleLogin}>
                <div className="div-header">
                    <h1>Sign in</h1>
                    <img src="/public/logo.png" className="logo-img"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <div className="input-group">
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                        <FaUser />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                        <FaLock />
                    </div>
                <button className="btn-login" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                </div>
            </form>
        </div>
    )
}