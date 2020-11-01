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
        if(data[username]==''){
          console.log('something wrong')
        }else{
          sessionStorage.setItem('username',data['username'])
          sessionStorage.setItem('email',data['email']);
          location.reload();
          return false;
        }
        
        console.log(data)
      } catch (e) {
        //console.log(data)
      }

    }
  });
})
$(document).on('click', '#registerDiv',function(){
  $('body').empty();
  navbarLoader();
  $('body').append(registerDiv);
})


$(document).on('click', '#loginDiv',function(){
  $('body').empty();
  navbarLoader();
  $('body').append(loginDiv);
})
$(document).on('click', '#logoutBtn',function(){
  $('body').empty();
  navbarLoader();
  sessionStorage.clear();
  location.reload();
  return false;
})

