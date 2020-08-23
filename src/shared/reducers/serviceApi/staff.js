import * as types from 'shared/types/index';

const initialState = {
  ids: [],
  isFetching: false,
  isInitialized: false,
  isRequestFailed: false,
  lastSearchText: '',
  paginations: {
    currentPageIndex: 0,
    lastPageIndex: 0,
    totalCount: 0,
  },
  newStaff: {
    isFetching: false,
    isInitialized: false,
    isRequestFailed: false,
  },
  editStaff: {
    isFetching: false,
    isInitialized: false,
    isRequestFailed: false,
  },
  deleteStaff: {
    isFetching: false,
    isInitialized: false,
    isRequestFailed: false,
  },
};

const staff = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_STAFF_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.GET_ALL_STAFF_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isInitialized: true,
        ids: action.payload.result,
      };
    }

    case types.PAGINATIONS_STAFF: {
      return {
        ...state,
        paginations: action.payload,
      };
    }

    case types.LAST_SEARCH_TEXT_STAFF: {
      return {
        ...state,
        lastSearchText: action.payload,
      };
    }

    case types.GET_ALL_STAFF_FAILURE: {
      return {
        ...state,
        ids: [],
        isFetching: false,
        isInitialized: true,
        isRequestFailed: true,
      };
    }

    case types.ADD_NEW_STAFF_REQUEST: {
      return {
        ...state,
        newStaff: {
          isInitialized: false,
          isRequestFailed: false,
          isFetching: true,
        },
      };
    }

    case types.ADD_NEW_STAFF_SUCCESS: {
      return {
        ...state,
        newStaff: {
          isRequestFailed: false,
          isFetching: false,
          isInitialized: true,
        },
      };
    }

    case types.ADD_NEW_STAFF_FAILURE: {
      return {
        ...state,
        newStaff: {
          isFetching: false,
          isInitialized: true,
          isRequestFailed: true,
        },
      };
    }

    case types.EDIT_STAFF_REQUEST: {
      return {
        ...state,
        editStaff: {
          isInitialized: false,
          isRequestFailed: false,
          isFetching: true,
        },
      };
    }

    case types.EDIT_STAFF_SUCCESS: {
      return {
        ...state,
        editStaff: {
          isRequestFailed: false,
          isFetching: false,
          isInitialized: true,
        },
      };
    }

    case types.EDIT_STAFF_FAILURE: {
      return {
        ...state,
        editStaff: {
          isFetching: false,
          isInitialized: true,
          isRequestFailed: true,
        },
      };
    }

    case types.DELETE_STAFF_REQUEST: {
      return {
        ...state,
        deleteStaff: {
          isInitialized: false,
          isRequestFailed: false,
          isFetching: true,
        },
      };
    }

    case types.DELETE_STAFF_SUCCESS: {
      return {
        ...state,
        deleteStaff: {
          isRequestFailed: false,
          isFetching: false,
          isInitialized: true,
        },
      };
    }

    case types.DELETE_STAFF_FAILURE: {
      return {
        ...state,
        deleteStaff: {
          isFetching: false,
          isInitialized: true,
          isRequestFailed: true,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default staff;
