<?php 
class Pages extends Controller{
    public function __construct() {
        $this->userModel = $this->model('User');

    }

    public function index(){
        
        $data=[
            'title'=>'Home Page'
        ];
        $this->view('pages/index',$data);

    }
    public function about(){
        $this->view('pages/about');
    }
}