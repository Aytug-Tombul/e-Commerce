<?php
require APPROOT . '/views/includes/head.php';
?>
<?php
require APPROOT . '/views/includes/navigation.php';
?>

<div class="container-register">
    <div class="wrapper-register">
        <h2>Sign in</h2>
        <form method="POST">
            <input type="text" placeholder="Username *" id="username">
            <span class="invalidFeedback">
                <?php echo $data['usernameError']; ?>
            </span>
            <input type="password" placeholder="Password *" id="password">
            <span class="invalidFeedback">
                <?php echo $data['passwordError']; ?>
            </span>
            <input type="password" placeholder="confirmpassword *" id="confirmPassword">
            <span class="invalidFeedback">
                <?php echo $data['confirmPasswordError']; ?>
            </span>
            <input type="text" placeholder="email *" id="email">
            <span class="invalidFeedback">
                <?php echo $data['emailError']; ?>
            </span>

            <button id="submitRegister" type="button" value="submit">Submit</button>
        </form>
    </div>
</div>