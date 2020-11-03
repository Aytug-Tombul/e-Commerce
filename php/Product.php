<?php

include_once 'Database.php';

$db = new Database();


$functionName = $_POST['functionCall'];


if ($functionName == 'add') {
    addProduct();
} elseif ($functionName == 'update') {
    //updateProduct($data);
}


function addProduct()
{
    try {
        global $db;



        $dir = dirname(dirname(__FILE__));
        if (isset($_FILES['profile']['name'])) {
            $profile = $_FILES['profile']['name'];
            $target = $dir . "/images/" . basename($profile);
            move_uploaded_file($_FILES['profile']['tmp_name'], $target);
        } else {
            $profile = null;
        }
        $data = [
            'name' => $_POST['productName'],
            'description' => $_POST['description'],
            'price'=>$_POST['price'],
            'sale' => $_POST['sale'],
            'stock' => $_POST['stock'],
            'profile' => $profile,
            'category' => $_POST['productCategory']
        ];

        $db->query("SELECT `id` FROM `categories` WHERE name =:category");
        $db->bind(':category', $data['category']);
        $cateID = $db->execute();

        $db->query("INSERT INTO `products` (name,description,price,stock,sale,category_ID,profile)
        VALUES(:name,:description,:price,:stock,:sale,:categoryID,:profile)");

        //Bind values
        $db->bind(':name', $data['name']);
        $db->bind(':description', $data['description']);
        $db->bind(':price', $data['price']);
        $db->bind(':stock', $data['stock']);
        $db->bind(':sale', $data['sale']);
        $db->bind(':categoryID', $cateID);
        $db->bind(':profile', $data['profile']);
        //Execute function
        $db->execute();
        //return true;
    } catch (PDOException $e) {
        return $e->getMessage();
    }
}
