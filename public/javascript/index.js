"use strict";

userIdObj.registerListener(function(val) {
    document.getElementById("showLeads").setAttribute("href", `/api/leads/${val}`);
});