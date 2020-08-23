import { withErrorHandler } from 'Components/withErrorHandler';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {
  newStaff,
} from 'shared/actions';

import {
  getDepartmentIds,
  getAllDepartment,
} from 'shared/selectors';

import AddNewStaff from './AddNewStaff';

export default connect((state) => ({
  departmentIds: getDepartmentIds(state),
  departments: getAllDepartment(state),
}), {
  newStaff,
})(reduxForm({
  form: 'AddNewStaff',
})(withErrorHandler(AddNewStaff)));
