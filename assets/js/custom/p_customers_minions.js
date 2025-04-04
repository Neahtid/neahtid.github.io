$(document).ready(function () {
    // Active nav item handling
    $(window).on('scroll', function () {
        var scrollPosition = $(window).scrollTop();

        // Check each section's position and update nav accordingly
        $('section').each(function () {
            var currentSection = $(this);
            var sectionTop = currentSection.offset().top - 120;
            var sectionBottom = sectionTop + currentSection.height();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.nav-link').removeClass('active');
                $('a[href="#' + currentSection.attr('id') + '"]').addClass('active');
            }
        });
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});