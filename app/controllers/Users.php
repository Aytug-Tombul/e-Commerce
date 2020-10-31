<?php
class Users extends Controller
{
    public function __construct()
    {
        $this->userModel = $this->model('User');
    }

    public function register()
    {


        $data = [
            'username' => '',
            'password' => '',
            'confirmPassword' => '',
            'email' => '',
            'usernameError' => '',
            'passwordError' => '',
            'confirmPasswordError' => '',
            'emailError' => '',
        ];

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            echo "dont";
            $data = [
                'username' => trim($_POST['username']),
                'password' => trim($_POST['password']),
                'confirmPassword' => trim($_POST['confirmPassword']),
                'email' => trim($_POST['email']),
                'usernameError' => '',
                'passwordError' => '',
                'confirmPasswordError' => '',
                'emailError' => '',
            ];

            $nameValidation = "/^[a-zA-Z0-9]*$/";
            $passwordValidation = "/^(.{0,7}|[^a-z]*|[^\d]*)$/i";

            //Validate  username on letters/numbers

            if (empty($data['username'])) {
                $data['usernameError'] = 'Please Enter Username.';
            } elseif (!preg_match($nameValidation, $data['username'])) {
                $data['usernameError'] = 'Please Valid Username (letters and numbers).';
            }

            // Validate email
            if (empty($data['email'])) {
                $data['emailError'] = 'Please Enter Email.';
            } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                $data['emailError'] = 'Please enter the correct format.';
            } else {
                if ($this->userModel->findUserByEmail($data['email'])) {
                    $data['emailError'] = 'Email is already taken.';
                }
            }
            //Validate password(length and numeric values)
            if (empty($data['password'])) {
                $data['passwordError'] = 'Please enter password';
            } elseif (strlen($data['password'] < 8)) {
                $data['passwordError'] = 'Password must be  at least 8 characters';
            } elseif (!preg_match($passwordValidation, $data['username'])) {
                $data['passwordError'] = 'Please enter valid password.';
            }

            //Validate confirm

            if (empty($data['confirmPassword'])) {
                $data['confirmPasswordError'] = 'Please enter password';
            } else {
                if ($data['password'] != $data['confirmPassword']) {
                    $data['confirmPasswordError'] = 'Passwords do not match';
                }
            }
            //Make sure errors are empty
            if (
                empty($data['usernameError']) && empty($data['passwordError'])
                && empty($data['confirmPasswordError']) && empty($data['emailError'])
            ) {
                //Hash password  
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                if ($this->userModel->register($data)) {
                    header('location:' . URLROOT . '/users/login');
                } else {
                    die('Something went wrong');
                }
            }
        }
        $this->view('users/register', $data);
    }

    public function login()
    {
        $data = [
            'title' => 'Login Page',
            'usernameError' => '',
            'passwordError' => ''
        ];
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            # code...
        }
        $this->view('users/login', $data);
    }
}
