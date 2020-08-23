import { withErrorHandler } from 'Components/withErrorHandler';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {
  authorization,
  getUser,
} from 'shared/actions';

import {
  isAuthorization,
  isInitializedAuthorization,
} from 'shared/selectors';

import AuthorizationForm from './AuthorizationForm';

export default connect((state) => ({
  isAuthorization: isAuthorization(state),
  isInitializedAuthorization: isInitializedAuthorization(state),
}), {
  authorization,
  getUser,
})(reduxForm({
  form: 'AuthorizationForm',
})(withErrorHandler(AuthorizationForm)));
