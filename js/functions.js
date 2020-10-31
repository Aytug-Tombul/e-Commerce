$(document).on("click", "#submitRegister", function () {
  var fd = new FormData();
  var image=$("#image")[0].files[0]
  var usernameVal = $("#username").val();
  var passwordVal = $("#password").val();
  var confirmVal = $("#confirmPassword").val();
  var emailVal = $("#email").val();
  fd.append("username", usernameVal);
  fd.append("password", passwordVal);
  fd.append("confirmPassword", confirmVal);
  fd.append("email", emailVal);
  fd.append("image", image);

  $.ajax({
    url: "/commerce/php/register.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function(data) {
      console.log(JSON.parse(data));
    }
  });
})