# Challenge 06

For this challenge we had to make a server using Node.js and express.

## How to run

In order to run the server you need to install Docker, Node, and npm.

* Clone the repository using git.

* Make sure to store the private key inside a file named "private-key.txt"" in the "Challenge 06" folder. Otherwise the project won't work

* Run ```docker-compose build``` in the command line to build the project.

* Run ```docker-compose up``` in the command line to run the project.

## Access points

The api has the following access points:

* POST /register -> POST request to register a new user, inside the body of the request should be an "email" and a "password" parameter.

* POST /login -> POST request to login a user, inside the body of the request should be an "email" and a "password" parameter.

* GET /api/book -> GET request that returns an array of books. This request can have any of the following parameters:

    * id: Id of the book to be searched (Using the /api/book/:id path is recommended).
    
    * author: Name of the author of the book.

    * publishedDate: Date when the book was published.
    
    * description: Description of the book.

    * pageCount: Number of pages in the book.

    * averageRating: The average rating of the book given by critics.

    * thumbnail: Url of the book's thumbnail image.

* GET /api/book/:id -> GET request for getting a book given its id.

* GET /api/lend/:id -> GET request for lending a book given its id, returns a lent info json object with the timestamp when the lent was made.

* GET /api/return/:id -> GET request for returning a book that's been lent given its id, returns the lent info object with the timestamp when the book was returned.

## How to use the API

The API can be tested making http requests with curl, Postman, or through javascript code.

Before using any of the API functions it's needed to register and login with the user registerd.

* To register make an http POST request to "http://{server_ip}:{port}/register" with an email and password parameter inside the body of the request. Eg: ```curl -d '{"email": "rosalesmarraui@hotmail.com", "password": "abcd"}' -H "Content-Type: application/json" -X POST http://localhost:3001/register```

* To login make an http POST request to "http://{server_ip}:{port}/login" with an email and password parameters inside the body of the request. This will return a JWT that is needed to make any other requests to API. Eg: ```curl -d '{"email": "rosalesmarraui@hotmail.com", "password": "abcd"}' -H "Content-Type: application/json" -X POST http://localhost:3001/login```.

<b>Any other requests to the API require an Authorization parameter to be passed through the headers with the value of "JWT {value of the jwt}"</b>

* To get all books make an http GET request to "http://{server_ip}:{port}/api/book" with the JWT passed through the headers. This request can also pass through the url any of the parameters described above.  Eg: ```curl -H "Content-Type: application/json" -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2FsZXNtYXJyYXVpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYkl6UzFQcEhQQkhmLjlyTWRpNjIxdXhkRzNmdGVsOVdja1ZrVHF6eGZxQmYyOVFUZy5YanUiLCJpYXQiOjE1NzA2NzE2MDd9.bwdS0Jz8_GS6KbKRrQCawCITe-1NFVmzazqpvGmb5fY" -X GET http://localhost:3001/api/book?format=Physical```

* To get a book by its id make an http GET request to "http://{server_ip}:{port}/api/book/{id}" with JWT passed through the headers. This Eg: ```curl -H "Content-Type: application/json" -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2FsZXNtYXJyYXVpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYkl6UzFQcEhQQkhmLjlyTWRpNjIxdXhkRzNmdGVsOVdja1ZrVHF6eGZxQmYyOVFUZy5YanUiLCJpYXQiOjE1NzA2NzE2MDd9.bwdS0Jz8_GS6KbKRrQCawCITe-1NFVmzazqpvGmb5fY" -X GET http://localhost:3001/api/book/jSGMKVHhho8C```.

* To lend a book make an http GET request to "http://{server_ip}:{port}/api/book/lend/{id}" with JWT passed through the headers. Eg: ```curl -H "Content-Type: application/json" -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2FsZXNtYXJyYXVpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYkl6UzFQcEhQQkhmLjlyTWRpNjIxdXhkRzNmdGVsOVdja1ZrVHF6eGZxQmYyOVFUZy5YanUiLCJpYXQiOjE1NzA2NzE2MDd9.bwdS0Jz8_GS6KbKRrQCawCITe-1NFVmzazqpvGmb5fY" -X GET http://localhost:3001/api/book/lend/jSGMKVHhho8C```.

* To return a book make an http GET request to "http://{server_ip}:{port}/api/book/return/{id}" with JWT passed through the headers. Eg: ```curl -H "Content-Type: application/json" -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2FsZXNtYXJyYXVpQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYkl6UzFQcEhQQkhmLjlyTWRpNjIxdXhkRzNmdGVsOVdja1ZrVHF6eGZxQmYyOVFUZy5YanUiLCJpYXQiOjE1NzA2NzE2MDd9.bwdS0Jz8_GS6KbKRrQCawCITe-1NFVmzazqpvGmb5fY" -X GET http://localhost:3001/api/book/return/jSGMKVHhho8C```.

## Dummy Data

For testing purposes each time the container is run the database is dropped and then populated with the books inside data.json. This is done inside the mongo-seed container.
