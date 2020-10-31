<?php
    class Database {
        private $dbHost = 'localhost';
        private $dbUser = 'root';
        private $dbPass = '';
        private $dbName = 'commerce';
        
        private $statement;
        private $dbHandler;
        private $error;

        public function __construct(){
            $conn ='mysql:host=' . $this->dbHost . ';dbname='. $this->dbName;
            $options = array(
                PDO::ATTR_PERSISTENT => true,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            );
            try{

                $this ->dbHandler = new PDO($conn, $this->dbUser, $this->dbPass, 
                $options);

            }catch(PDOException $e){
                $this->error = $e->getMessage();
                echo $this->error;
            }
        }

        //Allows us to write queries
        public function query($sql){
            $this->statement = $this ->dbHandler->prepare($sql);
        }

        public function bind($parameter , $value , $type = null){
            switch(is_null($type)){
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                $type = PDO::PARAM_STR;
            }

            $this->statement->bindValue($parameter,$value,$type);
        }

        //Execute statement
        public function execute(){
            return $this->statement->execute();
        }
        public function resultSet(){
            $this->execute();
            return $this->statement->fetchAll(PDO::FETCH_OBJ);
        }

        //Return specific row
        public function single(){
            $this->execute();
            return $this->statement-fetch(PDO::FETCH_OBJ);
        }
        //Gets the row count
        public function rowCount(){
            return $this->statement->rowCount();
        }

        public function registerUser($data){
            $this->db->query('INSERT INTO users (username, password, email, profile) VALUES(:username, :password, :email :profile)');
    
            //Bind values
            $this->db->bind(':username', $data['username']);
            $this->db->bind(':email', $data['email']);
            $this->db->bind(':password', $data['password']);
            $this->db->bind(':profile', $data['profile']);
            //Execute function
            if ($this->db->execute()) {
                return true;
            } else {
                return false;
            }
        }

    }