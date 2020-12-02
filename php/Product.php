<?php

include_once 'Database.php';

$db = new Database();


$functionName = $_POST['functionCall'];


if ($functionName == 'add') {
    addProduct();
} elseif ($functionName == 'update') {
    updateProduct();
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
            'price' => $_POST['price'],
            'sale' => $_POST['sale'],
            'stock' => $_POST['stock'],
            'profile' => $profile,
            'category' => trim($_POST['productCategory']),
            'offer' => $_POST['offer'],
            'offer_quantity' => $_POST['offer_quantity'],

        ];

        $db->query("SELECT `id` FROM `categories` WHERE name = :category ");
        $db->bind(':category', $data['category']);
        $cateID = $db->single();


        $db->query("INSERT INTO `products` (name,description,price,stock,sale,category_ID,offer,offer_quantity,profile)
        VALUES(:name,:description,:price,:stock,:sale,:categoryID,:offer,:offer_quantity,:profile);
        ");

        //Bind values
        $db->bind(':name', $data['name']);
        $db->bind(':description', $data['description']);
        $db->bind(':price', $data['price']);
        $db->bind(':stock', $data['stock']);
        $db->bind(':sale', $data['sale']);
        $db->bind(':categoryID', $cateID->id);
        $db->bind(':offer', $data['offer']);
        $db->bind(':offer_quantity', $data['offer_quantity']);
        $db->bind(':profile', $data['profile']);
        $db->execute();

        $db->query("SELECT `id` FROM `products` WHERE name =:name AND description=:description");
        $db->bind(':name', $data['name']);
        $db->bind(':description', $data['description']);
        $id = $db->single();


        $db->query("INSERT INTO `rates` (product_id,category_id,rate) VALUES(:product_id,:categoryID,:rate)");

        $db->bind(':product_id', $id->id);
        $db->bind(':categoryID', $cateID->id);
        $db->bind(':rate', '0');
        //Execute function
        $db->execute();


        //return true;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
function updateProduct()
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
            'price' => $_POST['price'],
            'sale' => $_POST['sale'],
            'stock' => $_POST['stock'],
            'profile' => $profile,
            'category' => trim($_POST['productCategory']),
            'offer' => $_POST['offer'],
            'offer_quantity' => $_POST['offer_quantity'],

        ];

        $db->query("SELECT `id` FROM `categories` WHERE name =:category");
        $db->bind(':category', $data['category']);
        $cateID = $db->execute();

        $db->query("UPDATE `products` SET `name` = :name , `description`=:description, `price`=:price , `stock`=:stock , `sale`= :sale , `category_ID`=:categoryID,`offer`=:offer,`offer_quantity`=:offer_quantity , `profile`=:profile  WHERE `products`.`id` = :id ");

        //Bind values
        $db->bind(':id', $data['id']);
        $db->bind(':name', $data['name']);
        $db->bind(':description', $data['description']);
        $db->bind(':price', $data['price']);
        $db->bind(':stock', $data['stock']);
        $db->bind(':sale', $data['sale']);
        $db->bind(':categoryID', $cateID);
        $db->bind(':offer', $data['offer']);
        $db->bind(':offer_quantity', $data['offer_quantity']);
        $db->bind(':profile', $data['profile']);
        //Execute function
        $db->execute();
        //return true;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
