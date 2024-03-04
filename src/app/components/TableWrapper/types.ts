import { ReactNode } from 'react';
import {Item} from "http/postService/types";
import {SearchParamsType} from "app/page";

export interface TableWrapperProps {
    children: ReactNode;
    searchParams: SearchParamsType
}
