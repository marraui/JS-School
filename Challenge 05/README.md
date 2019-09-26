# Challenge 05

Challenge 05 continues where Challenge 03 left off. For this challenge we had to make a script that extracts information about different books from the Google Books API. Then we have to add said books to the bookshelf website dynamically using JavaScript.

## Requirements

Install node.js and npm

## How to run

* Follow the instructions [here](https://developers.google.com/books/docs/v1/using?hl=es-419#auth) to get an API key for your application.

* Write your API key inside a text file called "api-key.txt" and store it inside the "Challenge 05" folder.

* Run ```npm install``` to install all the dependencies inside the project

* Run ```npm run build``` or ```npm run-script build``` to generate the dist directory.

* Open localhost:9000 inside the browser.

### Options

* If you just want to execute the script that fetched the datas from the Books API then run ```npm run fetch-data``` inside the command line.

* If you want to generate the dist folder but don't want to fetch the data again, run ```npm run gulp``` inside the command line.

* If you want to open the server without generating the dist folder again run ```npm start```

## How it works

* In order to extract the data the project uses a JavaScript file that runs on node before compiling the application. The script extract the API key from the "api-key.txt" file and makes and http GET to the api with parameters for the key, maxResults (In order to get 30 books without needing to do pagination), and the q parameter to search for books of horror genre.

* Inside the website there's a Book component that contains html file with the template for the component and a JavaScript file with a class for the component. Then for each to be displayed, a new Book component inside the main.js file and added to the html.

* For building the project gulp and babel were used. The javascript code is compiled minimized and put into a single file to optimize the performance in the browser.

* Sourcemaps were used to facilitate the debugging of the application.