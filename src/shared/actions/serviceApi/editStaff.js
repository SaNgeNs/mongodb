import * as types from 'shared/types';
import qs from 'query-string';
import Config from 'Config';
import { normalize } from 'normalizr';
import schemas from 'shared/schemas';
import {
  getStaffById,
} from 'shared/selectors';

export const editStaff = ({
  empName,
  empActive,
  empDepartment,
  staffId,
}) => async (dispatch, getState) => {
  const stateCurrentStaff = getStaffById(getState(), staffId) || {};

  if (!empName
    || !empDepartment
    || !staffId
    || (stateCurrentStaff.empName === empName
      && String(stateCurrentStaff.empActive) === String(empActive)
      && stateCurrentStaff.empDepartment === empDepartment)
  ) {
    return;
  }

  dispatch({
    type: types.EDIT_STAFF_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}staff/${staffId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: qs.stringify({
        empName,
        empActive,
        empDepartment,
      }),
    });

    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: types.EDIT_STAFF_SUCCESS,
        payload: normalize(json, schemas.STAFF_OBJECT),
      });
    } else {
      dispatch({
        type: types.EDIT_STAFF_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default editStaff;
