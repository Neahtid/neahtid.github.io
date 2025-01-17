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

const contactModal = document.getElementById('contactModal')
if (contactModal) {
  contactModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-consultation');
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    // Update the modal's content.
    const modalTitle = contactModal.querySelector('.modal-title');
    const modalConsultationTtitle = contactModal.querySelector('#data-consultation');
    const modalBodyInput = contactModal.querySelector('.modal-body input[name="consultation"]');

    modalConsultationTtitle.textContent = `${recipient}`;
    modalBodyInput.value = recipient;
  })
}