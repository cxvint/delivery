import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem('isLoggedIn', 'true');
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
			localStorage.removeItem('isLoggedIn');
		},
		register: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem('isLoggedIn', 'true');
		},
	},
});

export const { login, logout, register } = userSlice.actions;

export default userSlice.reducer;
