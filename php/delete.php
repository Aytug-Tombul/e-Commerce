<?php
include_once 'Database.php';

$db = new Database();
delete();


function delete()
{
    $id = $_POST['id'];
    $tableName = $_POST['tableName'];

    global $db;
    //Prepared statement
    $db->query("DELETE FROM " . $tableName . " WHERE id = :id");
    $db->bind(':id', $id);
    $db->execute();

    echo 'Element has been removed.';
    if ($db->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}
