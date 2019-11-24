function showLightbox(image, description) {

	var body = document.getElementsByTagName('BODY')[0];
	body.setAttribute('class', 'noscroll'); // prohibit scrolling of body

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
	body.classList.remove('noscroll'); // allow scrolling of body, again
}