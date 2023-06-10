import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import style from './Header.module.css';
import logo from '../../assets/img/logo.svg';
import { Container } from '../Container/Container';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Switch from 'react-switch';

export const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoggedIn, user } = useSelector((state) => state.user);
	const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			dispatch({ type: 'user/login', payload: JSON.parse(storedUser) });
		}
	}, [dispatch]);

	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	useEffect(() => {
		if (isLoggedIn) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
	}, [isLoggedIn, user]);

	return (
		<header className={`${style.header} ${isDarkMode ? style.darkMode : ''}`}>
			<Container>
				<div className={style.container}>
					<Link to='/'>
						<img className={style.logo} src={logo} alt='Логотип YourMeal' />
					</Link>

					<div className={style.wrapper}>
						<h1 className={style.title}>
							<span>Только самые</span>
							<span className={style.red}>сочные бургеры!</span>
						</h1>

						<p className={style.appeal}>Бесплатная доставка от 500 ₽</p>

						{isLoggedIn ? (
							<div className={style.authButtons}>
								{user && <p className={style.userInfo}>{user.name}</p>}
								<Link className={style.navLink} to='/favorites'>
									Избранное
								</Link>
								<Link className={style.navLink} to='/history'>
									История
								</Link>
								<button className={style.logoutBtn} onClick={handleLogout}>
									Выход
								</button>
							</div>
						) : (
							<div className={style.authButtons}>
								<Link className={style.navLink} to='/signin'>
									Вход
								</Link>
								<Link className={style.navLink} to='/signup'>
									Регистрация
								</Link>
							</div>
						)}
					</div>
				</div>
			</Container>

			<Switch
				className={style.themeSwitch}
				onChange={toggleDarkMode}
				checked={isDarkMode}
				onColor='#282c34'
				offColor='#888'
				onHandleColor='#fff'
				offHandleColor='#fff'
				uncheckedIcon={false}
				checkedIcon={false}
				height={24}
				width={48}
			/>
		</header>
	);
};
