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

// --- Modal ---
const consultationOptions = {
	WebApps: {
		label: 'Select Solution',
		title: 'Start Your Digital Journey',
		submit: 'Get Started',
		options: [
			'Marketing Landing Page',
			'Progressive Web App',
			'Custom Web Application',
			'Advanced Web Applications',
			'Advanced Computing Software',
			'Google Sheets Integration Platform',
			'Corporate Website Development',
			'High-Impact Landing Pages',
			'Research Simulation Software',
			'Brand Identity & Web Design',
			'Website Maintenance & Support',
			'Other'
		]
	},
	BI: {
		label: 'Select Solution',
		title: '',
		submit: 'Get Started',
		options: [
			'Profit Analysis Dashboards',
			'Advanced Financial Analytics',
			'Revenue & Expense Platform',
			'Excel & Spreadsheet Solutions',
			'Other'
		]
	},
	AI: {
		label: 'Select Solution',
		title: 'Request a Demo',
		submit: 'Schedule Demo',
		options: [
			'AI Chatbots',
			'Automated Reservations',
			'Predictive Maintenance',
			'Intelligent Virtual Assistants',
			'Process Automation Systems',
			'Smart Maintenance Platform',
			'Custom AI Development',
			'Other'
		]
	},
	Cybersecurity: {
		label: 'Select Solution',
		title: 'Get Your Security Assessment',
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
		label: 'Select Solution',
		title: '',
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
		label: 'Select Service',
		title: 'Start Your E-Commerce Journey',
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
		label: 'Select a Product',
		title: 'Request a Demo',
		submit: 'Submit',
		options: [
			'jingo.store',
			'zigna.app',
			'Minions App',
			'Other'
		]
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