<?php
include_once 'Database.php';

$db = new Database();

getCart();

function getCart()
{
    global $db;
    $id = $_POST['user_id'];
    
    $db->query('SELECT select_products FROM carts WHERE user_id=:id');
    $db->bind(':id' , $id);
    $cart = $db->single();
    echo $cart->select_products;
}

