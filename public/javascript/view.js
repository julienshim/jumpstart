$(document).ready(function(){

$('#zipBtn').on('click', function(){
  var zipCode = $('#zipcode').val().trim();

  // var apiKey = '21272e206607e2f7d1a5f6737114330';
  // console.log(zipCode);

  // var queryUrl = "https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&topic_category=tech&page=20"

  $.post('/events', zipCode).then(function(chicken){
    
  });
});

  

});