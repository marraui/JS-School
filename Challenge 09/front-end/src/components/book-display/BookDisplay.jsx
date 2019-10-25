import React, { Component } from 'react';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BookGroup from '../book-group/BookGroup';
import objectToQueryString from '../../utils/object-to-query-string';
import {
  BookDisplayContainer,
  BookDisplayHeader,
  Pagination,
  Arrow,
} from './Layout';

function mapStateToProps(state) {
  return {
    page: state.page,
    resPerPage: state.resPerPage,
    totalResults: state.totalOfBooks,
  };
}
class BookDisplay extends Component {
  constructor(props) {
    super(props);
    this.leftClickHandler = this.leftClickHandler.bind(this);
    this.rightClickHandler = this.rightClickHandler.bind(this);
  }

  leftClickHandler(event) {
    event.stopPropagation();
    const { location, history } = this.props;
    const params = Object.fromEntries(new URLSearchParams(location.search));

    params.page = Math.max(1, (params.page ? Number(params.page) - 1 : 1));

    const queryString = objectToQueryString(params);
    history.push(`?${queryString}`);
  }

  rightClickHandler(event) {
    event.stopPropagation();
    const { location, history } = this.props;
    const params = Object.fromEntries(new URLSearchParams(location.search));

    params.page = (params.page ? Number(params.page) : 1) + 1;
    const queryString = objectToQueryString(params);

    history.push(`?${queryString}`);
  }

  render() {
    const {
      page,
      resPerPage,
      totalResults,
    } = this.props;
    return (
      <BookDisplayContainer>
        <BookDisplayHeader>
          <div className="main-title">
            New Releases
          </div>
          <div className="sort-by">
            <div className="release-date">Release Date</div>
            <div className="popularity">Popularity</div>
          </div>
          <div className="view-style">
            <i className="fa fa-th-large" />
            <i className="fa fa-th-list" />
          </div>
          <Pagination>
            <Arrow
              show={page > 1}
              onClick={this.leftClickHandler}
              onKeyDown={(event) => (event.keyCode === 32 ? this.leftClickHandler(event) : null)}
              tabIndex="0"
              role="button"
            >
              <i className="fa fa-arrow-left" />
            </Arrow>
            <Arrow
              show={page * resPerPage < totalResults}
              onClick={this.rightClickHandler}
              onKeyDown={(event) => (event.keyCode ? this.rightClickHandler(event) : null)}
              tabIndex="0"
              role="button"
            >
              <i className="fa fa-arrow-right" />
            </Arrow>
          </Pagination>
        </BookDisplayHeader>
        <BookGroup ref={this.bookGroup} />
      </BookDisplayContainer>
    );
  }
}

export default withRouter(connect(mapStateToProps)(BookDisplay));

BookDisplay.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape(historyPropTypes).isRequired,
  page: PropTypes.number,
  resPerPage: PropTypes.number,
  totalResults: PropTypes.number,
};

BookDisplay.defaultProps = {
  location: {
    search: '',
  },
  page: 1,
  resPerPage: 0,
  totalResults: 0,
};
