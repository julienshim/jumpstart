"use strict";

userIdObj.registerListener(function(val) {
    document.getElementById("myLeadsClick").setAttribute("href", `/api/leads/${val}`);
    // document.getElementById("showLeads").setAttribute("href", `/api/leads/${val}`);
});