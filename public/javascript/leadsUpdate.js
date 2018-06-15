"use strict";

var onLeadClick = function(element) {
    var leadId = element.getAttribute("data-value");
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var response = JSON.parse(xhr.response);
        if ("company" in response) {

                        // populate the modal that shows the user's submission, then make it visible
                        document.getElementById("companyView").value = response.company;
                        document.getElementById("positionView").value = response.position;
                        document.getElementById("jobUrlView").value = response.leadLink;
                        document.getElementById("applicationDateView").value = response.dateApplied;
                        document.getElementById("jobDocumentsView").value = response.documents;
                        document.getElementById("jobNotesView").textContent = response.notes;
                        $("#jobView").modal('show');
        }


    //     // okay, this is the part that is responsible for sending and receiving data from the server
    //     var xhr = new XMLHttpRequest();

    //     // this part listens for responses and acts on them
    //     xhr.onload = function() {
    //         var response = JSON.parse(xhr.response);
    //         console.log(response);
            
    //         if ("company" in response) {

    //             // populate the modal that shows the user's submission, then make it visible
    //             document.getElementById("modalTitle").textContent = `${givenName}, your job lead has been saved!`
    //             document.getElementById("postedCompany").textContent = response.company;
    //             document.getElementById("postedPosition").textContent = response.position;
    //             document.getElementById("postedUrl").textContent = response.leadLink;
    //             document.getElementById("postedDate").textContent = response.dateApplied;
    //             document.getElementById("postedDoc").textContent = response.documents;
    //             document.getElementById("postedNotes").textContent = response.notes;
    //             $("#jobPosted").modal('show');

    //             // clear out the form only on successful submission
    //             document.getElementById("company").value = "";
    //             document.getElementById("position").value = "";
    //             document.getElementById("jobUrl").value = "";
    //             document.getElementById("applicationDate").value = "";
    //             document.getElementById("jobDocuments").value = "";
    //             document.getElementById("jobNotes").value = "";

   }

        xhr.open("GET", `/api/leads/${userId}/${leadId}`);
        xhr.send();

}


// wait for document to be ready before adding the appropriate event listeners to each button
document.addEventListener("DOMContentLoaded", function() {

    var leadLinks = document.getElementsByClassName("leadLink");

    for (var i = 0; i < leadLinks.length; i++) {
        leadLinks[i].addEventListener("click", function(event) {
            onLeadClick(event.target);
        })
    }

})