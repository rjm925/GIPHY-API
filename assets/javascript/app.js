// Array of topics
const topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "gerbil"];

// Create buttons
renderButtons();

// On click events
$(document).on("click", "button", getGIFs);
$(document).on("click", "img", playStop);

// Add animal event
$("#addAnimal").on("click", function(event) {
	// Prevents HTML from reloading
	event.preventDefault();
	// Gets user input
	let userInput = $("#animal-input").val().trim().toLowerCase();

	// Checks if user input is blank
	if (userInput !== "") {
		// Variable to check if animal already has button
		let check = true;
		// Loops through topic array
		for (let i = 0; i < topics.length; i++) {
			// If input is already a topic
			if (userInput === topics[i]) {
				// Check failed
				check = false;
			}
		}
		// Clears input line
		$("#animal-input").val("");

		// If new animal
		if (check) {
			// Adds to topics array
			topics.push(userInput);
			// Creates animal buttons
			renderButtons();
		}
	}
});

// Function to create buttons on html
function renderButtons() {
	// Emptys div holding buttons
  $("#animalButtons").empty();
  // Loops through topics array
  for (let i = 0; i < topics.length; i++) {
  	// Create button
    let button = $("<button>");
    // Add class to button
    button.addClass("btn btn-info");
    // Assigns value to button
    button.attr("value", topics[i]);
    // Append word to button
    button.append(topics[i]);
    // Append button to div
    $("#animalButtons").append(button);
  }
}

// Gets GIFs
function getGIFs() {
	// Clears any animals gifs displayed
	$("#animals").empty();
	// Gets value of selected button
	let selected = $(this).attr("value");
	// Creates query for ajax call
	let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + selected;

	// Ajax call to api
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
  	// Loops through results
    for (let i = 0; i < response.data.length; i++) {
    	// Creates div
    	let card = $("<div>");
    	// Add gifs class to div
    	card.addClass("gifs");
    	// Append rating to div
    	card.append("Rating: " + response.data[i].rating);
    	// Add image to holder with still url
    	card.append("<br><img src=" + response.data[i].images.original_still.url + " count=0>");
    	// Append card to animals div
      $("#animals").append(card);
    }
  })
}

// Switches between still and animated gif
function playStop() {
	// Check if count value is 0
	if ($(this).attr("count") === "0") {
		// Creates animated gif url
		let gif = $(this).attr("src").replace("giphy_s.gif", "giphy.gif");
		// Changes url of src
		$(this).attr("src", gif);
		// Changes count value to 1
		$(this).attr("count", "1");
	}
	else {
		// Creates still gif url
		let static = $(this).attr("src").replace("giphy.gif", "giphy_s.gif");
		// Changes url of src
		$(this).attr("src", static);
		// Changes count value to 0
		$(this).attr("count", "0");
	}
}