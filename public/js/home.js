function initTableEvents() {
	$('table tr').click(function(e){
		window.location.pathname = '/readPerson/'+ $(this).attr('id');
	});
}

$(document).ready(function(){
	initTableEvents();
});