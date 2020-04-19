var lightbox_imgList = []; // list with all images
var lightbox_curIdx = -1; // image to be displayed

function registerLightboxImage(src, caption) {
	lightbox_imgList.push({ src: src, caption: caption });
}

function showLightbox(src) {

	/* Search for image in imgList */
	var i = 0, idx = -1;
	for (; i < lightbox_imgList.length; ++i) {
		if (lightbox_imgList[i].src == src) {
			idx = i;
			break;
		}
	}
	if( idx >= 0 ) {
		lightbox_curIdx = idx;
		createLightbox();
	}
}

function nextLightbox() {
	if(lightbox_curIdx >= 0) {
		lightbox_curIdx += 1;
		if(lightbox_curIdx >= lightbox_imgList.length) {
			// lightbox_curIdx = 0;
			lightbox_curIdx = lightbox_imgList.length - 1;
		}
		updateLightbox();
	}
}

function prevLightbox() {
	if(lightbox_curIdx >= 0) {
		lightbox_curIdx -= 1;
		if(lightbox_curIdx < 0) {
			// lightbox_curIdx = lightbox_imgList.length-1;
			lightbox_curIdx = 0;
		}
		updateLightbox();
	}
}

function updateLightbox() {
	var img = document.getElementById('lightbox_img');
	if(img) { img.setAttribute('src', '/assets/imgs/' + lightbox_imgList[lightbox_curIdx].src); }
	var span = document.getElementById('lightbox_caption');
	if(span) { span.innerHTML = lightbox_imgList[lightbox_curIdx].caption; }
}

function createLightbox() {

	if(lightbox_curIdx >= 0) {

		// Get body
		var body = document.getElementsByTagName('BODY')[0];

		// Table
		var a = document.createElement('a');
		a.setAttribute('href', 'javascript:removeLightbox()');
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
		img.setAttribute('src', '/assets/imgs/' + lightbox_imgList[lightbox_curIdx].src);
		img.setAttribute('id', 'lightbox_img');
		div.appendChild(img);

		// Description
		span = document.createElement('span');
		span.innerHTML = lightbox_imgList[lightbox_curIdx].caption;
		span.setAttribute('id', 'lightbox_caption');
		div.appendChild(span);

		// Push state for lightbox
		window.history.pushState('', '', '?lightbox')

		// Prevent scrolling
		disableScroll();
	}
}

function removeLightbox() {
	var body = document.getElementsByTagName('BODY')[0];
	var lightbox = document.getElementById('lightbox');
	if(lightbox) {
		body.removeChild(lightbox);
		window.history.replaceState('', '', '/');
	}

	// Allow scrolling
	enableScroll();
}

window.onpopstate = function(event) {
	removeLightbox();
}

// Prohibit scrolling of the body while lightbox is visible
// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

function preventDefault(e) {
	e = e || window.event;
	if(e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {

	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var deadKeys = { 38: 1, 40: 1, 33: 1, 34: 1, 35: 1, 36: 1 };
	if(deadKeys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
	else if(e.keyCode === 37) { // left
		preventDefault(e);
		prevLightbox();
	}
	else if(e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) { // right, space, enter
		preventDefault(e);
		nextLightbox();
	}
	else if(e.keyCode === 27) { // esc
		preventDefault(e);
		removeLightbox();
	}
}

function disableScroll() {
	if(window.addEventListener) { // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	}
	document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) {
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	}
	document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null; 
	window.onwheel = null; 
	window.ontouchmove = null;
	document.onkeydown = null;
}