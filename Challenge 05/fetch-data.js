const fs = require('fs');
const fetch = require('node-fetch');

async function fetchData (url, params) {
    const response = await fetch(url + (params.length > 0 ? `?${params}` : ''));
    return response.json();
}

function compileJsonObject(jsonResponse) {
    return jsonResponse.items.map((item) => {
        return {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
            pageCount: item.volumeInfo.pageCount,
            averageRating: item.volumeInfo.averageRating,
            thumbnail: item.volumeInfo.imageLinks.thumbnail,
            id: item.id
        };
    });
}

const apiKey = fs.readFileSync('./api-key.txt', 'utf8');

const url = 'https://www.googleapis.com/books/v1/volumes';
const params = `key=${apiKey}&maxResults=30&q=subject:Horror`;

console.log('fetching data');

fetchData(url, params).then((jsonResponse) => {
    return compileJsonObject(jsonResponse);
}).then((compiledJson) => {
    fs.writeFile('./src/data.json', JSON.stringify(compiledJson), (err) => {
        if (err) console.error(err.message);
        else console.log('data fetched succesfully');
    });
});
