import {
  GET_LOANS,
  GET_LOAN,
  ADD_LOAN,
  PAY_LOAN,
  GET_PAYMENT_HISTORY,
  ITEMS_LOADING,
  UPDATE_PAYMENT_STATUS,
} from "./loanTypes";

const initialState = {
  loan: {},
  loans: [],
  payments: [], 
  loading: false,
};

export const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOANS:
      return {
        ...state,
        loans: action.payload,
      };
    case GET_LOAN:
      return {
        ...state,
        loan: action.payload,
      };
    case ADD_LOAN:
      return {
        ...state,
        loans: [...state.loans, action.payload],
      };
    case PAY_LOAN:
      return {
        ...state,
        loan: action.payload.loan,
        payments: [action.payload.payment, ...state.payments],
      };
    case UPDATE_PAYMENT_STATUS: // Handle the new action type
      return {
        ...state,
        loan: {
          ...state.loan,
          status: action.payload, // Update the payment status
        },
      };
    case GET_PAYMENT_HISTORY:
      return {
        ...state,
        payments: action.payload,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
