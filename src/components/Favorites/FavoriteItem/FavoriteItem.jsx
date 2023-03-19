import { useDispatch } from 'react-redux';
import { API_URI } from '../../../const';
import { removeFromFavorites } from '../../../store/auth/userSlice';
import style from './FavoriteItem.module.css';

export const FavoriteItem = ({ item }) => {
	const dispatch = useDispatch();

	const handleRemoveFromFavorites = () => {
		dispatch(removeFromFavorites(item.id));
	};

	return (
		<article className={style.product}>
			<img
				src={`${API_URI}/${item.image}`}
				alt={item.title}
				className={style.image}
			/>

			<h3 className={style.title}>{item.title}</h3>

			<p className={style.weight}>{item.weight}г</p>

			<button
				className={style.remove}
				type='button'
				onClick={handleRemoveFromFavorites}>
				Удалить из избранного
			</button>
		</article>
	);
};
