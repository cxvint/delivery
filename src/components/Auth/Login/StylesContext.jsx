import React, { createContext } from 'react';
import styles from './Login.module.css';

export const StylesContext = createContext(styles);

export const StylesProvider = ({ children }) => {
	return (
		<StylesContext.Provider value={styles}>{children}</StylesContext.Provider>
	);
};
