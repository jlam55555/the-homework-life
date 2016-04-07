$(function() {
  var regular = $("textarea#regular");
  var formatted = $("input#formatted");
  regular.blur(function() {
  	var value = $(this).val();
    var oldValue;
    var footerId = 1;
    do {
    	oldValue = value;
    	value = value
        .replace(/\.\.\./g, "&hellip;")
        .replace(/\-\-/g, "&mdash;")
        .replace(/(\n\- [^\n]+){1,}/g, function(matches) {
          matches = matches.replace(/\- /g, "");
          matches = matches.split("\n");
          var list = "</p><ul>";
          for(var i = 1; i < matches.length; i++)
            list += "<li>" + matches[i] + "</li>";
          return list + "</ul><p>";
        })
        .replace(/(\n[0-9]+ [^\n]+){1,}/g, function(matches) {
          matches = matches.split("\n");
          var list = "</p><ol>";
          for(var i = 1; i < matches.length; i++)
            list += "<li value=\"" + /[0-9]+/.exec(matches[i])[0] + "\">" + /[0-9]+ (.+)$/.exec(matches[i])[1] + "</li>";
          return list + "</ol><p>";
        })
        .replace(/\n/g, "</p><p>")
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, "<a href=\"$2\">$1</a>")
        .replace(/\{([^\}]+)\}\(([^\)]+)\)/g, "</p><img class=\"$2\" src=\"$1\" /><p>")
        .replace(/\|([^\|]+)\|\(([^\)]+)\)/g, "</p><blockquote class=\"quote\"><span class=\"quoted\">$1</span><span class=\"author\">$2</span></blockquote><p>")
        .replace(/\~([^\~]+)\~\(([^\)]+)\)\(([^\)]+)\)/g, "<div class=\"foreign notranslate\">$1</div><span class=\"language\"><span class=\"languageName\"><i class=\"fa fa-globe\"></i> Language: $2</span><span class=\"translate\"><a href=\"https://translate.google.com/#$3/en/$1\"><i class=\"fa fa-language\"></i> See translation</a></span></span>")
        .replace(/``(.+?)``/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "<em>$1</em>")
        .replace(/\=\=\=(.+?[^\=])\=\=(?!\=)(.+?[^\=])\=\=(?!\=)/g, function(match, p1, p2) {
          return "<span class=\"footnoteId\">" + footerId + "</span>" + p1 + "<span class=\"footnoteId footnote\" data-ref=\"" + footerId + "\">" + footerId++ + ": " + p2 + "</span>";
        })
        .replace(/<p>(<span class="footnoteId footnote".+?<\/p>)/g, "<p class=\"footnoteContainer\">$1")
        .replace(/<p><\/p>/g, "");
    } while(value != oldValue);
    formatted.val("<p>" + value + "</p>");
  });
  $("button#examples").click(function() {
    regular.val(
      "New lines are paragraphs.\n" +
      "[This is a link](to this URL).\n" +
      "This is how you do an image: {http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg}(postImageRight half). Note that images are FLOATED and are positioned next to text that comes AFTERWARDS.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur velit quis est aliquam, et sagittis urna tempus. Curabitur consectetur aliquam commodo. Donec dictum, est eget accumsan porta, odio risus imperdiet lacus, ultricies iaculis erat turpis quis lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam accumsan mauris ac leo porttitor fermentum. Maecenas dictum condimentum mi, sit amet tincidunt dui hendrerit vitae. Mauris elementum dapibus lorem, ut laoreet mauris pellentesque eget. Nullam sollicitudin lacus eget risus dapibus sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem mi, semper non erat et, sollicitudin maximus lacus. Aliquam erat volutpat. Nam viverra magna augue, nec sodales nisl interdum sed. Praesent molestie dui in enim efficitur facilisis. Etiam congue, sapien vel gravida porttitor, est tellus pellentesque ante, quis sagittis nulla ex bibendum libero.\nAliquam tristique aliquet diam non eleifend. Duis ornare mattis euismod. Pellentesque suscipit ultrices arcu, vel convallis dui interdum a. Suspendisse nec dui nec mauris pulvinar lobortis. Aenean at fringilla lorem, a porta risus. Sed ac nibh id neque tincidunt feugiat ut non libero. Praesent massa massa, posuere quis luctus a, egestas vulputate libero. Duis condimentum erat viverra accumsan ultricies. Praesent maximus odio id accumsan pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis vitae quam lectus. Nulla quis neque vitae eros pellentesque dictum ut ut arcu. Vestibulum mattis aliquam ipsum id eleifend. Morbi consequat tincidunt sapien, ac volutpat elit pretium eu.\nCurabitur quis arcu non velit congue interdum vitae in est. Morbi congue, nisl vel consectetur condimentum, dui nunc aliquet nunc, sit amet auctor metus augue eu odio. Quisque eu ligula sit amet nisl pellentesque bibendum eu sit amet dolor. Curabitur nec fermentum erat, sed pellentesque massa. Aliquam erat volutpat. Nunc et posuere purus, ut finibus velit. Nunc vitae eros velit. Integer est massa, tincidunt eu bibendum vel, mollis et eros.\nPraesent nulla neque, mattis a diam eu, efficitur vulputate nibh. Aliquam nec nibh fringilla augue faucibus tincidunt. Suspendisse consectetur, ex quis euismod ultrices, sapien lorem hendrerit eros, nec venenatis odio metus eget dui. Sed ligula arcu, facilisis id varius quis, mattis et quam. Sed non placerat mi. Ut congue velit eget placerat vestibulum. Pellentesque auctor lorem a massa viverra efficitur. Nulla rhoncus consequat vulputate. Aliquam ac vehicula odio. Nunc imperdiet porta porttitor. Suspendisse posuere, odio sed volutpat convallis, ex sem commodo tortor, sit amet lobortis augue mi nec enim. Etiam pellentesque laoreet urna, ut ullamcorper libero pellentesque vel. Phasellus aliquet eget velit id luctus.\nInteger vel fringilla magna. Donec et ligula non purus bibendum tincidunt. Curabitur et consectetur lectus. Nam vehicula aliquet ligula, quis varius justo iaculis eget. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean vehicula pharetra leo, sed pretium odio gravida id. In pulvinar ultrices diam, non vulputate nunc gravida sit amet. Quisque ligula libero, vulputate sed nisi quis, fringilla ultrices augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam auctor tristique ex, in aliquam libero ultrices laoreet. Ut fermentum finibus magna, egestas sodales risus eleifend nec. Donec est arcu, interdum non lacinia in, consectetur in velit. Aenean ante ex, iaculis et magna non, luctus aliquet mi.</p>\n" +
      "This is how you add a quote: |This is a quote.|(Jonathan Lam `TheHomeworkLife` blogger)\n" +
      "`This is italic`. ``This is bold``.\n" +
      "- This is\n- an unordered\n- list\n" +
      "1 And this\n3 is an\n102 ordered list\n5 where you\n72 get to\n2 choose the\n33 numbers\n" +
      "Click outside of the main box to update the formatted text.\n" +
      "Copy and paste this into update.php to see the preview."
    );
    regular.blur();
    regular.focus();
  });
});
