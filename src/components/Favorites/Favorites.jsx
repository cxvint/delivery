import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeFavorite,
	selectFavorites,
} from '../../store/favorites/favoritesSlice';
import { addProduct } from '../../store/order/orderSlice';
import { API_URI } from '../../const';
import style from './Favorites.module.css';
import { useNavigate } from 'react-router-dom';

export const Favorites = () => {
	const dispatch = useDispatch();
	const favorites = useSelector(selectFavorites);
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		dispatch({ type: 'favorites/loadFavoritesFromLocalStorage' });
	}, [dispatch]);

	const handleRemoveFavorite = (productId) => {
		dispatch(removeFavorite(productId));
	};

	const handleAddToOrder = (product) => {
		dispatch(addProduct(product));
		setSuccessMessage('Товар успешно добавлен в корзину');
		setTimeout(() => {
			setSuccessMessage('');
		}, 2000);
	};

	if (favorites.length === 0) {
		setTimeout(() => {
			navigate('/');
		}, 3000);
	}

	return (
		<div>
			<h2>Избранное</h2>
			{successMessage && <p>{successMessage}</p>}
			{favorites.length > 0 ? (
				<>
					{favorites.map((product) => (
						<div key={product.id} className={style.product}>
							<img
								src={`${API_URI}/${product.image}`}
								alt={product.title}
								className={style.image}
							/>
							<p className={style.title}>{product.title}</p>
							<button
								className={style.removeButton}
								onClick={() => handleRemoveFavorite(product.id)}>
								Удалить из избранного
							</button>
							<button
								className={style.addToCartButton}
								onClick={() => handleAddToOrder(product)}>
								Добавить в корзину
							</button>
						</div>
					))}
					<button className={style.backButton} onClick={() => navigate('/')}>
						Назад
					</button>
				</>
			) : (
				<p>Избранное пусто. Переход на главную страницу через 3 секунды...</p>
			)}
		</div>
	);
};
