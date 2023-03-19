import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/auth/userSlice';
import { FormInput } from '../FormComponents/FormInput';
import { FormButton } from '../FormComponents/FormButton';
import { useNavigate } from 'react-router-dom';
import style from '../Login/Login.module.css';

export const Login = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = userData;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			alert('Please fill in all required fields');
			return;
		}

		const storedEmail = localStorage.getItem('email');
		const storedName = localStorage.getItem('name');
		const storedPassword = localStorage.getItem('password');

		if (email !== storedEmail || password !== storedPassword) {
			alert('Invalid email or password');
			return;
		}

		const resultAction = await dispatch(
			login({ email, password, name: storedName })
		);
		const result = resultAction.payload;

		if (result) {
			navigate('/');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	return (
		<div className={style['auth-container']}>
			<h2>Log In</h2>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					required
				/>
				<FormInput
					label='Password'
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					required
				/>
				<FormButton label='Log In' type='submit' />
			</form>
		</div>
	);
};
