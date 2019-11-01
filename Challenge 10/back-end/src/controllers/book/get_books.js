import * as HttpStatus from 'http-status-codes';
import { dbConnection } from '../../models/dbmanager';

export async function getBooks(req, res, next) {
    let error;
    const searchInput = req.query.searchInput ? req.query.searchInput : undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const resPerPage = req.query.resPerPage ? Number(req.query.resPerPage) : 9;

    const params = req.query;

    delete params.searchInput;
    delete params.page;
    delete params.resPerPage;
    
    const result = await dbConnection.getBooks(params, searchInput, page, resPerPage).catch(err => {
        error = err;
        console.log(`Get books -> Error getting books, error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error getting books'});
    });
    if (error) return;

    if (result === null || result === undefined) {
        console.log(`Get books -> Error finding books`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error finding books' });
    }

    const availability = await Promise.all(result.books.map((book) => {
        if (book.format === 'Digital') return false;
        const begin = new Date();
        begin.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return dbConnection.isBookAvailable(book.id, begin.getTime(), end.getTime());
    })).catch((err) => {
        error = err;
        console.log(`Get book -> Error getting the availability of books, error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error getting books availability'});
    });
    if (error) return;
    
    for (let i = 0; i < result.books.length; i++) {
        result.books[i].available = availability[i];
    }
    console.log(`Get books -> books retrieved successfully`);
    res.status(HttpStatus.OK).json(result);
}