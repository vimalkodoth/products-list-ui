import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TProducts = object[];

export const productsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        getProducts: builder.query<{ products: TProducts }, void>({
            query: () => '/products',
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;
