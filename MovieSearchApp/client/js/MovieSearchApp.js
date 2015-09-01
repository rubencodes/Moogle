//Runs when the Home template is rendered
Template.Home.onRendered(function() {
	//place cursor in textfield when page first loads
	$("input#SearchField").focus();
});

Template.Home.helpers({
	//Helpers needed on the home page
	searchResult: function() {
		return Session.get("result");
	}
});

Template.Home.events({
	//Events that happen on the home page
	'click button#SearchButton': function () {
		//Search OMDB API if textbox not empty
		if($("input#SearchField").val().trim() != "") {
			runOMDbSearch($("input#SearchField").val());
		}
	},
	'keyup input#SearchField': function() {
		//Search OMDB API if enter pressed and textbox not empty
		if (event.keyCode == 13 && $("input#SearchField").val().trim() != "") {
			runOMDbSearch($("input#SearchField").val());
		}
	}
});

Template.Result.helpers({
	//Turns Rating into Percent
	imdbPercent: function(rating) {
		return rating*10;
	},
	//detects if IMDB score returned is valid
	validIMDbScore: function() {
		return this.imdbRating != "N/A";
	},
	//detects if Metascore returned is valid
	validMetascore: function() {
		return this.Metascore != "N/A";
	},
	//detects if poster URL returned is valid
	validPosterURL: function() {
		return this.Poster != "N/A";
	}
});

function runOMDbSearch(query) {
	$.get("http://www.omdbapi.com/", {
		t: query,
		plot: "short",
		r: "json"
	}, function(data) {
		Session.set("result", data);
	});
}