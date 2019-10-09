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
    if (!params.searchInput) delete params.searchInput;
    
    const headers = new Headers();
    headers.set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2FsZXNtYXJyYXVpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkVzMyUEJRNzNYNXBCNjU2UFlERk42ZUZpVDV3cThUVWlYMWxpWU5KUDRoMFhUbnE1ZjBUYjIiLCJpYXQiOjE1NzAzOTIyNDB9.Cu5cAFIH98A1t2L6hirfT8ENJ0wHEMBmeqRye2IMp7c');
    const url = new URL('http://localhost:3001/api/book');
    console.log('params');
    console.log(params);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    fetch(url, {
      headers: {
        Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2FsZXNtYXJyYXVpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkVzMyUEJRNzNYNXBCNjU2UFlERk42ZUZpVDV3cThUVWlYMWxpWU5KUDRoMFhUbnE1ZjBUYjIiLCJpYXQiOjE1NzAzOTIyNDB9.Cu5cAFIH98A1t2L6hirfT8ENJ0wHEMBmeqRye2IMp7c',
      },
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
