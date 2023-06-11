import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	favorites: [],
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		setFavorites: (state, action) => {
			state.favorites = action.payload;
		},
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
	favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.favorites;
export default favoritesSlice.reducer;
