import * as types from 'shared/types/index';

const initialState = {
  staffId: 0,
  showPopup: false,
};

const toggleEditDetailStaff = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_POPUP_EDIT_DETAIL_STAFF: {
      return {
        staffId: action.payload.id,
        showPopup: action.payload.show,
      };
    }

    default: {
      return state;
    }
  }
};

export default toggleEditDetailStaff;
