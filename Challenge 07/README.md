# Challenge 07

For this challenge we had to transform Challenge 05's project into a React application and connect it to the back-end in Challenge 06's project.

## How to run

### Run the Back End

* Install docker in your computer

* Go inside the back-end directory: ```cd ./Challenge\ 07/back-end```.

* Run ```docker-compose build``` to build the project.

* Run ```docker-compose up``` to run to server.

### Run the front end

* Go inside the front-end directory: ```cd ./Challenge\ 07/front-end```.

* Run ```npm install``` to install all the project dependencies

* Run ```npm start``` and the website will open in your default browser.

## How it works

In order to connect the application to the server it was neccessary to make three new components-

### Login Component

The login component is a form with an email input and a password input, along side with the button that allow for both registering a new user and also logging in with an already existing user. Once the user logs in, the server responds with a javascript web token that is used for all requests inside the application.

### Reservation Component

In order to make use of the lend access point inside the server a new component needed to be made that allows the user to make a reservation of any physical book in an interval of time. This component asks for the date for when the book will me taken, and an input for when the book will be returned. In order to ask for date's input the react-datepicker library was used.

### Router

Since now the application had two views, the main one, and the login view, it was necessary to handle routing inside the website. The router will show login view if there's no token inside the session storage, otherwise it will show the main view.

