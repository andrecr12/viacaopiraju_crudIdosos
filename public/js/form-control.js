function getFormData() {
	return {
		num_id			: parseInt($('#num-id').val()),
		nome			: $('#name').val(),
		endereco		: $('#address').val(),
		rg				: $('#rg').val(),
		dt_nascimento	: $('#dt-birth').val(),
		dt_validade		: $('#dt-expiration').val(),
		deficiente		: $('#deficiente').is(':checked'),
		cid				: $('#deficiente').is(':checked') ? $('#cid').val() : null,
		photo			: null 
	};
}

function removeErrorAlert() {
	$('#content-wrapper').find('#alert-error').remove();
}

function showAlertError($input, message) {
// #alert-error.alert.alert-danger.alert-dismissible.fade.in.hidden(role='alert')
// 		button.close(type="button", data-dismiss="alert", aria-label="Close")
// 			span(aria-hidden="true") &times;
// 		strong Erro: 
	
	removeErrorAlert();

	// generate Bootstrap Alert-Danger
	var $alert = $('<div>').attr('id', 'alert-error');
	$alert.addClass('alert alert-danger alert-dismissible fade in');
	$alert.attr('role', 'alert');
	var $btnCloseAlert = $('<button>').addClass('close');
	$btnCloseAlert.attr({'type': 'button', 'data-dismiss': 'alert', 'aria-label': 'Close'});
	$btnCloseAlert.appendTo($alert);
	$btnCloseAlert.append('<span>').attr('aria-hidden', 'true').text('x');
	$('<strong>').text('Erro: ').appendTo($alert); 
	$alert.prependTo('#content-wrapper');

	$alert.append(message);
	$input.parent('div.form-group').addClass('has-error');
}

function validData(){
	if( isNaN(parseInt($('#num-id').val())) ){
		showAlertError($('#num-id'), 'Número de carteirinha inválida');
		return false;
	}

	// other validations

	return true;
}

function showSuccessMessage(message) {
	// generate Bootstrap Alert-Success
	var $alert = $('<div>').attr('id', 'alert-success');
	$alert.addClass('alert alert-success alert-dismissible fade in');
	$alert.attr('role', 'alert');
	var $btnCloseAlert = $('<button>').addClass('close');
	$btnCloseAlert.attr({'type': 'button', 'data-dismiss': 'alert', 'aria-label': 'Close'});
	$btnCloseAlert.appendTo($alert);
	$btnCloseAlert.append('<span>').attr('aria-hidden', 'true').text('x');
	$('<strong>').text('Successo: ').appendTo($alert); 
	$alert.prependTo('#content-wrapper');

	$alert.append(message);
}

function sendData(formData){

	$.post('/createPerson', formData)
	 .done(function(result){
	 	console.log('Result: ', result);
	 	if(result.success){
	 		showSuccessMessage('Registro inserido com sucesso!');
	 	}
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
		
		if( validData(formData) ) {
			removeErrorAlert();
			sendData(formData);	
		}

	});
}

$(document).ready(function(){
	initFormControls();
});