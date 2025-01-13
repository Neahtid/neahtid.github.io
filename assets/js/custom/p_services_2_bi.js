// Smooth scrolling for navigation links
$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').animate({
            'scrollTop': $target.offset().top - 70
        }, 800, 'swing');
    });

    // Navbar background color change on scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm');
        } else {
            $('.navbar').removeClass('shadow-sm');
        }
    });
});