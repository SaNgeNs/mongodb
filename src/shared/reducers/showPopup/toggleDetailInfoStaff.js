import * as types from 'shared/types/index';

const initialState = {
  staffId: 0,
  showPopup: false,
};

const toggleDetailInfoStaff = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_POPUP_DETAIL_INFO_STAFF: {
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

export default toggleDetailInfoStaff;
