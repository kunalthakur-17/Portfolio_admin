import { combineReducers } from "@reduxjs/toolkit";

import {
  createWorkReducer,
  deleteWorkReducer,
  getWorkByIdReducer,
  getWorksReducer,
  updateWorkReducer,
} from "./protectedPage/work/reducer";
import {
  createBlogReducer,
  deleteBlogReducer,
  getBlogByIdReducer,
  getBlogsReducer,
  updateBlogReducer,
} from "./protectedPage/blog/reducer";
import { loginReducer, logoutReducer, signupReducer } from "./auth/reducer";

const rootReducer = combineReducers({
  loginReducer,
  signupReducer,
  logoutReducer,

  //  admin blog

  getBlogsReducer,
  getBlogByIdReducer,
  createBlogReducer,
  updateBlogReducer,
  deleteBlogReducer,

  //  admin work
  getWorksReducer,
  getWorkByIdReducer,
  createWorkReducer,
  updateWorkReducer,
  deleteWorkReducer,
});

export default rootReducer;
