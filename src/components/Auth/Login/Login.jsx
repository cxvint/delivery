import React from 'react';
import useLogin from './useLogin';
import styles from './Login.module.css';
import FormInput from '../FormComponents/FormInput';
import { StylesContext } from './StylesContext';

export const Login = () => {
	const { email, password, handleSubmit, handleChange } = useLogin();

	return (
		<StylesContext.Provider value={styles}>
			<div className={styles['auth-container']}>
				<h2>Log In</h2>
				<form onSubmit={handleSubmit}>
					<FormInput
						label='Email'
						type='email'
						name='email'
						value={email}
						onChange={handleChange}
					/>
					<FormInput
						label='Password'
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
					<button type='submit'>Log In</button>
				</form>
			</div>
		</StylesContext.Provider>
	);
};

export default Login;
