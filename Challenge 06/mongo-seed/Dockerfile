FROM mongo

COPY data.json /data.json
CMD mongo bookshelf_db --host mongo --eval "db.dropDatabase()" && mongoimport --host mongo --db bookshelf_db --collection book --type json --drop --file data.json --jsonArray