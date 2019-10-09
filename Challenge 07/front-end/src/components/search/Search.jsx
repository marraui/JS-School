import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSearch } = this.props;
    const { searchInput } = this.state;
    console.log('On Search in Search');
    console.log(onSearch);
    onSearch(searchInput);
    console.log(`Submitted: ${searchInput}`);
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
  onSearch: PropTypes.func,
};

Search.defaultProps = {
  onSearch: () => {},
};
