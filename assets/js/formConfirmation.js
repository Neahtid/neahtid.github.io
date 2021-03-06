function ValidateEmail(email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
		return (true)
	}
	alert(email + " is an invalid email address! Plese insert a valid one.");

	return false;
}

verify = new Object();
verify.valid = false;
verify.callback = function(response) {
	console.log("verify.callback");
	console.log(response);
	this.valid = response;
	if (response) {
		$('#s_but').show();
	}
	console.log(this.valid);
};
var onloadCallback = function() {
	grecaptcha.render('n-recaptcha', {
		'sitekey': '6LfC2CUUAAAAAMB11iJYlS5QlDhoNRc80P0wvBiZ',
		'callback': verify.callback,
		'theme': 'light'
	});
};

function postForm(form) {
	var error = "Contact no valid! The form was not sent."
	if ($(form).hasClass("nea-subscribe")) {
		var URL = "https://docs.google.com/forms/d/1uKJWGaSlhsAd9DXm8opzyIFnicwscYdenYhCyNB-KWY/formResponse";
		var thanks = "Thanks for subscribing. We will be in touch soon.";
	} else if ($(form).hasClass("nea-investor")) {
		var URL = "https://docs.google.com/forms/d/1js4c8uf---mPzKOpfOQR-8rYkR-DQu9FPJgIEgzDOhk/formResponse";
		var thanks = "Thank you! We will be in touch soon.";
	} else if ($(form).hasClass("nea-contact")) {
		var URL = "https://docs.google.com/forms/d/1CpamEupan42CHwtJN1VqJnjgoQGud8SI2WAb9XCVqPU/formResponse";
		var thanks = "Thanks for contacting us. We will be in touch soon.";
	}
	/*else if ($(form).hasClass("nea-coupon")){
		var URL = "https://docs.google.com/forms/d/14YNj4cC9nPhMl1vIzrUkfh3NW4Xbwyoqkcru3Wgw6pI/formResponse";
		var thanks = "Thank you. You will receive soon a special discount.";
	}*/


	var email = $("input#form-field-nea_email", form).val();
	var name = $("input#form-field-nea_name", form).val();
	var attend = $("input[name='investor-sub']:checked", form).val();
	var message = $("#form-field-nea_message", form).val();

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
			"entry.512963360": attend,
			"entry.1997542075": message
		},
		type: "POST",
		dataType: "xml",
		statusCode: {
			0: function() {
				$(form).html('<p class="nea-form-error">' + error + '</p>');
				console.warn("statusCode: 0");
				$('button[type=submit]', form).disabled = false;
				$('.fa-inactive', form).removeClass('fa-active');
				// console.trace();
			},
			200: function() {
				$(form).html('<p class="nea-form-sent">' + thanks + '</p>');
				$('button[type=submit]', form).disabled = false;
				$('.fa-inactive', form).removeClass('fa-active');
				// console.trace();
			}
		}
	});
}