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
        'id'=>'',
        'username'=>'',
        'email'=>'',
        'usernameError' => '',
        'passwordError' => ''
    ];
    //Validate username
    if (empty($data['username'])) {
        $backData['usernameError'] = 'Please enter a username.';
    }

    //Validate password
    if (empty($data['password'])) {
        $backData['passwordError'] = 'Please enter a password.';
    }

    //Check if all errors are empty
    if (empty($backData['usernameError']) && empty($backData['passwordError'])) {
        $loggedInUser = $db->login($data['username'], $data['password']);
        if ($loggedInUser) {
            $backData['username']=$loggedInUser->username;
            $backData['email']=$loggedInUser->email;
            $backData['id']=$loggedInUser->id;
        } else {
            $backData['passwordError'] = 'Password or username is incorrect. Please try again.';
            
        }
    }
    echo json_encode($backData);
}
