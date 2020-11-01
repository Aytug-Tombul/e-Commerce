<?php
include_once 'Database.php';

$db = new Database();
search();


function search()
{
    $id = $_POST['id'];
    $tableName = $_POST['tableName'];

    global $db;
    //Prepared statement
    $db->query("SELECT * FROM " . $tableName . " WHERE id = :id");
    $db->bind(':id', $id);

    $row = $db->single();
    echo json_encode($row);
    if ($db->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}
