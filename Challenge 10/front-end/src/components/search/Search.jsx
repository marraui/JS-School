import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import objectToQueryString from '../../utils/object-to-query-string';
import queryStringToObject from '../../utils/query-string-to-object';
import {
  SearchContainer,
  BookshelfTitle,
  SearchBox,
  InputWrapper,
  SubmitButton,
} from './Layout';

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
    const { searchInput = '' } = queryStringToObject(location.search);
    this.setState({
      searchInput,
    });
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
      <SearchContainer>
        <BookshelfTitle>Bookshelf</BookshelfTitle>
        <SearchBox onSubmit={this.handleSubmit}>
          <InputWrapper htmlFor="searchbox-input">
            <i className="fa fa-search" />
            <input
              id="searchbox-input"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={this.handleInputChange}
            />
          </InputWrapper>
          <SubmitButton type="submit" value="Submit" />
        </SearchBox>
      </SearchContainer>
    );
  }
}

Search.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  search: PropTypes.string,
  history: PropTypes.shape(historyPropTypes).isRequired,
};

Search.defaultProps = {
  location: {
    search: '',
  },
  search: '',
};


export default withRouter(Search);
