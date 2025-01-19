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
	$('.nea-form').unbind('submit').bind('submit', function () {
		postForm(this);
		return false;
	});

});

/** Scroll */
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

/** Contact */

// Form submission
$('#contactForm').on('submit', function (e) {
	e.preventDefault();
	// Add form handling logic here
	alert('Thank you for your message. We will contact you soon!');
	$('#contactModal').modal('hide');
	this.reset();
});
const consultationOptions = {
	WebApps: {
		label: 'Select Solution',
		options: [
			'Advanced Web Applications',
			'Advanced Computing Software',
			'Google Sheets Integration Platform',
			'Corporate Website Development',
			'High-Impact Landing Pages',
			'Research Simulation Software',
			'Brand Identity & Web Design',
			'Website Maintenance & Support'
		]
	},
	BI: {
		label: 'Select Solution',
		options: [
			'Profit Analysis Dashboards',
			'Advanced Financial Analytics',
			'Revenue & Expense Platform',
			'Excel & Spreadsheet Solutions'
		]
	},
	AI: {
		label: 'Select Solution',
		options: [
			'Intelligent Virtual Assistants',
			'Process Automation Systems',
			'Smart Maintenance Platform',
			'Custom AI Development'
		]
	},
	Cybersecurity: {
		label: 'Select Solution',
		options: [
			'Enterprise Security Assessment',
			'Advanced Encryption Services',
			'Security Monitoring Platform',
			'Compliance & Security Protocols'
		]
	},
	Hardware: {
		label: 'Select Solution',
		options: [
			'Business Automation Hardware',
			'Smart Security Infrastructure',
			'Energy Management Systems',
			'IoT & Robotics Integration'
		]
	},
	eCommerce: {
		label: 'Select Service',
		options: [
			'E-commerce Platform Development',
			'White-Label Marketplace Solutions',
			'Analytics Integration',
			'Dropshipping Systems',
			'Platform Maintenance'
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
		const select = contactModal.querySelector('#solutionSelect');

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

		const modalBodyInput = contactModal.querySelector('.modal-body input[name="consultation"]');
		const modalConsultationTtitle = contactModal.querySelector('#data-consultation');
		modalBodyInput.value = consultationType;
		if (modalConsultationTtitle){
			modalConsultationTtitle.textContent = `${consultationType}`;
		}


		const modalTitle = contactModal.querySelector('.modal-title');



	});
}