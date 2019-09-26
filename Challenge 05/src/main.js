import { Book } from './components/book/book';

function loadData(callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', './data.json');
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    }

    xobj.send(null);
}

function parseResponse(response) {
    const jsonArray = JSON.parse(response);
    return jsonArray.map((jsonBook) => new Book(jsonBook));
}

function displayBooks(bookArray) {
    const bookView = document.getElementById('book-view');
    bookArray.forEach(book => {
        bookView.appendChild(book.element);
    });
}

loadData((response) => displayBooks(parseResponse(response)));