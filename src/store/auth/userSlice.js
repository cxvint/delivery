import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
		user: null,
		favorites: [],
	},
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem('isLoggedIn', 'true');
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
			state.favorites = [];
			localStorage.removeItem('isLoggedIn');
		},
		register: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem('isLoggedIn', 'true');
		},
		addToFavorites: (state, action) => {
			const { id } = action.payload;
			if (!state.favorites.includes(id)) {
				state.favorites.push(id);
			}
		},
		removeFromFavorites: (state, action) => {
			const { id } = action.payload;
			state.favorites = state.favorites.filter(
				(favoriteId) => favoriteId !== id
			);
		},
	},
});

export const { login, logout, register, addToFavorites, removeFromFavorites } =
	userSlice.actions;

export const selectFavoriteItems = (state) => state.user.favorites;

export default userSlice.reducer;
