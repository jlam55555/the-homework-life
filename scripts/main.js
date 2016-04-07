// function to load post
var start, end, max, json, previousSearch="", searchType="none", lastStart;
function display() {
	// empty div to start
	$("div#posts").empty();

	// go through each post
	for(var i = 0; i < json.length; i++) {
		var post = json[i];
		var newElement = $("<div>");
		newElement.addClass("post");
		if(i != json.length-1)
			newElement.addClass("small");
		newElement.append("<span class='details'>By " + post.author + "<br />On " + post.at + "</span>");
		newElement.append("<span class='title'><a href='http://www.thehomeworklife.co.nf/index.html?post=" + post.id + "'>" + post.title + "</a></span>");
		newElement.append("<blockquote class='content'><div class='postImageContainer'><img class='postImageLarge' src='" + post.image + "'  /></div>" + post.content + "</blockquote>");
		newElement.append("<span class='share'><input class='shareUrl' type='text' value='" + /*$("base").attr("href") + "post/"*/ "http://www.thehomeworklife.co.nf/index.html?post=" + post.id + "' readonly onclick='this.select();this.setSelectionRange(0, this.value.length)' /><span class='type " + post.type + "' title='Click to search others of tag [" + post.type + "]'>" + post.type + "</span></span>");
		$("div#posts").prepend(newElement);
		if(parseInt(start) + i < lastStart) {
			newElement.addClass("new");
		}
	}

	// add search bar
	$("div#posts").prepend(
		'<input id="search" type="text" placeholder="Search" title="Exact Phrase: hello | Post ID: 5 | Post ID Range: 2-4 | Tag: [tag]" value="' + previousSearch + '" /><i id="searchIcon" class="fa fa-search"></i>'
	);

	// on blur start search
	$("input#search").blur(function() {
		var search = $(this).val();
		previousSearch = search;
		if(search == "") {
			return;
		} else if(search == "all") {
			init(false, 1, max);
			return;
		} else if(
			search == Number(search) &&
			search % 1 == 0 &&
			search >= 1 &&
			search <= max
		) {
			init(false, search);
			return;
		} else if(/^(\d+)\-(\d+)$/.test(search)) {
			var rangeResult = /^(\d+)\-(\d+)$/.exec(search);
			init(false, parseInt(rangeResult[1]), parseInt(rangeResult[2])+1);
			return;
		} else if(/^\[([^\]]+)\]$/.test(search)) {
			var tagName = /^\[([^\]]+)\]$/.exec(search)[1];
			init(false, -1, -1, tagName);
			return;
		} else {
			init(false, -1, -1, -1, search);
			return;
		}
	});

	// on enter, do search (force blur() event)
	$("input#search").keyup(function(event) {
		if(event.which == 13) {
			event.preventDefault();
			$(this).blur();
		}
	});

	// add bottom "extender"
	var disabled = "";
	if(start == 1)
		disabled = "disabled='true'";
	$("div#posts").append(
		'<a id="backTopButton" class="hoveringReverse ' + (($("body").scrollTop() > 500) ? '' : 'hidden') + '" href="#top"></a>' +
		'<button id="showMoreButton" onclick="init(true);"' + disabled + '>' + (disabled == "" ? "Show More <i class='fa fa-chevron-down'></i>" : "That's all, folks!") + '</button>'
	);

	// make a#top go to top
	$("a[href='#top']").click(function(click) {
		click.preventDefault();
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});

	// make types clickable to search
	$("span.type").click(function() {
		$("input#search").val("[" + $(this).text() + "]");
		$("input#search").blur();
		$("a[href='#top']").click();
	});
}

// initialization function to correctly load posts
var init = function(extend, postId, postIdEnd, tagSearch, regSearch) {
	// if extending the page decrement start
	var postNum = -1;
	if(extend != undefined && extend == true) {
		lastStart = start;
		start = start < 6 ? 1 : start - 5;
		postNum = 0;
	} else if(regSearch != undefined) {
		$.post("scripts/getPosts.php", {search: regSearch}, function(data) {
			json = data;
			lastStart = max+1;
			start = 1;
			end = max;
			display();
		}, "json");
		return;
	} else if(tagSearch != undefined) {
		$.post("scripts/getPosts.php", {tag: tagSearch}, function(data) {
			json = data;
			lastStart = max+1;
			start = 1;
			end = max;
			display();
		}, "json");
		return;
	} else {
		// check for URL post id
		function getUrlVars(){var n={};window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(r,e,i){n[e]=i});return n} // courtesy of http://papermashup.com/read-url-get-variables-withjavascript/
		var query = getUrlVars()["post"];
		var directory = /\/post\/([0-9]+)/g.exec(window.location.href);
		var postNum = postId != undefined && postId != -1 ? postId : query != undefined ? query : directory != undefined ? directory[1] : -1;
		// if invalid or missing number, set postNum to -1 (error/invalid code)
		if(postNum < 0 || postNum > max)
			postNum = -1;
		// if valid, then set start equal to it
		if(postNum != -1) {
			start = postNum;
			end = postIdEnd != undefined && postIdEnd != -1 ? postIdEnd : parseInt(start);
			lastStart = start;
		}
		if(postId != undefined && postId != -1) {
			lastStart = max+1;
		}
	}
	// create object to send
	var dataObject = postNum != -1 ? {start: start, end: end} :	dataObject = {default: true};
	// send post request
	$.post(
		"scripts/getPosts.php",
		dataObject,
		function(data) {
			if(extend == undefined) data.reverse();
			json = data;
			// if selected default, get numbers
			if(dataObject.default != undefined) {
				start = parseInt(max)-5;
				end = parseInt(max);
				lastStart = end;
			}
			display();
		},
		"json"
	);
};

// get the maximum number of posts
$.post("scripts/getPostCount.php", {}, function(count) {
	// temporary fix for error: "WARNING: Automatically populating $HTTP_RAW_POST_DATA ..."
	var number = /(\d+)$/.exec(count)[1];
	max = parseInt(number)+1;
	init();
}, "text");

// get hitcount
$.get("scripts/hitcount.php", function(data) {
	$("div#hitcount").text(data + " views");
});
// make info button open info window
$("i#info").click(function() {
	var about = $("div#about");
	if(about.css("display") == "none") {
		about.css({display: "block"});
		about.animate({opacity: 1}, 200);
	} else {
		about.animate({opacity: 0}, 200, function() {
			about.css({display: "none"});
		});
	}
});
// make scroll to top button appear only when far from top
$(window).scroll(function() {
	if($("body").scrollTop() > 500) {
		$("a#backTopButton.hidden").removeClass("hidden");
	} else {
		$("a#backTopButton").addClass("hidden");
	}
});
// close out of info if clicked elsewhere
$("div#posts, div#sidebar").click(function(click) {
	if(!$(click.target).is("i#info") && !$(click.target).is("div#about *") && $("div#about").css("display") == "block")
		$("i#info").click();
});
var getFileName = function(fullFileName) {
	return fullFileName.replace(/\..+/, "").replace(/([a-z])([A-Z])/g, "$1 $2");
};
// get project names, put them in the "about" section
$.get("scripts/getProjects.php", function(data) {
	var links = "";
	for(var type in data)
		for(var i = 0; i < data[type].length; i++)
			links += "<a class='project " + type + "Type' href='" + type + "/" + data[type][i] + "' title='" + type + ": " + getFileName(data[type][i]) + "'>" + getFileName(data[type][i]) + "</a>";
	$("div#projects").html(links);
}, "json");
$.get("scripts/getPostTitles.php", function(data) {
	var links = "<ol>";
	for(var postTitle in data)
		links += "<li><a class='postTitle dark' href='index.html?post=" + data[postTitle].id + "'>" + data[postTitle].title + "</a> by " + data[postTitle].author + " (" + /[0-9\/]+/.exec(data[postTitle].at)[0] + ")</li>";
	$("div#postList").html(links + "</ol>");
}, "json");
// toggle project and post lists on click
$("h2#projectsTitle").click(function() {
	$("div#projects").slideToggle();
	$(this).children("i").toggleClass("fa-angle-up");
	$(this).children("i").toggleClass("fa-angle-down");
});
$("h2#postsTitle").click(function() {
	$("div#postList").slideToggle();
	$(this).children("i").toggleClass("fa-angle-up");
	$(this).children("i").toggleClass("fa-angle-down");
});
// toggle small on click
$("div#posts").on("click", "div.post", function(event) {
	if($(event.target).is("blockquote.content, blockquote.content *, span.type, input.shareUrl"))
		return;
	$(this).toggleClass("small");
});
