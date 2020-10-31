<?php
include_once 'Database.php';

$db = new Database();
login();


function login()
{
    global $db;
    $data = [
        'username' => trim($_POST['username']),
        'password' => trim($_POST['password']),
    ];
    $backData = [
        'username'=>'',
        'email'=>'',
        'usernameError' => '',
        'passwordError' => ''
    ];
    //Validate username
    if (empty($data['username'])) {
        $errorData['usernameError'] = 'Please enter a username.';
    }

    //Validate password
    if (empty($data['password'])) {
        $errorData['passwordError'] = 'Please enter a password.';
    }

    //Check if all errors are empty
    if (empty($errorData['usernameError']) && empty($errorData['passwordError'])) {
        $loggedInUser = $db->login($data['username'], $data['password']);
        if ($loggedInUser) {
            $backData['username']=$loggedInUser->username;
            $backData['email']=$loggedInUser->email;
        } else {
            $errorData['passwordError'] = 'Password or username is incorrect. Please try again.';
            
        }
    }
    echo json_encode($backData);
}
