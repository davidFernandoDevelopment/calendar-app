import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../auth';

export type Status = 'authenticated' | 'not-authneticated' | 'checking';
interface AuthState {
	status: Status;
	user: User;
	errorMessage?: string;
}

const initialState: AuthState = {
	status: 'checking',
	user: {},
	errorMessage: undefined,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onChecking: (state: AuthState) => {
			state.status = 'checking';
			state.user = {};
			state.errorMessage = undefined;
		},
		onLogin: (state: AuthState, action: PayloadAction<User>) => {
			state.status = 'authenticated';
			state.user = action.payload;
			state.errorMessage = undefined;
		},
	},
});

export const { onChecking, onLogin } = authSlice.actions;

export default authSlice.reducer;
