var db = require("../models");
var getId = require("./get-id-helper");

module.exports = function(app) {
    // bring in google's library as a dependency
    const {OAuth2Client} = require('google-auth-library');

    // the route for our clients to authenticate
    app.post("/api/auth", function(req, res) {
        // our application's CLIENT_ID provided by google
        const CLIENT_ID = "305106195609-ber51vabb990ftsd40aqr31gjthutaau.apps.googleusercontent.com";

        // console.log(req.body.idtoken);

        // verify the ID Token being sent by the client
        const client = new OAuth2Client(CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.idtoken,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            const userMail = payload['email'];
            const userName = userMail.split("@")[0];
            // If request specified a G Suite domain:
            //const domain = payload['hd'];

            // print userid to console
            // console.log("userid is...");
            // console.log(userid);

            // perform appropriate db lookups after user authentication
            if (userName) {
                // see if the user already exists in our user table
                db.User.findOne({
                    where: {
                      user_name: userName
                    }
                }).then(function(dbUser) {
                    // console.log(dbUser.id);
                    // if the user doesn't yet exist, create them
                    if (!dbUser) {
                        db.User.create({
                            user_name: userName,
                            email: userMail,
                            idtoken: req.body.idtoken
                        }).then(function(dbUser) {
                            res.json(dbUser);
                        });
                    }
                    // otherwise, if they exist, return their data from the table
                    // the data we're most interested in will be under dbUser.dataValues
                    else {
                        // console.log(dbUser.dataValues);

                        db.User.findOne({
                            attributes: ["id"],
                            where: {
                                idtoken: req.body.idtoken
                            }
                        }).then(function(result) {
                            if (!result) {
                                getId.updateTokenByUserName(userName, req.body.idtoken);
                                db.User.findOne({
                                    where: {
                                      idtoken: req.body.idtoken
                                    }
                                }).then(function(dbUser) {
                                    res.json(dbUser);
                                });
                            }
                            else {
                                db.User.findOne({
                                    where: {
                                      idtoken: req.body.idtoken
                                    }
                                }).then(function(dbUser) {
                                    res.json(dbUser);
                                });
                            }
                        }).catch(function (error) {
                            console.log(error);
                            return error;
                        })
                        // let userId = getId.getIdByToken("this will fail");
                    }
                });
            }
        }
        verify().catch(console.error);
    });
};