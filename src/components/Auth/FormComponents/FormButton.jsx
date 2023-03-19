import React from 'react';

export const FormButton = ({ label, type, onClick }) => {
	return (
		<button type={type} onClick={onClick} className='btn btn-primary'>
			{label}
		</button>
	);
};

export default FormButton;
