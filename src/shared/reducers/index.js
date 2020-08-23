import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import staff from './serviceApi/staff';
import department from './serviceApi/department';
import authorization from './serviceApi/authorization';
import popupDetailStaff from './showPopup/toggleDetailInfoStaff';
import popupEditStaff from './showPopup/toggleEditDetailStaff';
import entities from './entities';

const rootReducer = combineReducers({
  entities,
  staff,
  authorization,
  department,
  popupDetailStaff,
  popupEditStaff,
  form: formReducer,
});

export default rootReducer;
