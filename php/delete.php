<?php
include_once 'Database.php';

$db = new Database();
delete();


function delete()
{
    global $db;
    $id = $_POST['id'];
    $tableName = $_POST['tableName'];
    if ($tableName == 'products') {
        deleteProduct($id, $tableName);
    } elseif ($tableName == 'categories') {
        deleteCategories($id, $tableName);
    }else{
        global $db;
        $db->query("DELETE FROM " . $tableName . " WHERE id=:id");
        $db->bind(':id', $id);
        $db->execute();
    }

    echo 'Element has been removed.';
}
function deleteProduct($id, $tableName)
{
    global $db;
    $db->query("DELETE " . $tableName . ",rates FROM " . $tableName . " INNER JOIN rates WHERE  " . $tableName . ".id = :id  AND rates.product_id = :id");
    $db->bind(':id', $id);
    $db->execute();
}

function deleteCategories($id, $tableName)
{
    global $db;
    $db->query("DELETE " . $tableName . ", products, rates FROM " . $tableName . " INNER JOIN products INNER JOIN rates WHERE categories.id = :id AND products.category_ID= :id AND rates.category_id= :id ;" .
        "DELETE FROM product  WHERE product_id=:id");
    $db->bind(':id', $id);
    $db->execute();
}
