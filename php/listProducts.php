<?php
include_once 'Database.php';

$db = new Database();

listProduct();

function listProduct()
{
    global $db;
    $category_name = $_POST['name'];
    
    $db->query('SELECT id FROM categories WHERE name =:category_name');
    $db->bind(':category_name',$category_name);
    $cate_id=$db->execute();
    $db->query('SELECT * FROM products WHERE category_ID=:cat_id');
    $db->bind(':cat_id',$cate_id);
    $data=$db->resultSet();
    echo json_encode($data);
}


