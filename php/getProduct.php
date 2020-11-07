<?php
include_once 'Database.php';

$db = new Database();

listProduct();

function listProduct()
{
    global $db;
    $product_name = $_POST['name'];

    $db->query('SELECT `products`.*, `rates`.`rate` FROM `products` , `rates` WHERE products.name=:product_name AND rates.product_id = products.id');

    $db->bind(':product_name',$product_name);
    $data=$db->single();
    echo json_encode($data);
}


