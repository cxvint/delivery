import React from 'react';
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

			<h3 className={style.title}>
				<button className={style.detail}>{item.title}</button>
			</h3>

			<p className={style.weight}>{item.weight}г</p>

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
		</article>
	);
};
