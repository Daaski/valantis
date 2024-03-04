'use client';

import {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';

import { useSearchQuery } from 'utils/useSearchQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBrand } from 'http/postService/postService';

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import {Button} from "primereact/button";

import { FiltersType } from 'app/components/Filters/types';

import scss from './Filters.module.scss';
import Link from "next/link";



export const Filters = () => {
    const router = useRouter()
    const searchParams = useSearchParams();

    const { setSearchParams, deleteSearchParams, has } = useSearchQuery();

    const [availableBrands, setAvailableBrands] = useState<string[]>([]);

    const brand = searchParams.get('brand') ?? '';
    const productName = searchParams.get('productName') ?? '';
    const price = searchParams.get('price') ?? '';

    const [filter, setFilters] = useState<FiltersType>({
        price: '',
        productName: '',
        brand: '',
    });

    const isEmpty = !filter.price && !filter.productName && !filter.brand

    useEffect(() => {
        setFilters({ productName, brand, price });
    }, [brand, price, productName]);

    useEffect(() => {
        getBrand().then((d) => {
            const onlyBrands = new Set(d?.result);
            onlyBrands.delete(null as any);
            const brandsArray = ['Не выбрано', ...onlyBrands]
            setAvailableBrands(brandsArray as string[]);
        });
    }, []);

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        const filterVariant = e.target.name;

        if (e.value === 'Не выбрано') {
            deleteSearchParams(filterVariant);
        } else {
            setSearchParams(filterVariant, e.value);
        }

        setFilters((filters) => ({
            ...filters,
            [filterVariant]: e.target.value,
        }));
    };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const filterVariant = e.target.name;

        const value = e.target.value

        if (!value) {
            deleteSearchParams(filterVariant);
        } else {
            setSearchParams(filterVariant, value);
        }

        setFilters((filters) => ({
            ...filters,
            [filterVariant]: e.target.value,
        }));
    };

    const handleClearClick = () => {
        router.push('/')
    }

    return (
        <div className={scss.filters_wrapper}>
            <Dropdown
                value={filter?.brand}
                name="brand"
                options={availableBrands}
                editable
                placeholder="Выберите бренд"
                onChange={handleDropdownChange}
            />
            <InputText
                value={filter.price}
                onChange={handleInputChange}
                name="price"
                keyfilter="int"
                placeholder="Выберите цену"
            />

            <InputText
                value={filter.productName}
                onChange={handleInputChange}
                name="productName"
                placeholder="Введите название"
            />
                <Button disabled={isEmpty} onClick={handleClearClick}>Очистить</Button>
        </div>
    );
};
