import { get } from "react-hook-form";
import { works } from "./constant";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getWorksReducer = (state = initialState, action) => {
  switch (action.type) {
    case works.GET_WORKS_LOADING:
      return { ...state, loading: true, error: null };
    case works.GET_WORKS_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case works.GET_WORKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getWorkByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case works.GET_WORK_BY_ID_LOADING:
      return { ...state, loading: true, error: null };
    case works.GET_WORK_BY_ID_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case works.GET_WORK_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createWorkReducer = (state = initialState, action) => {
  switch (action.type) {
    case works.CREATE_WORK_LOADING:
      return { ...state, loading: true, error: null };
    case works.CREATE_WORK_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case works.CREATE_WORK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case works.CREATE_WORK_RESET:
      return initialState;
    default:
      return state;
  }
};

export const updateWorkReducer = (state = initialState, action) => {
  switch (action.type) {
    case works.UPDATE_WORK_LOADING:
      return { ...state, loading: true, error: null };
    case works.UPDATE_WORK_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case works.UPDATE_WORK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case works.UPDATE_WORK_RESET:
      return initialState;
    default:
      return state;
  }
};

export const deleteWorkReducer = (state = initialState, action) => {
  switch (action.type) {
    case works.DELETE_WORK_LOADING:
      return { ...state, loading: true, error: null };
    case works.DELETE_WORK_SUCCESS:
      return { data: action?.payload, loading: false, error: null };
    case works.DELETE_WORK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



