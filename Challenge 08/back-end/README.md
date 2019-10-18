# Run the Back End

* Install docker in your computer

* Go inside the back-end directory: ```cd ./Challenge\ 08/back-end```.

* Make sure to store your private key inside a "private-key.txt" file, inside the back-end directory.

* Run ```docker-compose build``` to build the project.

* Run ```docker-compose up``` to run to server.

## Trouble Shooting

If the server is not responding to any of the requests it might be because there's another container using the same port. Stop and remove all containers, and then build and run the server container again in order to fix it.