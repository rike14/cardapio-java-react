import './button.css';

interface ButtonProps {
    title: string;
    className: string;
    onClick: () => void;
    disabled?: boolean;
    userState: boolean;
}



export function Button({title, userState, onClick, className}: ButtonProps) {
    return (
        userState ? (
            <button className={className} onClick={onClick} >{title}</button> 
            ) : (
            ''
        )
    )
}