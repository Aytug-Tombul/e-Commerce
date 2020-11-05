<?php
include_once 'Database.php';

$db = new Database();

listProduct();

function listProduct()
{
    global $db;
    $product_name = $_POST['name'];

    $db->query('SELECT * FROM products WHERE name= :product_name');
    $db->bind(':product_name',$product_name);
    $data=$db->single();
    echo json_encode($data);
}


