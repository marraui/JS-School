import * as HttpStatus from 'http-status-codes';
import { dbConnection } from '../../models/dbmanager';

export async function getBookById(req, res, next) {
    const id = req.params.id;
    let error;

    console.log(`Get book by id -> id: ${id}`);

    if (!id) {
        console.log(`Get book by id -> No id provided`);
        res.status(HttpStatus.BAD_REQUEST).send({ message: 'No id provided'});
    }


    const book = await dbConnection.getBookById(id).catch(err => {
        error = err;
        console.log(`Get book by id -> Error getting book, error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error getting book'});
    });
    if (error) return;

    if (!book) {
        console.log(`Get book by id -> Book not found`);
        res.status(HttpStatus.NOT_FOUND).send({ message: 'Book not found' });
    }

    res.status(HttpStatus.OK).json(book);
}