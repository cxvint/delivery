import React, { useState } from 'react';
import { ProductDetails } from '../ProductDetails/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/order/orderSlice';
import {
	addFavorite,
	removeFavorite,
} from '../../store/favorites/favoriteSlice';
import { API_URI } from '../../const';
import style from './CatalogProduct.module.css';

export const CatalogProduct = ({ item }) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorite.favorites);
	const { isLoggedIn } = useSelector((state) => state.user);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleAddToOrder = () => {
		dispatch(addProduct(item));
	};

	const handleToggleFavorite = () => {
		if (favorites.some((favorite) => favorite.id === item.id)) {
			dispatch(removeFavorite(item.id));
		} else {
			dispatch(addFavorite(item));
		}
	};

	const handleOpenDetails = () => {
		setIsDetailsOpen(true);
	};

	const handleCloseDetails = () => {
		setIsDetailsOpen(false);
	};

	return (
		<article className={style.product}>
			<img
				src={`${API_URI}/${item.image}`}
				alt={item.title}
				className={style.image}
			/>

			<p className={style.price}>
				{item.price}
				<span className='currency'>&nbsp;₽</span>
			</p>

			<p className={style.weight}>{item.weight}г</p>

			<button className={style.add} onClick={handleOpenDetails}>
				Открыть
			</button>

			<button className={style.add} type='button' onClick={handleAddToOrder}>
				Добавить
			</button>

			{isLoggedIn && (
				<button
					className={style.add}
					type='button'
					onClick={handleToggleFavorite}>
					{favorites.some((favorite) => favorite.id === item.id)
						? 'Удалить из избранного'
						: 'Добавить в избранное'}
				</button>
			)}

			{isDetailsOpen && (
				<div className={style.productDetailsOverlay}>
					<ProductDetails item={item} onClose={handleCloseDetails} />
					<button className={style.closeDetails} onClick={handleCloseDetails}>
						Закрыть
					</button>
				</div>
			)}
		</article>
	);
};
