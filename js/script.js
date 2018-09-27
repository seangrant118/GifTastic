// Actor's Array
var topics = ["Edward Norton", "Brad Pitt", "Leonardo DiCaprio", "Robert De Niro", "Bruce Willis", "Vince Vaughn", "Jim Carrey"] 

// function to create buttons
function renderButtons () {
  // empty div
  $("#button-display").empty();

  //loop through array 
  for (var i = 0; i < topics.length; i++) {
    var buttons = $("<button>");
    buttons
    .addClass("actors btn btn-primary mr-2 mb-2")
    .attr("data-name", topics[i])
    .text(topics[i]);
    $("#button-display").append(buttons);
  }
};

// function to add new buttons
$("#gif-search").on("click", function(event) {
  event.preventDefault();
  //store user input in variable
  var actor = $("#user-input").val().trim();
  // push user input to array
  topics.push(actor);

  renderButtons();
});

//ajax call and post gifs
function getActorGifs() {
  var actor = $(this).attr("data-name");
  var apiKey = "RExxKyuuQscnVUwHvZY32RoixoVOLcnM";
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + actor;

  //ajax function

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // variable for the object
    var object = response.data;

    // for loop for generating img through array
    for (var i = 0; i < object.length; i++) {
      // create img
      var gif = $("<img class='gif img-thumbnail'>");
      // assign attribute
      gif
      .attr("src", object[i].images.fixed_height.url)
      .attr("data-animate", object[i].images.fixed_height.url)
      .attr("data-still", object[i].images.fixed_height_still.url);

      // write gif to page
      $("#gif-display").append(gif);
    }
  })
};

$(document).on("click", ".actors", getActorGifs);
//run function to render variables
renderButtons();