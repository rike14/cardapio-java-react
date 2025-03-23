import { useEffect, useState } from "react";

import IntlCurrencyInput from "react-intl-currency-input";
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
    closeModal(): void
}

const currencyConfig = {
  locale: "EN-US",
  formats: {
    number: {
      USD: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    },
  },
};

const Input = ({label, value, onChange}: InputProps) => {
       return (
        <div>
            <label>{label}</label>
            {label === "Price" ?
                <IntlCurrencyInput
                    onChange={e => onChange(e.target.value)}
                    config={currencyConfig}
                    currency="USD"
                /> :
                <input value={value} onChange={e => onChange(e.target.value)} />
            }
        </div>
    );
}

export function Modal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const { mutate, isSuccess, isPending } = useProductDataMutate();
    const [isLoading, setIsLoading] = useState(false);


    const submit = () => {
        setIsLoading(true);
        if(!title || !image || !price) {
            toast.error('Please fill all fields')
            setIsLoading(false);
            return
        }

        const priceFormatted = parseFloat(price
            .replace(/[^0-9]/g, '')
            .replace(/(\d{2})$/, '.$1'))


        const productData: ProductData = {
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
    }, [isSuccess, closeModal, isPending])

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