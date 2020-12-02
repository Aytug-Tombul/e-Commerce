<?php
include_once 'Database.php';

$db = new Database();
removeItem();


function removeItem()
{
    global $db;
    $product_id = $_POST['product_id'];
    $user_id = $_POST['user_id'];
    $db->query('SELECT select_products FROM carts WHERE user_id=:id');
    $db->bind(':id', $user_id);
    $cart = $db->single();
    $products = json_decode($cart->select_products);
    $key = 0;
    foreach ($products as $product) {

        if ($product->product_id == $product_id) {
            unset($products[$key]);
            $db->query("UPDATE carts SET select_products = :products_json WHERE user_id = :id");
            $db->bind(':id', $user_id);
            $db->bind(':products_json', json_encode($products));
            $db->execute();
            $db->query("UPDATE products SET stock = stock + :quantity WHERE id = :id");
            $db->bind(':id', $product_id);
            $db->bind(':quantity', $product->product_quantity);
            $db->execute();
            if (empty($products)) {
                $db->query("DELETE FROM carts WHERE user_id = :id");
                $db->bind(':id', $user_id);
                $db->execute();
            }
        }
        $key++;
    }
}
