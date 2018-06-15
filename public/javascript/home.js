"use strict";

givenNameObj.registerListener(function(val) {
    document.getElementById("loginMsg").textContent = `Welcome to JumpStart, ${val}!`;
});