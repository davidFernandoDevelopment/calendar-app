import { calendarApi } from '../api';
import { Credentials, User } from '../auth';
import { useAppDispatch, useAppSelector } from './useRedux';
import {
	onLogin,
	onLogout,
	onChecking,
	onResetCalendar,
	clearMessageError,
} from '../store';

export const useAuthStore = () => {
	const { user, status, errorMessage } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const startLogin = async (credentials: Credentials) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarApi.post('auth', credentials);
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', `${new Date().getTime()}`);
			dispatch(
				onLogin({
					name: data.name,
					email: credentials.email,
					uid: data.uid,
				})
			);
		} catch (err) {
			localStorage.clear();
			dispatch(onLogout('Credentiaciales incorrectas'));
			setTimeout(() => {
				dispatch(clearMessageError());
			}, 10);
		}
	};

	const startRegister = async (user: Partial<User>) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarApi.post('auth/register', user);
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', `${new Date().getTime()}`);
			dispatch(
				onLogin({
					uid: data.uid,
					name: data.name,
					email: user.email,
				})
			);
		} catch (err: any) {
			localStorage.clear();
			dispatch(onLogout(err.response.data.msg));
			setTimeout(() => {
				dispatch(clearMessageError());
			}, 10);
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch(onLogout());
		dispatch(onResetCalendar());
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) dispatch(onLogout());

		try {
			const { data } = await calendarApi.get('auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', `${new Date().getTime()}`);
			dispatch(
				onLogin({
					uid: data.uid,
					name: data.name,
				})
			);
		} catch (err: any) {
			console.log(err);
			localStorage.clear();
			dispatch(onLogout());
		}
	};

	return {
		//* Propiedades
		user,
		status,
		errorMessage,

		//* Metodos
		startLogin,
		startLogout,
		startRegister,
		checkAuthToken,
	};
};
