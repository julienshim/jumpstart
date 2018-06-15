"use strict";

userIdObj.registerListener(function(val) {
    document.getElementById("myLeadsClick").setAttribute("href", `/api/leads/${val}`);
    document.getElementById("myTodosClick").setAttribute("href", `/api/todos/${val}`);
    if (document.getElementById("viewLeadsBtn")) {
        document.getElementById("viewLeadsBtn").setAttribute("href", `/api/leads/${val}`);
    }
});