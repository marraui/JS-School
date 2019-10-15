import * as HttpStatus from 'http-status-codes';

export async function loginRequired(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        console.log('Login required -> Login required');
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized user' });
    }
}