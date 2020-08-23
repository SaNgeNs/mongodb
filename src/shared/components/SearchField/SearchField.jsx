import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { parse, stringify } from 'query-string';
import Config from 'Config';

import './SearchField.scss';

class SearchField extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getAllStaff: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    getLastSearchText: PropTypes.string,
    change: PropTypes.func.isRequired,
  };

  static defaultProps = {
    getLastSearchText: '',
  };

  static displayName = 'SearchField';

  componentWillReceiveProps(nextProps) {
    const {
      location,
      change,
    } = this.props;

    if (location.search !== nextProps.location.search) {
      const parsedSearch = parse(nextProps.location.search);

      change('text', parsedSearch.text || '');
    }
  };

  shouldComponentUpdate() {
    return false;
  }

  submit = ({ text }) => {
    const {
      getLastSearchText,
    } = this.props;

    const searchText = text.trim();

    if (getLastSearchText.trim() !== searchText) {
      const {
        history: {
          push,
        },
        location: {
          pathname,
          search,
        },
      } = this.props;

      const {
        getAllStaff,
      } = this.props;

      getAllStaff({
        perPage: Config.perPage,
        page: 1,
        text: searchText,
      });

      const parsedSearch = parse(search);
      delete parsedSearch.page;

      if (searchText) {
        parsedSearch.text = searchText;
      } else {
        delete parsedSearch.text;
      }

      push({
        pathname,
        search: stringify(parsedSearch),
      });
    }
  };

  goStartPage = () => {
    const {
      getAllStaff,
      history: {
        push,
      },
      location: {
        pathname,
        search,
      },
    } = this.props;

    if (search) {
      getAllStaff({
        perPage: Config.perPage,
        page: 1,
        text: '',
      });

      push({
        pathname,
      });
    }
  };

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <form
        className="SearchField"
        onSubmit={handleSubmit(this.submit)}
      >
        <p>Search by name staff:</p>

        <Field
          name="text"
          type="text"
          placeholder="staff name"
          component="input"
        />

        <button
          type="submit"
        >
          search
        </button>

        <button
          className="SearchField__remove"
          onClick={this.goStartPage}
        >
          remove all query params
        </button>
      </form>
    );
  }
}

export default SearchField;
