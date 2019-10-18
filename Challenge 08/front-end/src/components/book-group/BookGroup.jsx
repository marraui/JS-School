import React, { Component } from 'react';
import './BookGroup.scss';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Book from '../book/Book';

class BookGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      query: '',
      loading: false,
      bookSelected: null,
    };
    this.params = {
      page: 1,
      resPerPage: 9,
    };

    this.selectBook = this.selectBook.bind(this);
    this.unselectBook = this.unselectBook.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.search === prevState.query) return null;
    return {
      query: nextProps.location.search,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.setState({
      query: location.search,
    });
    this.fetchBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (prevState.query !== query) {
      this.fetchBooks();
    }
  }

  fetchBooks() {
    const { query } = this.state;
    const urlSearchParams = new URLSearchParams(query);
    const params = Object.fromEntries(urlSearchParams);

    const token = sessionStorage.getItem('token');
    if (!params.searchInput) delete params.searchInput;

    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);
    const url = new URL('http://localhost:3001/api/book');
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    this.setState({
      loading: true,
    });

    fetch(url, {
      headers,
    }).then((response) => response.json()).then((jsonResponse) => {
      const {
        books,
        resPerPage,
        page,
        totalResults,
      } = jsonResponse;

      const bookElements = books.map((book) => ({
        title: book.title,
        author: book.author,
        publishedDate: book.publishedDate ? book.publishedDate.split('-')[0] : 'Not available',
        description: book.description,
        roundedAverageRating: book.averageRating ? Math.round(book.averageRating) : 0,
        thumbnail: book.thumbnail,
        id: book.id,
        key: book.id,
        pageCount: `${book.pageCount}`,
      }));

      const { updateCallback } = this.props;
      updateCallback({
        resPerPage,
        page,
        totalResults,
      });

      this.setState({
        books: bookElements,
        loading: false,
      });
    });
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
    const { books, loading, bookSelected } = this.state;
    if (loading) {
      return (
        <div className="load-container">
          <ReactLoading type="spin" color="#5EB4DD" />
        </div>
      );
    }
    return (
      <div className="book-view">
        {books.map((book) => (
          <Book
            title={book.title}
            author={book.author}
            publishedDate={book.publishedDate}
            description={book.description}
            roundedAverageRating={book.averageRating}
            thumbnail={book.thumbnail}
            id={book.id}
            key={book.id}
            pageCount={`${book.pageCount}`}
            selected={bookSelected && bookSelected === book.id}
            selectBook={this.selectBook}
            unselectBook={this.unselectBook}
          />
        ))}
      </div>
    );
  }
}

BookGroup.paramKeys = ['searchInput', 'city', 'format', 'page', 'resPerPage'];

BookGroup.propTypes = {
  updateCallback: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

BookGroup.defaultProps = {
  updateCallback: () => {},
  location: {
    search: '',
  },
};

export default withRouter(BookGroup);
