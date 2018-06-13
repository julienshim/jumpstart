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

        console.log("company: " + company);
        console.log("position: " + position);
        console.log("jobUrl: " + jobUrl);
        console.log("applicationDate: " + applicationDate);
        console.log("documentUrl: " + documentUrl);
        console.log("jobNotes: " + jobNotes);
        console.log("userId: " + userId);

        var formData = `company=${company}&position=${position}&leadLink=${jobUrl}&dateApplied=${applicationDate}&documents=${documentUrl}&notes=${jobNotes}&UserId=${userId}`;

        // send data to server
        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
            var response = JSON.parse(xhr.response);
            console.log(typeof response);
            console.log(response);

            // do stuff here such as tell user form successfully submitted or pop a modal
        }

        xhr.open("POST", "/api/leads", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(formData);
    }

    
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("jobSubmit").addEventListener("click", (event) => {
        onSubmit();
    })
})