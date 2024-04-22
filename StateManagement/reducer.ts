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

interface IExercise {
    name: string;
    muscleGroup: string[];
    sets: number;
    reps: number[];
    weight: number[];
    difficulty: number;
}

interface IWorkout {
    name: string;
    time: Date;
    difficulty: number;
    favorite: boolean;
    color: string;
    timesCompleted: number;
    date: Date;
    exercises: IExercise[];
}

interface UserData{
	_id: number;
    username: string;
    email: string;
    password: string;
    birthday: Date;
    gender: string;
    heightInches: number;
    weight: number;
    goal: string;
    workouts: IWorkout[];
}

interface UpdateSignUpDataAction {
	type: 'UPDATE_SIGN_UP_DATA',
	payload: Partial<SignUpData>;
}

interface SetUserDataAction {
	type: 'SET_USER_DATA',
	payload: Partial<UserData>;
}

interface ResetSignUpDataAction {
	type: 'RESET_SIGN_UP_DATA';
}

type Actions = UpdateSignUpDataAction | ResetSignUpDataAction | SetUserDataAction;

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

const userDataInitialState: UserData | null = null;

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

const userReducer = (state = userDataInitialState, action: Actions): UserData | null => {
	switch (action.type)
	{
		case 'SET_USER_DATA':
			return {...state, ...action.payload };
		case 'UPDATE_USER_DATA':
			if (!state) return state;
			return { ...state, ...action.payload };
		default:
			return state || null;	
	}
}

export const rootReducer = combineReducers({
	signUpData: signUpReducer,
	userData: userReducer,
});

export default rootReducer;