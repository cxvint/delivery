import React, { useContext } from 'react';
import { StylesContext } from '../Login/StylesContext';

export const FormInput = ({ label, type, name, value, onChange }) => {
	const styles = useContext(StylesContext);

	return (
		<div className={`${styles['form-group']} ${styles['form-input']}`}>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className={styles['form-control']}
			/>
		</div>
	);
};

export default FormInput;
