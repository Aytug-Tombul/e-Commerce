<?php
include_once 'Database.php';

$db = new Database();

listVal();

function listVal()
{
    global $db;
    $table_name = $_POST['name'];
    
    $db->query('SELECT * FROM ' . $table_name . ' ORDER BY `' . $table_name . '`.`id`');
    $row = $db->resultSet();
    echo json_encode($row);
}


