import { login, register } from '../utils/carbnb';

const initialState = {
  token: null,
  user: {
    role: null,
    id: null,
  },
  isResolving: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isResolving: true,
      };
    case 'LOGIN_RESPONSE':
      return {
        ...state,
        token: action.token,
        user: {
          ...state.user,
          role: action.role,
          fullname: action.fullname,
          email: action.email,
          id: action.id,
        },
        isResolving: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isResolving: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: {
          ...state.user,
          id: null,
          role: null,
        },
      };
    default:
      return state;
  }
};

export const actions = {
  loginRequest: () => ({
    type: 'LOGIN_REQUEST',
  }),
  loginResponse: ({
    token,
    role,
    fullname,
    email,
    id,
  }) => ({
    type: 'LOGIN_RESPONSE',
    token,
    role,
    fullname,
    email,
    id,
  }),
  loginError: error => ({
    type: 'LOGIN_ERROR',
    error,
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
  login: ({ email, password }) => (dispatch) => {
    dispatch(actions.loginRequest());
    return login(email, password)
      .then(user => dispatch(actions.loginResponse(user)))
      .catch((error) => {
        dispatch(actions.loginError(error));
        throw error;
      });
  },
  register: ({ email, password, fullname }) => dispatch => (
    register(email, password, fullname)
      .then(() => dispatch(actions.login({ email, password })))
  ),
};
