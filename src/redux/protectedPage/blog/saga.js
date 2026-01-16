import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { blogs } from "./constant";
import {
  getBlogsApi,
  getBlogByIdApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
} from "./api";

function* getBlogsSaga({ payload }) {
  try {
    yield put({ type: blogs.GET_BLOGS_LOADING });
    const response = yield call(getBlogsApi, payload);
    if (response.status == 200) {
      yield put({
        type: blogs.GET_BLOGS_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: blogs.GET_BLOGS_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: blogs.GET_BLOGS_FAILURE,
      payload: error?.data,
    });
  }
}

function* getBlogByIdSaga({ payload }) {
  try {
    yield put({ type: blogs.GET_BLOG_BY_ID_LOADING });
    const response = yield call(getBlogByIdApi, payload);
    if (response.status == 200) {
      yield put({
        type: blogs.GET_BLOG_BY_ID_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: blogs.GET_BLOG_BY_ID_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: blogs.GET_BLOG_BY_ID_FAILURE,
      payload: error?.data,
    });
  }
}

function* createBlogSaga({ payload }) {
  try {
    yield put({ type: blogs.CREATE_BLOG_LOADING });
    const response = yield call(createBlogApi, payload);
    if (response.status == 200 || response.status == 201) {
      toast.success("Blog created successfully!");
      yield put({
        type: blogs.CREATE_BLOG_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      toast.error(response?.data?.message || "Failed to create blog!");
      yield put({
        type: blogs.CREATE_BLOG_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: blogs.CREATE_BLOG_FAILURE,
      payload: error?.data,
    });
  }
}

function* updateBlogSaga({ payload }) {
  try {
    yield put({ type: blogs.UPDATE_BLOG_LOADING });
    const response = yield call(updateBlogApi, payload);
    if (response.status == 200) {
      toast.success("Blog updated successfully!");
      yield put({
        type: blogs.UPDATE_BLOG_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: blogs.UPDATE_BLOG_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: blogs.UPDATE_BLOG_FAILURE,
      payload: error?.data,
    });
  }
}

function* deleteBlogSaga({ payload }) {
  try {
    yield put({ type: blogs.DELETE_BLOG_LOADING });
    const response = yield call(deleteBlogApi, payload);
    if (response.status == 200) {
      toast.success("Blog deleted successfully!");
      yield put({
        type: blogs.DELETE_BLOG_SUCCESS,
        payload: { ...response.data },
      });
    } else {
      yield put({
        type: blogs.DELETE_BLOG_FAILURE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    toast.error(error || "Something went wrong!");
    yield put({
      type: blogs.DELETE_BLOG_FAILURE,
      payload: error?.data,
    });
  }
}

export function* getBlogsWatcher() {
  yield takeEvery(blogs.GET_BLOGS, getBlogsSaga);
}

export function* getBlogByIdWatcher() {
  yield takeEvery(blogs.GET_BLOG_BY_ID, getBlogByIdSaga);
}

export function* createBlogWatcher() {
  yield takeEvery(blogs.CREATE_BLOG, createBlogSaga);
}

export function* updateBlogWatcher() {
  yield takeEvery(blogs.UPDATE_BLOG, updateBlogSaga);
}

export function* deleteBlogWatcher() {
  yield takeEvery(blogs.DELETE_BLOG, deleteBlogSaga);
}

function* blogsSaga() {
  yield all([
    fork(getBlogsWatcher),
    fork(getBlogByIdWatcher),
    fork(createBlogWatcher),
    fork(updateBlogWatcher),
    fork(deleteBlogWatcher),
  ]);
}

export default blogsSaga;
