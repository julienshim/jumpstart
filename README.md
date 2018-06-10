# jumpstart

**Deployment Requirements**

1) Open the root folder and run `npm install`, which will install the following npm packages:

* npm install body-parser
* npm install dotenv
* npm install express
* npm install mysql2
* npm install sequelize
* npm install sequelize-cli

2) Create a `.env` file in the root directory of the project, then update it with your local MySQL instance connection information and credentials.  The file should look something like this:<pre># Local creds
DB_USERNAME=root
DB_PASSWORD=[replace this with your MySQL server password, being sure to delete the brackets]
DB_NAME=jumpstart_db
DB_HOSTNAME=127.0.0.1</pre>

3) Make sure to run the code contained within the `db/jumpstarter-schema.sql` files beforehand so that you have a database with which to work.

4) Start the express server by entering the `node server.js` command from the root folder in the terminal / shell / command prompt. This will also sync the models via the db.sequelize.sync() fuction in the express server.
