<?php
	$file = fopen("../posts/posts.json", "r");
	$json = fread($file, 100000);
	fclose($file);
	include "connectDb.php";
	$json = array_reverse(json_decode($json));
	$db->exec("DELETE FROM posts");
	$db->exec("ALTER TABLE posts AUTO_INCREMENT=1");
	foreach($json as $post) {
		$post->content = str_replace("'", "\'", $post->content);
		$post->content = str_replace("\\\"", "\"", $post->content);
		$db->exec("INSERT INTO posts (author, type, at, title, image, content) VALUES ('$post->author','$post->type','$post->time','$post->title','$post->image','$post->content')");
	}
?>
