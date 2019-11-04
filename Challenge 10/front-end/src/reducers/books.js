import Swal from 'sweetalert2';
import {
  BOOKS_FETCHED,
  UPDATE_BOOK,
  BOOKS_FETCHED_ERROR,
} from '../constants/action-types';

export default function books(state = [], action) {
  if (action.type === BOOKS_FETCHED_ERROR) {
    const message = action.payload.status !== 204 ? action.payload.response.message : 'No content';
    Swal.fire('Error', `Error fetching books in, error: ${message}`, 'error');
  }

  if (action.type !== BOOKS_FETCHED && action.type !== UPDATE_BOOK) return state;

  if (action.type === UPDATE_BOOK) {
    return state.map((book) => {
      if (book.id === action.payload.id && book.id) return action.payload;
      return book;
    });
  }

  if (!action.payload) return state;

  const booksResponse = action.payload;

  return booksResponse.map((book) => ({
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
}
