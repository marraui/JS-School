# Challenge 09

For this challenge we had to use sockets for real time notifications and rxjs to make the appliction more reactive.

## How to run

Make sure to read the README files inside the front-end and back-end directory. Once you run both of them you can start using the application

## How it works

### Sockets

In order to implement sockets a new class was created in the backed called "SocketManager" which handles new connections and handle the reception and emittion of messages, and in the front-end once a new book components is mounted, a new socket connection is made with the backend that listens for any changes for said book.

When a user makes a book reservation a message is emitted to any other users viewing said book informing that it just became unavailable. There's also a task running daily at midnight (UTC time) that check for any books that became available in order to send a notification.

### RxJS

All ajax request were changed to be made using RxJS. RxJS was also used in the backend in order to run a daily task at midnight for checking any books that recently became available.

## Notes

This time npm was changed for yarn. Make sure yarn is installed globally in your machine.

```npm install -g yarn```

## Trouble Shooting

If the server is not responding to any of the requests it might be because there's another container using the same port. Stop and remove all containers, and then build and run the server container again in order to fix it.
