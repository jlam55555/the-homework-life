<?php
	if(isset($_POST["password"]))
		die(password_hash($_POST["password"], PASSWORD_DEFAULT));
?>
<h1>Create a Password Hash</h1>
<form action="#" method="post">
	<input name="password" type="password" placeholder="Password" />
	<input type="submit" value="Create Hash" />
</form>
