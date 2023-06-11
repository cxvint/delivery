import { useState } from 'react';

export const useRegister = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = userData;

	const handleRegister = () => {
		if (!name || !email || !password) {
			alert('Please fill in all required fields');
			return;
		}

		localStorage.setItem('email', email);
		localStorage.setItem('name', name);
		localStorage.setItem('password', password);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	return { name, email, password, handleChange, handleRegister };
};
