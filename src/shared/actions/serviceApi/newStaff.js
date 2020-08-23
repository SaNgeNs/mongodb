import Config from 'Config';
import * as types from 'shared/types';
import qs from 'query-string';
import {
  getStaffCurrentPageIndex,
  getLastSearchText,
} from 'shared/selectors';
import {
  getAllStaff,
} from './getAllStaff';

export const newStaff = ({
  empName,
  empActive,
  empDepartment,
}) => async (dispatch, getState) => {
  if (!empName || !empDepartment) {
    return;
  }

  dispatch({
    type: types.ADD_NEW_STAFF_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: qs.stringify({
        empName: empName.trim(),
        empActive,
        empDepartment,
      }),
    });

    if (response.ok) {
      dispatch({
        type: types.ADD_NEW_STAFF_SUCCESS,
      });

      const page = getStaffCurrentPageIndex(getState()) || 1;
      const text = getLastSearchText(getState()) || '';

      dispatch(getAllStaff({
        perPage: Config.perPage,
        page,
        text,
        isRefresh: true,
      }));
    } else {
      dispatch({
        type: types.ADD_NEW_STAFF_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default newStaff;
