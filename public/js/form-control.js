function getFormData() {
	return {
		nome: 			$('#name').val(),
		endereco: 		$('#address').val(),
		rg: 			$('#rg').val(),
		dt_nascimento:	$('#dt-birth').val(),
		dt_validade: 	$('#dt-expiration').val(),
		deficiente: 	$('#deficiente').is(':checked'),
		cid: 			($('#deficiente').is(':checked')) ? $('#cid').val() : null,
		photo: 			null 
	};
}

function validData(){
	//validate here

	return true;
}

function sendData(formData){

	$.post('/createPerson', formData)
	 .done(function(result){
	 	console.log('Result: ', result);
	 	console.log('Saved Successfully');
	});

}

function initFormControls(){

	$('#rg').mask('99.999.999-9');

	//$('#dt-birth').datepicker();
	$('#dt-birth').mask('99/99/9999', {placeholder: 'dd/mm/aaaa'});
	//$('#dt-expiration').datepicker();
	$('#dt-expiration').mask('99/99/9999', {placeholder: 'dd/mm/aaaa'});

	$('#deficiente').change(function(e){
		$('#cid').parent().parent('.row').toggleClass('hide');
	})

	$('#create-person').click(function(e) {
		e.preventDefault();

		formData = getFormData();
		
		if( validData(formData) ){
			sendData(formData);	
		}

	});
}

$(document).ready(function(){
	initFormControls();
});