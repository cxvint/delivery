// favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	favorites: [],
};

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			const existingProduct = state.favorites.find(
				(product) => product.id === action.payload.id
			);

			if (!existingProduct) {
				state.favorites.push(action.payload);
			} else {
				state.favorites = state.favorites.filter(
					(product) => product.id !== action.payload.id
				);
			}
		},
		removeFavorite: (state, action) => {
			state.favorites = state.favorites.filter(
				(product) => product.id !== action.payload
			);
		},
		clearFavorites: (state) => {
			state.favorites = [];
		},
	},
});

export const { addFavorite, removeFavorite, clearFavorites } =
	favoriteSlice.actions;
export const selectFavorites = (state) => state.favorite.favorites;
export default favoriteSlice.reducer;
