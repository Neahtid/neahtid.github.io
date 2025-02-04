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
	products: {
		title: 'Request a Demo',
		label: 'Select a Product',
		submit: 'Submit',
		options: [
			'jingo.store',
			'zigna.app',
			'Minions App',
			'Other'
		]
	}
};

// Fetch translations
fetch('/assets/js/translations.json')
	.then(response => response.json())
	.then(translations => {
		// web_applications
		consultationOptions.WebApps.title = translations[currentLang].services.web_applications.form_title || consultationOptions.WebApps.title;
		consultationOptions.WebApps.label = translations[currentLang].services.web_applications.form_label || consultationOptions.WebApps.label;
		consultationOptions.WebApps.submit = translations[currentLang].services.web_applications.form_submit || consultationOptions.WebApps.submit;
		consultationOptions.WebApps.options = translations[currentLang].services.web_applications.form_options || consultationOptions.WebApps.options;
		// business_intelligence
		consultationOptions.BI.title = translations[currentLang].services.business_intelligence.form_title || consultationOptions.BI.title;
		consultationOptions.BI.label = translations[currentLang].services.business_intelligence.form_label || consultationOptions.BI.label;
		consultationOptions.BI.submit = translations[currentLang].services.business_intelligence.form_submit || consultationOptions.BI.submit;
		consultationOptions.BI.options = translations[currentLang].services.business_intelligence.form_options || consultationOptions.BI.options;
		// ai_automation
		consultationOptions.AI.title = translations[currentLang].services.ai_automation.form_title || consultationOptions.AI.title;
		consultationOptions.AI.label = translations[currentLang].services.ai_automation.form_label || consultationOptions.AI.label;
		consultationOptions.AI.submit = translations[currentLang].services.ai_automation.form_submit || consultationOptions.AI.submit;
		consultationOptions.AI.options = translations[currentLang].services.ai_automation.form_options || consultationOptions.AI.options;
		// cybersecurity
		consultationOptions.Cybersecurity.title = translations[currentLang].services.cybersecurity.form_title || consultationOptions.Cybersecurity.title;
		consultationOptions.Cybersecurity.label = translations[currentLang].services.cybersecurity.form_label || consultationOptions.Cybersecurity.label;
		consultationOptions.Cybersecurity.submit = translations[currentLang].services.cybersecurity.form_submit || consultationOptions.Cybersecurity.submit;
		consultationOptions.Cybersecurity.options = translations[currentLang].services.cybersecurity.form_options || consultationOptions.Cybersecurity.options;
		// hardware
		consultationOptions.Hardware.title = translations[currentLang].services.hardware.form_title || consultationOptions.Hardware.title;
		consultationOptions.Hardware.label = translations[currentLang].services.hardware.form_label || consultationOptions.Hardware.label;
		consultationOptions.Hardware.submit = translations[currentLang].services.hardware.form_submit || consultationOptions.Hardware.submit;
		consultationOptions.Hardware.options = translations[currentLang].services.hardware.form_options || consultationOptions.Hardware.options;
		// ecommerce
		consultationOptions.eCommerce.title = translations[currentLang].services.ecommerce.form_title || consultationOptions.eCommerce.title;
		consultationOptions.eCommerce.label = translations[currentLang].services.ecommerce.form_label || consultationOptions.eCommerce.label;
		consultationOptions.eCommerce.submit = translations[currentLang].services.ecommerce.form_submit || consultationOptions.eCommerce.submit;
		consultationOptions.eCommerce.options = translations[currentLang].services.ecommerce.form_options || consultationOptions.eCommerce.options;
		// products
		consultationOptions.products.title = translations[currentLang].products.form_title || consultationOptions.products.title;
		consultationOptions.products.label = translations[currentLang].products.form_label || consultationOptions.products.label;
		consultationOptions.products.submit = translations[currentLang].products.form_submit || consultationOptions.products.submit;
		consultationOptions.products.options = translations[currentLang].products.form_options || consultationOptions.products.options;

	})
	.catch(error => console.error('Error loading translations:', error));

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
	/** ContactForms */
	$('.nea-form').unbind('submit').bind('submit', function () {
		postForm(this, false);
		return false;
	});
	$('.nea-formModal').unbind('submit').bind('submit', function () {
		postForm(this, true);
		return false;
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
	console.log(`${userLanguage} detected`);
	let redirects = {
		'pt': '/pt-br/',
		'en': '/en/',
		'es': '/es/'
	}
	let userLangDetected = userLanguage.substring(0, 2);
	if (redirects[userLangDetected]) {
		console.log(`redirecting ${userLangDetected} to ${redirects[userLangDetected]}`);
		window.location.replace(redirects[userLangDetected]);
		localStorage.setItem('hasBeenRedirected', true);
	}
}