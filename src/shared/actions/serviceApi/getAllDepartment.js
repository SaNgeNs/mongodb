import * as types from 'shared/types';
import { normalize } from 'normalizr';
import schemas from 'shared/schemas';
import Config from 'Config';
import {
  getDepartmentIds,
} from "shared/selectors"

export const getAllDepartment = () => async (dispatch, getState) => {
  const departments = getDepartmentIds(getState());

  if (departments.length !== 0) {
    return;
  }

  dispatch({
    type: types.GET_ALL_DEPARTMENT_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}department`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: types.GET_ALL_DEPARTMENT_SUCCESS,
        payload: normalize(json, schemas.DEPARTMENT),
      });
    } else {
      dispatch({
        type: types.GET_ALL_DEPARTMENT_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default getAllDepartment;
