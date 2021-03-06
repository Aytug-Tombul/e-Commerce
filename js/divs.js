window.addEventListener('load', function () {
   navbarLoader() 

})

function navbarLoader() {
    if (sessionStorage.getItem('username') == null || sessionStorage.getItem('username') == '') {
        $('body').append(navDiv);
    } else {
        if (sessionStorage.getItem('role')=='user') {
            $('body').append(loggedNavDiv);
        }else {
            $('body').append(loggedNavDiv);
            var panelBtn=`<li id='adminPanel' class="nav-item">
            <button class="btn btn-outline-dark my-2 my-sm-0" type="button" id='panelDiv'>Panel</button>
            </li>`
            $('#rightside').append(panelBtn)
        }
    }
}



var navDiv = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand">e-Commerce</a>
<div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <a class="nav-link">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" onclick='getCategories()'>Categories</a>
        </li> 
    </ul>
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <a class="nav-link" id="loginDiv">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="https://github.com/Aytug-Tombul">Github</a>
        </li>
    </ul>

</div>
</nav>`


var loggedNavDiv = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand">e-Commerce</a>
<div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <a class="nav-link">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" onclick='getCategories()'>Categories</a>
        </li>

    </ul>
    <ul id = 'rightside'class="navbar-nav ml-auto mt-2 mt-lg-0">

    <li class="nav-item">
            <a class="nav-link">Welcome ` + sessionStorage.getItem('username') + `</a>
        </li>
        <li class="nav-item">
        <button class="btn btn-outline-dark my-2 my-sm-0" type="submit" id='cartBtn'>Cart</button>
        </li>
        <li class="nav-item">
        <button class="btn btn-outline-dark my-2 my-sm-0" type="submit" id='logoutBtn'>Logout</button>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="https://github.com/Aytug-Tombul">Github</a>
        </li>
    </ul>

</div>
</nav>`

var loginDiv = `<div class="container-login">
<div class="wrapper-login">
    <h2>Sign in</h2>
    <form method="POST">
        <input type="text" placeholder="Username *" id="username">
        <span class="invalidNameFeedback">
        </span>

        <input type="password" placeholder="Password *" id="password">
        <span class="invalidPasswordFeedback">
        </span>

        <button id="submitLogin" type="button" value="submit">Submit</button>

        <p class="options">Not registered yet?<button id="registerDiv" type="button" value="submit">Create an
        account!</button></a></p>
    </form>
</div>
</div>`

var registerDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Sign in</h2>
    <form method="POST"> 
        
        <input type="text" placeholder="Username *" id="username">
        <span class="invalidNameFeedback">

        </span>
        <input type="password" placeholder="Password *" id="password">
        <span class="invalidPasswordFeedback">
        </span>
        <input type="password" placeholder="confirmpassword *" id="confirmPassword">
        <span class="invalidConfirmFeedback">
        </span>
        <input type="text" placeholder="email *" id="email">
        <span class="invalidEmailFeedback">
        </span>
        <p>Profile Image</p>
        <input type="file" class="form-control" id="image" style="font-size: 14px;">
        <button id="submitRegister" type="button" value="submit" class='reg'>Submit</button>
    </form>
</div>
</div>`

var updateDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Update</h2>
    <form method="POST"> 
        <input type="text" placeholder="id *" id="id">
        <span class="invalidIdFeedback">
        </span>
        <input type="text" placeholder="Username *" id="username">
        <span class="invalidNameFeedback">
        </span>
        <input type="password" placeholder="Password *" id="password">
        <span class="invalidPasswordFeedback">
        </span>
        <input type="password" placeholder="confirmpassword *" id="confirmPassword">
        <span class="invalidConfirmFeedback">
        </span>
        <input type="text" placeholder="email *" id="email">
        <span class="invalidEmailFeedback">
        </span>
        <p>Profile Image</p>
        <input type="file" class="form-control" id="image" style="font-size: 14px;">
        <button id="submitUpdate" type="button" value="button" class='reg'>Update</button>
    </form>
</div>
</div>`

var panelDiv = `<div class="container-panel" style='padding: 20px;'>
<div class="wrapper-buttons d-flex justify-content-center">
    <div class="btn-group btn-group-toggle">
        <label class="btn btn-secondary">
            <button class="btn btn-secondary" type="button" id="users"> User</button>
        </label>
        <label class="btn btn-secondary">
            <button class="btn btn-secondary" type="button" id="products"> Product</button>
        </label>
        <label class="btn btn-secondary">
            <button class="btn btn-secondary" type="button" id="categories"> Categories</button>
        </label>
    </div>
</div>

</div>`

var addProductDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Add Product</h2>
    <form method="POST"> 
        
        <input type="text" placeholder="Product Name" id="product">
        <input type="text" placeholder="description" id="product_desc">
        <input type="text" placeholder="Price *" id="price">
        <input type="text" placeholder="Sale" id="product_sale">
        <input type="text" placeholder="stock *" id="stock">
        <input type="text" placeholder="OFFER" id="offer">
        <input type="text" placeholder="Offer quantity *" id="offer_quantity">
        <p>Product Image</p>
        <input type="file" class="form-control" id="image" style="font-size: 14px;">
        <p>Product Category</p>
        <select id="selectCategories" name="category">
            
        </select>
        <button id="addProduct" type="button" value="submit" class='reg'>Submit</button>
    </form>
</div>
</div>`


var updateProductDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Update Product</h2>
    <form method="POST"> 
        <input type="text" placeholder="Product ID" id="productID">
        <input type="text" placeholder="Product Name" id="product">
        <input type="text" placeholder="description" id="product_desc">
        <input type="text" placeholder="Price *" id="price">
        <input type="text" placeholder="Sale" id="product_sale">
        <input type="text" placeholder="stock *" id="stock">
        <p>Product Image</p>
        <input type="file" class="form-control" id="image" style="font-size: 14px;">
        <p>Product Category</p>
        <select id="selectCategories" name="category">
            
        </select>
        <button id="updateProduct" type="button" value="submit" class='reg'>Submit</button>
    </form>
</div>
</div>`

var addCategoryDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Add Category</h2>
    <form method="POST"> 
        
        <input type="text" placeholder="Category Name" id="category_Name">
        <input type="text" placeholder="description" id="description">
        <button id="addCategory" type="button" value="submit" class='reg'>Submit</button>
    </form>
</div>
</div>`

var updateCategoryDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Add Category</h2>
    <form method="POST"> 
        <input type="text" placeholder="Category ID" id="catID">
        <input type="text" placeholder="Category Name" id="category_Name">
        <input type="text" placeholder="description" id="description">
        <button id="updateCategory" type="button" value="submit" class='reg'>Submit</button>
    </form>
</div>
</div>`



var panelButtonsDiv = `<div id='process' class="wrapper-buttons d-flex justify-content-center" style="padding: 20px;">
<div class="btn-group btn-group-toggle">
  <label class="btn btn-secondary">
    <button class="btn btn-secondary" type="button" id="add">Add</button>
  </label>
  <label class="btn btn-secondary">
    <button class="btn btn-secondary" type="button" id="update">Update</button>
  </label>
  <label class="btn btn-secondary">
    <button class="btn btn-secondary" type="button" id="search">Search</button>
  </label>
  <label class="btn btn-secondary">
    <button class="btn btn-secondary" type="button" id="delete">Delete</button>
  </label>
</div>

</div>
<div class='process-tab'>
<div class='inputArea'>
</div>
<div class='listing'></div>
</div>
`
searchDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Search</h2>
    <form method="POST"> 
        <input type="text" placeholder="id *" id="id">
        <button id="searchBtn" type="button" value="button" class='reg'>Search</button>
    </form>
</div>
</div>`

deleteDiv = `<div class="container-register">
<div class="wrapper-register">
    <h2>Delete</h2>
    <form method="POST"> 
        <input type="text" placeholder="id *" id="id">
        <button id="deleteBtn" type="button" value="button" class='reg'>Search</button>
    </form>
</div>
</div>`
var table = `<table class="table">
                        <thead>
                          <tr class='scope'>
                          
                          </tr>
                        </thead>
                        <tbody id="elements">

                        </tbody>
                      </table>`

var modalCreate = ` <!-- The Modal -->
                      <div class="modal" id="myModal">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <!-- Modal body -->
                                  <div class="modal-body" style="text-align: center;">
                                      
                                  </div>
                                  <!-- Modal footer -->
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                  </div>
                              </div>
                          </div>
                      </div>`;




var cardDiv = `<div class="card-columns">

</div>`


var productDiv = `<div id="productDetails" style='margin :100px'>
</div>
<div id='commentsArea'>
<div id='comments'>
</div>
<div id='sendComment' class='d-flex justify-content-center' style='margin-bottom : 10px;' ><textarea id = "postarea" style="width: 800px; height: 150px; margin-bottom : 10px;"></textarea><br>
<button type="button" class="btn btn-primary" id="commentBtn" style='width : 100px ; height : 50px; margin-left : 20px;'>Comment</button></div>
</div>
`
var shopDiv=`<div id='shoplist' class="d-flex justify-content-center" style=' width :900px'>
</div>
<div id='total' class="d-flex justify-content-center">
<p id='total_price' style ='padding-right:10px'>Total price : </p>
<button id='buyCart' type="button" class="btn btn-danger">Buy Cart</button>
</div>`