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
    console.log(result.data[0].link);
    result.data.forEach(function(event){
      var link =  $('<a href="' + event.link + '">link</a>') 
      $('#results').append(`<li>${event.name}</li>`);
      $('#results').append(link)
    })
  }
});

      })
     	
    });
