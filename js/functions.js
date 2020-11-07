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
        $('#loginDiv').trigger('click');
      } catch (e) {
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

        } else {
          sessionStorage.setItem('id', data['id'])
          sessionStorage.setItem('username', data['username'])
          sessionStorage.setItem('email', data['email']);
          location.reload();
          return false;
        }


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
  tableName = this.id;
  $('#process').remove();
  $('.process-tab').remove()
  $('.container-panel').append(panelButtonsDiv);
  $('.listing').append(table)
  getTable(tableName);
})
$(document).on('click', '#categories', function () {
  tableName = this.id;
  $('#process').remove();
  $('.process-tab').remove()
  $('.container-panel').append(panelButtonsDiv);
  $('.listing').append(table)
  getTable(tableName);
})


$(document).on('click', '#add', function () {
  switch (tableName) {
    case 'users':
      $('.inputArea').empty();
      $('.inputArea').append(registerDiv);
      break;
    case 'products':
      $('.inputArea').empty();
      $('.inputArea').append(addProductDiv);
      selectCategories();
      break;
    case 'categories':
      $('.inputArea').empty();
      $('.inputArea').append(addCategoryDiv);
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
      $('.inputArea').empty();
      $('.inputArea').append(updateProductDiv);
      selectCategories();
      break;
    case 'categories':
      $('.inputArea').empty();
      $('.inputArea').append(updateCategoryDiv);
      break;
    default:
      break;
  }

})
$(document).on('click', '#search', function () {
  $('.inputArea').empty();
  $('.inputArea').append(searchDiv);

})

$(document).on('click', '#delete', function () {
  $('.inputArea').empty();
  $('.inputArea').append(deleteDiv);

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
      return data;
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
  var key = ''
  var scopeVal = ''
  var element = '<tr>'
  for (let i = 0; i < dataLen; i++) {
    if (dataLen == 1) {
      keyLength = Object.keys(data).length;
    } else {
      keyLength = Object.keys(data[i]).length
    }
    for (let j = 0; j < keyLength; j++) {
      if (dataLen == 1) {
        key = Object.keys(data)[j];
      } else {
        key = Object.keys(data[i])[j];
      }

      if (i < 1) {
        scopeVal = scopeVal + '<th scope="col">' + key + '</th> '
      }
      if (dataLen == 1) {
        if (key == 'profile') {
          var imageSrc = "images/" + data["profile"];

          element = element + '<td><img src="' + imageSrc + '" data-toggle="modal" data-target="#myModal" onclick="modalSend(this.src)" style="width: 50px;">' + "</td>"
        } else {
          element = element + '<td>' + data[key] + '</td>';
        }


      } else {
        if (key == 'profile') {
          var imageSrc = "images/" + data[i]["profile"];

          element = element + '<td><img src="' + imageSrc + '" data-toggle="modal" data-target="#myModal" onclick="modalSend(this.src)" style="width: 50px;">' + "</td>"
        } else {
          element = element + '<td>' + data[i][key] + '</td>';
        }

      }



    }
    element = element + '</tr>';
    $('#elements').append(element);
    element = '<tr>';
  }
  $('.scope').append(scopeVal);


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
        $('#users').trigger('click');
      } catch (e) {
        //console.log(data)
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
      $('.listing').empty()
      $('.listing').append(table)
      listTable(data);
    }
  });
})

$(document).on('click', '#deleteBtn', function () {
  var fd = new FormData();
  var idVal = $("#id").val();
  fd.append('id', idVal);
  fd.append('tableName', tableName);
  $.ajax({
    url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/delete.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
      window.alert(data);
      $('#' + tableName).trigger('click');

    }
  });
})

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
        //console.log(data)
      }

    }
  });
})


$(document).on("click", "#addCategory", function () {
  var fd = new FormData();
  var categoryName = $("#category_Name").val();
  var descriptionVal = $("#description").val();
  fd.append("functionCall", 'add');
  fd.append("name", categoryName);
  fd.append("description", descriptionVal);
  $.ajax({
    url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/Category.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      $('#categories').trigger('click');
    }
  });
})
$(document).on("click", "#updateCategory", function () {
  var fd = new FormData();
  var catID = $('#catID').val();
  var categoryName = $("#category_Name").val();
  var descriptionVal = $("#description").val();
  fd.append("functionCall", 'update');
  fd.append("catID", catID);
  fd.append("name", categoryName);
  fd.append("description", descriptionVal);
  $.ajax({
    url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/Category.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
      //console.log(data);
      $('#categories').trigger('click');
    }
  });
})



function selectCategories() {
  $.ajax({
    url: '/e-Commerce/e-Commerce-first-MVC-tutorial-/php/list.php',
    type: "POST",
    dataType: "text",
    data: {
      name: 'categories'
    },
    success: function (data) {
      var options = ''
      data = JSON.parse(data)
      data.forEach(element => {
        option = '<option value="' + element.name + '">' + element.name + '</option>'
        options = options + option;
      });
      $('#selectCategories').append(options);
    }
  });

}

$(document).on("click", "#addProduct", function () {
  var fd = new FormData();
  var image = $("#image")[0].files[0]
  var productName = $("#product").val();
  var descriptionVal = $("#product_desc").val();
  var sale = $("#product_sale").val();
  var priceVal = $("#price").val();
  var stock = $("#stock").val();
  var productCategory = $("#selectCategories").val();
  fd.append('functionCall', 'add')
  fd.append("productName", productName);
  fd.append("description", descriptionVal);
  fd.append("price", priceVal);
  fd.append("sale", sale);
  fd.append("stock", stock);
  fd.append("profile", image);
  fd.append("productCategory", productCategory);

  $.ajax({
    url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/Product.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
      try {
        $('#products').trigger('click');
        //console.log(data)
      } catch (e) {
        //console.log(data)
      }

    }
  });
})

$(document).on("click", "#updateProduct", function () {
  var fd = new FormData();
  var id = $("#productID").val();
  var image = $("#image")[0].files[0]
  var productName = $("#product").val();
  var descriptionVal = $("#product_desc").val();
  var sale = $("#product_sale").val();
  var priceVal = $("#price").val();
  var stock = $("#stock").val();
  var productCategory = $("#selectCategories").val();
  fd.append('functionCall', 'update')
  fd.append("id", id);
  fd.append("productName", productName);
  fd.append("description", descriptionVal);
  fd.append("price", priceVal);
  fd.append("sale", sale);
  fd.append("stock", stock);
  fd.append("profile", image);
  fd.append("productCategory", productCategory);

  $.ajax({
    url: "/e-Commerce/e-Commerce-first-MVC-tutorial-/php/Product.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
      try {
        //console.log(data);
        $('#products').trigger('click');
      } catch (e) {
        //console.log(data)
      }

    }
  });
})

function getCategories() {
  $('body').empty();
  navbarLoader();
  $.ajax({
    url: '/e-Commerce/e-Commerce-first-MVC-tutorial-/php/list.php',
    type: "POST",
    dataType: "text",
    data: {
      name: 'categories'
    },
    success: function (data) {
      data = JSON.parse(data);
      var cards = '';
      $('body').append(cardDiv);
      data.forEach(element => {
        card = `<div class="card" id='` + element.name + `'>` +
          `<div class="card-header">` + element.name + `</div>
        <div class="card-body">
        <h5 class="card-title">` + element.description + `</h5>
        <a id="goCategory" class="btn btn-primary">Go Category</a> </div>
        </div>`
        cards = cards + card

      });
      $('.card-columns').append(cards);
    }
  });
}
$(document).on('click', '#goCategory', function () {
  $('body').empty();
  navbarLoader();
  var categoryName = $(this).parent().parent().prop('id')
  $.ajax({
    url: '/e-Commerce/e-Commerce-first-MVC-tutorial-/php/listProducts.php',
    type: "POST",
    dataType: "text",
    data: {
      name: categoryName
    },
    success: function (data) {
      data = JSON.parse(data);
      $('body').append(cardDiv);
      var cards=''
      data.forEach(element => {
        card=`
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src='images/`+element.profile+`' alt="Card image cap" style=' width:100%;
        height: 230px;'>
        <div class="card-body">
          <h5 class="card-title">`+element.name+`</h5>
          <p class="card-text">`+element.description+`</p>
          <a class="btn btn-primary" id=goProduct>Go product</a>
        </div>
      </div>`
      cards=cards+card
      });
      $('.card-columns').append(cards)
    }
  });
})
var product_id=''
$(document).on('click', '#goProduct', function() {
  var productName = $(this).parent().children('h5').text();
  $('body').empty();
  navbarLoader();
  goProduct(productName);
})



function goProduct(name) {
  
  $.ajax({
    url: '/e-Commerce/e-Commerce-first-MVC-tutorial-/php/getProduct.php',
    type: "POST",
    dataType: "text",
    data: {
      name: name
    },
    success: function (data) {
      $('body').append(productDiv);
      data = JSON.parse(data);
      product_id=data['id'];
      var totalprice=0;
      total_price= (data.price*((100-data.sale)/100)).toFixed(2);
     

      productDetails=`<div id='product'>
      <img src="images/`+data.profile+`" alt="panda" class="img-thumbnail"class='col-4'>
      <p id='p_id'value='`+product_id+`'>Product ID:` +product_id + `
      <div id='details' class='col-8'>
      <p id='p_name' value='`+data.name+`'>Name: `+data.name+`</p>
      <p>Description: `+data.description+`</p>
      <p>Price: `+data.price+`</p>
      <p>Rate: `+data.rate+`</p>
      <p>Sale: `+data.sale+`</p>
      <p id='p_total' value='`+total_price+`'>Total Price: `+total_price+`</p>
      <p id='p_stock' value='`+data.stock+`'>Stock: `+data.stock+`</p>
      <div class='row'>
      <p id='quantity'>Quantity:</p>
      
      <select id="selectQuantity" name="quantity" style='margin-left : 20px'>
                  
      </select>
      <p>     If you buy 3 or more you have total %15 sale</p>
      <div class='ml-auto' id='rate'>
      <select id="rates" name="rate" style='margin-left : 20px'>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      </select>
      <button id='vote' type="button" class="btn btn-danger">Vote</button>        
      </div>
      
      </div>
      <button id='buyProduct' type="button" class="btn btn-danger">Buy</button>
      </div>
      </div>`
      
      $('#productDetails').append(productDetails);
      if (data.stock == 0) {
        $('#selectQuantity').remove()
        $('#quantity').append('  Stock empty');
      }else{
        for (let i = 1; i <= data.stock; i++) {
          option = "<option value="+i+">"+i+"</option>"
          $('#selectQuantity').append(option);
        }
      }
      
    }
  });
}

$(document).on('click', '#buyProduct', function () {
  var p_id=$('#p_id').attr('value')
  var p_name=$('#p_name').attr('value')
  var p_total=$('#p_total').attr('value')
  var p_stock=$('#p_stock').attr('value')
  var p_quantity=$('#selectQuantity').val();
  var user_id = sessionStorage.getItem('id');
  $.ajax({
    url: '/e-Commerce/e-Commerce-first-MVC-tutorial-/php/cart.php',
    type: "POST",
    dataType: "text",
    data: {
      p_id: p_id,
      p_name:p_name,
      p_total:p_total,
      p_stock:p_stock,
      p_quantity:p_quantity,
      user_id:user_id
    },
    success: function (data) {
      window.alert(data);
      $('body').empty();
      navbarLoader();
      goProduct(p_name);
      //data = JSON.parse(data);
    }
  });
})


$(document).on('click', '#vote', function () {
  var user_id = sessionStorage.getItem('id');
  var vote = $('#rates').val();
  $.ajax({
    url: '/e-Commerce/e-Commerce-first-MVC-tutorial-/php/vote.php',
    type: "POST",
    dataType: "text",
    data: {
      product_id: product_id,
      vote:vote,
      user_id: user_id
    },
    success: function (data) {
      
      window.alert(data);
    }
  });
})
