import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/order/orderSlice';
import {
	addFavorite,
	removeFavorite,
} from '../../store/favorites/favoritesSlice';
import { API_URI } from '../../const';
import style from './ProductDetails.module.css';

export const ProductDetails = ({ item, onClose }) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);
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
		<div className={style.productDetailsOverlay}>
			<div className={style.productDetails}>
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

				<p className={style.detail}>{item.description}</p>

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

				<button className={style.closeDetails} onClick={onClose}>
					Закрыть
				</button>
			</div>
		</div>
	);
};
