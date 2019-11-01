import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { withTheme } from 'styled-components';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import Book from '../book/Book';
import {
  BookGroupContainer,
  LoadContainer,
} from './Layout';
import * as actions from '../../actions/index';
import { themePropType } from '../../styles/theme';

function mapStateToProps(state) {
  return {
    books: state.books,
    fetchingBooks: state.fetchingBooks,
    page: state.page,
    city: state.city,
    format: state.format,
    searchInput: state.search,
    token: state.authentication,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectPage: (page) => dispatch(actions.selectPage(page)),
    booksFetched: (books) => dispatch(actions.booksFetched(books)),
    resPerPage: (payload) => dispatch(actions.resPerPage(payload)),
    totalOfBooks: (payload) => dispatch(actions.totalOfBooks(payload)),
    fetchingBooksCreator: (payload) => dispatch(actions.fetchingBooks(payload)),
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

  componentDidMount() {
    const {
      page,
      city,
      format,
      searchInput,
    } = this.props;

    const params = {
      page,
      ...(searchInput ? { searchInput } : {}),
      ...(city !== 'any' ? { city } : {}),
      ...(format !== 'any' ? { format } : {}),
    };

    if (params.page && params.page !== 0) {
      this.fetchBooks(params);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      page,
      city,
      format,
      searchInput,
    } = this.props;

    const pageChanged = prevProps.page !== page;
    const cityChanged = prevProps.city !== city;
    const formatChanged = prevProps.format !== format;
    const searchChanged = prevProps.searchInput !== searchInput;

    if (pageChanged || cityChanged || formatChanged || searchChanged) {
      const params = {
        page,
        ...(searchInput ? { searchInput } : {}),
        ...(city !== 'any' ? { city } : {}),
        ...(format !== 'any' ? { format } : {}),
      };

      this.fetchBooks(params);
    }
  }

  fetchBooks(params) {
    const {
      token,
      selectPage,
      fetchingBooksCreator,
      booksFetched,
      resPerPage: resPerPageCreator,
      totalOfBooks: totalOfBooksCreator,
    } = this.props;
    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);
    const url = new URL('http://localhost:3001/api/book');
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    fetchingBooksCreator(true);
    from(fetch(url, { headers })).pipe(
      flatMap((response) => {
        if (response.status === 204) throw new Error('No content');
        return response.json();
      }),
      map((jsonResponse) => {
        if (jsonResponse.message) throw new Error(jsonResponse.message);
        return jsonResponse;
      }),
    ).subscribe((jsonResponse) => {
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
        format: book.format,
        available: book.available,
      }));

      resPerPageCreator(resPerPage);
      selectPage(Number(page));
      totalOfBooksCreator(totalResults);
      booksFetched(bookElements);
    }, (err) => {
      Swal.fire('Error', `There was an error trying to fetch books, Error: ${err.message}`, 'error');
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
    const { bookSelected } = this.state;
    const {
      books,
      fetchingBooks: loading,
      theme,
    } = this.props;
    if (loading) {
      return (
        <LoadContainer>
          <ReactLoading type="spin" color={theme.lightSecondary} />
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
            format={book.format}
            selected={bookSelected && bookSelected === book.id}
            selectBook={this.selectBook}
            unselectBook={this.unselectBook}
            available={book.available}
          />
        ))}
      </BookGroupContainer>
    );
  }
}

BookGroup.paramKeys = ['searchInput', 'city', 'format', 'page', 'resPerPage'];

BookGroup.propTypes = {
  fetchingBooks: PropTypes.bool,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    publishedDate: PropTypes.string,
    description: PropTypes.string,
    roundedAverageRating: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.string,
    pageCount: PropTypes.string,
    available: PropTypes.bool,
  })),
  page: PropTypes.number,
  city: PropTypes.string,
  format: PropTypes.string,
  searchInput: PropTypes.string,
  token: PropTypes.string,
  selectPage: PropTypes.func.isRequired,
  booksFetched: PropTypes.func.isRequired,
  resPerPage: PropTypes.func.isRequired,
  totalOfBooks: PropTypes.func.isRequired,
  fetchingBooksCreator: PropTypes.func.isRequired,
  theme: themePropType.isRequired,
};

BookGroup.defaultProps = {
  fetchingBooks: false,
  books: [],
  page: 1,
  format: 'any',
  searchInput: '',
  city: 'any',
  token: '',
};

export default withRouter(withTheme(connect(mapStateToProps, mapDispatchToProps)(BookGroup)));
