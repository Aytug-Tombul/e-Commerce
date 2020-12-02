<?php
include_once 'Database.php';

$db = new Database();

listProduct();

function listProduct()
{
    global $db;
    $p_id = $_POST['product_id'];
    
    $db->query('SELECT comments.*,users.username FROM `comments` INNER JOIN users WHERE comments.user_id= 36 and users.id=36');
    $db->bind(':p_id',$p_id);
    $data=$db->resultSet();
    echo json_encode($data);
}


