import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URI, POSTFIX } from '../../const';
import { calcTotal } from '../../utils/calcTotal';

const initialState = {
	orderList: [],
	orderGoods: [],
	orderHistory: [],
	totalPrice: 0,
	totalCount: 0,
	error: [],
};

export const orderRequestAsync = createAsyncThunk(
	'order/fetch',
	(_, { getState }) => {
		const listId = getState().order.orderList.map((item) => item.id);
		return fetch(`${API_URI}${POSTFIX}?list=${listId}`)
			.then((req) => req.json())
			.catch((error) => ({ error }));
	}
);

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			const productOrderList = state.orderList.find(
				(item) => item.id === action.payload.id
			);

			if (productOrderList) {
				productOrderList.count += 1;

				const productOrderGoods = state.orderGoods.find(
					(item) => item.id === action.payload.id
				);

				productOrderGoods.count = productOrderList.count;
				[state.totalCount, state.totalPrice] = calcTotal(state.orderGoods);
			} else {
				state.orderList.push({ ...action.payload, count: 1 });
			}
		},
		removeProduct: (state, action) => {
			const productOrderList = state.orderList.find(
				(item) => item.id === action.payload.id
			);

			if (productOrderList.count > 1) {
				productOrderList.count -= 1;

				const productOrderGoods = state.orderGoods.find(
					(item) => item.id === action.payload.id
				);

				productOrderGoods.count = productOrderList.count;
				[state.totalCount, state.totalPrice] = calcTotal(state.orderGoods);
			} else {
				state.orderList = state.orderList.filter(
					(item) => item.id !== action.payload.id
				);
			}

			[state.totalCount, state.totalPrice] = calcTotal(state.orderList);
		},
		clearOrder: (state) => {
			state.orderList = [];
			state.orderGoods = [];
		},
		addToOrderHistory: (state, action) => {
			state.orderHistory.push(action.payload);
		},
		clearOrderHistory: (state) => {
			state.orderHistory = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(orderRequestAsync.pending, (state) => {
				state.error = '';
			})
			.addCase(orderRequestAsync.fulfilled, (state, action) => {
				const orderGoods = state.orderList.map((item) => {
					const product = action.payload.find(
						(product) => product.id === item.id
					);

					product.count = item.count;

					return product;
				});

				state.error = '';
				state.orderGoods = orderGoods;

				[state.totalCount, state.totalPrice] = calcTotal(orderGoods);
			})
			.addCase(orderRequestAsync.rejected, (state, action) => {
				state.error = action.payload.error;
			});
	},
});

export const {
	addProduct,
	removeProduct,
	clearOrder,
	addToOrderHistory,
	clearOrderHistory,
} = orderSlice.actions;
export default orderSlice.reducer;
