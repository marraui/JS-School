import * as HttpStatus from 'http-status-codes';
import { dbConnection } from '../../models/dbmanager';
import { LentInfo } from '../../models/lent';

export async function returnBook(req, res, next) {
    const user = req.user;
    const id = req.params.id;
    let error;
    console.log(`Return book -> Return book`);
    if (!id) {
        console.log(`Return book -> No book id provided`);
        res.status(HttpStatus.BAD_GATEWAY).send({message: 'No book id provided'});
        return;
    }

    const book = await dbConnection.getBookById(id).catch(err => {
        error = err;
        console.log(`Return book -> Error finding book, err: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error finding book' });
    });
    if (error) return;

    if (!book) {
        console.log(`Return book -> Book wasn't found`);
        res.status(HttpStatus.NOT_FOUND).send({ message: 'No book found with the id provided' });
        return;
    }

    if (book.format === 'Digital') {
        console.log(`Return book -> Digital book cannot be returned`);
        res.statu(HttpStatus.BAD_REQUEST).send({message: 'Digital book cannot be returned'});
        return;
    }

    const lentInfo = await dbConnection.getLatestsLentInfo(book.id, user.email).catch(err => {
        error = err
        console.log(`Return book -> Error finding lent information, error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error finding lent information' });
    });
    if (error) return;

    if (!lentInfo || lentInfo.returnedTime) {
        console.log(`Return book -> User hasn't lent book, no need for return`);
        res.status(HttpStatus.BAD_REQUEST).send({message: `User hasn't lent book, no need for return`});
        return;
    }

    lentInfo.returnedTime = new Date().getTime();
    const updatedLentInfo = await dbConnection.updateLentInfo(lentInfo.book.id, lentInfo.user.email, lentInfo.lentTime, lentInfo).catch(err => {
        console.log(`Return book -> Error updating lent info, error: ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error updating lent info'});
        error = err;
    });
    if (error) return;

    console.log(`Return book -> Book returned successfully`);
    res.status(HttpStatus.OK).json(updatedLentInfo);
    return;
}