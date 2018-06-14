"use strict";

var onSubmit = function() {
    if (!userId) {
        document.getElementById("signInAlert").textContent = "Please sign in first!";
    }
    else {
        var company = document.getElementById("company").value.trim();
        var position = document.getElementById("position").value.trim();
        var jobUrl = document.getElementById("jobUrl").value.trim();
        var applicationDate = document.getElementById("applicationDate").value.trim();
        var documentUrl = document.getElementById("jobDocuments").value.trim();
        var jobNotes = document.getElementById("jobNotes").value.trim();

        // the urlencoded form data that we will submit
        var formData = `company=${company}&position=${position}&leadLink=${jobUrl}&dateApplied=${applicationDate}&documents=${documentUrl}&notes=${jobNotes}&UserId=${userId}`;

        // okay, this is the part that is responsible for sending and receiving data from the server
        var xhr = new XMLHttpRequest();

        // this part listens for responses and acts on them
        xhr.onload = function() {
            if ("company" in JSON.parse(xhr.response)) {

                var response = JSON.parse(xhr.response);
                console.log(response);

                // populate the modal that shows the user's submission, then make it visible
                document.getElementById("modalTitle").textContent = `${givenName}, your job lead has been saved!`
                document.getElementById("postedCompany").textContent = response.company;
                document.getElementById("postedPosition").textContent = response.position;
                document.getElementById("postedUrl").textContent = response.leadLink;
                document.getElementById("postedDate").textContent = response.dateApplied;
                document.getElementById("postedDoc").textContent = response.documents;
                document.getElementById("postedNotes").textContent = response.notes;
                $("#jobPosted").modal('show');

                // clear out the form only on successful submission
                document.getElementById("company").value = "";
                document.getElementById("position").value = "";
                document.getElementById("jobUrl").value = "";
                document.getElementById("applicationDate").value = "";
                document.getElementById("jobDocuments").value = "";
                document.getElementById("jobNotes").value = "";

                // if the user chose to create todos, submit them now (because we need the lead to be created in the db first)
                for (var i = 1; i < document.getElementsByClassName("todo").length + 1; i++) {
                    if (!!document.getElementById(`todoTitle${i}`).value && !!document.getElementById(`todo${i}`).value) {
                        var todoTitle = document.getElementById(`todoTitle${i}`).value;
                        var todo = document.getElementById(`todo${i}`).value;

                        var formData = `task_name=${todoTitle}&content=${todo}&LeadId=${response.id}`;
                        console.log(formData);

                        xhr.open("POST", "/api/todos", true);
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhr.send(formData);
                    }
                }

                // remove extra todo fields
                while (document.getElementsByClassName("todo").length > 1) {
                    removeTodo();
                }

                // blank out the only remaining todo fields
                document.getElementById("todo1").value = "";
                document.getElementById("todoTitle1").value = "";
            }
        }

        // sending stuff to the server for reals
        xhr.open("POST", "/api/leads", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(formData);
    }
}

// create another todo form in case the user wishes to fill out another todo item for the lead they're creating
var addTodo = function() {
    // totally acknowledging that using a counter is computationally faster than counting the number of todos on the page
    // but realistically, the user isn't going to create a million todo forms, so it's k
    var numOfTodos = document.getElementsByClassName("todo").length;

    var titleParent = document.createElement("div");
    titleParent.classList.add("form-group", "row");
    titleParent.id = `todoTitleParent${numOfTodos+1}`;

    var titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", `todoTitle${numOfTodos+1}`)
    titleLabel.classList.add("col-sm-2", "col-form-label");
    titleLabel.id = `todoLabel${numOfTodos+1}`;
    titleLabel.textContent = `Todo ${numOfTodos+1}`;

    var todoTitleDiv = document.createElement("div");
    todoTitleDiv.classList.add("col-sm-10");

    var inputTitle = document.createElement("input");
    inputTitle.classList.add("form-control", "todo");
    inputTitle.id = `todoTitle${numOfTodos+1}`;
    inputTitle.setAttribute("placeholder", `Example:  Update my resume`);

    todoTitleDiv.appendChild(inputTitle);
    titleParent.appendChild(titleLabel);
    titleParent.appendChild(todoTitleDiv);

    var detailParent = document.createElement("div");
    detailParent.classList.add("form-group");
    detailParent.id = `todoParent${numOfTodos+1}`;

    var inputDetail = document.createElement("textarea");
    inputDetail.classList.add("form-control");
    inputDetail.id = `todo${numOfTodos+1}`;
    inputDetail.setAttribute("rows", 3);
    inputDetail.setAttribute("placeholder", "Example:  Tailor resume intro to highlight strengths relevant to this position and company");

    detailParent.appendChild(inputDetail);

    document.getElementById("todoSpawn").appendChild(titleParent);
    document.getElementById("todoSpawn").appendChild(detailParent);
    document.getElementById("todoSpawn").appendChild(document.createElement("br"));

    // no conditional checks for these because adding a class that already exists does nothing
    // removing a class that doesn't exist also does nothing (and does not throw errors either)
    document.getElementById("removeTodo").classList.add("btn-danger");
    document.getElementById("removeTodo").classList.remove("btn-secondary");
}

// if the user feels they accidentally too many todo forms, they can remove them
var removeTodo = function() {
    var numOfTodos = document.getElementsByClassName("todo").length;
    var lastBr = document.getElementsByTagName("br")[document.getElementsByTagName("br").length-1];
    
    if (numOfTodos > 1) {
        lastBr.parentElement.removeChild(lastBr);
        document.getElementById(`todoLabel${numOfTodos}`).parentElement.removeChild(document.getElementById(`todoLabel${numOfTodos}`));
        document.getElementById(`todo${numOfTodos}`).parentElement.removeChild(document.getElementById(`todo${numOfTodos}`));
        document.getElementById(`todoTitle${numOfTodos}`).parentElement.removeChild(document.getElementById(`todoTitle${numOfTodos}`));
        document.getElementById(`todoTitleParent${numOfTodos}`).parentElement.removeChild(document.getElementById(`todoTitleParent${numOfTodos}`));
        document.getElementById(`todoParent${numOfTodos}`).parentElement.removeChild(document.getElementById(`todoParent${numOfTodos}`));
    }

    if (numOfTodos > 2) {
        document.getElementById("removeTodo").classList.add("btn-danger");
        document.getElementById("removeTodo").classList.remove("btn-secondary");
    }

    if (numOfTodos <= 2) {
        document.getElementById("removeTodo").classList.add("btn-secondary");
        document.getElementById("removeTodo").classList.remove("btn-danger");
    }
}

// wait for document to be ready before adding the appropriate event listeners to each button
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("jobSubmit").addEventListener("click", () => {
        onSubmit();
    })

    document.getElementById("addTodo").addEventListener("click", () => {
        addTodo();
    })

    document.getElementById("removeTodo").addEventListener("click", () => {
        removeTodo();
    })

})