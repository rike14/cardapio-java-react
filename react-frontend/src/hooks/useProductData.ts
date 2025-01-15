import { useQuery } from '@tanstack/react-query';
import axios, { AxiosPromise } from 'axios';
import { ProductData } from '../interface/ProductData';

const API_URL= import.meta.env.VITE_API_BASE_URL

const fetchData = async (): AxiosPromise<ProductData[]> => { 
    const response = await axios.get(`${API_URL}/product`);
    return response;
}
export function useProductData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['product-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    };
}