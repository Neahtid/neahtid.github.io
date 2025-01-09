$(document).ready(function () {
    // Smooth scrolling
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Form submission
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        // Add form handling logic here
        alert('Thank you for your message. We will contact you soon!');
        $('#contactModal').modal('hide');
        this.reset();
    });
});