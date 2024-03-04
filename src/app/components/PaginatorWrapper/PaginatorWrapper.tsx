'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchQuery } from 'utils/useSearchQuery';

import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

import { PaginatorProps } from 'app/components/PaginatorWrapper/types';

export const PaginatorWrapper: React.FC<PaginatorProps> = ({
    total,
    current,
}) => {
    const router = useRouter();
    const { setSearchParams, getSearchParams } = useSearchQuery();

    const [first, setFirst] = useState(current);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setSearchParams('page', (event.page + 1).toString());
    };

    useEffect(() => {
        const page = getSearchParams('page')
        if (page) {
            setFirst((+page - 1) * 50)
        }
    }, []);


    useEffect(() => {
        for (let i = 1; i <= 5; i++) {
            router.prefetch('?page=' + i);
        }
    }, [router]);

    return (
        <Paginator
            style={{ display: 'flex', justifyContent: 'center' }}
            first={first}
            rows={50}
            totalRecords={total * 50}
            onPageChange={onPageChange}
        />
    );
};
