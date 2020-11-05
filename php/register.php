<?php
include_once 'Database.php';

$db = new Database();
register();

function register()
{
    global $db;
    $dir = dirname(dirname(__FILE__));
    if(isset($_FILES['profile']['name'])){
        $profile=$_FILES['profile']['name'];
        $target = $dir."/images/" . basename($profile);
        move_uploaded_file($_FILES['profile']['tmp_name'], $target);
    }else{
        $profile =null;
    }
    $data = [
        'id'=>trim($_POST['id']),
        'username' => trim($_POST['username']),
        'password' => trim($_POST['password']),
        'confirmPassword' => trim($_POST['confirmPassword']),
        'email' => trim($_POST['email']),
        'profile' =>$profile,
    ];
    $errorData = [
        'usernameError' => '',
        'passwordError' => '',
        'confirmPasswordError' => '',
        'emailError' => ''
    ];

    $nameValidation = "/^[a-zA-Z0-9]*$/";
    
    //Validate  username on letters/numbers

    if (empty($data['username'])) {
        $errorData['usernameError'] = 'Please Enter Username.';
    } elseif (!preg_match($nameValidation, $data['username'])) {
        $errorData['usernameError'] = 'Please Valid Username (letters and numbers).';
    }

    // Validate email
    if (empty($data['email'])) {
        $errorData['emailError'] = 'Please Enter Email.';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errorData['emailError'] = 'Please enter the correct format.';
    } else {
        if (findUserByEmail($data['email'])) {
            $errorData['emailError'] = 'Email is already taken.';
        }
    }
    //Validate password(length and numeric values)
    if (empty($data['password'])) {
        $errorData['passwordError'] = 'Please enter password';
    } elseif (strlen($data['password'] > 8)) {
        $errorDataa['passwordError'] = 'Password must be  at least 8 characters';
    }

    //Validate confirm

    if (empty($data['confirmPassword'])) {
        $errorData['confirmPasswordError'] = 'Please enter password';
    } else {
        if ($data['password'] != $data['confirmPassword']) {
            $errorData['confirmPasswordError'] = 'Passwords do not match';
        }
    }
    //Make sure errors are empty
    if (
        empty($errorData['usernameError']) && empty($errorData['passwordError'])
        && empty($errorData['confirmPasswordError']) && empty($errorData['emailError'])
    ) {
        //Hash password  
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        if ($_POST['update']) {
            if ($db->updateUser($data)) {

            } else {
                
                die('Something went wrong');
            }
        }else{
            if ($db->registerUser($data)) {
            } else {
                
                die('Something went wrong');
            }
        }
        
    }
    echo json_encode($errorData);
    
}


function findUserByEmail($email)
{
    global $db;
    //Prepared statement
    $db->query("SELECT * FROM `users` WHERE email = :email");

    //Email param will be binded with the email variable
    $db->bind(':email', $email);
    $db->execute();
    //Check if email is already registered
    if ($db->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}
