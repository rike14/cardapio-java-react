import { Link, useLocation } from 'react-router-dom';
import './header.css';

export interface HeaderProps {
    login: boolean;
}

export function Header() {
    const { pathname } = useLocation()

    return (
        <div className="header">
            <Link to="/">
                 <button className="btn-login">Home</button>
            </Link>
            {pathname !== '/login' && 
            <Link to="/login">
                <button className="btn-login">Login</button>
            </Link>}
        </div>
    )
}