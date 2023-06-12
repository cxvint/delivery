import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/order/orderSlice';
import {
	addFavorite,
	removeFavorite,
} from '../../store/favorites/favoritesSlice';
import { useFetchProductByIdQuery } from '../../store/product/productApi';
import { API_URI } from '../../const';
import style from './ProductDetails.module.css';

export const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);
	const { isLoggedIn } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const { data: product, isLoading, isError } = useFetchProductByIdQuery(id);

	const handleAddToOrder = () => {
		dispatch(addProduct(product));
	};

	const handleToggleFavorite = () => {
		if (favorites.some((favorite) => favorite.id === product.id)) {
			dispatch(removeFavorite(product.id));
		} else {
			dispatch(addFavorite(product));
		}
	};

	const handleClose = () => {
		navigate('/');
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error: Unable to fetch product.</p>;
	}

	return (
		<div className={style.productDetailsOverlay}>
			<div className={style.productDetails}>
				<img
					src={`${API_URI}/${product.image}`}
					alt={product.title}
					className={style.image}
				/>

				<p className={style.price}>
					{product.price}
					<span className='currency'>&nbsp;₽</span>
				</p>

				<h3 className={style.title}>
					<button className={style.detail}>{product.title}</button>
				</h3>

				<p className={style.detail}>{product.description}</p>

				<p className={style.weight}>{product.weight}г</p>

				<button className={style.add} type='button' onClick={handleAddToOrder}>
					Добавить
				</button>

				{isLoggedIn && (
					<button
						className={style.add}
						type='button'
						onClick={handleToggleFavorite}>
						{favorites.some((favorite) => favorite.id === product.id)
							? 'Удалить из избранного'
							: 'Добавить в избранное'}
					</button>
				)}

				<button className={style.closeDetails} onClick={handleClose}>
					Закрыть
				</button>
			</div>
		</div>
	);
};
