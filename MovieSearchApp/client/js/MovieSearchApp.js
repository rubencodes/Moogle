//Runs when the Home template is rendered
Template.Home.onRendered(function() {
	//place cursor in textfield when page first loads
	$("input#SearchField").focus();
});

Template.Home.helpers({
	//Helpers needed on the home page
});

Template.Home.events({
	//Events that happen on the home page
	'click button#SearchButton': function () {
		//Search OMDB API
	}
});
