<?php
	$user = $_POST["author"];
	$userData = fopen("userData.txt", "r");
	$users = [];
	while(($line = fgets($userData)) != "")	// I've hid this data...
		$users[explode("\t", $line)[0]] = trim(explode("\t", $line)[1]);
	fclose($userData);
	$found = false;
	foreach($users as $name => $pass)
		if($user == $name)
			$found = true;
	if(!$found || !password_verify($_POST["password"], $users[$user]))
		die("Login Error.");
	include "connectDb.php";
	$title = $_POST["title"];
	$content = $_POST["content"];
	$author = $_POST["author"];
	$at = $_POST["at"];
	$image = $_POST["image"];
	$type = $_POST["type"];
	if($_POST["newPost"] != "TRUE") {
		$isUser = $db->prepare("SELECT * FROM posts WHERE author='$author' AND id=" . $_POST["newPost"]);
		$isUser->execute();
		$results = $isUser->fetchAll();
		if(count($results) == 0)
			die("You are not the original poster.");
		$db->exec("UPDATE posts SET title='$title',content='$content',at='$at',image='$image',type='$type' WHERE author='$author' AND id=" . $_POST["newPost"]);
		echo "Succesfully updated.";
	} else {
		$db->exec("INSERT INTO posts (title, content, author, at, image, type) VALUES ('$title','$content','$author','$at','$image','$type')");
		echo "Successfully posted.";
	}
?>
