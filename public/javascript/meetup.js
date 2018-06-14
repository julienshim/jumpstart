    // This "document.ready" code isn't necessary in this example... but is useful to become familiar with.
    // "document.ready" makes sure that our JavaScript doesn't get run until the HTML document is finished loading.
    $(document).ready(function() {

      $('#cityBtn').on('click', function(event){
        event.preventDefault();

        var city = $('#city').val().trim();
        
        var url = `https://api.meetup.com/recommended/groups?key=295a2a3b76662429752554e47f692c&photo-host=public&location=${city}&page=20&category=34`
        console.log(url)
       $.ajax({
        dataType:'jsonp',
         method:'get',
         url:url,
  success:function(result) {
    console.log(result);
    result.data.forEach(function(event){
      $('body').append(`<p>${event.name}</p>`);
      $('body').append(`<a href=${event.link}>Link</a>`);
    })
  }
});

      })
      // var cityName = "Berkeley";
      // Here we use jQuery to select the header with "click-me" as its ID.
      // Whenever it is clicked...
      //http://api.jquery.com/on/
     	

    });
