import { connect } from 'react-redux';
import { withErrorHandler } from 'Components/withErrorHandler';

import {
  getStaffIds,
  getPopupDetailStaff,
  getStaffTotalCount,
} from 'shared/selectors';

import StaffTable from './StaffTable';

export default connect((state) => ({
  staffIds: getStaffIds(state),
  popupDetail: getPopupDetailStaff(state),
  staffCount: getStaffTotalCount(state),
}))(withErrorHandler(StaffTable));
