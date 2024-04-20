import { SignUpState } from './store';

export const updateSignUpData = (data: Partial<SignUpState>) => ({
	type: 'UPDATE_SIGN_UP_DATA',
	payload: data,
});

export const resetSignUpData = () => ({
	type: 'RESET_SIGN_UP_DATA',
});
