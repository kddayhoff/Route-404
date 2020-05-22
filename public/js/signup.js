$(document).ready(function () {
    // Getting references to our form and input
    var signUpForm = $("#signup-form");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    // When the signup button is clicked, we validate the email and password are not blank
    
    // If we have an email and password, run the signUpUser function
    

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
        $.post("/api/signup", {
            email: email,
            password: password
        }).then(function (data) {
            window.location.replace("/userdest");
        });
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});