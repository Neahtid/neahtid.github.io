$(document).ready(function () {

    // Form submission handling
    $('#submitForm').on('click', function () {
        if ($('#contactForm')[0].checkValidity()) {
            // Here you would typically send the form data to your server
            alert('Thank you for your interest! We will contact you soon.');
            $('#contactModal').modal('hide');
            $('#contactForm')[0].reset();
        } else {
            $('#contactForm')[0].reportValidity();
        }
    });

    // Navbar background change on scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('bg-dark').removeClass('bg-transparent');
        } else {
            $('.navbar').removeClass('bg-dark').addClass('bg-transparent');
        }
    });
});