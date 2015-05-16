
## MongoDB

How to import docs to MongDB.

```
$ mongoimport -h ds029837.mongolab.com:29837 -d partjs -c members -u test  -p 123456 --file ./roxtal.json --jsonArray --upsert
```
