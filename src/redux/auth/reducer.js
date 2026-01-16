import { auth } from "./constant";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_LOADING:
      return { ...state, loading: true, error: null };
    case auth.LOGIN_SUCCESS:
      return { 
        user: action.payload.user, 
        token: action.payload.accessToken, 
        loading: false, 
        error: null 
      };
    case auth.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case auth.LOGIN_RESET:
      return initialState;
    default:
      return state;
  }
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.SIGNUP_LOADING:
      return { ...state, loading: true, error: null };
    case auth.SIGNUP_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case auth.SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case auth.SIGNUP_RESET:
      return initialState;
    default:
      return state;
  }
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGOUT_LOADING:
      return { ...state, loading: true, error: null };
    case auth.LOGOUT_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case auth.LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case auth.LOGOUT_RESET:
      return initialState;
    default:
      return state;
  }
};



