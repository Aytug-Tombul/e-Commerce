window.addEventListener('load', function () {
    if (sessionStorage.getItem('username') == null || sessionStorage.getItem('username') == '') {
        $('body').append(navDiv);
    } else {
        $('body').append(loggedNavDiv);
    }

})
function navbarLoader() {
    if (sessionStorage.getItem('username') == null || sessionStorage.getItem('username') == '') {
        $('body').append(navDiv);
    } else {
        $('body').append(loggedNavDiv);
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
            <a class="nav-link">Categories</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" >Deals</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" >About</a>
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
            <a class="nav-link">Categories</a>
        </li>
        <li class="nav-item">
            <a class="nav-link">Deals</a>
        </li>
        <li class="nav-item">
            <a class="nav-link">About</a>
        </li>

    </ul>
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
    <li class="nav-item">
            <a class="nav-link">Welcome ` + sessionStorage.getItem('username') + `</a>
        </li>
        <li class="nav-item">
        <button class="btn btn-outline-dark my-2 my-sm-0" type="button" id='panelDiv'>Panel</button>
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

var loginDiv=`<div class="container-login">
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

        <p class="options">Not registered yet?<button id="registerDiv" type="submit" value="submit">Create an
        account!</button></a></p>
    </form>
</div>
</div>`

var registerDiv=`<div class="container-register">
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
        <button id="submitRegister" type="submit" value="submit">Submit</button>
    </form>
</div>
</div>`