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
        location.reload();
        return false;
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
        if (data[username] == '') {
          console.log('something wrong')
        } else {
          sessionStorage.setItem('username', data['username'])
          sessionStorage.setItem('email', data['email']);
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
$(document).on('click', '#registerDiv', function () {
  $('body').empty();
  navbarLoader();
  $('body').append(registerDiv);
})


$(document).on('click', '#loginDiv', function () {
  $('body').empty();
  navbarLoader();
  $('body').append(loginDiv);
})

$(document).on('click', '#panelDiv', function () {
  $('body').empty();
  navbarLoader();
  $('body').append(panelDiv);
})

$(document).on('click', '#logoutBtn', function () {
  $('body').empty();
  navbarLoader();
  sessionStorage.clear();
  location.reload();
  return false;
})


var tableName = '';

$(document).on('click', '#users', function () {
  tableName = this.id;
  $('#process').remove();
  $('.process-tab').remove()
  $('.container-panel').append(panelButtonsDiv);
  $('.listing').append(table)
  getTable(tableName);
})

$(document).on('click', '#products', function () {
  name = this.id;
  console.log(name);
  $('#process').remove();
  $('.process-tab').remove()
  $('.container-panel').append(panelButtonsDiv);
  getTable();
})
$(document).on('click', '#categories', function () {
  name = this.id;
  console.log(name);
  $('#process').remove();
  $('.process-tab').remove()
  $('.container-panel').append(panelButtonsDiv);
  getTable();
})


$(document).on('click', '#add', function () {
  switch (tableName) {
    case 'users':
      $('.inputArea').empty();
      $('.inputArea').append(registerDiv);
      break;
    case 'products':
      break;
    case 'categories':
      break;
    default:
      break;
  }

})
$(document).on('click', '#update', function () {
  switch (tableName) {
    case 'users':
      $('.inputArea').empty();
      $('.inputArea').append(updateDiv);
      break;
    case 'products':
      break;
    case 'categories':
      break;
    default:
      break;
  }

})
$(document).on('click', '#search', function () {
  switch (tableName) {
    case 'users':
      $('.inputArea').empty();
      $('.inputArea').append(searchDiv);
      break;
    case 'products':
      break;
    case 'categories':
      break;
    default:
      break;
  }

})

$(document).on('click', '#delete', function () {
  switch (tableName) {
    case 'users':
      $('.inputArea').empty();
      break;
    case 'products':
      break;
    case 'categories':
      break;
    default:
      break;
  }

})

function getTable(name) {
  $.ajax({
    url: '/e-Commerce/e-Commerce-first-MVC-tutorial-/php/list.php',
    type: "POST",
    dataType: "text",
    data: {
      name: name
    },
    success: function (data) {
      listTable(data);
    }
  });

}

function listTable(data) {
  data = JSON.parse(data);
  if (data.length == undefined) {
    dataLen = 1
  } else {
    dataLen = data.length;
  }
  console.log(data)
  var key = ''
  var scopeVal = ''
  var element = '<tr>'
  for (let i = 0; i < dataLen; i++) {
    if (dataLen == 1) {
      keyLength = Object.keys(data)
    } else {
      keyLength = Object.keys(data[i]).length
    }
    for (let j = 0; j < keyLength; j++) {
      if (dataLen == 1) {
        key = Object.keys(data)[j];
        console.log(key);
      } else {
        key = Object.keys(data[i])[j];
      }
      console.log(i);
      if (i <= 1) {
        scopeVal = scopeVal + '<th scope="col">' + key + '</th> '
      }
      if (key == 'profile') {
        var imageSrc = "images/" + data[i]["profile"];

        element = element + '<td><img src="' + imageSrc + '" data-toggle="modal" data-target="#myModal" onclick="modalSend(this.src)" style="width: 50px;">' + "</td>"
      } else {
        element = element + '<td>' + data[i][key] + '</td>';
      }



    }
    element = element + '</tr>';
    console.log(element)
    $('#elements').append(element);
    element = '<tr>';
  }
  $('.scope').append(scopeVal);
  console.log(scopeVal)


}



function modalSend(_src) {
  $('body').append(modalCreate);
  $(".modal-body").empty();
  var imgCreate = '<img style="width: 300px;" src="' + _src + '">';
  $(".modal-body").append(imgCreate);
}
$(document).on('click', '#modalRemover', function () {
  $('.modal').remove();
})


$(document).on("click", "#submitUpdate", function () {
  var fd = new FormData();
  var image = $("#image")[0].files[0]
  var idVal = $("#id").val();
  var usernameVal = $("#username").val();
  var passwordVal = $("#password").val();
  var confirmVal = $("#confirmPassword").val();
  var emailVal = $("#email").val();
  fd.append('id', idVal)
  fd.append('update', true)
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
        location.reload();
        return false;
      } catch (e) {
        console.log(data)
      }

    }
  });
})

$(document).on('click', '#searchBtn', function () {
  var fd = new FormData();
  var idVal = $("#id").val();
  fd.append('id', idVal);
  fd.append('tableName', tableName);
  $.ajax({
    url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/search.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
      $('.table').empty()
      listTable(data);
    }
  });
})