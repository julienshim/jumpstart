"use strict";

var leadId;

var onLeadClick = function(element) {
    leadId = element.getAttribute("data-value");
    
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
   }

        xhr.open("GET", `/api/leads/${userId}/${leadId}`);
        xhr.send();

}

var onLeadUpdate = function() {

        if (!userId) {
            document.getElementById("signInAlert").textContent = "Please sign in first!";
        }
        else {

                var company = document.getElementById("companyView").value.trim();
                var position = document.getElementById("positionView").value.trim();
                var jobUrl = document.getElementById("jobUrlView").value.trim();
                var applicationDate = document.getElementById("applicationDateView").value.trim();
                var documentUrl = document.getElementById("jobDocumentsView").value.trim();
                var jobNotes = document.getElementById("jobNotesView").value.trim();
        
        
                var formData = `id=${leadId}&company=${company}&position=${position}&leadLink=${jobUrl}&dateApplied=${applicationDate}&documents=${documentUrl}&notes=${jobNotes}&UserId=${userId}`;
                
                var xhr = new XMLHttpRequest();

                xhr.open("PUT", "/api/leads");
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(formData);

        }


}   


// wait for document to be ready before adding the appropriate event listeners to each button
document.addEventListener("DOMContentLoaded", function() {

    var leadLinks = document.getElementsByClassName("leadLink");

    for (var i = 0; i < leadLinks.length; i++) {
        leadLinks[i].addEventListener("click", function(event) {
            onLeadClick(event.target);
        })
    }

    document.getElementById("jobUpdate").addEventListener("click", onLeadUpdate);

});