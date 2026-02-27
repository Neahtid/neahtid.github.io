// --- Modal ---
const consultationOptions = {
	WebApps: {
		title: 'Start Your Digital Journey',
		label: 'Select a Solution',
		submit: 'Get Started',
		options: [

		]
	},
	BI: {
		title: '',
		label: 'Select a Solution',
		submit: 'Get Started',
		options: [
			'Financial Performance Analytics',
			'Smart Business Intelligence Dashboards',
			'Automated Financial Management System',
			'AI-Powered Business Analytics Platform',
			'Other'
		]
	},
	AI: {
		title: 'Request a Demo',
		label: 'Select a Solution',
		submit: 'Schedule Demo',
		options: [
			'Chatbots AI',
			'AI-Powered Virtual Assistants',
			'Smart Business Automation',
			'Predictive Intelligence Maintenance',
			'Custom AI Solutions',
			'Other'
		]
	},
	Cybersecurity: {
		title: 'Get Your Security Assessment',
		label: 'Select a Solution',
		submit: 'Request Assessment',
		options: [
			'Ethical Hacking',
			'Penetration Testing',
			'Enterprise Security Assessment',
			'Advanced Encryption Services',
			'Security Monitoring Platform',
			'Compliance & Security Protocols',
			'Other'
		]
	},
	Hardware: {
		title: '',
		label: 'Select a Solution',
		submit: '',
		options: [
			'Business Automation Hardware',
			'Smart Security Infrastructure',
			'Energy Management Systems',
			'IoT & Robotics Integration',
			'Other'
		]
	},
	eCommerce: {
		title: 'Start Your E-Commerce Journey',
		label: 'Select a Service',
		submit: 'Send Message',
		options: [
			'E-commerce Platform Development',
			'White-Label Marketplace Solutions',
			'Analytics Integration',
			'Dropshipping Systems',
			'Platform Maintenance',
			'Other'
		]
	},
	customers: {
		title: 'Book a Demo',
		label: 'Select a Demo',
		submit: 'Submit',
		options: [
			'Jingo Store',
			'Zigna App',
			'Porta Joia Jeri',
			'Living Workspace',
			'Minions App',
			'Other'
		]
	},
	research_programs: {
		title: 'Start a Research Collaboration',
		label: 'Research Area of Interest',
		submit: 'Submit Research Proposal',
		options: [
			'AI & Robotics',
			'Machine Learning',
			'Sustainable Energy',
			'Other'
		]
	}
};

/** Ready */
$(document).ready(function () {
	$('#animated_home_1').viewportChecker({
		classToAdd: 'animated-visible',
		offset: 0,
		repeat: false,
	});
	$('#animated_home_2').viewportChecker({
		classToAdd: 'animated-visible',
		offset: 0,
		repeat: false,
	});
	$('.animated-hidden').viewportChecker({
		classToAdd: 'animated-visible',
		offset: 0,
		repeat: false
	});
	/** ContactForms with reCAPTCHA v2 Invisible - Programmatic Binding */
	// Make recaptchaWidgetId global so it can be reset on validation errors
	window.recaptchaWidgetId = null;
	var recaptchaWidgetId = null;

	$('.nea-form').unbind('submit').bind('submit', function (e) {
		e.preventDefault();
		const form = this;
		const $form = $(form);
		const button = $form.find('button[type="submit"]');
		const sitekey = $form.data('recaptcha-sitekey');

		// Validate form first
		if (!form.checkValidity()) {
			form.reportValidity();
			return false;
		}

		// Store original button HTML to restore later if needed
		if (!button.data('original-html')) {
			button.data('original-html', button.html());
		}

		// Disable button during submission
		button.prop('disabled', true);
		const icon = button.find('.feature-icon');
		if (icon.length) {
			icon.addClass('fa-inactive fa-active');
		}

		// If reCAPTCHA is configured and loaded
		if (sitekey && typeof grecaptcha !== 'undefined' && grecaptcha.ready) {
			try {
				grecaptcha.ready(function () {
					try {
						// Render reCAPTCHA widget only once per form
						let widgetId = $form.data('recaptcha-widget-id');

						if (widgetId === undefined || widgetId === null) {
							// Ensure container exists
							let container = document.getElementById('recaptcha-container');
							if (!container) {
								$('body').append('<div id="recaptcha-container" style="display: none;"></div>');
								container = document.getElementById('recaptcha-container');
							}

							widgetId = grecaptcha.render(container, {
								'sitekey': sitekey,
								'size': 'invisible',
								'callback': function (token) {
									// Store token in hidden field
									$('#g-recaptcha-response', form).val(token);
									console.log('reCAPTCHA verified successfully');
									postForm(form, false);
								},
								'error-callback': function () {
									console.error('reCAPTCHA error');
									button.prop('disabled', false);
									if (icon.length) {
										icon.removeClass('fa-active');
									}
									alert('reCAPTCHA verification failed. Please refresh and try again.');
								}
							});
							$form.data('recaptcha-widget-id', widgetId);
						}

						// Execute the reCAPTCHA
						grecaptcha.execute(widgetId);
					} catch (error) {
						console.error('reCAPTCHA execution error:', error);
						button.prop('disabled', false);
						if (icon.length) {
							icon.removeClass('fa-active');
						}
						postForm(form, false);
					}
				});
			} catch (error) {
				console.error('reCAPTCHA ready error:', error);
				button.prop('disabled', false);
				if (icon.length) {
					icon.removeClass('fa-active');
				}
				postForm(form, false);
			}
		} else {
			postForm(form, false);
		}

		return false;
	});

	// Make modal widget ID global too
	window.recaptchaModalWidgetId = null;
	var recaptchaModalWidgetId = null;

	$('.nea-formModal').unbind('submit').bind('submit', function (e) {
		e.preventDefault();
		const form = this;
		const $form = $(form);
		const button = $form.find('button[type="submit"]');
		const sitekey = $form.data('recaptcha-sitekey');

		// Validate form first
		if (!form.checkValidity()) {
			form.reportValidity();
			return false;
		}

		// Store original button HTML
		if (!button.data('original-html')) {
			button.data('original-html', button.html());
		}

		// Disable button
		button.prop('disabled', true);

		// If reCAPTCHA is configured
		if (sitekey && typeof grecaptcha !== 'undefined' && grecaptcha.ready) {
			try {
				grecaptcha.ready(function () {
					try {
						// Render widget once per form
						let widgetId = $form.data('recaptcha-widget-id');

						if (widgetId === undefined || widgetId === null) {
							// Create local container for modal reCAPTCHA
							if (!$form.find('.recaptcha-modal-container').length) {
								$form.append('<div class="recaptcha-modal-container" style="display: none;"></div>');
							}
							const container = $form.find('.recaptcha-modal-container')[0];

							widgetId = grecaptcha.render(container, {
								'sitekey': sitekey,
								'size': 'invisible',
								'callback': function (token) {
									let tokenInput = $form.find('#g-recaptcha-response');
									if (tokenInput.length === 0) {
										$form.append('<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value="">');
										tokenInput = $form.find('#g-recaptcha-response');
									}
									tokenInput.val(token);
									console.log('reCAPTCHA verified successfully (modal)');
									postForm(form, true);
								},
								'error-callback': function () {
									console.error('reCAPTCHA error (modal)');
									button.prop('disabled', false);
									alert('reCAPTCHA verification failed. Please refresh and try again.');
								}
							});
							$form.data('recaptcha-widget-id', widgetId);
						}

						// Execute
						grecaptcha.execute(widgetId);
					} catch (error) {
						console.error('reCAPTCHA execution error (modal):', error);
						button.prop('disabled', false);
						postForm(form, true);
					}
				});
			} catch (error) {
				console.error('reCAPTCHA ready error (modal):', error);
				button.prop('disabled', false);
				postForm(form, true);
			}
		} else {
			postForm(form, true);
		}

		return false;
	});

	// --- RSS Modal Logic ---

	// Initialize tooltips
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});

	// Intercept RSS icon clicks
	$(document).off('click', '.rss-icon-link').on('click', '.rss-icon-link', function (e) {
		e.preventDefault();
		const rssModal = new bootstrap.Modal(document.getElementById('rssModal'));
		rssModal.show();
	});

	// Copy RSS URL to clipboard
	$('#copy-rss-btn').click(function () {
		const rssUrl = $('#rss-url-input').val();
		const btn = $(this);
		const btnText = $('#copy-btn-text');
		const originalText = translations.pages.rss_modal.copy_btn;
		const copiedText = translations.pages.rss_modal.copied;

		navigator.clipboard.writeText(rssUrl).then(() => {
			btn.removeClass('btn-outline-primary').addClass('btn-success');
			btnText.text(copiedText);

			setTimeout(() => {
				btn.removeClass('btn-success').addClass('btn-outline-primary');
				btnText.text(originalText);
			}, 2000);
		}).catch(err => {
			console.error('Failed to copy text: ', err);
		});
	});

});

// --- Scroll ---
function scrollto(el) {
	window.scroll({
		top: $(el).offset().top,
		left: 0,
		behavior: 'smooth'
	});
}

window.onscroll = function () {
	var body = document.body;
	if (window.scrollY > 0) {
		body.classList.add('scrolled');
	} else {
		body.classList.remove('scrolled');
	}
};

// Get the modal element
const contactModal = document.getElementById('contactModal');
if (contactModal) {
	// translations
	// web_applications
	consultationOptions.WebApps.title = translations.services.web_applications.form_title || consultationOptions.WebApps.title;
	consultationOptions.WebApps.label = translations.services.web_applications.form_label || consultationOptions.WebApps.label;
	consultationOptions.WebApps.submit = translations.services.web_applications.form_submit || consultationOptions.WebApps.submit;
	consultationOptions.WebApps.options = translations.services.web_applications.form_options || consultationOptions.WebApps.options;
	// business_intelligence
	consultationOptions.BI.title = translations.services.business_intelligence.form_title || consultationOptions.BI.title;
	consultationOptions.BI.label = translations.services.business_intelligence.form_label || consultationOptions.BI.label;
	consultationOptions.BI.submit = translations.services.business_intelligence.form_submit || consultationOptions.BI.submit;
	consultationOptions.BI.options = translations.services.business_intelligence.form_options || consultationOptions.BI.options;
	// ai_automation
	consultationOptions.AI.title = translations.services.ai_automation.form_title || consultationOptions.AI.title;
	consultationOptions.AI.label = translations.services.ai_automation.form_label || consultationOptions.AI.label;
	consultationOptions.AI.submit = translations.services.ai_automation.form_submit || consultationOptions.AI.submit;
	consultationOptions.AI.options = translations.services.ai_automation.form_options || consultationOptions.AI.options;
	// cybersecurity
	consultationOptions.Cybersecurity.title = translations.services.cybersecurity.form_title || consultationOptions.Cybersecurity.title;
	consultationOptions.Cybersecurity.label = translations.services.cybersecurity.form_label || consultationOptions.Cybersecurity.label;
	consultationOptions.Cybersecurity.submit = translations.services.cybersecurity.form_submit || consultationOptions.Cybersecurity.submit;
	consultationOptions.Cybersecurity.options = translations.services.cybersecurity.form_options || consultationOptions.Cybersecurity.options;
	// hardware
	consultationOptions.Hardware.title = translations.services.hardware.form_title || consultationOptions.Hardware.title;
	consultationOptions.Hardware.label = translations.services.hardware.form_label || consultationOptions.Hardware.label;
	consultationOptions.Hardware.submit = translations.services.hardware.form_submit || consultationOptions.Hardware.submit;
	consultationOptions.Hardware.options = translations.services.hardware.form_options || consultationOptions.Hardware.options;
	// ecommerce
	consultationOptions.eCommerce.title = translations.services.ecommerce.form_title || consultationOptions.eCommerce.title;
	consultationOptions.eCommerce.label = translations.services.ecommerce.form_label || consultationOptions.eCommerce.label;
	consultationOptions.eCommerce.submit = translations.services.ecommerce.form_submit || consultationOptions.eCommerce.submit;
	consultationOptions.eCommerce.options = translations.services.ecommerce.form_options || consultationOptions.eCommerce.options;
	// products
	consultationOptions.customers.title = translations.customers.form_title || consultationOptions.customers.title;
	consultationOptions.customers.label = translations.customers.form_label || consultationOptions.customers.label;
	consultationOptions.customers.submit = translations.customers.form_submit || consultationOptions.customers.submit;
	consultationOptions.customers.options = translations.customers.form_options || consultationOptions.customers.options;
	// research_programs
	consultationOptions.research_programs.title = translations.services.research_programs.form_title || consultationOptions.research_programs.title;
	consultationOptions.research_programs.label = translations.services.research_programs.form_label || consultationOptions.research_programs.label;
	consultationOptions.research_programs.submit = translations.services.research_programs.form_submit || consultationOptions.research_programs.submit;
	consultationOptions.research_programs.options = translations.services.research_programs.form_options || consultationOptions.research_programs.options;


	// Add event listener for when the modal is about to be shown
	contactModal.addEventListener('show.bs.modal', event => {
		// Button that triggered the modal
		const button = event.relatedTarget;

		// Extract consultation type from button's data-bs-* attributes
		const consultationType = button.getAttribute('data-bs-consultation');

		// Get the select element
		const select = contactModal.querySelector('#form-field-nea_solutionSelect');

		if (select) {
			// Clear existing options
			select.innerHTML = '';

			// Add the default option
			const defaultOption = document.createElement('option');
			defaultOption.selected = true;
			defaultOption.textContent = consultationOptions[consultationType].label;
			select.appendChild(defaultOption);

			// Add the specific options for this consultation type
			consultationOptions[consultationType].options.forEach(optionText => {
				const option = document.createElement('option');
				option.textContent = optionText;
				select.appendChild(option);
			});
		}

		const modalBodyInput = contactModal.querySelector('.modal-body input[name="consultation"]');
		if (modalBodyInput) modalBodyInput.value = consultationType;

		const modalConsultationTtitle = contactModal.querySelector('#data-consultation');
		if (modalConsultationTtitle) modalConsultationTtitle.textContent = `${consultationType}`;

		const modalTitle = contactModal.querySelector('.modal-title');
		if (consultationOptions[consultationType].title) {
			modalTitle.textContent = consultationOptions[consultationType].title;
		}
		if (consultationOptions[consultationType].submit) {
			const submitButton = contactModal.querySelector('.modal-footer button[type="submit"]');
			submitButton.textContent = consultationOptions[consultationType].submit;
		}

	});
}

// language
const hasBeenRedirected = localStorage.getItem('hasBeenRedirected');
const path = window.location.pathname;
if (!hasBeenRedirected && path === "/") {
	const userLanguage = navigator.language || navigator.userLanguage;
	console.log(`userLanguage: ${userLanguage} detected`);
	let redirects = {
		'pt': '/pt-br/',
		'es': '/es/'
	}
	let userLangDetected = userLanguage.substring(0, 2);
	if (redirects[userLangDetected]) {
		console.log(`redirecting ${userLangDetected} to ${redirects[userLangDetected]}`);
		window.location.replace(redirects[userLangDetected]);
		localStorage.setItem('hasBeenRedirected', true);
	}
}