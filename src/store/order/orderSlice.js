import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URI, POSTFIX } from '../../const';
import { calcTotal } from '../../utils/calcTotal';

const initialState = {
	orderList: JSON.parse(localStorage.getItem('order') || '[]'),
	orderGoods: [],
	favoritesList: JSON.parse(localStorage.getItem('favorites') || '[]'),
	totalPrice: 0,
	totalCount: 0,
	error: [],
};

export const localStorageMiddleware = (store) => (next) => (action) => {
	const nextAction = next(action);

	if (nextAction.type.startsWith('order/')) {
		const orderList = store.getState().order.orderList;
		localStorage.setItem('order', JSON.stringify(orderList));
	}

	if (nextAction.type.startsWith('order/')) {
		const favoritesList = store.getState().order.favoritesList;
		localStorage.setItem('favorites', JSON.stringify(favoritesList));
	}

	return nextAction;
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
			} else {
				state.orderList.push({ ...action.payload, count: 1 });
			}

			[state.totalCount, state.totalPrice] = calcTotal(state.orderList);
		},
		removeProduct: (state, action) => {
			const productOrderList = state.orderList.find(
				(item) => item.id === action.payload.id
			);

			if (productOrderList.count > 1) {
				productOrderList.count -= 1;
			} else {
				state.orderList = state.orderList.filter(
					(item) => item.id !== action.payload.id
				);
			}

			[state.totalCount, state.totalPrice] = calcTotal(state.orderList);
		},
		addToFavorites: (state, action) => {
			const productFavoritesList = state.favoritesList.find(
				(item) => item.id === action.payload.id
			);

			if (!productFavoritesList) {
				state.favoritesList.push(action.payload);
			}
		},
		removeFromFavorites: (state, action) => {
			state.favoritesList = state.favoritesList.filter(
				(item) => item.id !== action.payload.id
			);
		},
		clearOrder: (state) => {
			state.orderList = [];
			state.orderGoods = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(orderRequestAsync.pending, (state) => {
				state.error = [];
			})
			.addCase(orderRequestAsync.fulfilled, (state, action) => {
				const orderGoods = state.orderList.map((item) => {
					const product = action.payload.find(
						(product) => product.id === item.id
					);

					product.count = item.count;

					return product;
				});

				state.error = [];
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
	addToFavorites,
	removeFromFavorites,
	clearOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
