import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useProductDataMutate } from "../../../hooks/useProductDataMutate";
import { ProductData } from "../../../interface/ProductData";

import { Button } from "../../button/button";
import "./modal.css";

interface InputProps {
    label: string;
    value: string | number;
    onChange(value: any): void;
}

interface ModalProps {
    closeModal(): void,
    props: Array<{
        id?: number;
        title?: string;
        image?: string;
        price?: number;
    }>
}

const handlePrice = (price: string) => {
    if(!price) return ''
    const priceNumber = parseFloat(price.replace(/\D/g, '')) / 100
    return priceNumber.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const Input = ({label, value, onChange}: InputProps) => {
       return (
        <div>
            <label>{label}</label>
            {label === "Price" ?
                <input
                    onChange={e => onChange(handlePrice(e.target.value))}
                    value={value}
                /> :
                <input value={value} onChange={e => onChange(e.target.value)} />
            }
        </div>
    )
}

export function Modal({ closeModal, props }: ModalProps) {
    const [title, setTitle] = useState(props[0]?.title || '');
    const [image, setImage] = useState(props[0]?.image || '');
    const [price, setPrice] = useState(handlePrice(props[0]?.price?.toFixed(2) || '') || '');
    const { mutate, isSuccess, isPending } = useProductDataMutate();
    const [isLoading, setIsLoading] = useState(false);


    const submit = () => {
        setIsLoading(true);
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
        console.log(productData)
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

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close-modal">Close</button>
                <img src="public/logo.png" className="img-logo" />
                <h2 className="modal-title">Register a new product</h2>
                <form className="input-container">
                    <Input label="Title" value={title} onChange={setTitle} />
                    <Input label="Image URL" value={image} onChange={setImage} />
                    <Input label="Price" value={price} onChange={setPrice} />
                </form>
                <Button onClick={submit} disabled={isPending} className={'btn-primary'} title={isLoading ? 'Saving...' : 'Save'} userState={true}></Button>
            </div>
        </div>
    );
};