# jumpstart

**Description**

Jumpstart is a job application tracking built with MySQL, Node, Express to query and route data, Embedded Javascript (EJS) to generate the HTML, utilizes Sequelize ORM, Google Authentication, and follows the MVC design pattern.

**Setup**

1) Open the root folder and run `npm install`, which will install the following npm packages:

    * npm install body-parser
    * npm install dotenv
    * npm install ejs
    * npm install express
    * npm install express-fileupload
    * npm install google-auth-library"
    * npm install mysql2
    * npm install sequelize
    * npm install sequelize-cli

2) Create a `.env` file in the root directory of the project, then update it with your local MySQL instance connection information and credentials.  The file should look something like this:

```
# Local creds
DB_USERNAME=root
DB_PASSWORD=[replace this with your MySQL server password, being sure to delete the brackets]
DB_NAME=jumpstart_db
DB_HOSTNAME=127.0.0.1
```

3) Make sure to run the code contained within the `db/jumpstart-schema.sql` files beforehand so that you have a database with which to work.

4) Start the express server by entering the `node server.js` command from the root folder in the terminal / shell / command prompt. This will also sync the models via the db.sequelize.sync() fuction in the express server.

**Screenshots/Demo GIF**

**Team**

* Chris Huynh - https://github.com/chuynh18
* Dayan Thorne - https://github.com/dayansfo
* Taharka Taylor - https://github.com/TaharkaT
* Jerauld Manansala ("Julien") - https://github.com/jerauld  

**License**

This project is licensed under the terms of the MIT license.