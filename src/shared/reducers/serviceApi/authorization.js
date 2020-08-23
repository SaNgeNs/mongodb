import * as types from 'shared/types/index';

const initialState = {
  userInfo: {},
  authorization: false,
  isFetching: false,
  isInitialized: false,
  isRequestFailed: false,
};

const authorization = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHORIZATION_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        authorization: true,
        isFetching: false,
        isInitialized: true,
        isRequestFailed: false,
      };
    }

    case types.AUTHORIZATION_FAILURE: {
      return {
        userInfo: {},
        authorization: false,
        isFetching: false,
        isInitialized: true,
        isRequestFailed: true,
      };
    }

    case types.GET_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.GET_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        authorization: true,
        isFetching: false,
        isInitialized: true,
        isRequestFailed: false,
      };
    }

    case types.GET_USER_FAILURE: {
      return {
        userInfo: {},
        authorization: false,
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

export default authorization;
