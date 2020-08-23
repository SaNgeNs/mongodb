import Config from 'Config';
import * as types from 'shared/types';
import { normalize } from 'normalizr';
import schemas from 'shared/schemas';
import {
  getDepartmentIds,
} from 'shared/selectors';

export const addDepartments = () => async (dispatch, getState) => {
  const departments = getDepartmentIds(getState());

  if (departments.length !== 0) {
    return;
  }

  dispatch({
    type: types.ADD_DEPARTMENTS_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}department`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: types.ADD_DEPARTMENTS_SUCCESS,
        payload: normalize(json, schemas.DEPARTMENT),
      });
    } else {
      dispatch({
        type: types.ADD_DEPARTMENTS_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default addDepartments;
