import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/auth/userSlice';
import { FormInput } from './FormComponents/FormInput';
import { FormButton } from './FormComponents/FormButton';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.css';
import { useRegister } from './useRegister';

export const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { name, email, password, handleChange, handleRegister } = useRegister();

	const handleSubmit = async (e) => {
		e.preventDefault();

		handleRegister();

		const resultAction = await dispatch(register({ name, email, password }));
		const result = resultAction.payload;

		if (result) {
			navigate('/');
		}
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
