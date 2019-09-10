# Challenge 02

* Download postman and get information for a superhero from Marvel API
* Access to https://developer.marvel.com/docs and do all steps to get an API key to get access
* Get information related to the list of characters of Cable & Deadpool (2004) #46 (Zombie Variant)
* Get a list of all stories when Agent X (Nijo) appears
* Generate JSON document with this information and push to GitHub repo

The result of the requests to the Marvel API can be found inside the files cable_and_deadpool_46_zombie_characters.json and agent_x_stories.json.

* cable_and_deadpool_46_zombie_characters: Result of the request at http://gateway.marvel.com/v1/public/comics/21845/characters, the id of the comic "Cable & Deadpool (2004) #46 (Zombie Variant)" being 21845. This for the "Get information related to the list of characters of Cable & Deadpool (2004) #46 (Zombie Variant)" request. In order to get the id of the comic I had to make a request to the API method http://gateway.marvel.com/v1/public/comics specifying the parameter for the name of the comic, the issue, the year and to include variants.

* agent_x_stories: Result of the request at https://gateway.marvel.com:443/v1/public/characters/1011031/stories, the id of the character Agent X being 1011031. This for the "Get a list of all stories when Agent X (Nijo) appears". In order to get the id of Agent X I had to make a request to the method http://gateway.marvel.com/v1/public/characters specifying the parameter for the name of the character.

In order to make the requests I had to register on the marvel website and request for an API key. Once I had a public and a private key I used a timestamp and a both keys to make a hash using the md5 algorithm. In order to do the hash I used this website https://www.md5hashgenerator.com/.