import express from 'express';
import * as bodyParser from 'body-parser';
import { login, register, loginRequired } from './controllers/login';
import { dbConnection } from './models/dbmanager';
import { verifyWebToken} from './middleware/verify_webtoken';
import * as book from './routes/book';

export class App {
    constructor () {
        this.port = process.env.PORT || 3001;
        this.app = express();
        dbConnection.connect().then(() => {
            console.log('Connected succesfully to database');
            this.app.use(bodyParser.urlencoded({extended: true}));
            this.app.use(bodyParser.json());
    
            this.app.post('/login', login);
            this.app.post('/register', register);
            
            this.app.use(verifyWebToken);
            this.app.use('/api', loginRequired);
            this.app.use('/api/book', book.router);
            this.app.listen(this.port, '0.0.0.0', () => {
                console.error(`Server listening on port ${this.port}`);
            });
            
        }).catch(err => {
            console.log(`App -> Couldn't connect to the database, error: ${err.message}`);
        });
    }
}