import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';
export async function verifyWebToken (req, res, next) {
    req.user = null;
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        req.user = jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs');
        if (req.user.email && req.user.password) req.user = new User(req.user);
    }

    next();
}