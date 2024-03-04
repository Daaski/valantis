import {SearchParamsType} from "app/page";

export interface Response<T> {
    result: T[]
}

export type GetItemsId = (offset: number) => Promise<Response<string> | undefined>

export interface Item {
    brand: null | string
    id: string,
    price: number,
    product: string
}

export type GetItems = (ids?: string[]) => Promise<Response<Item> | undefined>

export type GetFilteredItems = (params: SearchParamsType) => Promise<Response<string> | undefined>

export type GetBrand = () => Promise<Response<string[]> | undefined>
