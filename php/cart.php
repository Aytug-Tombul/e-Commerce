<?php
include_once 'Database.php';

$db = new Database();

cartAdd();

function cartAdd()
{
    global $db;
    $data = [
        'p_id' => $_POST['p_id'],
        'user_id' => $_POST['user_id'],
        'p_name' => $_POST['p_name'],
        'p_total' => $_POST['p_total'],
        'p_quantity' => $_POST['p_quantity'],
        'p_stock' => $_POST['p_stock']
    ];

    //Control user have a cart
    try {
        $db->query('SELECT * FROM carts WHERE user_id=:user_id');
        $db->bind(':user_id', $data['user_id']);
        $cart = $db->single();
        $here= false;
        if ($db->rowCount() > 0) {
            $cart = $cart->select_products;
            $cart = json_decode($cart);
            for ($i = 0; $i < count($cart); $i++) {
                if ($cart[$i]->product_id == $data['p_id']) {
                    $here = true;
                    $cart[$i]->product_quantity = $cart[$i]->product_quantity + $data['p_quantity'];
                    break;
                } else {
                    $here = false;
                }
            }
            if ($here == true) {

                $last = json_encode($cart);
                $db->query("UPDATE carts,products SET carts.select_products = :products_json, products.stock= :product_stock WHERE carts.user_id =:user_id AND products.id =:p_id ;");
                $db->bind(':products_json', $last);
                $db->bind(':products_stock', ($data['p_stock'] - $data['p_quantity']));
                $db->bind(':user_id', $data['user_id']);
                $db->bind(':p_id', $data['p_id']);
                $db->execute();
                echo 'There was in the basket ' . $data['p_quantity'] . ' more added';
            } else {
                $products_json = '{"product_id":"' . $data['p_id'] . '","product_name" : "' . $data['p_name'] . '", "product_total" :"' . $data['p_total'] . '", "product_quantity": "' . $data['p_quantity'] . '"}';
                $products_json = json_decode($products_json);
                array_push($cart, $products_json);
                $cart = json_encode($cart);
                $db->query("UPDATE carts SET select_products = :products_json WHERE user_id=:user_id");
                $db->bind(':user_id', $data['user_id']);
                $db->bind(':products_json', $cart);
                $db->execute();
                $db->query("UPDATE products SET stock = :stock WHERE id = :product_id");
                $db->bind(':product_id', $data['p_id']);
                $db->bind(':stock', $data['p_stock']-$data['p_quantity']);
                $db->execute();
                echo 'added to cart.';
            }
        } else {

            $products_json = '[{"product_id":"' . $data['p_id'] . '","product_name" : "' . $data['p_name'] . '", "product_total" :"' . $data['p_total'] . '", "product_quantity": "' . $data['p_quantity'] . '"}]';
            $db->query("INSERT INTO carts (user_id,select_products) VALUES(:user_id,:products_json)");
            $db->bind(':user_id', $data['user_id']);
            $db->bind(':products_json', $products_json);
            $db->execute();
            $db->query("UPDATE products SET stock = :stock WHERE id = :product_id");
            $db->bind(':product_id', $data['p_id']);
            $db->bind(':stock', $data['p_stock']-$data['p_quantity']);
            $db->execute();
            echo 'added to cart';
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
