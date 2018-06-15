"use strict";

var xhr = new XMLHttpRequest();

var deleteTodo = function(element) {
    console.log(element);
    console.log(element.getAttribute("data-lead"));
    xhr.open("DELETE", `/api/todos/${element.parentElement.getAttribute("data-lead")}`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onload = function() {
        window.location.reload();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    for (var i=0; i < document.getElementsByClassName("btn-danger").length; i++) {
        document.getElementsByClassName("btn-danger")[i].addEventListener("click", (event) => {
            deleteTodo(event.target);
        })
    }
})


