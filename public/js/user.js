

//variable for APIkey
const APIkey = "47c3a4e7c75c45e7ad46ffc3e676da38";
var notes = [];


//function declarations
function geocode(query){
  $.ajax({
    url: 'https://api.opencagedata.com/geocode/v1/json',
    method: 'GET',
    data: {
      'key': '47c3a4e7c75c45e7ad46ffc3e676da38',
      'q': query,
      'no_annotations': 1

    },
    dataType: 'json',
    statusCode: {
      200: function(response){  // success
        console.log(response.results[0].formatted);
        console.log(response.results)
      },
      402: function(){
        console.log('hit free-trial daily limit');
        console.log('become a customer: https://opencagedata.com/pricing');
      }
    }
   
  }); 
}

function initMap() {

  var PLACENAME = document.getElementById("destination").value;
  var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + PLACENAME + "&key=" + APIkey;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response.results[0].geometry.lat);
  var lat = response.results[0].geometry.lat;
  var lng = response.results[0].geometry.lng;
  var map = new google.maps.Map(
    document.getElementById('map'), {
        zoom: 8, 
        center: {
            lat: lat,
            lng: lng,
        }   
    });
    console.log(lat, lng);
var marker = new google.maps.Marker({
    position: {
        lat: lat,
        lng: lng
    },
     map: map
    });
  })
};

function getNotes() {
  $.get("/api/notes",  function(data) {
    console.log("Notes", data);
    for (var i = 0; i < data.length; i++) {
      var newItem = $("<li>");
      newItem.text(data[i].title + " " + data[i].body);
      console.log(newItem);
      $("#all-saved-dest").append(newItem);
    }
     
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

function submitNote(note) {
$.post("/api/notes/", note, function() {
  window.location.href = "/userdest";
});
}



// function initializeRows() {
//     noteContainer.empty();
//     var notesToAdd = [];
//     for (var i = 0; i < notes.length; i++) {
//       notesToAdd.push(createNewRow(notes[i]));
//     }
//     noteContainer.append(notesToAdd);
//   }
function updateNote(note) {
$.ajax({
  method: "PUT",
  url: "/api/notes",
  data: note
})
  .then(function() {
    window.location.href = "/userdest";
  }); 
}



// This function does an API call to delete posts
function deleteNote(id) {
  $.ajax({
    method: "DELETE",
    url: "/api/notes/" + id
  })
    .then(function() {
      getNotes(noteCategorySelect.val());
    });
}



$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var destID;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;
  
  getNotes();

 

  // If we have this section in our url, we pull out the post id from the url
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
    
    var newDest = destInput.val().trim()
    var noteText = $("#note-text").val().trim();
    // Wont submit the post if we are missing a body or a title
    if (!newDest || !noteText) {
      alert("Must enter destination and note")
      return;
    }
    // Constructing a newPost object to hand to the database
    

    geocode(newDest);

    console.log(newDest);

    var newNote = {
      title:newDest,
      body:noteText
    };

    submitNote(newNote);
    // if (updating) {
    //   newDest.id = destID;
    //   updateNote(newDest);
    // }
    // else {
    //   submitNote(newDest);
    // }

    initMap();
  })
 

// function to update map onclick your saved locations column

});

//geocode query for input box





// function initMap() {

//   $('#saved-dest').on('click', 'li',(function() {
//     var PLACENAME = $(this).text();
//     var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + PLACENAME + "&key=" + APIkey;

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(results) {
    
//     var lng = parseFloat(results.geometry.lng);
//     var lat = parseFloat(results.geometry.lat);
//     var map = new google.maps.Map(
//       document.getElementById('map'), {
//           zoom: 8, 
//           center: {
//               lat: lat,
//               lng: lng
//           }
//       });
//   var marker = new google.maps.Marker({
//       position: {
//           lat: lat,
//           lng: lng
//       },
//        map: map
//       });
//     })
//   })
// )
// };


// // function to update map onclick all saved locations column
// function initMap2() {

//   $('#all-saved-dest').on('click', 'li',(function() {
//     var PLACENAME = $(this).text();
//     var queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + PLACENAME + "&key=" + APIkey;

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(results) {
    
//     var lng = parseFloat(results.geometry.lng);
//     var lat = parseFloat(results.geometry.lat);
//     var map = new google.maps.Map(
//       document.getElementById('map'), {
//           zoom: 8, 
//           center: {
//               lat: lat,
//               lng: lng
//           }
//       });
//   var marker = new google.maps.Marker({
//       position: {
//           lat: lat,
//           lng: lng
//       },
//        map: map
//       });
//     })
//   })
// )
// };


  // blogContainer holds all of our posts
  // var noteContainer = $(".note-container");
 
  // Click events for the edit and delete buttons
  // $(document).on("click", "button.delete", handleNoteDelete);
  // $(document).on("click", "button.edit", handleNoteEdit);
 


  // this gets notes from our db and posts them to the page
  
  // Getting the initial list of posts

  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  

  // This function constructs a post's HTML
  // function createNewRow(post) {
  //   var newNoteCard = $("<div>");
  //   newNoteCard.addClass("card");
  //   var newNoteCardHeading = $("<div>");
  //   newNoteCardHeading.addClass("card-header");
  //   var deleteBtn = $("<button>");
  //   deleteBtn.text("x");
  //   deleteBtn.addClass("delete btn btn-danger");
  //   var editBtn = $("<button>");
  //   editBtn.text("EDIT");
  //   editBtn.addClass("edit btn btn-default");
  //   var newNoteTitle = $("<h2>");
  //   var newNoteDate = $("<small>");
  //   var newNoteCategory = $("<h5>");
  //   newNoteCategory.text(note.category);
  //   newNoteCategory.css({
  //     float: "right",
  //     "font-weight": "700",
  //     "margin-top":
  //     "-15px"
  //   });
  //   var newNoteCardBody = $("<div>");
  //   newNoteCardBody.addClass("card-body");
  //   var newNoteBody = $("<p>");
  //   newNoteTitle.text(note.title + " ");
  //   newNoteBody.text(note.body);
  //   var formattedDate = new Date(note.createdAt);
  //   formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
  //   newNoteDate.text(formattedDate);
  //   newNoteTitle.append(newNoteDate);
  //   newNoteCardHeading.append(deleteBtn);
  //   newNoteCardHeading.append(editBtn);
  //   newNoteCardHeading.append(newNoteTitle);
  //   newNoteCardHeading.append(newNoteCategory);
  //   newNoteCardBody.append(newNoteBody);
  //   newNoteCard.append(newNoteCardHeading);
  //   newNoteCard.append(newNoteCardBody);
  //   newNoteCard.data("note", note);
  //   return newNoteCard;
  // }

  // This function figures out which post we want to delete and then calls
  // deletePost
  // function handleNoteDelete() {
  //   var currentNote = $(this)
  //     .parent()
  //     .parent()
  //     .data("note");
  //   deletePost(currentNote.id);
  // }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  // function handleNoteEdit() {
  //   var currentNote = $(this)
  //     .parent()
  //     .parent()
  //     .data("note");
  //   window.location.href = "/notes?user_id=" + currentPost.id;
  // }

  // This function displays a message when there are no posts
//   function displayEmpty() {
//     noteContainer.empty();
//     var messageH2 = $("<h2>");
//     messageH2.css({ "text-align": "center", "margin-top": "50px" });
//     messageH2.html("No posts yet for this category, navigate <a href='/notes'>here</a> in order to create a new post.");
//     noteContainer.append(messageH2);
//   }
// }
  
