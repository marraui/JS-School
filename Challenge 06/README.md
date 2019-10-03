# Challenge 06

For this challenge we had to make a server using Node.js and express.

## How to run

In order to run the server you need to install Docker, Node, and npm.

* Clone the repository using git.

* Run ```docker-compose build``` in the command line to build the project.

* Run ```docker-compose up``` in the command line to run the project.

## Access points

The api has the following access points:

* POST /register: POST request to register a new user, inside the body of the request should be an "email" and a "password" parameter.

* POST /login: POST request to login a user, inside the body of the request should be an "email" and a "password" parameter.

* GET /api/book: GET request that returns an array of books. This request can have any of the following parameters:

    * id: Id of the book to be searched (Using the /api/book/:id path is recommended).
    
    * author: Name of the author of the book.

    * publishedDate: Date when the book was published.
    
    * description: Description of the book.

    * pageCount: Number of pages in the book.

    * averageRating: The average rating of the book given by critics.

    * thumbnail: Url of the book's thumbnail image.

* GET /api/book/:id: GET request for getting a book given its id.

* GET /api/lend/:id: GET request for lending a book given its id, returns a lent info json object with the timestamp when the lent was made.

* GET /api/return/:id: GET request for returning a book that's been lent given its id, returns the lent info object with the timestamp when the book was returned.

## Dummy Data

For testing purposes each time the container is run the database is dropped and then populated with the books inside data.json. This is done inside the mongo-seed container.
