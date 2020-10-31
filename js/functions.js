$('body').append()
$(document).on("click", "#submitRegister", function () {
  var fd = new FormData();
  var image = $("#image")[0].files[0]
  var usernameVal = $("#username").val();
  var passwordVal = $("#password").val();
  var confirmVal = $("#confirmPassword").val();
  var emailVal = $("#email").val();
  fd.append("username", usernameVal);
  fd.append("password", passwordVal);
  fd.append("confirmPassword", confirmVal);
  fd.append("email", emailVal);
  fd.append("profile", image);

  $.ajax({
      url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/register.php",
      type: "POST",
      dataType: "text",
      data: fd,
      processData: false,
      contentType: false,
      success: function (data) {
        try {
          data = JSON.parse(data);
          $('.invalidNameFeedback').append(data['usernameError']);
          $('.invalidPasswordFeedback').append(data['passwordError']);
          $('.invalidConfirmFeedback').append(data['confirmPasswordError']);
          $('.invalidEmailFeedback').append(data['emailError']);
          if (
            (data['usernameError'] == '') && empty(data['passwordError'] == '') &&
            (data['confirmPasswordError'] == '') && (data['emailError'] == '')
          ) {
            window.location('/e-Commerce/e-Commerce-first-MVC-tutorial-/pages/login')
          }

        

      } catch (e) {
        console.log(data)
      }

    }
  });
})


$(document).on("click", "#submitLogin", function () {
  var fd = new FormData();
  var usernameVal = $("#username").val();
  var passwordVal = $("#password").val();
  fd.append("username", usernameVal);
  fd.append("password", passwordVal);
  $.ajax({
    url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/login.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
     
      try {
        data = JSON.parse(data);
        $('.invalidNameFeedback').append(data['usernameError']);
        $('.invalidPasswordFeedback').append(data['passwordError']);
        localStorage.setItem('username',data['username']);
        localStorage.setItem('email',data['email']);
        console.log(data)
      } catch (e) {
        //console.log(data)
      }

    }
  });
})

