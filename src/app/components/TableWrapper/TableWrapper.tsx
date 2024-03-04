import React, { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';

import {
    getFilteredItems,
    getItems,
    getItemsId,
} from 'http/postService/postService';
import { PaginatorWrapper } from 'app/components/PaginatorWrapper';

import { TableWrapperProps } from 'app/components/TableWrapper/types';

export const TableWrapper: React.FC<TableWrapperProps> = async ({
    children,
    searchParams,
}) => {
    const page = searchParams?.page || 1;

    const hasFilters =
        searchParams?.productName || searchParams?.brand || searchParams?.price;

    const ids = hasFilters
        ? await getFilteredItems(searchParams)
        : await getItemsId((+page - 1) * 50);

    const items = await getItems(ids?.result);

    const clearProducts = items?.result.filter(
        (product, index, self) =>
            index === self.findIndex((t) => (
                t.id === product.id
            ))
    );


    return (
        <>
            <DataTable
                scrollable
                scrollHeight="calc(100vh - 158.8px)"
                selectionMode="single"
                tableStyle={{ minWidth: '100%' }}
                value={clearProducts}
            >
                {children}
            </DataTable>
            {!hasFilters && (
                <PaginatorWrapper current={(+page - 1) * 6} total={5} />
            )}
        </>
    );
};
