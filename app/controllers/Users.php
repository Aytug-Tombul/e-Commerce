<?php
class Users extends Controller{
    public function __construct(){
        $this->userModel = $this->model('User');
    }
    public function register(){
        $data =[
            'username'=>'',
            'password'=>'',
            'confirmpassword'=>'',
            'email'=>'',
            'usernameError'=>'',
            'passwordError'=>'',
            'confirmPasswordError'=>'',
            'emailError'=>'',   
        ];

        $this->view('users/register',$data);
    }

    public function login(){
        $data=[
            'title' =>'Login Page',
            'usernameError'=> '',
            'passwordError'=>''
        ];

        $this->view('users/login',$data);
    }
}