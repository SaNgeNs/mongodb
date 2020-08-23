import { connect } from 'react-redux';
import { withErrorHandler } from 'Components/withErrorHandler';

import {
  toggleDetailInfoStaff,
  toggleEditDetailStaff,
  deleteStaff,
} from 'shared/actions';

import {
  getStaffById,
  getDepartmentById,
} from 'shared/selectors';

import StaffTableRow from './StaffTableRow';

export default connect((state, { id }) => {
  const currentStaff = getStaffById(state, id);

  return {
    currentStaff,
    currentDepartment: getDepartmentById(state, currentStaff.empDepartment),
  };
}, {
  toggleDetailInfoStaff,
  toggleEditDetailStaff,
  deleteStaff,
})(withErrorHandler(StaffTableRow));
