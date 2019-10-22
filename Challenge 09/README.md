# Challenge 08

For this challenge we had to add routing to a login page, authentication handling, and routing to last week's project. 

## How to run

Make sure to read the README files inside the front-end and back-end directory. Once you run both of them you can start using the application

## How it works

### Login Component

The login component is a form with an email input and a password input, along side with the button that allow for both registering a new user and also logging in with an already existing user. Once the user logs in, the server responds with a javascript web token that is used for all requests inside the application.

### Reservation Component

In order to make use of the lend access point inside the server a new component needed to be made that allows the user to make a reservation of any physical book in an interval of time. This component asks for the date for when the book will me taken, and an input for when the book will be returned. In order to ask for date's input the react-datepicker library was used.

### Router

Since now the application had two views, the main one, and the login view, it was necessary to handle routing inside the website. The router will show login view if there's no token inside the session storage, otherwise it will show the main view.

The application stores the filtering parameters in the url, that way, when the user add a new filter, the application adds it to the url and the necessary components update automatically.

### Pagination

Pagination parameter were added to the backend, by default it shows 9 results per page. Because of this now the structure for the response of ```api/book``` changed a bit, now the results are inside a ```books``` variable and along side it there's some metadata, that being, the current page and the total number of books.

## Notes

This time npm was changed for yarn. Make sure yarn is installed globally in your machine.

```npm install -g yarn```

## Trouble Shooting

If the server is not responding to any of the requests it might be because there's another container using the same port. Stop and remove all containers, and then build and run the server container again in order to fix it.
