import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import productReducer, { productApi } from './product/productSlice';
import orderReducer, { localStorageMiddleware } from './order/orderSlice';
import favoriteReducer from './favorites/favoriteSlice';
import modalReducer from './modalDelivery/modalDeliverySlice';
import formReducer from './form/formSlice';
import userReducer from './auth/userSlice';

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		product: productReducer,
		order: orderReducer,
		favorite: favoriteReducer,
		modal: modalReducer,
		form: formReducer,
		user: userReducer,
		[productApi.reducerPath]: productApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			localStorageMiddleware,
			productApi.middleware
		),
});
