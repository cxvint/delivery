import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/product/productSlice';
import { useFetchProductsQuery } from '../../store/product/productApi';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';
import { Container } from '../Container/Container';
import { Order } from '../Order/Order';
import style from './Catalog.module.css';

export const Catalog = () => {
	const dispatch = useDispatch();
	const { category, activeCategory } = useSelector((state) => state.category);

	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (category.length) {
			dispatch(fetchProducts(category[activeCategory].title));
		}
	}, [category, activeCategory, dispatch]);

	const { data: products = [], isLoading, isError } = useFetchProductsQuery('');
	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredProducts = products.filter((item) => {
		if (searchTerm.trim() === '') {
			return item.category === category[activeCategory].title;
		} else {
			return item.title.toLowerCase().includes(searchTerm.toLowerCase());
		}
	});

	return (
		<section className={style.catalog}>
			<Container className={style.container}>
				<Order />

				<div className={style.wrapper}>
					<h2 className={style.title}>{category[activeCategory]?.rus}</h2>

					<input
						type='text'
						placeholder='Поиск по названию продукта'
						value={searchTerm}
						onChange={handleSearch}
					/>

					<div className={style.wrap_list}>
						{isLoading ? (
							<p>Loading...</p>
						) : isError ? (
							<p>Error: Unable to fetch products.</p>
						) : filteredProducts.length ? (
							<ul className={style.list}>
								{filteredProducts.map((item) => (
									<li key={item.id} className={style.item}>
										<CatalogProduct item={item} />
									</li>
								))}
							</ul>
						) : (
							<p className={style.empty}>
								К сожалению товаров данной категории нет
							</p>
						)}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Catalog;
