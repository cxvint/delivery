import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import productReducer from './product/productSlice';
import orderReducer, { localStorageMiddleware } from './order/orderSlice';
import modalReducer from './modalDelivery/modalDeliverySlice';
import formReducer from './form/formSlice';
import userReducer from './auth/userSlice';
import favoritesReducer from './favorites/favoritesSlice';

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		product: productReducer,
		order: orderReducer,
		modal: modalReducer,
		form: formReducer,
		user: userReducer,
		favorites: favoritesReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(localStorageMiddleware),
});
