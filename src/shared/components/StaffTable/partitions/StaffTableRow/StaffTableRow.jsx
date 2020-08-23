import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './StaffTableRow.scss';

class StaffTableRow extends Component {
  static propTypes = {
    currentStaff: PropTypes.objectOf(PropTypes.any),
    currentDepartment: PropTypes.objectOf(PropTypes.any),
    toggleDetailInfoStaff: PropTypes.func.isRequired,
    toggleEditDetailStaff: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentDepartment: {},
    currentStaff: {},
  };

  static displayName = 'StaffTableRow';

  shouldComponentUpdate(nextProps) {
    const {
      currentStaff,
      currentDepartment,
    } = this.props;

    return (
      currentStaff._id !== nextProps.currentStaff._id // eslint-disable-line
      || currentDepartment._id !== nextProps.currentDepartment._id // eslint-disable-line
      || currentStaff.empName !== nextProps.currentStaff.empName
      || currentStaff.empActive !== nextProps.currentStaff.empActive
    );
  };

  showPopupDetailStaff = () => {
    const {
      toggleDetailInfoStaff,
      currentStaff,
    } = this.props;

    toggleDetailInfoStaff({
      id: currentStaff._id, // eslint-disable-line
      show: true,
    });
  };

  showPopupEditStaff = () => {
    const {
      toggleEditDetailStaff,
      currentStaff,
    } = this.props;

    toggleEditDetailStaff({
      id: currentStaff._id, // eslint-disable-line
      show: true,
    });
  };

  deleteStaff = () => {
    const {
      deleteStaff,
      currentStaff,
    } = this.props;

    deleteStaff({
      staffId: currentStaff._id, // eslint-disable-line
    });
  };

  render() {
    const {
      currentDepartment,
      currentStaff,
    } = this.props;

    return (
      <tr className="StaffTableRow">
        <td
          className="StaffTableRow__link"
          onClick={this.showPopupDetailStaff}
          role="presentation"
        >
          View
        </td>

        <td
          className="StaffTableRow__link"
          onClick={this.showPopupEditStaff}
          role="presentation"
        >
          Edit
        </td>

        <td>
          {currentStaff._id} {/*eslint-disable-line*/}
        </td>

        <td>
          {currentStaff.empName}
        </td>

        <td>
          {String(currentStaff.empActive)}
        </td>

        <td>
          {currentDepartment.dpName || 'error'}
        </td>

        <td
          className="StaffTableRow__link"
          onClick={this.deleteStaff}
          role="presentation"
        >
          Delete
        </td>
      </tr>
    );
  }
}

export default StaffTableRow;
