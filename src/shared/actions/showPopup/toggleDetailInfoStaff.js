import * as types from 'shared/types';

export const toggleDetailInfoStaff = ({
  id,
  show,
}) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_POPUP_DETAIL_INFO_STAFF,
    payload: {
      id,
      show,
    },
  });
};

export default toggleDetailInfoStaff;
