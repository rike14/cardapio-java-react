import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useProductDataMutate } from "../../../hooks/useProductDataMutate";
import { ProductData } from "../../../interface/ProductData";
import "./modal.css";

interface InputProps {
    label: string;
    value: string | number;
    onChange(value: any): void;
}

interface ModalProps {
    closeModal(): void
}

const Input = ({label, value, onChange}: InputProps) => {
       return (
        <div>
            <label>{label}</label>
            {label === "Price" ? 
                <input type="number" value={value} onChange={e => onChange(e.target.value)} /> :
                <input value={value} onChange={e => onChange(e.target.value)} />
            }
        </div>
    );
}

export function Modal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState<number | string>('');
    const { mutate, isSuccess, isPending } = useProductDataMutate();
    const [isLoading, setIsLoading] = useState(false);

    const submit = () => {
        setIsLoading(true);
        if(!title || !image || !price) {
            toast.error('Please fill all fields')
            setIsLoading(false);
            return
        }
        const productData: ProductData = {
            title, 
            price: Number(price),
            image
        }
        mutate(productData)

    }

    useEffect(() => {
        if(isPending) return
        if(Number(price) <= 0) {
            setPrice('');
        }
        if(!isSuccess) return
        closeModal();
    }, [isSuccess, closeModal, price, isPending])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close-modal">Close</button>
                <h2 className="modal-title">Register a new product</h2>
                <form className="input-container">
                    <Input label="Title" value={title} onChange={setTitle} />
                    <Input label="Image URL" value={image} onChange={setImage} />
                    <Input label="Price" value={price ?? ''} onChange={setPrice} />
                </form>
                <button onClick={submit} disabled={isPending} className="btn-secondary">
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};