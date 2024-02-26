import { Dispatch } from "redux"; // Make sure to import the Dispatch type
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./user";
// import { addProduct , createCart, addProductFailure,addProductStart,addProductSuccess} from './cartRedux';
import { publicRequest } from "../../apiRequest/index";
import { Navigate } from "react-router-dom";

export const login = async (dispatch: Dispatch, user: any) => {
  dispatch(loginStart());
  try {
    console.log(user);
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch: Dispatch) => {
  dispatch(logoutSuccess());
  // try {
  //   const res = await publicRequest.post('/auth/login', user);
  //   dispatch(logoutSuccess(res.data));
  // } catch (err) {
  //   dispatch(logoutFailure());
  // }
};

export const register = async (dispatch: Dispatch, user: any) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    // Navigate("/login")
  } catch (err) {
    dispatch(registerFailure());
  }
};
