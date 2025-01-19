function ValidateEmail(email) {
	if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
		return (true)
	}
	alert(email + " is an invalid email address! Plese insert a valid one.");

	return false;
}


function postForm(form) {
	if ($(form).hasClass("nea-contact")) {
		var URL = "https://docs.google.com/forms/d/1CpamEupan42CHwtJN1VqJnjgoQGud8SI2WAb9XCVqPU/formResponse";
		var thanks = "Thanks for contacting us. We will be in touch soon.";
	}

	var email = $("input#form-field-nea_email", form).val();
	var name = $("input#form-field-nea_name", form).val();
	var message = $("#form-field-nea_message", form).val();
	var source = "neahtid.com";

	if (email == "") {
		alert("Insert your email addrees before sending.");

		return false;
	}
	if (!ValidateEmail(email)) return false;
	if (URL == "") {
		alert("There's something wrong... Please try again later.");
		return false;
	}

	$('.fa-inactive', form).addClass('fa-active');
	$('button[type=submit]', form).disabled = true;

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
				$(form).html('<p class="nea-form-sent">' + thanks + '</p>');
				console.warn("statusCode: 0");
				$('button[type=submit]', form).disabled = false;
				$('.fa-inactive', form).removeClass('fa-active');
			},
			200: function () {
				$(form).html('<p class="nea-form-sent">' + thanks + '</p>');
				$('button[type=submit]', form).disabled = false;
				$('.fa-inactive', form).removeClass('fa-active');
			}
		}
	});
}
