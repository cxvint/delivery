export const localStorageMiddleware = (store) => (next) => (action) => {
	const nextAction = next(action);

	if (
		nextAction &&
		typeof nextAction.type === 'string' &&
		nextAction.type.startsWith('user/')
	) {
		const isLoggedIn = store.getState().user.isLoggedIn;
		localStorage.setItem('isLoggedIn', isLoggedIn);
	}

	if (action.type === 'favorites/loadFavoritesFromLocalStorage') {
		const storedFavorites = localStorage.getItem('favorites');
		if (storedFavorites) {
			const favorites = JSON.parse(storedFavorites);
			store.dispatch({ type: 'favorites/setFavorites', payload: favorites });
		}
	}

	if (
		action.type === 'favorites/addFavorite' ||
		action.type === 'favorites/removeFavorite' ||
		action.type === 'favorites/clearFavorites'
	) {
		const favorites = store.getState().favorites.favorites;
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}

	if (
		nextAction &&
		typeof nextAction.type === 'string' &&
		nextAction.type.startsWith('order/')
	) {
		const { orderList, orderHistory } = store.getState().order;
		localStorage.setItem('order', JSON.stringify(orderList));
		localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
	}

	return nextAction;
};
