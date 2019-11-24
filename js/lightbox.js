function showLightbox(image) {

	var body = document.getElementsByTagName('BODY')[0];

	// Table
	var a = document.createElement('a');
	a.setAttribute('href', 'javascript:hideLightbox()');
	a.setAttribute('id', 'lightbox');
	a.setAttribute('class', 'lightbox');
	body.appendChild(a);

	// Table-cell
	var div = document.createElement('div');
	a.appendChild(div)

	// Image
	var img = document.createElement('img');
	img.setAttribute('src', '/assets/imgs/' + image);
	div.appendChild(img)

	// Description
	var span = document.createElement('span');
	span.innerHTML = 'hello'
	div.appendChild(span)

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
}