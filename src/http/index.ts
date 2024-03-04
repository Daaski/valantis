import axios from 'axios';
import MD5 from 'crypto-js/md5';

const currentFormattedDate = new Date()
    .toISOString()
    .slice(0, 10)
    .split('-')
    .join('');

export const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'X-Auth': MD5(`Valantis_${currentFormattedDate}`).toString(),
    },
});
