import 'source-map-support/register';
import { MongoClient } from 'mongodb';
import { Book } from './book';
import { User } from './user';
import { LentInfo } from './lent';
import { toPlain } from '../utils/to_plain_object';

export class DatabaseManager {
    constructor (db) {
        this.url = db && db.url || 'mongo';
        this.port = db && db.port || 27017;
        this.client = db && db.client || null;
    }

    async connect () {
        this.client = await MongoClient.connect(`mongodb://${this.url}:${this.port}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        this.db = this.client.db('bookshelf_db');
    }

    /**
     * 
     * @param {Book} book 
     * @returns {Promise<Book>}
     */
    async insertBook(book) {
        if (!this.db) return false;
        const bookCollection = this.db.collection('book');
        const response = await bookCollection.insertOne(Object({}, book));
        const insertedBook = response && response.ops && response.ops[0] || null;
        if(insertedBook) return insertedBook;
        return new Book(insertedBook);
    }

    /**
     * @returns {Promise<Book[]>}
     */
    async getBooks(params) {
        if (!this.db) return [];
        const bookCollection = this.db.collection('book');
        const books = await bookCollection.find(toPlain(params)).toArray();
        return books.map(book => new Book(book));
    }

    /**
     * @param {string} id
     * @returns {Promise<Book>}
     */
    async getBookById(id) {
        if (!this.db) return;
        const bookCollection = this.db.collection('book');
        const book = await bookCollection.findOne({id: id});
        if (!book) return book;
        return new Book(book);
    }


    /**
     * @param {User} user 
     * @returns {Promise<User>}
     */
    async insertUser(user) {
        if (!this.db) return false;
        const userCollection = this.db.collection('user');
        const response = await userCollection.insertOne(toPlain(user));
        const insertedUser = response && response.ops && response.ops[0] || null;
        if (insertedUser) return insertedUser;
        return new User(insertedUser);
    }

    /** 
     * @param {string} email
     * @param {string} password
     * @returns {Promise<User>}
    */
    async getUser(email, password=null) {
        if (!this.db) return;
        const userCollection = this.db.collection('user');
        const searchParameters = {...{email: email}, ...(password ? {password: password} : {})};
        const user = await userCollection.findOne(searchParameters);
        if (!user) return user;
        return new User(user);
    }

    /**
     * 
     * @param {string} bookId
     * @param {string} userEmail
     * @param {number} lentTime
     * @param {number} returnedTime
     * @returns {Promise<LentInfo[]>}
     */
    async getLentInfos(bookId=null, userEmail=null, lentTime=null, returnedTime=null) {
        if (!this.db) return;
        const lendCollection = this.db.collection('lend');
        const params = {
            ... (bookId ? {"book:id": bookId} : {}),
            ... (userEmail ? {"user.email": userEmail} : {}),
            ... (lentTime ? {lentTime: lentTime} : {}),
            ... (returnedTime ? {returnedTime: retruned} : {})
        }
        const lentInfos = await lendCollection.find(params).toArray();
        return lentInfos.map(lent => new LentInfo(lent));
    }

    /**
     * 
     * @param {string} bookId
     * @param {string} userEmail
     * @returns {Promise<LentInfo>} 
     */
    async getLatestsLentInfo(bookId, userEmail=null) {
        if (!this.db) return;
        const lendCollection = this.db.collection('lend');
        const params = {
            ... {"book.id": bookId},
            ... (userEmail ? {"user.email": userEmail} : {})
        };

        const latestLentArray = await lendCollection.find(params).sort({lentTime: -1}).limit(1).toArray();
        const latestLent = latestLentArray[0];

        if (!latestLent) return latestLent;
        return new LentInfo(latestLent);
    }

    /**
     * 
     * @param {LentInfo} lentInfo 
     * @returns {Promise<LentInfo>}
     */
    async insertLentInfo(lentInfo) {
        if (!this.db) return;
        const lendCollection = this.db.collection('lend');
        const response = await lendCollection.insertOne(toPlain(lentInfo));
        const insertedLentInfo = response && response.ops && response.ops[0] || null;
        if (!insertedLentInfo) return insertedLentInfo;
        return new LentInfo(insertedLentInfo);
    }

    /**
     * 
     * @param {string} bookId
     * @param {string} userEmail
     * @param {number} lentTime
     * @param {LentInfo} lentInfo
     * @returns {Promise<LentInfo>} lentInfo
     */
    async updateLentInfo(bookId, userEmail, lentTime, lentInfo) {
        if (!this.db) return;
        const lendCollection = this.db.collection('lend');
        const response = await lendCollection.findOneAndUpdate({
            "book.id": bookId,
            "user.email": userEmail,
            lentTime: lentTime
        }, {
            $set: toPlain(lentInfo)
        }, {
            returnOriginal: false
        });

        const updatedLentInfo = response && response.value || null;

        if (!updatedLentInfo) return updatedLentInfo;
        return new LentInfo(updatedLentInfo);
    }
}

const dbConnection = new DatabaseManager();
export { dbConnection };