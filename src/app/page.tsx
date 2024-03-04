import { Column } from 'primereact/column';
import { TableWrapper } from 'app/components/TableWrapper';
import { PaginatorWrapper } from 'app/components/PaginatorWrapper';
import { Filters } from 'app/components/Filters/Filters';

import {
    getBrand,
    getFilteredItems,
    getItems,
    getItemsId,
} from 'http/postService/postService';

import scss from './Home.module.scss';
import { Suspense } from 'react';

export interface SearchParamsType {
    page?: string;
    brand?: string;
    price?: number;
    productName?: string;
}

export default async function Home({
    searchParams,
}: {
    searchParams: SearchParamsType;
}) {
    return (
        <main className={scss.cards}>
            <Filters />
            <Suspense fallback={<h1>Загрузка...</h1>}>
                <TableWrapper searchParams={searchParams}>
                    <Column field="id" header="ID" />
                    <Column field="product" header="Название" />
                    <Column field="brand" header="Бренд" />
                    <Column field="price" header="Цена" />
                </TableWrapper>
            </Suspense>
        </main>
    );
}
