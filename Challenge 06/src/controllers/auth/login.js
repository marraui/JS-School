import { dbConnection } from '../../models/dbmanager';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export async function login (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    let error;
    if (!email) {
        console.log(`login -> Missing email`);
        return res.status(HttpStatus.BAD_REQUEST).send({ message: 'No email provided' });
    }
    
    if (!password) {
        console.log(`login -> Missing password`);
        res.status(HttpStatus.BAD_REQUEST).send({ messge: 'No password provided' });
        return;
    }

    let user;
    const hashPassword = bcrypt.hashSync(password, 10);
    user = await dbConnection.getUser(email).catch(err => {
        console.log(`Login -> Error looking for user, error: ${err.message}`);
        error = err;
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: 'Error looking for user'});
    });
    if (error) return;

    if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({ message : 'User not found' });
        console.log(`Login -> User wasn't found`);
        return;
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
        console.log(`Login -> Password incorrect`);
        res.status(HttpStatus.UNAUTHORIZED).send( { message: 'Password incorrect' } );
    }

    console.log(`login -> User found successfully`);
    res.status(HttpStatus.OK).json({ token: jwt.sign(Object.assign({}, user), 'RESTFULAPIs') });
    return;
}