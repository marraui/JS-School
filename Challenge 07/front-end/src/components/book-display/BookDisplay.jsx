import React, { Component } from 'react';
import './BookDisplay.scss'
import BookGroup from '../book-group/BookGroup';

export default class BookDisplay extends Component {
  constructor(props) {
    super(props);
    this.bookGroup = React.createRef();
  }

  render() {
    return (
      <div className="main">
        <div className="main-header">
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
        </div>
        <BookGroup ref={this.bookGroup} />
      </div>
    );
  }
}
