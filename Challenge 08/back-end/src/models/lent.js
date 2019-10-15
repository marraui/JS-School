import { Book } from './book';
import { User } from './user';
export class LentInfo {
    constructor(lent) {
        this.book = new Book(lent && lent.book || {});
        this.user = new User(lent && lent.user || {});
        this.lentTime = lent && lent.lentTime || new Date().getTime();
        this.returnedTime = lent && lent.returnedTime || null;
    }
}