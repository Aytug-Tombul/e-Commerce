<?php
    Class User{
        private $db;

        public function __construct(){
            $this->db = new Database();
        }
    }