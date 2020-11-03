<?php

include_once 'Database.php';

$db = new Database();


$data = [
    'functionName' => $_POST['functionCall'],
    'id' => '',
    'name' => '',
    'description' => ''
];
if ($data['functionName'] == 'add') {
    registerCategory($data);
} elseif ($data['functionName'] == 'update') {
    updateCategory($data);
}

function registerCategory($data)
{

    $data['name'] = $_POST['name'];
    $data['description'] = $_POST['description'];
    global $db;
    try {
        $db->query("INSERT INTO `categories` (name,description)VALUES(:name,:description)");

        //Bind values
        $db->bind(':name', $data['name']);
        $db->bind(':description', $data['description']);
        //Execute function
        $db->execute();
        return true;
    } catch (PDOException $e) {
        return $e->getMessage();
    }
}

function updateCategory($data)
{

    try {
        global $db;
        $data['id'] = $_POST['catID'];
        $data['name'] = $_POST['name'];
        $data['description'] = $_POST['description'];
        $db->query("UPDATE `categories` SET `name` = :name , `description`=:description WHERE `categories`.`id` = :id ");

        //Bind values
        $db->bind(':id', $data['id']);
        $db->bind(':name', $data['name']);
        $db->bind(':description', $data['description']);
        //Execute function
        $db->execute();
        //return true;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
