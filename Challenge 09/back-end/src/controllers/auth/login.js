import { dbConnection } from '../../models/dbmanager';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { privateKey } from '../../private-key';

export async function login (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    let error;
    if (!email) {
        console.log(`Login -> Missing email`);
        return res.status(HttpStatus.BAD_REQUEST).send({ message: 'No email provided' });
    }
    
    if (!password) {
        console.log(`Login -> Missing password`);
        res.status(HttpStatus.BAD_REQUEST).send({ message: 'No password provided' });
        return;
    }

    let user;
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
        return
    }
    
    console.log(`Login -> User found successfully`);
    res.status(HttpStatus.OK).json({ token: jwt.sign(Object.assign({}, user), privateKey) });
    return;
}