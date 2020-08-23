import { connect } from 'react-redux';
import { withErrorHandler } from 'Components/withErrorHandler';
import { withRouter } from 'react-router-dom';

import {
  getAllStaff,
} from 'shared/actions';

import {
  getStaffLastPageIndex,
  getStaffCurrentPageIndex,
} from 'shared/selectors';

import Pagination from './Pagination';

export default withRouter(connect((state) => ({
  pageCount: getStaffLastPageIndex(state),
  currentPage: getStaffCurrentPageIndex(state),
}), {
  getAllStaff,
})(withErrorHandler(Pagination)));
