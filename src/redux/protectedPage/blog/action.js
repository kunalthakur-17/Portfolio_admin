import { blogs } from "./constant";

export const getBlogsAction = (data) => ({
  type: blogs.GET_BLOGS,
  payload: data,
});

export const getBlogByIdAction = (id) => ({
  type: blogs.GET_BLOG_BY_ID,
  payload: id,
});

export const createBlogAction = (data) => ({
  type: blogs.CREATE_BLOG,
  payload: data,
});

export const createBlogResetAction = (data) => ({
  type: blogs.CREATE_BLOG_RESET,
  payload: data,
});

export const updateBlogAction = (data) => ({
  type: blogs.UPDATE_BLOG,
  payload: data,
});

export const updateBlogResetAction = (data) => ({
  type: blogs.UPDATE_BLOG_RESET,
  payload: data,
});

export const deleteBlogAction = (data) => ({
  type: blogs.DELETE_BLOG,
  payload: data,
});


export const deleteBlogResetAction = (data) => ({
  type: blogs.DELETE_BLOG_RESET,
  payload: data,
});



