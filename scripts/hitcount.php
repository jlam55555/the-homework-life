<?php
	$viewed = isset($_COOKIE["viewed"]);
	$hitcountFile = fopen("hitcount.txt", "r");
	$count = fread($hitcountFile, 8);
	fclose($hitcountFile);
	$hitcountFile = fopen("hitcount.txt", "w");
	if(!$viewed) {
		$count++;
		setcookie("viewed", 1, time()+3600, "/", null);
	}
	fwrite($hitcountFile, $count);
	fclose($hitcountFile);
	echo $count;
?>
