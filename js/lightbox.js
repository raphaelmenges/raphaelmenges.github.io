function showLightbox(image, description) {

	var body = document.getElementsByTagName('BODY')[0];

	// Table
	var a = document.createElement('a');
	a.setAttribute('href', 'javascript:hideLightbox()');
	a.setAttribute('id', 'lightbox');
	a.setAttribute('class', 'lightbox');
	body.appendChild(a);

	// Table-cell
	var div = document.createElement('div');
	a.appendChild(div);

	// Close option
	var span = document.createElement('span');
	span.setAttribute('style', 'color: darkgray');
	span.innerHTML = 'Click anywhere to close view.';
	div.appendChild(span);

	// Image
	var img = document.createElement('img');
	img.setAttribute('src', '/assets/imgs/' + image);
	div.appendChild(img);

	// Description
	span = document.createElement('span');
	span.innerHTML = description;
	div.appendChild(span);

	// Push state for lightbox
	window.history.pushState('', '', '?lightbox')

	// Prevent scrolling
	disableScroll();
}

window.onpopstate = function(event) {
	hideLightbox();
}

function hideLightbox() {
	var body = document.getElementsByTagName('BODY')[0];
	var lightbox = document.getElementById('lightbox');
	if(lightbox) {
		body.removeChild(lightbox);
		window.history.replaceState('', '', '/');
	}

	// Allow scrolling
	enableScroll();
}

// Prohibit scrolling of the body while lightbox is visible
// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
			e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null; 
	window.onwheel = null; 
	window.ontouchmove = null;
	document.onkeydown = null;
}