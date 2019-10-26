import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Book from '../book/Book';
import {
  BookGroupContainer,
  LoadContainer,
} from './Layout';

function mapStateToProps(state) {
  return {
    books: state.books,
    fetchingBooks: state.fetchingBooks,
  };
}
class BookGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookSelected: null,
    };
    this.params = {
      page: 1,
      resPerPage: 9,
    };

    this.selectBook = this.selectBook.bind(this);
    this.unselectBook = this.unselectBook.bind(this);
  }

  selectBook(bookId) {
    this.setState({
      bookSelected: bookId,
    });
  }

  unselectBook(bookId) {
    const { bookSelected } = this.state;
    if (bookSelected === bookId) {
      this.setState({
        bookSelected: null,
      });
    }
  }

  render() {
    const { bookSelected } = this.state;
    const {
      books,
      fetchingBooks: loading,
    } = this.props;
    if (loading) {
      return (
        <LoadContainer>
          <ReactLoading type="spin" color="#5EB4DD" />
        </LoadContainer>
      );
    }
    return (
      <BookGroupContainer>
        {books.map((book) => (
          <Book
            title={book.title}
            author={book.author}
            publishedDate={book.publishedDate}
            description={book.description}
            roundedAverageRating={book.roundedAverageRating}
            thumbnail={book.thumbnail}
            id={book.id}
            key={book.id}
            pageCount={`${book.pageCount}`}
            selected={bookSelected && bookSelected === book.id}
            selectBook={this.selectBook}
            unselectBook={this.unselectBook}
          />
        ))}
      </BookGroupContainer>
    );
  }
}

BookGroup.paramKeys = ['searchInput', 'city', 'format', 'page', 'resPerPage'];

BookGroup.propTypes = {
  fetchingBooks: PropTypes.bool,
  books: PropTypes.arrayOf({
    title: PropTypes.string,
    author: PropTypes.string,
    publishedDate: PropTypes.string,
    description: PropTypes.string,
    roundedAverageRating: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.string,
    pageCount: PropTypes.string,
  }),
};

BookGroup.defaultProps = {
  fetchingBooks: false,
  books: [],
};

export default withRouter(connect(mapStateToProps)(BookGroup));
