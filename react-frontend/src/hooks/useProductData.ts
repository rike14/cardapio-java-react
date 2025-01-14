import { useQuery } from '@tanstack/react-query';
import axios, { AxiosPromise } from 'axios';
import { ProductData } from '../interface/ProductData';

const fetchData = async (): AxiosPromise<ProductData[]> => { 
    const response = await axios.get(`${process.env.API_URL}/product`);
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