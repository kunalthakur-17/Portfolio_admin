import { works } from "./constant";

export const getWorksAction = (data) => ({
  type: works.GET_WORKS,
  payload: data,
});

export const getWorkByIdAction = (id) => ({
  type: works.GET_WORK_BY_ID,
  payload: id,
});

export const createWorkAction = (data) => ({
  type: works.CREATE_WORK,
  payload: data,
});

export const createWorkResetAction = (data) => ({
  type: works.CREATE_WORK_RESET,
  payload: data,
});

export const updateWorkAction = (data) => ({
  type: works.UPDATE_WORK,
  payload: data,
});

export const updateWorkResetAction = (data) => ({
  type: works.UPDATE_WORK_RESET,
  payload: data,
});

export const deleteWorkAction = (data) => ({
  type: works.DELETE_WORK,
  payload: data,
});

export const deleteWorkResetAction = (data) => ({
  type: works.DELETE_WORK_RESET,
  payload: data,
});
