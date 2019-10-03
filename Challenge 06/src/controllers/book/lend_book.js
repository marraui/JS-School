import * as HttpStatus from 'http-status-codes';
import { dbConnection } from '../../models/dbmanager';
import { LentInfo } from '../../models/lent';

export async function lendBook(req, res, next) {
    const user = req.user;
    const id = req.params.id;
    let error;

    if (!id) {
        console.log(`Lend book -> No book id provided`);
        res.status(HttpStatus.BAD_REQUEST).send({ message: 'No book id provided' });
        return;
    }

    const book = await dbConnection.getBookById(id).catch(err => {
        error = err;
        console.log(`Lend book -> Error finding book, err: ${err.message}`);
        console.log(err.stack);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error finding book'});
    });
    if (error) return;

    if (!book) {
        console.log(`Lend book -> Book wasn't found`);
        res.status(HttpStatus.NOT_FOUND).send({ message: 'No book found with the id provided' });
        return;
    }

    if (book.format == 'Digital') {
        console.log(`Lend book -> Can not lend digital book`);
        res.status(HttpStatus.BAD_REQUEST).send({message: 'Can not lend digital book'});
        return;
    }

    const lentInfo = await dbConnection.getLatestsLentInfo(book.id).catch(err => {
        error = err
        console.log(`Lend book -> Error finding lent information, error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error finding lent information' });
    });
    if (error) return;

    if (lentInfo && !lentInfo.returnedTime) {
        console.log(`Lend book -> Book is not available`);
        res.status(HttpStatus.NO_CONTENT).send({ message: 'Book is already lent to a user' });
        return;
    }

    const updatedBook = await dbConnection.insertLentInfo(new LentInfo({
        book: book,
        user: user
    })).catch(err => {
        error = err
        console.log(`Lend book -> Error insert lend information, Error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error inserting information'});
    });
    if (error) return;

    console.log(`Lend book -> Book lent successfully`);
    res.status(HttpStatus.OK).json(updatedBook);
    return;
}