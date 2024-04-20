import { createStore } from 'redux';

interface AuthState {
	email: string;
	username: string;
	password: string;
}

const initialState: AuthState = {
	email: '',
	username: '',
	password: '',
};

// Handles state updates based on actions within code
const reducer = (state = initialState, action: any): AuthState => {
	switch (action.type)
	{
		case 'SET_EMAIL':
			return {...state, email: action.payload };
		case 'SET_USERNAME':
			return {...state, username: action.payload };
		case 'SET_PASSWORD':
			return {...state, password: action.payload };
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;