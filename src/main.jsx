import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import 'normalize.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Suspense fallback={<div>Loading...</div>}>
			<App />
			<ToastContainer />
		</Suspense>
	</React.StrictMode>
);
