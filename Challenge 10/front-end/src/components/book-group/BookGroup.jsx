import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { withTheme } from 'styled-components';
import { history as historyPropTypes } from 'history-prop-types';
import Book from '../book/Book';
import objectToQueryString from '../../utils/object-to-query-string';
import {
  BookGroupContainer,
  LoadContainer,
} from './Layout';
import * as actions from '../../actions/index';
import { themePropType } from '../../styles/theme';
import queryStringToObject from '../../utils/query-string-to-object';

function mapStateToProps(state) {
  return {
    books: state.books,
    fetchingBooks: state.fetchingBooks,
    token: state.authentication,
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
      location,
    } = this.props;

    const {
      page = '1',
      city = 'any',
      format = 'any',
      searchInput = '',
    } = queryStringToObject(location.search);
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
      location,
    } = this.props;

    const {
      page = '1',
      city = 'any',
      format = 'any',
      searchInput = '',
    } = queryStringToObject(location.search);

    const {
      page: prevPage = '1',
      city: prevCity = 'any',
      format: prevFormat = 'any',
      searchInput: prevSearchInput = '',
    } = queryStringToObject(prevProps.location.search);
    const pageChanged = prevPage !== page;
    const cityChanged = prevCity !== city;
    const formatChanged = prevFormat !== format;
    const searchChanged = prevSearchInput !== searchInput;

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
      fetchingBooksCreator,
    } = this.props;
    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);
    const url = new URL('http://localhost:3001/api/book');
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    fetchingBooksCreator({
      token,
      params: objectToQueryString(params),
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
  token: PropTypes.string,
  booksFetched: PropTypes.func.isRequired,
  resPerPage: PropTypes.func.isRequired,
  totalOfBooks: PropTypes.func.isRequired,
  fetchingBooksCreator: PropTypes.func.isRequired,
  theme: themePropType.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape(historyPropTypes).isRequired,
};

BookGroup.defaultProps = {
  fetchingBooks: false,
  books: [],
  token: '',
  location: {
    search: '',
  },
};

export default withRouter(withTheme(connect(mapStateToProps, mapDispatchToProps)(BookGroup)));
