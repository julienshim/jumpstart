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
            // If request specified a G Suite domain:
            //const domain = payload['hd'];

            // print userid to console
            console.log("userid is...");
            console.log(userid);
        }
        verify().catch(console.error);
    });
};