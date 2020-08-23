import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, SubmissionError } from 'redux-form';
import {
  Cookie,
} from 'shared/utils';

import './AuthorizationForm.scss';

class AuthorizationForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    authorization: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    isAuthorization: PropTypes.bool,
    isInitializedAuthorization: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    isAuthorization: false,
    isInitializedAuthorization: false,
  };

  static displayName = 'AuthorizationForm';

  componentDidMount = () => {
    const {
      isAuthorization,
      getUser,
      history: {
        push,
      },
    } = this.props;

    if (isAuthorization) {
      push('/staff');
    } else {
      const token = Cookie.getItem('token');
      getUser({
        token,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    const {
      history: {
        push,
      },
      isAuthorization,
    } = this.props;

    if (isAuthorization !== nextProps.isAuthorization && nextProps.isAuthorization) {
      push('/staff');
    }
  };

  shouldComponentUpdate(nextProps) {
    const {
      isAuthorization,
      isInitializedAuthorization,
    } = this.props;

    return (
      isAuthorization !== nextProps.isAuthorization
      || isInitializedAuthorization !== nextProps.isInitializedAuthorization
    );
  };

  submit = ({ login, password }) => new Promise((resolve) => {
    if (!login) {
      throw new SubmissionError({
        login: 'Please enter your login',
        _error: 'Submit failed!',
      });
    } else if (!password) {
      throw new SubmissionError({
        password: 'Please enter your password',
        _error: 'Submit failed!',
      });
    } else {
      const {
        authorization,
      } = this.props;

      authorization({
        login,
        password,
      });
      resolve();
    }
  });

  renderField = (field) => (
    <div className="AuthorizationForm__input">
      <input
        {...field.input}
        type={field.type}
        placeholder={field.placeholder}
        className="AuthorizationForm__inputField"
      />
      {field.meta.touched && field.meta.error &&
      <p>{field.meta.error}</p>}
    </div>
  );

  render() {
    const {
      handleSubmit,
      isInitializedAuthorization,
    } = this.props;

    if (!isInitializedAuthorization) {
      return null;
    }

    return (
      <form
        className="AuthorizationForm"
        onSubmit={handleSubmit(this.submit)}
      >
        <Field
          name="login"
          type="text"
          placeholder="admin"
          component={this.renderField}
        />

        <Field
          name="password"
          type="password"
          placeholder="123"
          component={this.renderField}
        />

        <button
          className="AuthorizationForm__submit"
          type="submit"
        >
          Login
        </button>
      </form>
    );
  }
}

export default AuthorizationForm;
