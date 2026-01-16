import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import worksSaga from "./protectedPage/work/saga";
import blogsSaga from "./protectedPage/blog/saga";


export default function* rootSaga() {
  yield all([
    fork(authSaga),
    // admin work sagas
    fork(worksSaga),
    // admin blog sagas
    fork(blogsSaga),
  ]);
}
