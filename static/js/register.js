$(document).ready(function() {
	$('.percentage-bar').each(function(){
		$(this).find('.bar').animate({
			width: $(this).attr('data-percent')
		}, 1000);
	});
});