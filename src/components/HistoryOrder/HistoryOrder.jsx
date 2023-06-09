import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modalDelivery/modalDeliverySlice';
import { useNavigate } from 'react-router-dom';
import style from './HistoryOrder.module.css';

export const HistoryOrder = () => {
	const orderHistory = useSelector((state) => state.order.orderHistory);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleRepeatOrder = () => {
		dispatch(openModal());
	};

	useEffect(() => {
		if (orderHistory.length === 0) {
			const timeout = setTimeout(() => {
				navigate('/');
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [navigate, orderHistory]);

	return (
		<div className={style.container}>
			<h2 className={style.title}>История заказов</h2>
			<button onClick={handleGoBack}>Назад</button>
			{orderHistory.map((order, index) => (
				<li key={index} className={style.order}>
					<p className={style.name}>Имя: {order.name}</p>
					<p className={style.phone}>Телефон: {order.phone}</p>
					<ul className={style.order}>
						<li>
							<p>
								Сумма заказа:{' '}
								{order.orderList.reduce((total, item) => total + item.price, 0)}
							</p>
							<p>Что заказывали:</p>
							<ul>
								{order.orderList.map((item) => (
									<li key={item.id}>{item.title}</li>
								))}
							</ul>
						</li>
					</ul>
					<button
						className={`${style.button} ${style.repeat - order}`}
						onClick={handleRepeatOrder}>
						Повторить заказ
					</button>
				</li>
			))}
		</div>
	);
};
