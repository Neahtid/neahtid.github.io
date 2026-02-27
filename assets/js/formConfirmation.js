function ValidateEmail(email) {
	if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
		return (true)
	}
	alert(`${email} ${translations.pages.forms.email_novalid}`);

	return false;
}


function postForm(form, modal) {
	var thanks = `${translations.pages.forms.thanks_default}`;
	var URL = "";
	var useBackendVerification = false; // Set to true when backend endpoint is ready

	if ($(form).hasClass("nea-contact")) {
		URL = "https://docs.google.com/forms/d/1CpamEupan42CHwtJN1VqJnjgoQGud8SI2WAb9XCVqPU/formResponse";
		thanks = `${translations.pages.forms.thanks_response}`;
	}

	var email = $("input#form-field-nea_email", form).val();
	var name = $("input#form-field-nea_name", form).val();
	var message = $("#form-field-nea_message", form).val();
	var consultation = $("#form-field-nea_consultation", form).val();
	var solutionSelect = $("#form-field-nea_solutionSelect", form).val();
	var recaptchaToken = $("#g-recaptcha-response", form).val();
	var source = "neahtid.com";
	var href = window.location.href;

	// Helper function to restore button state on validation error
	function restoreButtonState() {
		var button = $('button[type=submit]', form);

		// ALWAYS restore original HTML first (most important!)
		var originalHtml = button.data('original-html');
		if (originalHtml) {
			button.html(originalHtml);
		}

		// Then re-enable button and remove loading classes
		button.prop('disabled', false);
		$('.fa-inactive', form).removeClass('fa-active');
		var icon = button.find('.feature-icon');
		if (icon.length) {
			icon.removeClass('fa-active');
		}

		// Reset reCAPTCHA widget so it can be used again
		if (typeof grecaptcha !== 'undefined') {
			try {
				var widgetId = $(form).data('recaptcha-widget-id');

				if (widgetId !== null && widgetId !== undefined) {
					grecaptcha.reset(widgetId);
				}
			} catch (e) {
				// Silent fail - user may need to refresh
			}
		}
	}

	const spam1_re = /Publicaremos tu empresa en más de (\d+)/;
	const spam1_match = message.match(spam1_re);
	if (spam1_match) {
		form.reset();
		$("input, select, textarea, button", form).prop("disabled", true);
		$(".modal-footer .btn-submit", form).hide();
		let i = 20; while (i--) alert("Spam detected. Message not send.");
		return;
	}


	if (email == "") {
		alert(`${translations.pages.forms.email_empty}`);
		restoreButtonState();
		return false;
	}
	if (!ValidateEmail(email)) {
		restoreButtonState();
		return false;
	}
	if (URL == "") {
		alert(`${translations.pages.forms.general_novalid}`);
		restoreButtonState();
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
	<p><b>**Reference**</b>: ${href}</p>
	<p><b>**Language**</b>: ${currentLang}</p>
	<p><b>**Consultation**</b>: ${consultation}</p>
	<p><b>**Solution**</b>: ${solutionSelect}</p>
	`;

	// If backend verification is enabled, verify reCAPTCHA first
	if (useBackendVerification && recaptchaToken) {
		// Verify reCAPTCHA token through backend endpoint
		$.ajax({
			url: '/api/verify-recaptcha', // Backend endpoint for verification
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				token: recaptchaToken,
				email: email,
				name: name,
				message: message,
				source: source
			}),
			success: function (response) {
				if (response.success && response.score >= 0.5) {
					submitToGoogleForms();
				} else {
					restoreButtonState();
					alert('Security verification failed. Please try again.');
				}
			},
			error: function (xhr, status, error) {
				submitToGoogleForms();
			}
		});
	} else {
		// Direct submission without backend verification
		submitToGoogleForms();
	}

	// Function to submit to Google Forms
	function submitToGoogleForms() {
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
					handleSuccess();
				},
				200: function () {
					handleSuccess();
				}
			},
			error: function () {
				// Google Forms often returns error block even on success due to CORS
				handleSuccess();
			}
		});

		function handleSuccess() {
			if (modal) {
				var formSaved = $(form).find(".modal-body").html();

				$(form).find(".modal-body").html(`
				<p class="alert alert-success">${thanks}</p>
				<p class="mt-4 mb-0 text-center text-secondary">${translations.pages.forms.will_close}</p>
				`);
				$(".modal-footer .modal-close", form).removeClass('d-none');
				$(".modal-footer .btn-submit", form).hide();

				// Special toast for RSS subscription
				if (form.id === 'rss-email-form') {
					const successToast = document.getElementById('successToast');
					if (successToast) {
						var toast = new bootstrap.Toast(successToast);
						toast.show();
					}
				}

				setTimeout(function () {
					$(form).find(".modal-body").html(formSaved);
					$(".modal-footer .modal-close", form).addClass('d-none');
					$(".modal-footer .btn-submit", form).show();
					form.reset();
					$(form).closest('.modal').modal('hide');
					restoreButtonState();
				}, 3000);
			}
			else {
				$(form).html('<p class="alert alert-success">' + thanks + '</p>');
				restoreButtonState();
			}
		}
	}
}
