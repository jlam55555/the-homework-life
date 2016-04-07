$(function() {
	$("head").append("<style>@import url(../styles/main.css);*{box-sizing:border-box;color:black;font-family:georgia}body,html{margin:0;height:auto}html{padding-top:50px;background-color:#555}div.page{height:11in;background-color:white;padding:1in;width:8.5in;margin:0 auto 50px auto;overflow:hidden;box-shadow:0 0 20px #000}h1{font-size:32px;margin: 0}p{font-size:16px;text-align:justify;text-indent:.5in}p.pageBreak{text-indent:0}@media print{@page{margin:0}html,body{padding:0}div.page{margin:0}a#thehomeworklifelogosnippet{display:none}}</style>");
	var body = $("body");
	body.html(
		"<p>" +
		body.html()
			.replace(/’/g, "'")
			.replace(/“|”/g, '"')
			.replace(/…/g, "&hellip;")
			.replace(/—/g, "&mdash;")
			.replace(/\n/g, "</p><p>")
		+ "</p>"
	);
	// pagination based on answer to http://stackoverflow.com/questions/12202324/split-text-into-pages-and-present-separately-html5
	var words = $("body").html().split(" ");
	var newPage = $("<div>");
	newPage.addClass("page");
	body.empty().append(newPage);
	var pageText = "";
	for(var i = 0; i < words.length; i++) {
		var test = pageText + " " + words[i];
		newPage.html(test);
		if(newPage[0].scrollHeight > newPage[0].clientHeight) {
			newPage.html(pageText + "</p>");
			newPage.clone().insertBefore(newPage);
			pageText = "<p class='pageBreak'>" + words[i];
		} else {
			pageText = test;
		}
	}
	body.html(
		body.html().replace(/<p>\s*<\/p>/g, "")
	);
	body.append('<a id="thehomeworklifelogosnippet" href="http://www.thehomeworklife.co.nf" target="_blank"><img id="snippetlogo" title="A work of TheHomeworkLife" src="http://s11.postimg.org/vxal52udb/Small_Logo.png"><style>a#thehomeworklifelogosnippet>img#snippetlogo{cursor: pointer;width:32px;height:32px;position:fixed;bottom:16px;right:16px;z-index:100;border-radius:32px;box-shadow:0 0 10px #888888;transition:all .5s;opacity:1}a#thehomeworklifelogosnippet>img#snippetlogo:hover{box-shadow:0 0 10px black}</style></a>');
});
