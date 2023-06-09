import { useSelector } from 'react-redux';
import { selectFavoriteItems } from '../../store/auth/userSlice';
import { FavoriteItem } from './FavoriteItem/FavoriteItem';
import { Container } from '../Container/Container';
import style from './Favorites.module.css';

export const Favorites = () => {
	const favoriteItems = useSelector(selectFavoriteItems);

	return (
		<section className={style.favorites}>
			<Container className={style.container}>
				<h2 className={style.title}>Избранное</h2>

				<div className={style.wrap_list}>
					{favoriteItems.length ? (
						<ul className={style.list}>
							{favoriteItems.map((item) => (
								<li key={item.id} className={style.item}>
									<FavoriteItem item={item} />
								</li>
							))}
						</ul>
					) : (
						<p className={style.empty}>Ваше избранное пусто</p>
					)}
				</div>
			</Container>
		</section>
	);
};
