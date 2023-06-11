// authService.js
const saveAuthData = (isLoggedIn, user) => {
	if (isLoggedIn) {
		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem('user', JSON.stringify(user));
	} else {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('user');
	}
};

const loadAuthData = () => {
	const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
	const storedUser = localStorage.getItem('user');

	if (storedIsLoggedIn === 'true' && storedUser) {
		const parsedUser = JSON.parse(storedUser);
		return { isLoggedIn: true, user: parsedUser };
	}

	return { isLoggedIn: false, user: null };
};

export { saveAuthData, loadAuthData };
