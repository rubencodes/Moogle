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
		//Search OMDB API
		$.get("http://www.omdbapi.com/", {
			t: $("input#SearchField").val(),
			plot: "full",
			r: "json"
		}, function(data) {
			Session.set("result", data);
		});
	}
});

Template.Result.helpers({
	//Turns Rating into Percent
	imdbPercent: function(rating) {
		return rating*10;
	}
});