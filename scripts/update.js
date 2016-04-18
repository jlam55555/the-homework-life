$(function() {
  var postAt = "";
  var oldValue = "NEW";
  $("input#postId").blur(function() {
    var val = $(this).val();
    if(val == oldValue)
      return;
    oldValue = val;
    if(val == "" || val == "NEW" || !Number.isInteger(parseInt(val))) {
      $("input, textarea").val("");
      $(this).val("NEW");
      return;
    }
    $.post("scripts/getPost.php", {postId: val}, function(data) {
      $("input[name=username]").val(data.author);
      $("input#title").val(data.title);
      $("input#image").val(data.image);
      $("select[name=type]").val(data.type);
      $("textarea#body").val(data.content);
      postAt = data.at;
      $("input").change();
    }, "json");
  });
  function insertAtCaret(e,t){var a=document.getElementById(e),c=a.scrollTop,l=0,n=a.selectionStart||"0"==a.selectionStart?"ff":document.selection?"ie":!1;if("ie"==n){a.focus();var r=document.selection.createRange();r.moveStart("character",-a.value.length),l=r.text.length}else"ff"==n&&(l=a.selectionStart);var o=a.value.substring(0,l),s=a.value.substring(l,a.value.length);if(a.value=o+t+s,l+=t.length,"ie"==n){a.focus();var r=document.selection.createRange();r.moveStart("character",-a.value.length),r.moveStart("character",l),r.moveEnd("character",0),r.select()}else"ff"==n&&(a.selectionStart=l,a.selectionEnd=l,a.focus());a.scrollTop=c} // courtesy of http://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery
  var title, author, content, at, image, type, json;
  $("input,textarea,select").change(function() {
    var now = new Date();
    var newBody = $("#body").val()
      .replace(/\n/g,"\\n")
      .replace(/\t/g,"\\t")
      .replace(/'/g, "\\'");
    while(/<pre class="brush:[^"]+">[^<]*<(?!\/pre).*<\/pre>/g.test(newBody))
      newBody = newBody.replace(/(<pre class="brush:[^"]+">[^<]*)<(?!\/pre)(.*<\/pre>)/g, "$1&lt;$2");
    while(/<pre class="brush:[^"]+">[^>]*(?!pre)>.*<\/pre>/g.test(newBody)) {
      var reachedEnd = false;
      newBody = newBody.replace(/(<pre class="brush:[^"]+">[^>]*)(pre)?>(.*<\/pre>)/g, function(m1, m2, m3) {
        if(m2) {
          reachedEnd = true;
          return m1;
        } else {
          return m1 + "&gt;" + m3;
        }
      });
      if(reachedEnd) {
        break;
      }
    }
    $("textarea#newBody").val(newBody);
    title = $("#title").val();
    content = newBody
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t");
    author = $("input[name=username]").val();
    at = ($("#postId").val() != "NEW") ? postAt :
      (now.getMonth() + 1) + "/" +
      (now.getDate()) + "/" +
      (now.getFullYear() - 2000) + " @ " +
      (now.getHours() == 0 ? 12 : now.getHours() > 12 ?
        now.getHours() - 12 :
        now.getHours()) + ":" +
      (now.getMinutes().toString().length == 1 ? "0" : "") +
      now.getMinutes() +
      (now.getHours() < 12 ? "AM" : "PM");
    image = $("input#image").val();
    type = $("select[name=type]").val();
    json = {
      title: title,
      content: content,
      author: author,
      at: at,
      image: image,
      type: type
    };

    var newElement = $("<div>");
    newElement.addClass("post");
    newElement.append("<span class='details'>By " + json.author + "<br />On " + json.at + "</span>");
    newElement.append("<span class='title'><a href='http://www.thehomeworklife.co.nf/index.html?post=" + -1 + "'>" + json.title + "</a></span>");
    newElement.append("<span class='shareContainer'></span>");
    newElement.append("<blockquote class='content'><div class='postImageContainer'><img class='postImageLarge' src='" + json.image + "' title='Click to expand' /></div>" + json.content + "</blockquote>");
    newElement.append("<span class='share'><input class='shareUrl' type='text' value='" + /*$("base").attr("href") + "post/"*/ "http://www.thehomeworklife.co.nf/index.html?post=" + -1 + "' readonly onclick='this.select();this.setSelectionRange(0, this.value.length)' /><span class='type " + json.type + "' title='Click to search others of tag [" + json.type + "]'>" + json.type + "</span></span>");
    $("blockquote#preview").html(newElement);
  });
  $("textarea#body").keydown(function(event) {
    if(event.which == 9) {
      event.preventDefault();
      insertAtCaret("body","\t");
    }
  });
  $("button#submit").click(function() {
    json.password = $("input[name=password]").val();
    json.newPost = $("input#postId").val() == "NEW" ? "TRUE" : $("input#postId").val();
    $.ajax({
      url: "scripts/addPost.php",
      data: json,
      method: "post",
      success: function(response) {
        alert("Success: " + response);
		$.get("scripts/generateRss.php");
      },
      error: function(test, test2, error) {
        alert("ERROR: " + test + " " + test2 + " " + error);
      },
      dataType: "text"
    });
  });
});
