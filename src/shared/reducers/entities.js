import { combineReducers } from 'redux';
import * as types from 'shared/types';

const createReducer = (state = {}, action, name) => {
  if (action.payload && action.payload.entities && action.payload.entities[name]) {
    return action.payload.entities[name];
  }

  return state;
};

const department = (state = {}, action) => createReducer(state, action, 'department');

const staff = (state = {}, action) => {
  switch (action.type) {
    case types.EDIT_STAFF_SUCCESS:
      if ((action.payload && action.payload.entities && action.payload.entities.staff)) {
        return {
          ...state,
          ...action.payload.entities.staff,
        };
      }

      return state;

    default:
      if ((action.payload && action.payload.entities && action.payload.entities.staff)) {
        return {
          ...action.payload.entities.staff,
        };
      }

      return state;
  }
};

const entities = combineReducers({
  staff,
  department,
});

export default entities;
