import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URI, POSTFIX } from '../../const';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URI}${POSTFIX}` }),
	endpoints: (builder) => ({
		fetchProducts: builder.query({
			query: (category) => `?category=${category}`,
			transformResponse: (response) => {
				return response;
			},
		}),
	}),
});

export const { useFetchProductsQuery } = productApi;
