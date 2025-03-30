import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    }, [signed])

    const handleLogout = () => {
        localStorage.clear()
        setSigned(false);
        navigation('/', { state: ''});
        navigation(0)
    }

    const button = signed ? 
        
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
        
     : 
        <Link to="/login">
            <button className="btn-login">Login</button>
        </Link>
    

    return (
        <div className="header">
            <img src="/logo.png" className="img-logo" />
            <div>
                <Link to="/">
                    <button className="btn-login">Home</button>
                </Link>
                {pathname != '/login' && button }
            </div>
        </div>
    )
}