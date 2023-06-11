import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import productReducer from './product/productSlice';
import { productApi } from './product/productApi';
import orderReducer from './order/orderSlice';
import favoritesReducer from './favorites/favoritesSlice';
import modalReducer from './modalDelivery/modalDeliverySlice';
import formReducer from './form/formSlice';
import userReducer from './auth/userSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		product: productReducer,
		order: orderReducer,
		favorites: favoritesReducer,
		modal: modalReducer,
		form: formReducer,
		user: userReducer,
		[productApi.reducerPath]: productApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(localStorageMiddleware)
			.concat(productApi.middleware),
});
