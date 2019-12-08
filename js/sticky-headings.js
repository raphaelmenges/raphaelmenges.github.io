// Collect all h2 headings
headings = document.querySelectorAll('h2');

// Make the headings sticky
for(var idx = 0; idx < headings.length; idx++) {
	headings[idx].setAttribute('style', 'position: sticky; top: -1px; z-index: 200;'); // move heading -1px over the top
}

// Settings of intersection observer
let options = {
	root: null, // viewport
	rootMargin: '0px', // no margin
	threshold: [0.0,0.99,1.0] // check for heading being not, close-to-fully, or fully visible
}

// Callback for intersection observations
let callback = (entries, observer) => { 
	entries.forEach(entry => {
		if(entry.boundingClientRect.top >= 0) { // if sticky, element is positioned at -1px over the top
			entry.target.classList.remove('h2-sticky');
		} else {
			entry.target.classList.add('h2-sticky');
		}
	});
};

// Observe all the headings
let observer = new IntersectionObserver(callback, options);
for(var idx = 0; idx < headings.length; idx++) {
	observer.observe(headings[idx]);
}