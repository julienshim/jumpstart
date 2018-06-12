"use strict";
var db = require("../models");

var authHelper = {

    getIdByToken: function(token) {
        db.User.findOne({
            attributes: ["id"],
            where: {
                idtoken: token
            }
        }).then(function(id) {
            console.log("getIdByToken: "+ id.dataValues.id);
            return id.dataValues.id;
        }).catch(function (error) {
            return error;
        })
    },

    updateTokenByUserName: function(userName, token) {
        db.User.update({
            idtoken: token
        },{
            where: {user_name: userName},
            return: true,
            plain: true
        }).then(function(result) {
            console.log("update token by username: " + result);
        }).catch(function(error) {
            console.log("update token by username: " + error);
            return error;
        })
    }
}

module.exports = authHelper;

