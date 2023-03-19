import React from 'react';

export const FormInput = ({ label, type, name, value, onChange }) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className='form-control'
			/>
		</div>
	);
};

export default FormInput;
