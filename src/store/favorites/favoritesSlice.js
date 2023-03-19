import { createSlice } from '@reduxjs/toolkit';

import { addToFavorites, removeFromFavorites } from '../auth/userSlice';

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: [],
	reducers: {
		addFavorite: (state, action) => {
			const { id } = action.payload;
			if (!state.includes(id)) {
				state.push(id);
				addToFavorites({ id });
			}
		},
		removeFavorite: (state, action) => {
			const { id } = action.payload;
			const index = state.indexOf(id);
			if (index !== -1) {
				state.splice(index, 1);
				removeFromFavorites({ id });
			}
		},
	},
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
