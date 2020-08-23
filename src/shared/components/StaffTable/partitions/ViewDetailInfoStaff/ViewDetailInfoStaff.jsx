import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ViewDetailInfoStaff.scss';

class ViewDetailInfoStaff extends Component {
  static propTypes = {
    toggleDetailInfoStaff: PropTypes.func.isRequired,
    currentStaff: PropTypes.objectOf(PropTypes.any),
    popupDetail: PropTypes.objectOf(PropTypes.any),
    currentDepartment: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    popupDetail: {
      staffId: 0,
      showPopup: false,
    },
    currentStaff: {},
    currentDepartment: {},
  };

  static displayName = 'ViewDetailInfoStaff';

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentStaff._id) { // eslint-disable-line
      this.closePopup();
    }
  };

  shouldComponentUpdate(nextProps) {
    const {
      currentStaff,
      popupDetail,
      currentDepartment,
    } = this.props;

    return (
      currentStaff._id !== nextProps.currentStaff._id // eslint-disable-line
      || currentStaff.empName !== nextProps.currentStaff.empName
      || currentStaff.empActive !== nextProps.currentStaff.empActive
      || currentDepartment._id !== nextProps.currentDepartment._id // eslint-disable-line
      || popupDetail.staffId !== nextProps.popupDetail.staffId
      || popupDetail.showPopup !== nextProps.popupDetail.showPopup
    );
  };

  closePopup = () => {
    const {
      toggleDetailInfoStaff,
    } = this.props;

    toggleDetailInfoStaff({
      id: 0,
      show: false,
    });
  };

  render() {
    const {
      currentStaff,
      currentDepartment,
      popupDetail: {
        showPopup,
      },
    } = this.props;

    if (!showPopup || Object.keys(currentStaff).length === 0) {
      return null;
    }

    return (
      <div className="ViewDetailInfoStaff">
        <p>
          id: {currentStaff._id} {/*eslint-disable-line*/}
        </p>

        <p>
          Active: {String(currentStaff.empActive)}
        </p>

        <p>
          DepartmentId: {currentStaff.empDepartment}
        </p>

        <p>
          Department Name: {currentDepartment.dpName}
        </p>

        <p>
          Name: {currentStaff.empName}
        </p>

        <button
          onClick={this.closePopup}
        >
          Close
        </button>
      </div>
    );
  }
}

export default ViewDetailInfoStaff;
