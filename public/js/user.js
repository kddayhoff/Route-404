

//variable for APIkey
const APIkey = "47c3a4e7c75c45e7ad46ffc3e676da38";

$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var destID;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;
 

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, destID is 1
  if (url.indexOf("?destination_id=") !== -1) {
    destID = url.split("=")[1];
    getNoteData(destID);
  }

  // Getting jQuery references to the post destination

  var destInput = $("#destination");
  var destInputForm = $("#destInput");


  // Event listener for when the form is submitted for destination
  $(destInputForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!destInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newDest = {
      destination: destInput.val().trim(),

    };
    geocode(newDest);
    console.log(newDest);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newDest.id = destID;
      updatePost(newDest);
    }
    else {
      submitPost(newDest);
    }
  })

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Notes) {
    $.post("/api/notes/", Notes, function() {
      window.location.href = "/userdest";
    });
  }

  // Gets post data for a post if we're editing
  function getNoteData(id) {
    $.get("/api/notes/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        destInput.val(data.title);
       
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }


  // Update a given post, bring user to the blog page when done
  function updateNote(note) {
    $.ajax({
      method: "PUT",
      url: "/api/notes",
      data: post
    })
      .then(function() {
        window.location.href = "/userdest";
      });
      updateNote();
  }


// function to update map onclick your saved locations column




initMap();
initMap2();

});

function geocode(query){
  $.ajax({
    url: 'https://api.opencagedata.com/geocode/v1/json',
    method: 'GET',
    data: {
      'key': "47c3a4e7c75c45e7ad46ffc3e676da38",
      'q': query,
      'no_annotations': 1
      // see other optional params:
      // https://opencagedata.com/api#forward-opt
    },
    dataType: 'json',
    statusCode: {
      200: function(response){  // success
        console.log(response.results[0].formatted);
        console.log(response)
      },
      402: function(){
        console.log('hit free-trial daily limit');
        console.log('become a customer: https://opencagedata.com/pricing');
      }
      // other possible response codes:
      // https://opencagedata.com/api#codes
    }
  });
}

// $(document).ready(function(){
//   geocode(destInput);
  // console should now show:
  // 'Goethe-Nationalmuseum, Frauenplan 1, 99423 Weimar, Germany'
// });

function initMap() {

  $('#saved-dest').on('click', 'li',(function() {
    var PLACENAME = $(this).text();
    var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + PLACENAME + "&key=" + APIkey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(results) {
    
    var lng = parseFloat(results.geometry.lng);
    var lat = parseFloat(results.geometry.lat);
    var map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 8, 
          center: {
              lat: lat,
              lng: lng
          }
      });
  var marker = new google.maps.Marker({
      position: {
          lat: lat,
          lng: lng
      },
       map: map
      });
    })
  })
)
};


// function to update map onclick all saved locations column
function initMap2() {

  $('#all-saved-dest').on('click', 'li',(function() {
    var PLACENAME = $(this).text();
    var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + PLACENAME + "&key=" + APIkey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(results) {
    
    var lng = parseFloat(results.geometry.lng);
    var lat = parseFloat(results.geometry.lat);
    var map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 8, 
          center: {
              lat: lat,
              lng: lng
          }
      });
  var marker = new google.maps.Marker({
      position: {
          lat: lat,
          lng: lng
      },
       map: map
      });
    })
  })
)
};

