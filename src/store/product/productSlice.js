import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URI, POSTFIX } from '../../const';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${API_URI}${POSTFIX}` }),
	endpoints: (builder) => ({
		fetchProducts: builder.query({
			query: (category) => `?category=${category}`,
		}),
	}),
});

export const { useFetchProductsQuery } = productApi;

const productAdapter = createEntityAdapter();

export const fetchProducts = createAsyncThunk(
	'product/fetch',
	async (category) => {
		const response = await productApi.endpoints.fetchProducts(category);
		return response.data;
	}
);

const productSlice = createSlice({
	name: 'product',
	initialState: productAdapter.getInitialState({
		isLoading: false,
		isError: false,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.isLoading = false;
			productAdapter.setAll(state, action.payload);
		});
		builder.addCase(fetchProducts.rejected, (state) => {
			state.isLoading = false;
			state.isError = true;
		});
	},
});

export const { selectAll: selectAllProducts } = productAdapter.getSelectors(
	(state) => state.product
);

export default productSlice.reducer;
