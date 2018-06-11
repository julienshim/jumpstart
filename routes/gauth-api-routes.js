var db = require("../models");

module.exports = function(app) {

    const {OAuth2Client} = require('google-auth-library');

    app.post("/api/auth", function(req, res) {
        const CLIENT_ID = "305106195609-ber51vabb990ftsd40aqr31gjthutaau.apps.googleusercontent.com";

        // console.log(req.body.idtoken);

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
            const userName = userMail.split("@")[0]
            // If request specified a G Suite domain:
            //const domain = payload['hd'];

            // print userid to console
            console.log("userid is...");
            console.log(userid);

            db.User.findOne({
                where: {
                  user_name: userName
                }
            }).then(function(dbUser) {
                console.log(dbUser);
                if (!dbUser) {
                    db.User.create({
                        user_name: userName,
                        email: userMail
                    }).then(function(dbUser) {
                        res.json(dbUser);
                    });
                }
                else {
                    res.json(dbUser);
                }
            });
        }
        verify().catch(console.error);
    });
};