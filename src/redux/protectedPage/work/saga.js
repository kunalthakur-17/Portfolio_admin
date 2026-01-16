import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { works } from "./constant";
import {
  getWorksApi,
  getWorkByIdApi,
  createWorkApi,
  updateWorkApi,
  deleteWorkApi,
} from "./api";

function* getWorksSaga({ payload }) {
  try {
    yield put({ type: works.GET_WORKS_LOADING });
    const response = yield call(getWorksApi, payload);
    if (response.status == 200) {
      yield put({
        type: works.GET_WORKS_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: works.GET_WORKS_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: works.GET_WORKS_FAILURE,
      payload: error?.data,
    });
  }
}

function* getWorkByIdSaga({ payload }) {
  try {
    yield put({ type: works.GET_WORK_BY_ID_LOADING });
    const response = yield call(getWorkByIdApi, payload);
    if (response.status == 200) {
      yield put({
        type: works.GET_WORK_BY_ID_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: works.GET_WORK_BY_ID_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: works.GET_WORK_BY_ID_FAILURE,
      payload: error?.data,
    });
  }
}

function* createWorkSaga({ payload }) {
  try {
    yield put({ type: works.CREATE_WORK_LOADING });
    const response = yield call(createWorkApi, payload);
    if (response.status == 200 || response.status == 201) {
      toast.success("Work created successfully!");
      yield put({
        type: works.CREATE_WORK_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      toast.error(response?.data?.message || "Failed to create work!");
      yield put({
        type: works.CREATE_WORK_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: works.CREATE_WORK_FAILURE,
      payload: error?.data,
    });
  }
}

function* updateWorkSaga({ payload }) {
  try {
    yield put({ type: works.UPDATE_WORK_LOADING });
    const response = yield call(updateWorkApi, payload);
    if (response.status == 200) {
      toast.success("Work updated successfully!");
      yield put({
        type: works.UPDATE_WORK_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: works.UPDATE_WORK_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: works.UPDATE_WORK_FAILURE,
      payload: error?.data,
    });
  }
}

function* deleteWorkSaga({ payload }) {
  try {
    yield put({ type: works.DELETE_WORK_LOADING });
    const response = yield call(deleteWorkApi, payload);
    if (response.status == 200) {
      toast.success("Work deleted successfully!");
      yield put({
        type: works.DELETE_WORK_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: works.DELETE_WORK_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: works.DELETE_WORK_FAILURE,
      payload: error?.data,
    });
  }
}

export function* getWorksWatcher() {
  yield takeEvery(works.GET_WORKS, getWorksSaga);
}

export function* getWorkByIdWatcher() {
  yield takeEvery(works.GET_WORK_BY_ID, getWorkByIdSaga);
}

export function* createWorkWatcher() {
  yield takeEvery(works.CREATE_WORK, createWorkSaga);
}

export function* updateWorkWatcher() {
  yield takeEvery(works.UPDATE_WORK, updateWorkSaga);
}

export function* deleteWorkWatcher() {
  yield takeEvery(works.DELETE_WORK, deleteWorkSaga);
}

function* worksSaga() {
  yield all([
    fork(getWorksWatcher),
    fork(getWorkByIdWatcher),
    fork(createWorkWatcher),
    fork(updateWorkWatcher),
    fork(deleteWorkWatcher),
  ]);
}

export default worksSaga;
