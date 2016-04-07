<?php
  include "connectDb.php";
  $query = $db->prepare("SELECT id, title, author, at FROM posts");
  $query->execute();
  $data = $query->fetchAll();
  echo json_encode($data);
?>
