import { connect } from 'react-redux';
import { withErrorHandler } from 'Components/withErrorHandler';

import {
  toggleDetailInfoStaff,
} from 'shared/actions';

import {
  getPopupDetailStaff,
  getStaffById,
  getDepartmentById,
} from 'shared/selectors';

import ViewDetailInfoStaff from './ViewDetailInfoStaff';

export default connect((state) => {
  const popupDetail = getPopupDetailStaff(state);
  const currentStaff = getStaffById(state, popupDetail.staffId);

  return {
    popupDetail,
    currentStaff,
    currentDepartment: getDepartmentById(state, currentStaff.empDepartment),
  };
}, {
  toggleDetailInfoStaff,
})(withErrorHandler(ViewDetailInfoStaff));
