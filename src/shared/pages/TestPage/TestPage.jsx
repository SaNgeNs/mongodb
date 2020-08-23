import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import Config from 'Config';
import {
  Cookie,
} from 'shared/utils'

import AddNewStaff from 'Components/AddNewStaff';
import StaffTable from 'Components/StaffTable';
import EditInfoStaff from 'Components/EditInfoStaff';
import SearchField from 'Components/SearchField';

import './TestPage.scss';

class TestPage extends Component {
  static propTypes = {
    getAllStaff: PropTypes.func.isRequired,
    getAllDepartment: PropTypes.func.isRequired,
    addDepartments: PropTypes.func.isRequired,
    popupEditStaff: PropTypes.objectOf(PropTypes.any),
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    isInitializedAuthorization: PropTypes.bool,
    getUser: PropTypes.func.isRequired,
    isAuthorization: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    departments: PropTypes.arrayOf(PropTypes.any),
    isFetchingDepartments: PropTypes.bool,
  };

  static defaultProps = {
    departments: [],
    isAuthorization: false,
    isInitializedAuthorization: false,
    isFetchingDepartments: false,
    popupEditStaff: {
      staffId: 0,
      showPopup: false,
    },
  };

  static displayName = 'TestPage';

  componentDidMount = () => {
    const {
      isAuthorization,
      getUser,
      location,
    } = this.props;

    if (isAuthorization) {
      this.goInfoStaff(location);
    } else {
      const token = Cookie.getItem('token');

      getUser({
        token,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    const {
      isAuthorization,
      isInitializedAuthorization,
      location,
      history: {
        push,
      },
    } = this.props;

    if ((isInitializedAuthorization !== nextProps.isInitializedAuthorization)
      && !nextProps.isAuthorization && nextProps.isInitializedAuthorization) {
      push('/');
    }

    if ((isAuthorization !== nextProps.isAuthorization && nextProps.isAuthorization)
      || location.search !== nextProps.location.search
    ) {
      this.goInfoStaff(nextProps.location);
    }
  };

  shouldComponentUpdate(nextProps) {
    const {
      isAuthorization,
      isInitializedAuthorization,
      popupEditStaff,
      departments,
      isFetchingDepartments,
    } = this.props;

    return (
      isAuthorization !== nextProps.isAuthorization
      || isFetchingDepartments !== nextProps.isFetchingDepartments
      || isInitializedAuthorization !== nextProps.isInitializedAuthorization
      || departments.length !== nextProps.departments.length
      || popupEditStaff.staffId !== nextProps.popupEditStaff.staffId
      || popupEditStaff.showPopup !== nextProps.popupEditStaff.showPopup
    );
  }

  goInfoStaff = (location) => {
    const {
      getAllStaff,
      getAllDepartment,
    } = this.props;

    const parsedSearch = parse(location.search);

    getAllStaff({
      perPage: Config.perPage,
      page: parsedSearch.page || 1,
      text: parsedSearch.text || '',
    });
    getAllDepartment();
  };

  createTestDepartments = () => {
    const {
      addDepartments,
    } = this.props;

    addDepartments();
  };

  render() {
    const {
      popupEditStaff,
      isAuthorization,
      isFetchingDepartments,
      departments,
    } = this.props;

    if (!isAuthorization) {
      return null;
    }

    return (
      <div className='TestPage'>

        {departments.length === 0 && !isFetchingDepartments && (
          <button
            className="TestPage__department"
            onClick={this.createTestDepartments}
          >
            create test data for departments
          </button>
        )}

        <div className="TestPage__wrapper">
          <AddNewStaff />

          {popupEditStaff.showPopup && (
            <EditInfoStaff />
          )}
        </div>

        <SearchField />

        <StaffTable />

      </div>
    );
  }
}

export default TestPage;
