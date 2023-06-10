import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URI } from '../../const';
import {
	categoryRequestAsync,
	changeCategory,
} from '../../store/category/categorySlice';

import { Container } from '../Container/Container';
import style from './Navigation.module.css';

export const Navigation = () => {
	const { category, activeCategory } = useSelector((state) => state.category);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(categoryRequestAsync());
	}, []);

	console.log('category:', category);
	console.log('activeCategory:', activeCategory);

	return (
		<nav className={style.navigation}>
			<Container className={style.container}>
				<ul className={style.list}>
					{category.map((item, index) => (
						<li key={index} className={style.item}>
							<button
								className={classNames({
									[style.button]: true,
									[style.button_active]: activeCategory === index,
								})}
								style={{ backgroundImage: `url(${API_URI}/${item.image})` }}
								onClick={() => {
									dispatch(changeCategory({ indexCategory: index }));
								}}>
								{item.rus}
							</button>
						</li>
					))}
				</ul>
			</Container>
		</nav>
	);
};
