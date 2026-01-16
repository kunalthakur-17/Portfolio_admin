import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { auth } from "./constant";
import { loginApi, signupApi, logoutApi } from "./api";

function* loginSaga({ payload }) {
  try {
    yield put({ type: auth.LOGIN_LOADING });
    const response = yield call(loginApi, payload);
    
    if (response.status == 200 || response.status == 201) {
      const { user, accessToken } = response.data.data;
      
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("userRole", user.role);
      
      toast.success(response.data.message || "Login successful!");
      yield put({
        type: auth.LOGIN_SUCCESS,
        payload: { user, accessToken },
      });
    } else {
      toast.error(response?.data?.message || "Login failed!");
      yield put({
        type: auth.LOGIN_FAILURE,
        payload: response?.data,
      });
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
    toast.error(errorMessage);
    yield put({
      type: auth.LOGIN_FAILURE,
      payload: error?.response?.data || error,
    });
  }
}

function* signupSaga({ payload }) {
  try {
    yield put({ type: auth.SIGNUP_LOADING });
    const response = yield call(signupApi, payload);
    if (response.status == 200 || response.status == 201) {
      toast.success("Signup successful!");
      yield put({
        type: auth.SIGNUP_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      toast.error(response?.data?.message || "Signup failed!");
      yield put({
        type: auth.SIGNUP_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: auth.SIGNUP_FAILURE,
      payload: error?.data,
    });
  }
}

function* logoutSaga() {
  try {
    yield put({ type: auth.LOGOUT_LOADING });
    const response = yield call(logoutApi);
    if (response.status == 200) {
      toast.success("Logout successful!");
      yield put({
        type: auth.LOGOUT_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: auth.LOGOUT_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: auth.LOGOUT_FAILURE,
      payload: error?.data,
    });
  }
}

export function* loginWatcher() {
  yield takeEvery(auth.LOGIN, loginSaga);
}

export function* signupWatcher() {
  yield takeEvery(auth.SIGNUP, signupSaga);
}

export function* logoutWatcher() {
  yield takeEvery(auth.LOGOUT, logoutSaga);
}

function* authSaga() {
  yield all([fork(loginWatcher), fork(signupWatcher), fork(logoutWatcher)]);
}

export default authSaga;
