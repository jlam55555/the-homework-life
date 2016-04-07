<?php
	include "connectDb.php";
	if(isset($_POST["default"])) {
		$query = $db->prepare("SELECT * FROM posts ORDER BY id DESC LIMIT 5");
	} else if(isset($_POST["tag"])) {
		$query = $db->prepare("SELECT * FROM posts WHERE type='" . $_POST["tag"] . "'");
	} else if(isset($_POST["search"])) {
		$query = $db->prepare("SELECT * FROM posts WHERE (title LIKE '%" . $_POST["search"] . "%' OR content LIKE '%" . $_POST["search"] . "%')");
	} else {
		$start = $_POST["start"];
		$end = $_POST["end"];
		$query = $db->prepare("SELECT * FROM posts WHERE id >= $start && id <= $end");
	}
	$query->execute();
	$data = $query->fetchAll();
	for($i = 0; $i < count($data); $i++)
		foreach($data[$i] as $key => $val)
			if(is_integer($key))
				unset($data[$i][$key]);
	echo json_encode($data, JSON_UNESCAPED_SLASHES);
?>
