"use strict";

userIdObj.registerListener(function(val) {
    document.getElementById("myLeadsClick").setAttribute("href", `/api/leads/${val}`);
    document.getElementById("myTodosClick").setAttribute("href", `/api/todos/${val}`);
    // document.getElementById("showLeads").setAttribute("href", `/api/leads/${val}`);
});