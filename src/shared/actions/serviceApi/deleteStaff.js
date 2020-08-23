import * as types from 'shared/types';
import Config from 'Config';
import {
  getStaffCurrentPageIndex,
  getStaffIds,
  getLastSearchText,
} from 'shared/selectors';
import {
  getAllStaff,
} from './getAllStaff';

export const deleteStaff = ({
  staffId,
}) => async (dispatch, getState) => {
  if (!staffId) {
    return;
  }

  dispatch({
    type: types.DELETE_STAFF_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}staff/${staffId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      dispatch({
        type: types.DELETE_STAFF_SUCCESS,
      });

      const currentStaffIds = getStaffIds(getState()) || [];
      const lastItemOnPage = currentStaffIds.length < 2;
      const page = getStaffCurrentPageIndex(getState()) || 1;
      const text = getLastSearchText(getState()) || '';

      dispatch(getAllStaff({
        perPage: Config.perPage,
        page: lastItemOnPage ? (Number(page) - 1) || 1 : page,
        text,
        isRefresh: true,
      }));
    } else {
      dispatch({
        type: types.DELETE_STAFF_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default deleteStaff;
