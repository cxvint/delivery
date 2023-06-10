import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Header } from './components/Header/Header';
import { ModalDelivery } from './components/ModalDelivery/ModalDelivery';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/Register';
import { Favorites } from './components/Favorites/Favorites';
import { store } from './store';
import { ThemeProvider } from './components/Header/ThemeContext';
import { HistoryOrder } from './components/HistoryOrder/HistoryOrder';

const LazyNavigation = lazy(() => import('./components/Navigation/Navigation'));
const LazyCatalog = lazy(() => import('./components/Catalog/Catalog'));

export const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider>
					<Header />
					<main>
						<Routes>
							<Route
								path='/'
								element={
									<Suspense fallback={<div>Loading...</div>}>
										<LazyNavigation />
										<LazyCatalog />
									</Suspense>
								}
							/>
							<Route path='/signin' element={<Login />} />
							<Route path='/signup' element={<Register />} />
							<Route path='/favorites' element={<Favorites />} />
							<Route path='/history' element={<HistoryOrder />} />
						</Routes>
					</main>
					<footer></footer>
					<ModalDelivery />
				</ThemeProvider>
			</Router>
		</Provider>
	);
};
