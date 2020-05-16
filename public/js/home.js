$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".note-container");
  var noteCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleNoteDelete);
  $(document).on("click", "button.edit", handleNoteEdit);
  noteCategorySelect.on("change", handleCategoryChange);
  var notes;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/notes" + categoryString, function(data) {
      console.log("Notes", data);
      notes = data;
      if (!notes || !notes.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
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

  // Getting the initial list of posts
  getNotes();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    noteContainer.empty();
    var notesToAdd = [];
    for (var i = 0; i < notes.length; i++) {
      notesToAdd.push(createNewRow(posts[i]));
    }
    noteContainer.append(notesToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newNoteCard = $("<div>");
    newNoteCard.addClass("card");
    var newNoteCardHeading = $("<div>");
    newNoteCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newNoteTitle = $("<h2>");
    var newNoteDate = $("<small>");
    var newNoteCategory = $("<h5>");
    newNoteCategory.text(note.category);
    newNoteCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newNoteCardBody = $("<div>");
    newNoteCardBody.addClass("card-body");
    var newNoteBody = $("<p>");
    newNoteTitle.text(note.title + " ");
    newNoteBody.text(note.body);
    var formattedDate = new Date(note.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newNoteDate.text(formattedDate);
    newNoteTitle.append(newNoteDate);
    newNoteCardHeading.append(deleteBtn);
    newNoteCardHeading.append(editBtn);
    newNoteCardHeading.append(newNoteTitle);
    newNoteCardHeading.append(newNoteCategory);
    newNoteCardBody.append(newNoteBody);
    newNoteCard.append(newNoteCardHeading);
    newNoteCard.append(newNoteCardBody);
    newNoteCard.data("note", note);
    return newNoteCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleNoteDelete() {
    var currentNote = $(this)
      .parent()
      .parent()
      .data("note");
    deletePost(currentNote.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleNoteEdit() {
    var currentNote = $(this)
      .parent()
      .parent()
      .data("note");
    window.location.href = "/notes?user_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    noteContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/notes'>here</a> in order to create a new post.");
    noteContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newNoteCategory = $(this).val();
    getNotes(newNoteCategory);
  }

});
