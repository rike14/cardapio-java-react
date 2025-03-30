import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { toast } from 'react-toastify';
import { ProductData } from '../interface/ProductData';
import { api } from '../services/app';
import { BearerToken } from '../services/bearerTokenService';

const postData = async (data: ProductData): AxiosPromise<any> => {
    const headers = BearerToken();
    
    if (!headers) {
        throw new Error('Unauthorized');
    }

    if(data.id) {
        const response = await api.put(`/products/${data.id}`, data, headers);
        return response;
    }

    const response = await api.post(`products`, data, headers);
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