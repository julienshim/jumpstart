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

        // check to make sure things work
        // console.log("company: " + company);
        // console.log("position: " + position);
        // console.log("jobUrl: " + jobUrl);
        // console.log("applicationDate: " + applicationDate);
        // console.log("documentUrl: " + documentUrl);
        // console.log("jobNotes: " + jobNotes);
        // console.log("userId: " + userId);

        // the urlencoded form data that we will submit
        var formData = `company=${company}&position=${position}&leadLink=${jobUrl}&dateApplied=${applicationDate}&documents=${documentUrl}&notes=${jobNotes}&UserId=${userId}`;

        // okay, this is the part that is responsible for sending and receiving data from the server
        var xhr = new XMLHttpRequest();

        // this part listens for responses and acts on them
        xhr.onload = function() {
            var response = JSON.parse(xhr.response);
            console.log(response);

            // clear out the form only on successful submission
            document.getElementById("company").value = "";
            document.getElementById("position").value = "";
            document.getElementById("jobUrl").value = "";
            document.getElementById("applicationDate").value = "";
            document.getElementById("jobDocuments").value = "";
            document.getElementById("jobNotes").value = "";

            // do stuff here such as tell user form successfully submitted or pop a modal
            document.getElementById("modalTitle").textContent = `${givenName}, your job lead has been saved!`
            document.getElementById("postedCompany").textContent = response.company;
            document.getElementById("postedPosition").textContent = response.position;
            document.getElementById("postedUrl").textContent = response.leadLink;
            document.getElementById("postedDate").textContent = response.dateApplied;
            document.getElementById("postedDoc").textContent = response.documents;
            document.getElementById("postedNotes").textContent = response.notes;
            $("#jobPosted").modal('show');
        }

        // sending stuff to the server for reals
        xhr.open("POST", "/api/leads", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(formData);
    }
}

var addTodo = function() {
    var numOfTodos = document.getElementsByClassName("todo").length;

    var titleParent = document.createElement("div");
    titleParent.classList.add("form-group", "row");

    var titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", `todoTitle${numOfTodos+1}`)
    titleLabel.classList.add("col-sm-2", "col-form-label");
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

    var inputDetail = document.createElement("textarea");
    inputDetail.classList.add("form-control");
    inputDetail.id = `todo${numOfTodos+1}`;
    inputDetail.setAttribute("rows", 3);
    inputDetail.setAttribute("placeholder", "Example:  Tailor resume intro to highlight strengths relevant to this position and company");

    detailParent.appendChild(inputDetail);

    document.getElementById("todoSpawn").appendChild(titleParent);
    document.getElementById("todoSpawn").appendChild(detailParent);
    document.getElementById("todoSpawn").appendChild(document.createElement("br"));
}

// wait for document to be ready then add an event listener to the submit button
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("jobSubmit").addEventListener("click", () => {
        onSubmit();
    })

    document.getElementById("addTodo").addEventListener("click", () => {
        addTodo();
    })

})