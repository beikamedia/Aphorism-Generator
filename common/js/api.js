function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
function changetext()
{
	var url = window.location.href;
	var text;
	var person;
	if(url.lastIndexOf('?') != -1) 
	{
		// Handle old-style ?[text]?[person] URLs
		if (url.indexOf('?') != url.lastIndexOf('?')) {
			text = url.substring(url.indexOf('?')+1, url.lastIndexOf('?'));
			person = url.substring(url.lastIndexOf('?')+1);
			text = decodeURIComponent(text);	
			person = decodeURIComponent(person);
			text = b64_to_utf8(text);
			person = b64_to_utf8(person);
		} else { // Handle new-style ?[text\0person] URLs
			var combined = url.substring(url.indexOf('?') + 1);
			combined = decodeURIComponent(combined);
			combined = b64_to_utf8(combined);
			var parts = combined.split('\0');
			text = parts[0];
			person = parts[1];
		}

		setMsg("<br> <br> <br> " + text, "text");
		setMsg("<br> <br> <br> " + text, "text2");		
		
		if (!(text.length>40))
		{
			setMsg("<br> <br> <br> <br>" + person, "person");
			setMsg("<br> <br> <br> <br>" + person, "person2");
		}
		else
		{
			setMsg("<br> <br> <br> <br> <br>" + person, "person");
			setMsg("<br> <br> <br> <br> <br>" + person, "person2");
		}
		
		fadeOut("form", 50);
		fadeIn("reloadform", 400);
	}
}
function generate(){
	var url = window.location.href + "?";
	var tb = document.getElementById("tb");
	var text = tb.value;
	var tb2 = document.getElementById("tb2");
	var text2 = tb2.value;

	if(text.length > 0 && text2.length > 0){
		var data = utf8_to_b64(text + '\0' + text2).replace(/\=*$/, '');
		url = url + data;
		window.location.href = url;
	}
	else{
		setMsg("input error no<br>Aphorism or Author", "va_msg_content");
		fadeIn("va_msg_plasa", 400);
	}
}

// ---- msg-functions ----------------

function setMsg(text, div){
	document.getElementById(div).innerHTML = text;
}

function getMsgHTML(div){
	text = document.getElementById(div).innerHTML;
	return text;
}

// ---- fade-functions ----------------------

function fadeIn( elem, ms )
{
  if( ! elem )
    return;

	elem = document.getElementById(elem);

  elem.style.opacity = 0;
  elem.style.filter = "alpha(opacity=0)";
  elem.style.display = "inline-block";
  elem.style.visibility = "visible";

  if( ms )
  {
    var opacity = 0;
    var timer = setInterval( function() {
      opacity += 50 / ms;
      if( opacity >= 1 )
      {
        clearInterval(timer);
        opacity = 1;
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 1;
    elem.style.filter = "alpha(opacity=1)";
  }
}

function fadeOut( elem, ms )
{
  if( ! elem )
    return;

	elem = document.getElementById(elem);

  if( ms )
  {
    var opacity = 1;
    var timer = setInterval( function() {
      opacity -= 50 / ms;
      if( opacity <= 0 )
      {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
  }
}

// ---- share ------------------------------------------

function share(type){
	switch(type){
		case 1:
			window.location.href = "https://www.facebook.com/sharer/sharer.php?u=aphorisms.kazamatsuri.org";
			break;
		case 2:
			window.location.href = "https://plus.google.com/share?url=aphorisms.kazamatsuri.org";
			break;
		case 3:
			window.location.href = "https://twitter.com/intent/tweet?url=http%3A//aphorisms.kazamatsuri.org/&text=&related=kazamatsuriOrg";
			break;
	}
}

function load(type){

	var url = window.location.href;
	var address = window.location.href.split('?');
	switch(type){
		case 1:
			window.location.href = address[0];
			break;
		case 2:
			window.location.href = url;
			break;
	}
}

