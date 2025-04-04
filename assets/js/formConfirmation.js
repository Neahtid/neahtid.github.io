function ValidateEmail(email) {
	if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
		return (true)
	}
	alert(`${email} ${translations.pages.forms.email_novalid}`);

	return false;
}


function postForm(form, modal) {
	var thanks = `${translations.pages.forms.thanks_default}`;
	if ($(form).hasClass("nea-contact")) {
		var URL = "https://docs.google.com/forms/d/1CpamEupan42CHwtJN1VqJnjgoQGud8SI2WAb9XCVqPU/formResponse";
		thanks = `${translations.pages.forms.thanks_response}`;
	}

	var email = $("input#form-field-nea_email", form).val();
	var name = $("input#form-field-nea_name", form).val();
	var message = $("#form-field-nea_message", form).val();
	var consultation = $("#form-field-nea_consultation", form).val();
	var solutionSelect = $("#form-field-nea_solutionSelect", form).val();
	var source = "neahtid.com";
	var href = window.location.href;

	const spam1_re = /Publicaremos tu empresa en más de (\d+)/;
	const spam1_match = message.match(spam1_re);
	debugger;
	if (spam1_match) {
		form.reset();
		$("input, select, textarea, button", form).prop("disabled", true);
		$(".modal-footer .btn-submit", form).hide();
		let i=20; while(i--) alert("Spam detected. Message not send.");
		return;
	}


	if (email == "") {
		alert(`${translations.pages.forms.email_empty}`);

		return false;
	}
	if (!ValidateEmail(email)) return false;
	if (URL == "") {
		alert(`${translations.pages.forms.general_novalid}`);
		return false;
	}

	$('.fa-inactive', form).addClass('fa-active');
	$('button[type=submit]', form).disabled = true;

	if (consultation == undefined) {
		consultation = "_";
	}
	if (solutionSelect == undefined) {
		solutionSelect = "_";
	}
	message = ` 
	${message} <br>
	<hr>
	---
	<p><b>**Referencia**</b>: ${href}</p>
	<p><b>**Language**</b>: ${currentLang}</p>
	<p><b>**Consultation**</b>: ${consultation}</p>
	<p><b>**Solution**</b>: ${solutionSelect}</p>
	`;

	$.ajax({
		url: URL,
		data: {
			"entry.1155430950": email,
			"entry.545860963": name,
			"entry.1997542075": message,
			"entry.26006045": source
		},
		type: "POST",
		dataType: "xml",
		statusCode: {
			0: function () {
				if (modal){
					formSaved = $(form).find(".modal-body").html();

					$(form).find(".modal-body").html(`
						<p class="alert alert-success">${thanks}</p>
						<p class="mt-4 mb-0 text-center text-secondary">${translations.pages.forms.will_close}</p>
						`);
					$(".modal-footer .modal-close", form).removeClass('d-none');
					$(".modal-footer .btn-submit", form).hide();

					setTimeout(function() {
						$(form).find(".modal-body").html(formSaved);
						$(".modal-footer .modal-close", form).addClass('d-none');
						$(".modal-footer .btn-submit", form).show();
						form.reset();
						$('#contactModal').modal('hide');
					}, 5000);
				}
				else {
					$(form).html('<p class="alert alert-success">' + thanks + '</p>');
					$('button[type=submit]', form).disabled = false;
					$('.fa-inactive', form).removeClass('fa-active');
				}
				console.log(`statusCode: 0 ${modal}`);
			},
			200: function () {
				if (modal){
					formSaved = $(form).find(".modal-body").html();

					$(form).find(".modal-body").html(`
						<p class="alert alert-success">${thanks}</p>
						<p class="mt-4 mb-0 text-center text-secondary">${translations.pages.forms.will_close}</p>
						`);
					$(".modal-footer .modal-close", form).removeClass('d-none');
					$(".modal-footer .btn-submit", form).hide();

					setTimeout(function() {
						$(form).find(".modal-body").html(formSaved);
						$(".modal-footer .modal-close", form).addClass('d-none');
						$(".modal-footer .btn-submit", form).show();
						form.reset();
						$('#contactModal').modal('hide');
					}, 5000);
				}
				else {
					$(form).html('<p class="alert alert-success">' + thanks + '</p>');
					$('button[type=submit]', form).disabled = false;
					$('.fa-inactive', form).removeClass('fa-active');
				}

			}
		},
		complete: function(xhr, textStatus) {
		  console.log(`completed with status: ${xhr.status}`);
		}
	});
}
