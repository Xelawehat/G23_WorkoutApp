import { combineReducers } from 'redux';
import { SignUpState } from './store';

interface SignUpData {
	email: string;
	username: string;
	password: string;
	birthday: Date;
	heightInches: number;
	weight: number;
	gender: string;
	goal: string;
}

interface UpdateSignUpDataAction {
	type: 'UPDATE_SIGN_UP_DATA',
	payload: Partial<SignUpData>;
}

type Actions = UpdateSignUpDataAction | ResetSignUpDataAction;

const initialState: SignUpData = {
	email: '',
	username: '',
	password: '',
	birthday: new Date(),
	heightInches: 0,
	weight: 0,
	gender: '',
	goal: '',
};

const signUpReducer = (state = initialState,  action: Actions): SignUpData => {
	switch (action.type)
	{
		case 'UPDATE_SIGN_UP_DATA':
			return { ...state, ...action.payload };
		case 'RESET_SIGN_UP_DATA':
			return {
				email: '',
				username: '',
				password: '',
				birthday: new Date(),
				heightInches: 0,
				weight: 0,
				gender: '',
				goal: '',
			};
		default:
			return state;
	}
};

export const rootReducer = combineReducers({
	signUpData: signUpReducer,
});

export default rootReducer;