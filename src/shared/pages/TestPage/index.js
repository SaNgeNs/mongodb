import { connect } from 'react-redux';
import { withErrorHandler } from 'Components/withErrorHandler';

import {
  getAllStaff,
  getAllDepartment,
  getUser,
  addDepartments,
} from 'shared/actions';

import {
  isAuthorization,
  getPopupEditStaff,
  isInitializedAuthorization,
  getDepartmentIds,
  isFetchingDepartments,
} from 'shared/selectors';

import TestPage from './TestPage';

export default connect((state) => ({
  isAuthorization: isAuthorization(state),
  popupEditStaff: getPopupEditStaff(state),
  isInitializedAuthorization: isInitializedAuthorization(state),
  departments: getDepartmentIds(state),
  isFetchingDepartments: isFetchingDepartments(state),
}), {
  getAllStaff,
  getAllDepartment,
  getUser,
  addDepartments,
})(withErrorHandler(TestPage));
