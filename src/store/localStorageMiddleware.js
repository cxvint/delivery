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
