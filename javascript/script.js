$(document).ready(function(){
	// for scrollbar to work horizontally instead
	$("html, body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 20);
		event.preventDefault();
		console.log("scrolling");
	});   
});