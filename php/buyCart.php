<?php
include_once 'Database.php';

$db = new Database();
buyCart();


function buyCart()
{
    $total = 0;
    global $db;
    $u_id = $_POST['user_id'];
    $db->query('SELECT select_products FROM carts WHERE user_id=:id');
    $db->bind(':id', $u_id);
    $cart = $db->single();
    $products = json_decode($cart->select_products);
    foreach ($products as $product) {
        $total = floatval($total) + (floatval($product->product_total) * floatval($product->product_quantity));
    }
    try {
        $db->query("INSERT INTO payed (user_id,total_price,buyed_products,purchase_date) VALUES(:user_id,:total,:buyed,:purchase_date)");
        $db->bind(':user_id', $u_id);
        $db->bind(':total', $total);
        $db->bind(':buyed', json_encode($products));
        $db->bind(':purchase_date',date('Y-m-d H:i:s'));
        $db->execute();
        $db->query("DELETE FROM carts WHERE user_id = :id");
        $db->bind(':id', $u_id);
        $db->execute();
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
