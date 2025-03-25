import { useEffect, useState } from 'react';
import { FaPencil, FaX } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { api } from '../../services/app';
import { BearerToken } from '../../services/bearerTokenService';
import { Loading } from '../loading/loading';
import { Modal } from '../modal/modal';
import './card.css';

interface CardProps {
    id: number;
    title: string;
    image: string;
    price: number;
}



export function Card({id, title, image, price}: CardProps) {
    const [role] = useState(localStorage.getItem('role') || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleDeleteProduct(id: number) {
        setIsLoading(true);
        const headers = BearerToken()

        if (!headers) {
            setIsLoading(false)
            throw new Error('Unauthorized');
        }

        const response = await api.get(`/product/${id}`, {
            headers: headers.headers
        })

        if (response.status !== 200) {
            toast.error('Error fetching product');
            return false;
        }
        
        if (response.status !== 200) {
            toast.error('Error deleting product');
            return false;
        }
        
        response.data[0].status = 'delete';
        setProduct(response.data);
        setIsModalOpen(true);
    }

    async function handleEditProduct(id: number) {
        setIsLoading(true);
        const headers = BearerToken()
        if (!headers) {
            setIsLoading(false)
            throw new Error('Unauthorized');
        }

        const response = await api.get(`/product/${id}`, {
            headers: headers.headers
        })

        if (response.status !== 200) {
            toast.error('Error fetching product');
            return false;
        }
        response.data[0].status = 'edit';
        setProduct(response.data);
        setIsModalOpen(true);
        
    }

    useEffect(() => {
        setIsLoading(false);
    }, [isModalOpen, product])

    return (
        <>
            <div className="card">
                {role === 'admin' && (
                    <>
                        <span className="delete-product" onClick={() => handleDeleteProduct(id)}><FaX /></span>
                        <span className="edit-product" onClick={() => handleEditProduct(id)}><FaPencil /></span>
                    </>
                )}
                <img src={image} alt={title} />
                <h2>{title}</h2>
                <p><b>
                    { Number(price).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })}
                </b></p>
            </div>
            {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} props={product ?? []} />}
            {isLoading && <Loading />}
        </>
    )
}