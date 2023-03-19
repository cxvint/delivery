import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/auth/userSlice';
import { FormInput } from './FormComponents/FormInput';
import { FormButton } from './FormComponents/FormButton';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.css';

export const Register = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = userData;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			alert('Please fill in all required fields');
			return;
		}

		localStorage.setItem('email', email);
		localStorage.setItem('name', name);
		localStorage.setItem('password', password);
		const resultAction = await dispatch(register(userData));
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
			<h2>Create an account</h2>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Name'
					type='text'
					name='name'
					value={name}
					onChange={handleChange}
					required
				/>
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
				<FormButton label='Create Account' type='submit' />
			</form>
		</div>
	);
};
