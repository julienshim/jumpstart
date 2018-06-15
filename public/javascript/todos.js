"use strict";

var xhr = new XMLHttpRequest();

var deleteTodo = function(element) {
    xhr.open("DELETE", `/api/todos/${element.parentElement.id}`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onload = function() {
        window.location.reload();
    }
}

var toggleTodo = function(element) {
    console.log(element.parentElement.getAttribute("data-complete"));
    var formData;
        if (element.parentElement.getAttribute("data-complete") == "false") {
            formData = `id=${element.parentElement.id}&completed=true`;
        }
        else {
            formData = `id=${element.parentElement.id}&completed=false`;
        }
    
    xhr.open("PUT", `/api/todos`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(formData);
    xhr.onload = function(response) {
        console.log(response);
        window.location.reload();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    for (var i=0; i < document.getElementsByClassName("btn-danger").length; i++) {
        document.getElementsByClassName("btn-danger")[i].addEventListener("click", (event) => {
            deleteTodo(event.target);
        })
    }
    for (var i=0; i < document.getElementsByClassName("btn-danger").length; i++) {
        document.getElementsByClassName("btn-success")[i].addEventListener("click", (event) => {
            toggleTodo(event.target);
        })
    }
    for (var i=0; i < document.getElementsByClassName("leads").length; i++) {
        if (document.getElementsByClassName("leads")[i].getAttribute("data-complete") == "true") {
            document.getElementsByClassName("leads")[i].style.textDecoration = "line-through";
        }
    }
})


