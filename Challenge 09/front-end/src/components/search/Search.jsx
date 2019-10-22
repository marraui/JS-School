import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.scss';
import { withRouter } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import objectToQueryString from '../../utils/object-to-query-string';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const params = Object.fromEntries(new URLSearchParams(location.search));
    if (params.searchInput) {
      this.setState({
        searchInput: params.searchInput,
      });
    }
  }

  handleInputChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history, location } = this.props;
    const { searchInput } = this.state;
    const params = Object.fromEntries(new URLSearchParams(location.search));
    if (searchInput) params.searchInput = searchInput;
    else delete params.searchInput;
    params.page = 1;
    const queryParams = objectToQueryString(params);
    history.push(`?${queryParams}`);
  }

  render() {
    const { searchInput } = this.state;
    return (
      <div className="search">
        <div className="bookshelf-title">Bookshelf</div>
        <form onSubmit={this.handleSubmit} className="searchbox">
          <label htmlFor="searchbox-input" className="input-wrapper">
            <i className="fa fa-search" />
            <input
              id="searchbox-input"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" className="submit" />
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape(historyPropTypes).isRequired,
};

Search.defaultProps = {
  location: {
    search: '',
  },
};


export default withRouter(Search);
