import * as types from 'shared/types';
import qs from 'query-string';
import Config from 'Config';
import {
  Cookie,
} from 'shared/utils/cookies';

export const authorization = ({
  login,
  password,
}) => async (dispatch) => {
  if (!login || !password) {
    return;
  }

  dispatch({
    type: types.AUTHORIZATION_REQUEST,
  });

  try {
    const response = await fetch(`${Config.serviceApi}authorization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: qs.stringify({
        login,
        password,
      }),
    });

    if (response.ok) {
      const json = await response.json();

      dispatch({
        type: types.AUTHORIZATION_SUCCESS,
        payload: json,
      });

      const today = new Date();
      Cookie.setItem('token', json.token, new Date(today.getTime() + 3600 * 24 * 30));
    } else {
      dispatch({
        type: types.AUTHORIZATION_FAILURE,
      });
    }
  } catch (error) {
    throw error;
  }
};

export default authorization;
