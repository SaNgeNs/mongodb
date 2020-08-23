import Config from 'Config';
import * as types from 'shared/types';
import { normalize } from 'normalizr';
import schemas from 'shared/schemas';

import {
  getStaffCurrentPageIndex,
  getLastSearchText,
  isFetchingStaff,
} from 'shared/selectors';

export const getAllStaff = ({
  perPage = Config.perPage,
  page,
  text = '',
  isRefresh = false,
}) => async (dispatch, getState) => {
  const currentPage = getStaffCurrentPageIndex(getState());
  const currentTextSearch = getLastSearchText(getState());
  const isFetching = isFetchingStaff(getState());

  if (!isRefresh && ((currentPage === page && text.trim() === currentTextSearch.trim()) || isFetching)) {
    return;
  }

  dispatch({
    type: types.GET_ALL_STAFF_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}staff?page=${page || currentPage + 1}&per-page=${perPage}${text.trim() ? `&text=${text}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();

      const paginations = {
        currentPageIndex: Number(response.headers.get('X-Pagination-Current-Page')) || 1,
        lastPageIndex: Number(response.headers.get('X-Pagination-Page-Count')) || 1,
        totalCount: Number(response.headers.get('X-Pagination-Total-Count')) || 1,
      };

      dispatch({
        type: types.GET_ALL_STAFF_SUCCESS,
        payload: normalize(json, schemas.STAFF),
      });

      dispatch({
        type: types.PAGINATIONS_STAFF,
        payload: paginations,
      });

      dispatch({
        type: types.LAST_SEARCH_TEXT_STAFF,
        payload: text,
      });
    } else {
      dispatch({
        type: types.GET_ALL_STAFF_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default getAllStaff;
