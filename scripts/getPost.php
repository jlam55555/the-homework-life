<?php
  include "connectDb.php";
  $query = $db->prepare("SELECT * FROM posts WHERE id=" . $_POST["postId"]);
  $query->execute();
  $row = $query->fetchAll()[0];
  $toReturn = array(
    "author" => $row["author"],
    "at" => $row["at"],
    "title" => $row["title"],
    "image" => $row["image"],
    "type" => $row["type"],
    "content" => $row["content"]
  );
  echo json_encode($toReturn);
?>
