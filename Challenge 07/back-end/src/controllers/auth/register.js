import * as HttpStatus from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { dbConnection } from '../../models/dbmanager';
export async function register (req, res, next) {
    const newUser = req.body;
    let error;

    if (!newUser.email) {
        console.log(`Register -> Email parameter missing`);
        res.status(HttpStatus.BAD_REQUEST).send({ message: 'Email parameter missing' });
        return;
    }

    if (!newUser.password) {
        console.log(`Register -> Password parameter missing`);
        res.status(HttpStatus.BAD_REQUEST).send({ message: 'Password parameter missing' });
        return;
    }

    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const user = await dbConnection.getUser(newUser.email).catch(err => {
        console.log(`Register -> Error looking user, err: ${err.message}`);
        error = err;
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error looking for user'});
    });
    if (error) return;

    if (user) {
        console.log(`Register -> Email is already in use`);
        res.status(HttpStatus.CONFLICT).send({ message: 'Email is already in use'});
        return;
    }
    const userInserted = await dbConnection.insertUser(newUser).catch(err => {
        console.log(`Register -> Error inserting user, error: ${err.message}`);
        error = err;
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error inserting user'});
    });
    if (error) return;

    if (!userInserted) {
        console.log(`Register -> Error inserting the user`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error inserting the user' });
        return;
    }

    console.log('Register -> User registered successfully')
    res.status(HttpStatus.OK).json(userInserted);
    return;
}