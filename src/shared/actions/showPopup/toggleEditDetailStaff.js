import * as types from 'shared/types';

export const toggleEditDetailStaff = ({
  id,
  show,
}) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_POPUP_EDIT_DETAIL_STAFF,
    payload: {
      id,
      show,
    },
  });
};

export default toggleEditDetailStaff;
