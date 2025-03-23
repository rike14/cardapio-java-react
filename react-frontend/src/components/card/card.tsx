import { useState } from 'react';
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
    const [role] = useState(localStorage.getItem('role') || '');

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
        toast.success('Product deleted successfully');
        setTimeout(() => {
            navigation(0)
        }, 1000)
    }

    return (
        <div className="card">
            {role === 'admin' &&
                <span className="delete-product" onClick={() => handleDeleteProduct(id)}><FaX /></span>
            }
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p><b>
                { Number(price).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}
            </b></p>
        </div>
    )
}