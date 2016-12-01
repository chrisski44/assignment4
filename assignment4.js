// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

$(document).ready(function() {
  var returnArray = [];
  var fileName = "http://www.mattbowytz.com/simple_api.json?data=all";
  var requestString = "";
  $('#search-results').slideUp();

  $.ajax({
    type: 'GET',
    url: fileName,
    async: true,
    dataType: 'json',
    error: function(){
      $('#checkError').html('<p> An error occurred </p>');
    },
    success: function(data){
      //Get the full array of data from the JSON
        var fullArray = data['data'];
        //Access specific properties that we are looking to return
        var programmingSubArray = fullArray.programming;
        //Push all of our subarrays including comics, programming, and interests onto our array
        $.each(programmingSubArray, function(key, value){
          returnArray.push(value);
        });

        var interestsSubArray = fullArray.interests;

        $.each(interestsSubArray, function(key, value){
          returnArray.push(value);
          
        });

        var comicsSubArray = fullArray.comics;

        $.each(comicsSubArray, function(key, value){
          returnArray.push(value);
          
        });
        //Now all of our data is pushed into the array...woo hoo!!
    }
  });
  //Wait for key up function to trigger and get input 
  $('#search-bar').keyup(function(){
    var input = $(this).val();
    $("#result-list").html("");

    //If user backspaces or there is an empty input we don't show anything
    if(input.length == 0){
      $("#search-results").slideUp();
      return false;
    }
    //variable to check if we should slide down the recommendation div
    var returnedEntries = false;
    console.log(input);

    //if the input is the substring of any of our words, we just append it to the list wiht clickable link
    $.each(returnArray, function(key, value){
      if((value.substring(0, input.length).toLowerCase() == input.toLowerCase())){
          $('#result-list').append("<li><a href='https://www.google.com/search?q="
          + value + "'>" + value + "</a></li>");
            returnEntries = true; 
            //We show our div
      }   
      });
        //Show our div 
        $('#search-results').slideDown("slow");
    });
    //User clicks on the arrow so we submit the input to a search in a new tab
    $("#search-button").click(function(){
      var inputvalue = $('.flexsearch-input').val();
      window.open("https://www.google.com/search?q=" + inputvalue);
    })
  });
