import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './header.css';

export interface HeaderProps {
    login: boolean;
}

export function Header() {
    const navigation = useNavigate()
    const { pathname } = useLocation()
    const [signed, setSigned] = useState(localStorage.getItem('token') ? true : false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setSigned(true);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setSigned(false);
        toast.success('Logged out')
        navigation('/');
    }

    const button = signed ? 
        
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
        
     : 
        <Link to="/login">
            <button className="btn-login">Login</button>
        </Link>
    

    return (
        <div className="header">
            <Link to="/">
                 <button className="btn-login">Home</button>
            </Link>
            {pathname == '/login' ? '' :
            button }
        </div>
    )
}