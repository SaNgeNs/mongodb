import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, SubmissionError } from 'redux-form';

import './AddNewStaff.scss';

class AddNewStaff extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    newStaff: PropTypes.func.isRequired,
    departmentIds: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    departments: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    departmentIds: [],
    departments: {},
  };

  static displayName = 'AddNewStaff';

  shouldComponentUpdate(nextProps) {
    const {
      departmentIds,
    } = this.props;

    return(
      departmentIds.length !== nextProps.departmentIds.length
    );
  }

  submit = ({ name, active, department }) => new Promise((resolve) => {
    if (!name) {
      alert('Please enter your name'); // eslint-disable-line
      throw new SubmissionError({
        login: 'Please enter your name',
        _error: 'Submit failed!',
      });
    } else if (!department) {
      alert('Please enter your department'); // eslint-disable-line
      throw new SubmissionError({
        password: 'Please enter your department',
        _error: 'Submit failed!',
      });
    } else {
      const {
        newStaff,
      } = this.props;

      newStaff({
        empName: name,
        empActive: active,
        empDepartment: department,
      });
      resolve();
    }
  });

  render() {
    const {
      handleSubmit,
      departmentIds,
      departments,
    } = this.props;

    return (
      <form
        className="AddNewStaff"
        onSubmit={handleSubmit(this.submit)}
      >
        <p>Add new staff form</p>

        <span>
          Name:
          <Field
            name="name"
            type="text"
            placeholder="staff name"
            component="input"
          />
        </span>

        <span>
          Active:
          <Field
            name="active"
            component="input"
            type="checkbox"
          />
        </span>

        <span>
          Department:
          <Field name="department" component="select">
            <option />
            {departmentIds.map(item => (
              <option key={item} value={departments[item]._id}>{departments[item].dpName}</option> // eslint-disable-line
            ))}
          </Field>
        </span>

        <button
          type="submit"
        >
          created
        </button>
      </form>
    );
  }
}

export default AddNewStaff;
