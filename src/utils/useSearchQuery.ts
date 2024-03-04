import { usePathname, useRouter, useSearchParams} from 'next/navigation';

export const useSearchQuery = () => {
    const router = useRouter()
    const path = usePathname();
    const searchParams = useSearchParams();

    const searchQuery = new URLSearchParams(Array.from(searchParams.entries()));

    const setSearchParams = (name: string, value: string) => {
        searchQuery.set(name, value);
        router.push(`${path}?${searchQuery}`)
    };

    const getSearchParams = (name: string) => {
        return searchQuery.get(name)
    }


    const has = (name: string) => {
        return searchQuery.has(name)
    }

    const deleteSearchParams = (name: string) => {
        searchQuery.delete(name);
        router.push(`${path}?${searchQuery}`)
    }

    return {getSearchParams, setSearchParams, deleteSearchParams, has};
};
