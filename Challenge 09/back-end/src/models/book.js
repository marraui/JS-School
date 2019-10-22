export class Book {
    constructor (book) {
        this.title = book && book.title || '';
        this.authors = book && book.authors || [];
        this.author = this.authors.length > 0 ? this.authors[0] : 'Not available';
        this.publishedDate = book && book.publishedDate || '';
        this.description = book && book.description || '';
        this.pageCount = book && book.pageCount || 'Not available';
        this.averageRating = book && book.averageRating || 0;
        this.thumbnail = book && book.thumbnail || '';
        this.id = book && book.id || '';
        this.format = book && book.format || '';
        this.city = book && book.city || '';
    }
}