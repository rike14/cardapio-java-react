import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { ProductData } from '../interface/ProductData';
import { api } from '../services/app';

const fetchData = async (): AxiosPromise<ProductData[]> => { 
    const response = await api.get(`products`);
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