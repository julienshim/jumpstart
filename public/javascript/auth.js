"use strict";

var userId;

// Google-provided example code that console logs out information provided by Google after user sign in
var onSignIn = function(googleUser) {

    var profile = googleUser.getBasicProfile();
    // // This code is commented out but kept here to show what info we can access after a user logs in
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);

    // send id_token to our back-end.  relevant back-end code in gauth-api-routes.js
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/auth');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.response);
        userId = JSON.parse(xhr.response).id;
    };
    xhr.send('idtoken=' + id_token);
    // console.log(id_token);

    document.getElementsByClassName("g-signin2")[0].textContent = `Welcome, ${profile.getGivenName()}!`

};

var signOut = function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    location.reload();
};