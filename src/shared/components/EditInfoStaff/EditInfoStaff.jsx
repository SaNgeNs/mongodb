import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, SubmissionError } from 'redux-form';

import './EditInfoStaff.scss';

class EditInfoStaff extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    departmentIds: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    departments: PropTypes.objectOf(PropTypes.any),
    popupDetail: PropTypes.objectOf(PropTypes.any),
    currentStaff: PropTypes.objectOf(PropTypes.any),
    toggleEditDetailStaff: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    editStaff: PropTypes.func.isRequired,
  };

  static defaultProps = {
    departmentIds: [],
    currentStaff: {},
    departments: {},
    popupDetail: {
      staffId: 0,
      showPopup: false,
    },
  };

  static displayName = 'EditInfoStaff';

  componentWillReceiveProps(nextProps) {
    const {
      currentStaff,
      change,
    } = this.props;

    if (currentStaff._id !== nextProps.currentStaff._id && nextProps.currentStaff._id) { // eslint-disable-line
      change('name', nextProps.currentStaff.empName);
      change('active', String(nextProps.currentStaff.empActive) === 'true');
      change('department', nextProps.currentStaff.empDepartment);
    }

    if (!nextProps.currentStaff._id) { // eslint-disable-line
      this.closePopupEditStaff();
    }
  };

  shouldComponentUpdate(nextProps) {
    const {
      departmentIds,
      currentStaff,
      popupDetail: {
        staffId,
        showPopup,
      }
    } = this.props;

    return (
      departmentIds.length !== nextProps.departmentIds.length
      || showPopup !== nextProps.popupDetail.showPopup
      || staffId !== nextProps.popupDetail.staffId
      || currentStaff._id !== nextProps.currentStaff._id // eslint-disable-line
    );
  }

  submit = ({ name, active, department }) => new Promise((resolve) => {
    if (!name) {
      alert('Please enter staff name'); // eslint-disable-line
      throw new SubmissionError({
        login: 'Please enter staff name',
        _error: 'Submit failed!',
      });
    } else if (!department) {
      alert('Please enter staff department'); // eslint-disable-line
      throw new SubmissionError({
        password: 'Please enter staff department',
        _error: 'Submit failed!',
      });
    } else {
      const {
        editStaff,
        popupDetail: {
          staffId,
        },
      } = this.props;

      editStaff({
        empName: name,
        empActive: active,
        empDepartment: department,
        staffId,
      });
      resolve();
    }
  });

  closePopupEditStaff = () => {
    const {
      toggleEditDetailStaff,
    } = this.props;

    toggleEditDetailStaff({
      id: 0,
      show: false,
    });
  };

  render() {
    const {
      handleSubmit,
      departmentIds,
      departments,
      currentStaff,
      popupDetail: {
        showPopup,
      },
    } = this.props;
    
    if (!showPopup) {
      return null;
    }

    return (
      <form
        className="EditInfoStaff"
        onSubmit={handleSubmit(this.submit)}
      >
        <p>Edit detail info staff</p>

        <p>
          Staff ID: {currentStaff._id} {/* eslint-disable-line*/}
        </p>

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
          save
        </button>

        <button
          onClick={this.closePopupEditStaff}
        >
          cancel
        </button>
      </form>
    );
  }
}

export default EditInfoStaff;
