import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse, stringify } from 'query-string';
import Config from 'Config';

import './Pagination.scss';

class Pagination extends Component {
  static propTypes = {
    pageCount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    currentPage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    getAllStaff: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static defaultProps = {
    pageCount: 0,
    currentPage: 0,
  };

  static displayName = 'Pagination';

  componentWillReceiveProps(nextProps) {
    const {
      pageCount,
      currentPage,
    } = this.props;

    if (pageCount !== nextProps.pageCount && currentPage !== nextProps.currentPage) {
      const {
        location: {
          pathname,
          search,
        },
      } = nextProps;

      this.pushNewLocation({
        page: nextProps.currentPage,
        pathname,
        search,
      });
    }
  };

  shouldComponentUpdate(nextProps) {
    const {
      pageCount,
      currentPage
    } = this.props;

    return (
      Number(pageCount) !== Number(nextProps.pageCount)
      || Number(currentPage) !== Number(nextProps.currentPage)
    );
  }

  goToPage = (page) => {
    const {
      getAllStaff,
      currentPage,
      pageCount,
      location: {
        pathname,
        search,
      },
    } = this.props;

    if (Number(page) === Number(currentPage) || page < 1 || page > pageCount) {
      return;
    }

    const newSearch = { ...parse(search) };

    getAllStaff({
      perPage: Config.perPage,
      page,
      text: newSearch.text,
    });

    this.pushNewLocation({
      page,
      pathname,
      search,
    });
  };

  pushNewLocation = ({
    page,
    pathname,
    search,
  }) => {
    const {
      history: {
        push,
      },
    } = this.props;

    const newSearch = { ...parse(search) };

    if (page > 1) {
      newSearch.page = page;
    } else {
      delete newSearch.page;
    }

    push({
      pathname,
      search: stringify(newSearch),
    });
  };

  render() {
    const {
      pageCount,
      currentPage,
    } = this.props;

    const count = Array.from({ length: pageCount }, (v, k) => k + 1);

    return (
      <div className="Pagination">
        {count.length > 1 && (
          <button
            onClick={() => { this.goToPage(1); }}
          >
            First Page
          </button>
        )}

        {count.length > 1 && (
          <button
            onClick={() => { this.goToPage(Number(currentPage) - 1); }}
          >
            Prev Page
          </button>
        )}

        {count.map(item => (
          <span
            key={item}
            className={`Pagination__page ${Number(currentPage) === Number(item) ? 'Pagination__page--active' : ''}`}
            onClick={() => { this.goToPage(item); }}
            role="button"
            tabIndex={0}
          >
            {item}
          </span>
        ))}

        {count.length > 1 && (
          <button
            onClick={() => { this.goToPage(Number(currentPage) + 1); }}
          >
            Next Page
          </button>
        )}

        {count.length > 1 && (
          <button
            onClick={() => { this.goToPage(pageCount); }}
          >
            Last Page
          </button>
        )}
      </div>
    );
  }
}

export default Pagination;
