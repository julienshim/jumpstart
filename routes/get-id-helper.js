"use strict";
var db = require("../models");

var authHelper = {

    getIdByToken: function(token) {
        db.User.findOne({
            attributes: ["id"],
            where: {
                idtoken: token
            }
        }).then(function(result) {
            console.log("getIdByToken: "+ result);
            return result;
        }).catch(function (error) {
            console.log(error);
            return error;
        })
    },

    updateTokenByUserName: function(userName, token, cb) {
        db.User.update({
            idtoken: token
        },{
            where: {user_name: userName},
            return: true,
            plain: true
        }).then(function(result) {
            console.log("update token by username: " + result);
            cb();
        }).catch(function(error) {
            console.log("update token by username: " + error);
            return error;
        })
    }
}

module.exports = authHelper;

