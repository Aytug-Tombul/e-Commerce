var approot = 'C:\\wamp64\\www\\e-Commerce\\e-Commerce-first-MVC-tutorial-\\app'
class User {
    constructor(name, password, confirmPassword, email) {
        this.name = name;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
    }

        register(){
        $.ajax({
            url: approot + "\\models\\User.php",
            type: "POST",
            dataType: "text",
            data: {
                user: {
                    name: this.name,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    email: this.email
                }
            },
            success: function (data) {
                console.log(data);
            }
        });
        console.log("func OK!")
    }
}

$(document).on("click", "#submitRegister", function () {
    var user = new User($('#username').val(),$('#password').val(),$('#confirmPassword').val(),$('#email').val());
    user.register();
    console.log(user);  
});