<?php
	// to be included in other files
	$serverDataFile = fopen("dbData.txt", "r");	// my server data is hidden ...
	$serverDataDbName = trim(fgets($serverDataFile));
	$serverDataUserName = trim(fgets($serverDataFile));
	$serverDataHost = trim(fgets($serverDataFile));
	$serverDataPassword = trim(fgets($serverDataFile));
	fclose($serverDataFile);
	$db = new PDO("mysql:host=$serverDataHost;dbname=$serverDataDbName", $serverDataUserName, $serverDataPassword);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	error_reporting(0);
?>
