import { withErrorHandler } from 'Components/withErrorHandler';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {
  toggleEditDetailStaff,
  editStaff,
} from 'shared/actions';

import {
  getDepartmentIds,
  getAllDepartment,
  getPopupEditStaff,
  getStaffById,
} from 'shared/selectors';

import EditInfoStaff from './EditInfoStaff';

export default connect((state) => {
  const popupDetail = getPopupEditStaff(state) || {};
  const currentStaff = getStaffById(state, popupDetail.staffId);

  return {
    popupDetail,
    currentStaff,
    departments: getAllDepartment(state),
    departmentIds: getDepartmentIds(state),
    initialValues: {
      name: currentStaff.empName,
      active: String(currentStaff.empActive) === 'true',
      department: currentStaff.empDepartment,
    },
  };
}, {
  toggleEditDetailStaff,
  editStaff,
})(reduxForm({
  form: 'EditInfoStaff',
})(withErrorHandler(EditInfoStaff)));
