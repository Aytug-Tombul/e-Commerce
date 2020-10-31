<?php
class Database
{
    private $dbHost = 'localhost';
    private $dbUser = 'root';
    private $dbPass = '';
    private $dbName = 'commerce';

    private $statement;
    private $dbHandler;
    private $error;

    public function __construct()
    {
        $conn = 'mysql:host=' . $this->dbHost . ';dbname=' . $this->dbName;
        $options = array(
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        );
        try {

            $this->dbHandler = new PDO(
                $conn,
                $this->dbUser,
                $this->dbPass,
                $options
            );
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            echo $this->error;
        }
    }

    //Allows us to write queries
    public function query($sql)
    {
        $this->statement = $this->dbHandler->prepare($sql);
    }

    public function bind($parameter, $value, $type = null)
    {
        switch (is_null($type)) {
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

        $this->statement->bindValue($parameter, $value, $type);
    }

    //Execute statement
    public function execute()
    {
        return $this->statement->execute();
    }
    public function resultSet()
    {
        $this->execute();
        return $this->statement->fetchAll(PDO::FETCH_OBJ);
    }

    //Return specific row
    public function single()
    {
        $this->execute();
        return  $this->statement->fetch(PDO::FETCH_OBJ);
    }
    //Gets the row count
    public function rowCount()
    {
        return $this->statement->rowCount();
    }

    public function registerUser($data)
    {
        try {
            $this->query("INSERT INTO `users` (username,password,email,profile)VALUES(:username,:password,:email,:profile)");

            //Bind values
            $this->bind(':username', $data['username']);
            $this->bind(':email', $data['email']);
            $this->bind(':password', $data['password']);
            $this->bind(':profile', $data['profile']);
            //Execute function
            $this->execute();
            return true;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    public function login($username, $password)
    {


        try {
            $this->query("SELECT * FROM users WHERE username =:username");

            //Bind value
            $this->bind(':username', $username);
            $row = $this->single();
        } catch (PDOException $e) {
            return $e->getMessage();
        }
        $hashedPassword = $row->password;

        if (password_verify($password, $hashedPassword)) {
            return $row;
        } else {
            return false;
        }
    }
}
