import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosPromise } from 'axios';
import { toast } from 'react-toastify';
import { ProductData } from '../interface/ProductData';
import { BearerToken } from '../services/bearerTokenService';

const API_URL= import.meta.env.VITE_API_BASE_URL

const postData = async (data: ProductData): AxiosPromise<any> => {
    const headers = BearerToken();
    
    if (!headers) {
        throw new Error('Unauthorized');
    }

    const response = await axios.post(`${API_URL}/product`, data, headers);
    return response;
}
export function useProductDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-data'] })
            toast.success('Product saved successfully!')
        },
        onError: () => toast.error('Error saving product!')
    })
    return mutate;
}