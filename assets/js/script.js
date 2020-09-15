$(document).ready(function(){
	$('#section_1_h3').viewportChecker({
		classToAdd: 'animated-visible',
		offset: 0,
		repeat: false,
	});
	$('#home_form').viewportChecker({
		classToAdd: 'animated-visible',
		offset: 0,
		repeat: false,
	});
	$('.nea-form').unbind('submit').bind('submit', function() {
		postForm(this);
		return false;
	});
	$('#s_but').hide();

});

function scrollto(el){
	window.scroll({
		top: $(el).offset().top, 
		left: 0, 
		behavior: 'smooth' 
	});
}