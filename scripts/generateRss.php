<?php

	include "connectDb.php";
	$query = $db->prepare("SELECT * FROM posts ORDER BY id DESC LIMIT 10");
	$query->execute();
	$recent = $query->fetchAll();
	$itemString = "";
	foreach($recent as $post) {
		$itemString .= "<item>";
		$itemString .= "<title>" . $post["title"] . "</title>";
		$itemString .= "<link>http://www.thehomeworklife.co.nf/index.html?post=" . $post["id"] . "</link>";
		$content = preg_replace("/<.+?>/", "", $post["content"]);
		$content = preg_replace("/&\w+/", " ", $content);
		$contentString = strlen($content) <= 250 ? $content : substr($content, 0, 250) . "...";
		$itemString .= "<description>$contentString</description>";
		$date = $post["at"];
		$date = str_replace("AM", "am", $date);
		$date = str_replace("PM", "pm", $date);
		$date = str_replace("@", "", $date);
		$date = date_create_from_format("n#j#y h#ia", $date);
		$formattedDate = $date->format("D, d M Y H:i:s O");
		$itemString .= "<pubDate>" . $formattedDate . "</pubDate>";
		$itemString .= "</item>";
	}
	$template = <<<TEMPLATE
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>The Homework Life</title>
		<link>http://www.thehomeworklife.co.nf</link>
		<description>The joys and pains of a high school career.</description>
		$itemString
	</channel>
</rss>
TEMPLATE;
	file_put_contents(realpath("../feed.xml"), $template);

?>
