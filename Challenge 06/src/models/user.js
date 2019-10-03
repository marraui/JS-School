export class User {
    constructor (user) {
        this.email = user && user.email || '';
        this.password = user && user.password || '';
    }
}