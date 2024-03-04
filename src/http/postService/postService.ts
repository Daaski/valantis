import { $host } from 'http/index';
import { AxiosError, AxiosResponse } from 'axios';
import {
    GetBrand,
    GetFilteredItems,
    GetItems,
    GetItemsId,
} from 'http/postService/types';

export const getItemsId: GetItemsId = async (offset) => {
    try {
        const res: AxiosResponse<ReturnType<typeof getItemsId>> =
            await $host.post('', {
                action: 'get_ids',
                params: { offset, limit: 50 },
            });

        return res.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            console.log(e.response?.data);
        }
    }
};

export const getItems: GetItems = async (ids) => {
    try {
        const res: AxiosResponse<ReturnType<typeof getItems>> =
            await $host.post('', {
                action: 'get_items',
                params: { ids },
            });

        return res.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            console.log(e.response?.data);
        }
    }
};

export const getFilteredItems: GetFilteredItems = async (params) => {
    try {
        const res: AxiosResponse<ReturnType<typeof getFilteredItems>> =
            await $host.post('', {
                action: 'filter',
                params: {
                    price: params.price ? +params.price : undefined,
                    product: params?.productName,
                    brand: params?.brand,
                },
            });

        return res.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            console.log(e.response?.data);
        }
    }
};

export const getBrand: GetBrand = async () => {
    try {
        const res: AxiosResponse<ReturnType<typeof getBrand>> =
            await $host.post('', {
                action: 'get_fields',
                params: { field: 'brand', offset: 0 },
            });

        return res.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            console.log(e.response?.data);
        }
    }
};
