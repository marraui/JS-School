# Challenge 09

For this challenge we had to refactor the code in order to use Redux and styled components inside the application. 

## How to run

Make sure to read the README files inside the front-end and back-end directory. Once you run both of them you can start using the application

## How it works

### Redux

A global state is kept using redux, inside it the application stores the following information:

* Authorization token for a user when he's logged in.

* Books being displayed.

* Filtering parameters:
    * Search input
    * City
    * Format
    * Page

In order to use redux inside the application redux, and react-redux were added as dependencies to the project. There are also 3 new subdirectories inside the front-end directory:

* store: Where the Redux store is created.
* actions: Where all the action creators are defined.
* reducers: Where all the reducers are defined

There's also a new filed action-types.js, inside a constants directory, that exports all actions types as const variables to avoid typos.

### Styled components

Inside each component folder a new file called Layout.js was created, inside it there are all the styled components necessary to build the component. The sass filed inside each component were removed.

## Notes

This time npm was changed for yarn. Make sure yarn is installed globally in your machine.

```npm install -g yarn```

## Trouble Shooting

If the server is not responding to any of the requests it might be because there's another container using the same port. Stop and remove all containers, and then build and run the server container again in order to fix it.
