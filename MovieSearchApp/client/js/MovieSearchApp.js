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
			$("button#SearchButton").attr("disabled", true);
			runOMDbSearch($("input#SearchField").val());
		}
	},
	'keyup input#SearchField': function() {
		//Search OMDB API if enter pressed and textbox not empty
		if (event.keyCode == 13 && $("input#SearchField").val().trim() != "") {
			$("button#SearchButton").attr("disabled", true);
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
	showLoadingIndicator(true);
	$.get("http://www.omdbapi.com/", {
		t: query,
		plot: "short",
		r: "json"
	}, function(data) {
		showLoadingIndicator(false);
		$("button#SearchButton").removeAttr("disabled");
		if(data.Response == "True") {
			Session.set("result", data);
		} else {
			swal("Sorry, no results were found.")
		}
	}).fail(function() {
		showLoadingIndicator(false);
		$("button#SearchButton").removeAttr("disabled");
    	swal("Sorry, we encountered an error!")
	});
}

function showLoadingIndicator(state) {
	if(state == true) {
		$(".search-box").after("<div class=sk-double-bounce><div class=sk-child sk-double-bounce1></div><div class=sk-child sk-double-bounce2></div></div>");
	} else {
		$(".sk-double-bounce").remove();
	}
}