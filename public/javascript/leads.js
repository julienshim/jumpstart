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

        // in case user submitted date with "/" instead of "-"
        applicationDate = applicationDate.replace("/", "-");

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
// wait for document to be ready then add an event listener to the submit button
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("jobSubmit").addEventListener("click", () => {
        onSubmit();
    })
})