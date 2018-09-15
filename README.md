# jumpstart

**Description**

Jumpstart is a job application tracking app that helps users tracking every details about their job application such as important dates, tasks, related documents, links, networking events, related notes, and more. It was built with MySQL, Node, Express to query and route data, Embedded Javascript (EJS) to generate the HTML, utilizes Sequelize ORM, Google Authentication, and follows the MVC design pattern.

**Motivation**

Job hunting can get messy so we wanted to provide users, including our Berkeley Coding Boot Camp peers, with the opportunity to manage their applications in one place. 

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

**Live Demo**

[Jumpstart on Heroku](https://obscure-beach-77511.herokuapp.com/)

**Screenshots**

Sign-In / Welcome to Jumpstart

<img src="https://github.com/julienshim/jumpstart/blob/master/public/images/signedin.jpg?raw=true" width="580px"/>

Add Your New Lead

<img src="https://github.com/julienshim/jumpstart/blob/master/public/images/addnewlead.jpg?raw=true" width="580px"/>

My Leads

<img src="https://github.com/julienshim/jumpstart/blob/master/public/images/myleads.jpg?raw=true" width="580px"/>

Update Lead

<img src="https://github.com/julienshim/jumpstart/blob/master/public/images/updateleaddetails.jpg?raw=true" width="580px"/>

Upcoming To Do's

<img src="https://github.com/julienshim/jumpstart/blob/master/public/images/todos.jpg?raw=true" width="580px"/>

Networking / Upcoming Events

<img src="https://github.com/julienshim/jumpstart/blob/master/public/images/networking.jpg?raw=true" width="580px"/>

**Team**

* Chris Huynh - https://github.com/chuynh18
* Dayan Thorne - https://github.com/dayansfo
* Taharka Taylor - https://github.com/TaharkaT
* Julien Shim - https://github.com/julienshim

**License**

This project is licensed under the terms of the MIT license.
