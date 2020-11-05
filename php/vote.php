<?php
include_once 'Database.php';

$db = new Database();

vote();

function vote()
{

    global $db;
    $product_id = $_POST['product_id'];
    $vote = $_POST['vote'];
    $user_id = $_POST['user_id'];
    try {
        $db->query("SELECT * FROM `votes` WHERE product_id = :product_id AND user_id = :user_id");

        //Email param will be binded with the email variable
        $db->bind(':product_id', $product_id);
        $db->bind(':user_id', $user_id);
        $db->execute();
        //Check if email is already registered
        if ($db->rowCount() > 0) {
            echo 'You can only one time vote !';
        } else {
            $db->query('INSERT INTO votes (value,product_id,user_id) VALUES (:vote,:product_id,:user_id)');
            $db->bind(':product_id', $product_id);
            $db->bind(':vote', $vote);
            $db->bind(':user_id', $user_id);
            $db->execute();


            $db->query("UPDATE rates SET rates.rate=(SELECT SUM(votes.value)/ COUNT(votes.value)AS rate  FROM votes WHERE votes.product_id =:product_id )WHERE rates.product_id=:product_id");
            $db->bind(':product_id', $product_id);
            $db->execute();
            echo 'Thanks for voting!';
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
