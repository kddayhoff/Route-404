//variable for APIkey
var notes = [];

//function for geocode to push lat and lng to Google Map API
function geocode(query) {
	$.ajax({
		url: 'https://api.opencagedata.com/geocode/v1/json',
		method: 'GET',
		data: {
			key: process.env.MAP_API,
			q: query,
			no_annotations: 1,
		},
		dataType: 'json',
		statusCode: {
			200: function (response) {
				// success
				//running the two initMaps for input and click events
				initMap(response.results[0].formatted);
				initMap2(response.results[0].formatted);
			},
			402: function () {
				console.log('hit free-trial daily limit');
				console.log('become a customer: https://opencagedata.com/pricing');
			},
		},
	});
}

// function for creating map on input
function initMap(PLACENAME) {
	var queryURL =
		'https://api.opencagedata.com/geocode/v1/json?q=' +
		PLACENAME +
		'&key=' +
		process.env.MAP_API;

	$.ajax({
		url: queryURL,
		method: 'GET',
	}).then(function (response) {
		var lat = response.results[0].geometry.lat;
		var lng = response.results[0].geometry.lng;
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 8,
			center: {
				lat: lat,
				lng: lng,
			},
		});

		var marker = new google.maps.Marker({
			position: {
				lat: lat,
				lng: lng,
			},
			map: map,
		});
	});
}

// function for making the locations clickable
function initMap2() {
	$('#saved-dest').on('click', 'li', function (savedDest) {
		var savedDest = $(this).text();
		var queryURL =
			'https://api.opencagedata.com/geocode/v1/json?q=' +
			savedDest +
			'&key=' +
			process.env.MAP_API;

		$.ajax({
			url: queryURL,
			method: 'GET',
		}).then(function (response) {
			var lat = response.results[0].geometry.lat;
			var lng = response.results[0].geometry.lng;
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 8,
				center: {
					lat: lat,
					lng: lng,
				},
			});
			var marker = new google.maps.Marker({
				position: {
					lat: lat,
					lng: lng,
				},
				map: map,
			});
		});
	});
}

//function to get the saved destinations to the saved locations column
function getLocation() {
	$.get('/api/notes', function (data) {
		for (var i = 0; i < data.length; i++) {
			var newItem = $('<li>');
			newItem.text(data[i].title);
			$('#saved-dest').append(newItem);
		}
		//displays the map on the page using the last item in the notes array
		geocode(data[data.length - 1].title);
	});
}

//function to get the notes and add them to the saved notes array/list on the page
function getNotes() {
	$.get('/api/notes', function (response) {
		for (var i = 0; i < response.length; i++) {
			var newItem = $('<li>');
			newItem.text(response[i].body);
			$('#all-saved-dest').append(newItem);
		}
	});
}
// Gets post data for a post if we're editing
function getNoteData(id) {
	$.get('/api/notes/' + id, function (data) {
		if (data) {
			destInput.val(data.title);
			// If we have a post with this id, set a flag for us to know to update the post
			// when we hit submit
			updating = true;
		}
	});
}

function submitNote(note) {
	$.post('/api/notes/', note, function () {}).then(function () {
		window.location.href = '/userdest';
	});
}

// This function does an API call to delete posts
function deleteNote(id) {
	$.ajax({
		method: 'DELETE',
		url: '/api/notes/' + id,
	}).then(function () {
		window.location.href = '/userdest';
	});
}
$(document).ready(function () {
	// Gets an optional query string from our url (i.e. ?post_id=23)
	var url = window.location.search;
	var destID;
	// Sets a flag for whether or not we're updating a post to be false initially
	var updating = false;

	getNotes();
	getLocation();

	// If we have this section in our url, we pull out the post id from the url
	if (url.indexOf('?destination_id=') !== -1) {
		destID = url.split('=')[1];
		getNoteData(destID);
	}

	// Getting jQuery references to the post destination
	var destInput = $('#destination');
	var destInputForm = $('#destInput');
	$('.collapsible').collapsible();

	// ================================================
	// Event listener for when the form is submitted for destination
	$(destInputForm).on('submit', function handleFormSubmit(event) {
		event.preventDefault();

		var newDest = destInput.val().trim();
		var noteText = $('#note-text').val().trim();
		// Wont submit the post if we are missing a body or a title
		if (!newDest || !noteText) {
			alert('Must enter destination and note');
			return;
		}
		var newNote = {
			title: newDest,
			body: noteText,
		};
		submitNote(newNote);
	});
});
