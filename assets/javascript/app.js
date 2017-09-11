var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "gerbil"];

renderButtons();

$(document).on("click", "button", getGIFs);
$(document).on("click", "img", playStop);

function renderButtons() {
  $("#animalButtons").empty();
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.attr("value", topics[i]);
    button.append(topics[i]);
    $("#animalButtons").append(button);
  }
}

function getGIFs() {
	$("#animals").empty();
	var selected = $(this).attr("value");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + selected;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
  	console.log(response);

    for (var i = 0; i < response.data.length; i++) {
    	var info = $("<div>");
    	var holder = $("<div>");
    	info.addClass("gifs");
    	info.append("Rating: " + response.data[i].rating);
    	holder.addClass("static");
    	holder.append("<img src=" + response.data[i].images.original_still.url + " count=0>");
    	info.append(holder);
      $("#animals").append(info);
    }
  })
}

function playStop() {
	console.log($(this).attr("count"));
	if ($(this).attr("count") === "0") {
		var static = $(this).attr("src");
		var gif = $(this).attr("src").replace("giphy_s.gif", "giphy.gif");
		$('img[src="' + static + '"]').attr('src', gif);
		$(this).attr("count", "1");
	}
	else {
		var gif = $(this).attr("src");
		var static = $(this).attr("src").replace("giphy.gif", "giphy_s.gif");
		$('img[src="' + gif + '"]').attr('src', static);
		$(this).attr("count", "0");
	}
	console.log($(this).attr("count"));
}

$("#addAnimal").on("click", function(event) {
	event.preventDefault();
	var userInput = $("#animal-input").val().toLowerCase();

	if (userInput !== "") {
		var check = true;
		for (var i = 0; i < topics.length; i++) {
			if (userInput === topics[i]) {
				check = false;
			}
		}
		$("#animal-form").children("input").eq(0).val("");

		if (check) {
			topics.push(userInput);
			renderButtons();
		}
	}
});