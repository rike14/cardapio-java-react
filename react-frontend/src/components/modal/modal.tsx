import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useProductDataMutate } from "../../hooks/useProductDataMutate";
import { ProductData } from "../../interface/ProductData";

import { useNavigate } from "react-router-dom";
import { api } from "../../services/app";
import { BearerToken } from "../../services/bearerTokenService";
import { Button } from "../button/button";
import { Loading } from "../loading/loading";
import "./modal.css";

interface InputProps {
    label: string;
    value: string | number;
    onChange(value: any): void;
    disabled: boolean;
}

interface ModalProps {
    closeModal(): void,
    props: Array<{
        id?: number;
        title?: string;
        image?: string;
        price?: number;
        status?: string;
    }>
}

const handlePrice = (price: string) => {
    if(!price) return ''
    const priceNumber = parseFloat(price.replace(/\D/g, '')) / 100
    return priceNumber.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const Input = ({label, value, onChange, disabled}: InputProps) => {
       return (
        <div>
            <label>{label}</label>
            {label === "Price" ?
                <input
                    onChange={e => onChange(handlePrice(e.target.value))}
                    value={value}
                    disabled={disabled}
                /> :
                <input value={value} onChange={e => onChange(e.target.value)} disabled={disabled} />
            }
        </div>
    )
}

export function Modal({ closeModal, props }: ModalProps) {
    const navigation = useNavigate()
    const [title, setTitle] = useState(props[0]?.title || '');
    const [image, setImage] = useState(props[0]?.image || '');
    const [price, setPrice] = useState(handlePrice(props[0]?.price?.toFixed(2) || '') || '');
    const { mutate, isSuccess, isPending } = useProductDataMutate();
    const [isLoading, setIsLoading] = useState(false);
    const [product] = useState(props[0]?.status || null);


    const submit = async () => {
        setIsLoading(true);
        
        if(product === 'delete') {
            const headers = BearerToken()
            
            if (!headers) {
                throw new Error('Unauthorized');
            }
            const response = await api.delete(`/products/${props[0]?.id}`, {
                headers: headers.headers
            })
            if(response.status !== 200) {
                toast.error('Error deleting product');
                setIsLoading(false);
                return
            }
            toast.success('Product deleted successfully');
            setTimeout(() => {
                navigation(0)
            }, 1000)
        }

        if(!title || !image || !price) {
            toast.error('Please fill all fields')
            setIsLoading(false);
            return
        }

        const priceFormatted = parseFloat(price.toString()
            .replace(/[^0-9]/g, '')
            .replace(/(\d{2})$/, '.$1'))


        const productData: ProductData = {
            id: props[0]?.id,
            title, 
            price: priceFormatted, 
            image
        }
        mutate(productData)
    }

    useEffect(() => {
        if(isPending) return
        if(!isSuccess) {
            setIsLoading(false)
            return
        }
        closeModal();
    }, [isSuccess, closeModal, isPending, price])

    if(product === 'delete') {
        return (

            <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close-modal">Close</button>
                <img src="/logo.png" className="img-logo" />
                <h2 className="modal-title">Are you sure delete this product?</h2>
                <form className="input-container">
                    <img src={image} alt={title}  />
                    <Input label="Title" value={title} onChange={setTitle}  disabled={true}/>
                    <Input label="Price" value={price} onChange={setPrice}  disabled={true}/>
                </form>
                <Button onClick={submit} disabled={isPending} className={'btn-primary'} title={isLoading ? 'Deleting...' : "Yes! I'm sure"} userState={true}></Button>
            </div>
        {isLoading && <Loading />}
        </div>
        )
    }
    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close-modal">Close</button>
                <img src="/logo.png" className="img-logo" />
                <h2 className="modal-title">{product === 'edit' ? `Edit Product ${props[0].title} ` : 'Register a new product'}</h2>
                <form className="input-container">
                    <Input label="Title" value={title} onChange={setTitle} disabled={false} />
                    <Input label="Image URL" value={image} onChange={setImage}  disabled={false} />
                    <Input label="Price" value={price} onChange={setPrice}  disabled={false}/>
                </form>
                <Button onClick={submit} disabled={isPending} className={'btn-primary'} title={isLoading ? 'Saving...' : 'Save'} userState={true}></Button>
            </div>
        {isLoading && <Loading />}
        </div>
    ); 
   
};