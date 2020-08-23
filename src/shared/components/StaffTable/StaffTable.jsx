import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'Components/Pagination';

import StaffTableRow from './partitions/StaffTableRow';
import ViewDetailInfoStaff from './partitions/ViewDetailInfoStaff';

import './StaffTable.scss';

class StaffTable extends Component {
  static propTypes = {
    staffIds: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    staffCount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    popupDetail: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    staffIds: [],
    staffCount: 0,
    popupDetail: {
      staffId: 0,
      showPopup: false,
    },
  };

  static displayName = 'StaffTable';

  shouldComponentUpdate(nextProps) {
    const {
      staffCount,
      staffIds,
      popupDetail,
    } = this.props;

    return (
      Number(staffCount) !== Number(nextProps.staffCount)
      || staffIds.length !== nextProps.staffIds
      || popupDetail.staffId !== nextProps.popupDetail.staffId
      || popupDetail.showPopup !== nextProps.popupDetail.showPopup
    );
  }

  render() {
    const {
      staffIds,
      popupDetail,
      staffCount,
    } = this.props;

    if (staffIds.length === 0) {
      return <div>Empty table</div>;
    }
    
    return (
      <div className="StaffTable">
        <p className="StaffTable__count">Staff count: {staffCount}</p>

        <table className="StaffTable__table">
          <thead className="StaffTable__head">
          <tr>
            <th />

            <th />

            <th>
              empID
            </th>

            <th>
              empName
            </th>

            <th>
              empActive
            </th>

            <th>
              empDepartment
            </th>

            <th />
          </tr>
          </thead>

          <tbody>
          {staffIds.map(item => (
            <StaffTableRow
              key={item}
              id={item}
            />
          ))}
          </tbody>
        </table>

        <Pagination />

        {popupDetail.showPopup && (
          <ViewDetailInfoStaff />
        )}
      </div>
    );
  }
}

export default StaffTable;
