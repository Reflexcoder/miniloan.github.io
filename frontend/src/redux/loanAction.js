import {
  ADD_LOAN,
  GET_LOAN,
  GET_LOANS,
  GET_PAYMENT_HISTORY,
  ITEMS_LOADING,
  PAY_LOAN,
} from "./loanTypes";
import axios from "axios";

//create Loan
// loanActions.js

export const getLoans = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("/api/v1/loans").then((res) =>
    dispatch({
      type: GET_LOANS,
      payload: res.data,
    })
  );
};

export const getLoan = (id) => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get(`/api/v1/loan/${id}`).then((res) =>
    dispatch({
      type: GET_LOAN,
      payload: res.data,
    })
  );
};

export const createLoan = (loan) => (dispatch) => {
  dispatch(setItemsLoading());
  axios.post("/api/v1/new/loan", loan).then((res) =>
    dispatch({
      type: ADD_LOAN,
      payload: res.data,
    })
  );
};

export const payLoan = (pay) => (dispatch) => {
  dispatch(setItemsLoading());
  axios.put(`/api/v1/loan/${pay._id}`, pay).then((res) => {
   
    dispatch({
      type: PAY_LOAN,
      payload: res.data,
    });
  });
};

export const getPaymentHistory = (id) => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get(`/api/v1/history/${id}`).then((res) => {
    console.log(res.data);
    dispatch({
      type: GET_PAYMENT_HISTORY,
      payload: res.data,
    });
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
