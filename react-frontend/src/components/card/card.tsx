import { FaX } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../services/app';
import { BearerToken } from '../../services/bearerTokenService';
import './card.css';

interface CardProps {
    id: number;
    title: string;
    image: string;
    price: number;
}



export function Card({id, title, image, price}: CardProps) {
    const navigation = useNavigate()

    async function handleDeleteProduct(id: number) {
        const headers = BearerToken()

        if (!headers) {
            throw new Error('Unauthorized');
        }

        const response = await api.delete(`/product/${id}`, {
            headers: headers.headers
        })
        
        if (response.status !== 200) {
            toast.error('Error deleting product');
            return false;
        }
        navigation(0);
        
    }

    return (
        <div className="card">
            <span className="delete-product" onClick={() => handleDeleteProduct(id)}><FaX /></span>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p><b>$ {price}</b></p>
        </div>
    )
}