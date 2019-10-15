import * as HttpStatus from 'http-status-codes';
import { dbConnection } from '../../models/dbmanager';

export async function getBooks(req, res, next) {
    let error;
    const searchInput = req.query.searchInput ? req.query.searchInput : undefined;
    const params = req.query;
    delete params.searchInput;

    const books = await dbConnection.getBooks(params, searchInput).catch(err => {
        error = err;
        console.log(`Get books -> Error getting books, error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error getting books'});
    });
    if (error) return;

    if (books === null || books === undefined) {
        console.log(`Get books -> Error finding books`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error finding books' });
    }
    console.log(`Get books -> books retrieved successfully`);
    res.status(HttpStatus.OK).json(books);
}