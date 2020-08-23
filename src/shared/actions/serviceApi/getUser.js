import * as types from 'shared/types';
import Config from 'Config';

export const getUser = ({
  token = '',
}) => async (dispatch) => {
  if (token === null || !token.trim()) {
    dispatch({
      type: types.GET_USER_FAILURE,
    });

    return;
  }

  dispatch({
    type: types.GET_USER_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}authorization?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: types.GET_USER_SUCCESS,
        payload: json,
      });
    } else {
      dispatch({
        type: types.GET_USER_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default getUser;
