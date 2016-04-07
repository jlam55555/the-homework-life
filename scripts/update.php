<!DOCTYPE html>
<html>
<head>
	<title>Post</title>
	<base href="../" />
	<link rel="stylesheet" type="text/css" href="styles/main.css" />
	<link rel="stylesheet" type="text/css" href="styles/desktop.css" />
	<link rel="stylesheet" type="text/css" href="styles/update.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="scripts/update.js"></script>
</head>
<body>
	<form>
		<input name="username" type="text" placeholder="Name" />
		<input name="password" type="password" placeholder="Password" />
		<input id="title" placeholder="Title" />
		<input id="image" placeholder="Image" />
		<select name="type">
			<option selected value="other">Other (miscellaneous)</option>
			<option value="list">List (list of resources, to-do, checklist, how-to)</option>
			<option value="informative">Informative (interesting facts)</option>
			<option value="great">Great (amazing stuff)</option>
			<option value="opinion">Opinion (controversial topics)</option>
			<option value="thought">Thought (life lesson, random thought about life)</option>
			<option value="site">Site (site updates)</option>
		</select>
		<input id="postId" value="NEW" placeholder="id or NEW" />
		<textarea id="body" placeholder="Content"></textarea>
		<textarea id="newBody" placeholder="Parsed Content"></textarea>
		<blockquote id="preview"></blockquote>
		<button id="submit" type="button">Sign In and Post or Update</button>
	</form>
</body>
</html>
