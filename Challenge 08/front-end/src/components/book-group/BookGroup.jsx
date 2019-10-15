import React, { Component } from 'react';
import './BookGroup.scss';
import Book from '../book/Book';

export default class BookGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.params = {};
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    const { params } = this;
    const token = sessionStorage.getItem('token');
    if (!params.searchInput) delete params.searchInput;

    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);
    const url = new URL('http://localhost:3001/api/book');
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    fetch(url, {
      headers,
    }).then((response) => response.json()).then((books) => {
      const bookElements = books.map((book) => (
        <Book
          title={book.title}
          author={book.author}
          publishedDate={book.publishedDate ? book.publishedDate.split('-')[0] : 'Not available'}
          description={book.description}
          roundedAverageRating={book.averageRating ? Math.round(book.averageRating) : 0}
          thumbnail={book.thumbnail}
          id={book.id}
          key={book.id}
          pageCount={`${book.pageCount}`}
        />
      ));

      this.setState({
        books: bookElements,
      });
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="book-view">
        {books}
      </div>
    );
  }
}
