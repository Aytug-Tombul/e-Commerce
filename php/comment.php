<?php
include_once 'Database.php';

$db = new Database();

sendComment();

function sendComment()
{
    global $db;
    $u_id = $_POST['user_id'];
    $p_id = $_POST['p_id'];
    $post= $_POST['post'];
    $db->query('INSERT INTO comments (product_id,user_id,post) VALUES (:p_id, :u_id,:post)');
    $db->bind(':u_id' , $u_id);
    $db->bind(':p_id' , $p_id);
    $db->bind(':post' , $post);
    $db->execute();
}