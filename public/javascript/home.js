"use strict";

givenNameObj.registerListener(function(val) {
    document.getElementById("loginMsg").textContent = `Welcome to JumpStart, ${val}!  You can access the many features of JumpStart via the navigation bar to the left.`;
});