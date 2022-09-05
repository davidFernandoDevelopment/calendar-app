import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../auth';

export type Status = 'authenticated' | 'not-authenticated' | 'checking';
interface AuthState {
	status: Status;
	user: Partial<User> | null;
	errorMessage: string | null;
}

const initialState: AuthState = {
	status: 'checking',
	user: null,
	errorMessage: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onChecking: (state: AuthState) => {
			state.status = 'checking';
			state.user = null;
			state.errorMessage = null;
		},
		onLogin: (state: AuthState, action: PayloadAction<Partial<User>>) => {
			state.status = 'authenticated';
			state.user = action.payload;
			state.errorMessage = null;
		},
		onLogout: (state: AuthState, action: PayloadAction<string | undefined>) => {
			state.status = 'not-authenticated';
			state.user = null;
			if (action.payload) state.errorMessage = action.payload;
		},
		clearMessageError: (state: AuthState) => {
			state.errorMessage = null;
		},
	},
});

export const { onChecking, onLogin, onLogout, clearMessageError } =
	authSlice.actions;

export default authSlice.reducer;
