import { get } from "react-hook-form";
import { blogs } from "./constant";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getBlogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogs.GET_BLOGS_LOADING:
      return { ...state, loading: true, error: null };
    case blogs.GET_BLOGS_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case blogs.GET_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBlogByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogs.GET_BLOG_BY_ID_LOADING:
      return { ...state, loading: true, error: null };
    case blogs.GET_BLOG_BY_ID_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case blogs.GET_BLOG_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogs.CREATE_BLOG_LOADING:
      return { ...state, loading: true, error: null };
    case blogs.CREATE_BLOG_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case blogs.CREATE_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case blogs.CREATE_BLOG_RESET:
      return initialState;
    default:
      return state;
  }
};

export const updateBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogs.UPDATE_BLOG_LOADING:
      return { ...state, loading: true, error: null };
    case blogs.UPDATE_BLOG_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case blogs.UPDATE_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case blogs.UPDATE_BLOG_RESET:
      return initialState;
    default:
      return state;
  }
};

export const deleteBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogs.DELETE_BLOG_LOADING:
      return { ...state, loading: true, error: null };
    case blogs.DELETE_BLOG_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case blogs.DELETE_BLOG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


