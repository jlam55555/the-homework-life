<?php
	include "connectDb.php";
	$query = $db->query("SELECT COUNT(id) FROM posts");
	$query->execute();
	echo $query->fetch()[0];
?>
