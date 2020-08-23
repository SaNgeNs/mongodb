import * as types from 'shared/types/index';

const initialState = {
  ids: [],
  isFetching: false,
  isInitialized: false,
  isRequestFailed: false,
};

const department = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_DEPARTMENT_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.GET_ALL_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isInitialized: true,
        ids: action.payload.result,
      };
    }

    case types.GET_ALL_DEPARTMENT_FAILURE: {
      return {
        ids: [],
        isFetching: false,
        isInitialized: true,
        isRequestFailed: true,
      };
    }

    case types.ADD_DEPARTMENTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.ADD_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isInitialized: true,
        ids: action.payload.result,
      };
    }

    case types.ADD_DEPARTMENTS_FAILURE: {
      return {
        ids: [],
        isFetching: false,
        isInitialized: true,
        isRequestFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default department;
