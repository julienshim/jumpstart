"use strict";
var db = require("../models");

exports.getIdByToken = function(token) {
    db.User.findOne({
        attributes: ["id"],
        where: {
            idtoken: token
        }
    }).then(function(id) {
        console.log(id.dataValues.id);
        return id.dataValues.id;
    })
}