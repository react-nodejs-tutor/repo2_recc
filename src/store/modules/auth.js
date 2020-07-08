import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const RESET_FORM = 'auth/RESET_FORM';

const REGISTER_LOADING = 'auth/REGISTER_LOADING';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

// type은 register form을 바꿀지, login form을 바꿀지
// key는 각 form 안에서 어떤 input을 바꿀지
// value는 그 input에 들어갈 값
export const changeInput = createAction(CHANGE_INPUT, ({ type, key, value }) => ({
	type,
	key,
	value,
}));
export const resetForm = createAction(RESET_FORM, (form) => form);

const registerLoading = createAction(REGISTER_LOADING, (bool) => bool);
const registerSuccess = createAction(REGISTER_SUCCESS, (data) => data);
const registerFailure = createAction(REGISTER_FAILURE, (err) => err);

// 백엔드개발자가 알려줌: post요청하세요, body로는 username, password넣어서 호출하세요.

export const registerThunk = ({ username, password }) => async (dispatch) => {
	dispatch(registerLoading(true));

	try {
		const { data } = await axios.post('/api.v1.0/auth/register', { username, password });
		console.log(data);

		dispatch(registerSuccess(data));
	} catch (e) {
		dispatch(registerFailure(e));
	}

	dispatch(registerLoading(false));
};

const initialState = {
	login: {
		username: '',
		password: '',
	},
	register: {
		username: '',
		password: '',
		passwordConfirm: '',
	},
	loading: false,
	data: null,
	error: null,
};

export default handleActions(
	{
		[CHANGE_INPUT]: (state, action) => ({
			...state,
			[action.payload.type]: {
				...state[action.payload.type],
				[action.payload.key]: action.payload.value,
			},
		}),
		[RESET_FORM]: (state, action) => ({
			...state,
			[action.payload]: initialState[action.payload],
		}),
		[REGISTER_LOADING]: (state, action) => ({
			...state,
			loading: action.payload,
			error: null,
		}),
		[REGISTER_SUCCESS]: (state, action) => ({
			...state,
			loading: false,
			data: action.payload,
			error: null,
		}),
		[REGISTER_FAILURE]: (state, action) => ({
			...state,
			loading: false,
			error: action.payload,
		}),
	},
	initialState
);
