import { withErrorHandler } from 'Components/withErrorHandler/index';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';

import {
  getAllStaff,
} from 'shared/actions';

import {
  getLastSearchText,
} from "shared/selectors"

import SearchField from './SearchField';

export default withRouter(connect((state, { location }) => {
  const parsedSearch = parse(location.search);
  
  return {
    getLastSearchText: getLastSearchText(state),
    initialValues: {
      text: parsedSearch.text || '',
    },
  };
}, {
  getAllStaff,
})(reduxForm({
  form: 'SearchField',
})(withErrorHandler(SearchField))));
