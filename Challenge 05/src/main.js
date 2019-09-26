import { Book } from './components/book/book';

function loadData(callback) {
    console.log('loading data');
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', './data.json');
    xobj.onreadystatechange = function () {
        console.log(`status: ${xobj.status}, ${typeof xobj.status}`);
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    }

    xobj.send(null);
}

function parseResponse(response) {
    console.log('received response');
    console.log(response);
    const jsonArray = JSON.parse(response);
    return jsonArray.map((jsonBook) => new Book(jsonBook));
}

function displayBooks(bookArray) {
    const bookView = document.getElementById('book-view');
    bookArray.forEach(book => {
        console.log(book);
        console.log(book.element);
        bookView.appendChild(book.element);
    });
}

console.log('main');
loadData((response) => displayBooks(parseResponse(response)));