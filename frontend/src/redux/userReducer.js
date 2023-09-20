import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  LOAN_APPROVAL_REQUEST,
  LOAN_APPROVAL_SUCCESS,
  LOAN_APPROVAL_FAILURE,
} from "./userTypes";


export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        //means retain authenticated states
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const initialState = {
  loading: false,
  loan: null,
  error: null,
};

export const adminloanReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAN_APPROVAL_REQUEST:
      return { ...state, loading: true };

    case LOAN_APPROVAL_SUCCESS:
      return { ...state, loading: false, loan: action.payload, error: null };

    case LOAN_APPROVAL_FAILURE:
      return { ...state, loading: false, loan: null, error: action.payload };

    default:
      return state;
  }
};
