// Array of banner images
const bannerImages = [
    'images/gallery (9).jpg',
    'images/gallery (5).jpg',
    'images/gallery (2).jpg',
    'images/gallery (11).jpg',
    'images/gallery (8).jpg',
    // Add more images if available
];

// Set the initial index and get the banner image element
let currentImageIndex = 0;
const bannerImageElement = document.getElementById('bannerImage');

// Function to change banner image
function changeBannerImage() {
    currentImageIndex = (currentImageIndex + 1) % bannerImages.length; // Loop through images
    bannerImageElement.src = bannerImages[currentImageIndex]; // Update the image source
}

// Change banner image every 7 seconds
setInterval(changeBannerImage, 7000);


// Hamburger menu for mobile view
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const nav = document.querySelector('nav');

if (hamburger && navMenu) {
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'main-nav-list');
    navMenu.setAttribute('id', 'main-nav-list');

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900 && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
}

// Highlight active nav link
const navLinks = document.querySelectorAll('nav ul li a');
const currentPage = window.location.pathname.split('/').pop();
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Back to top functionality
const backToTopButton = document.getElementById('back-to-top');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

backToTopButton.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// JavaScript to handle enlarging the gallery images

// Set current year in footer for all .copyright-year elements

document.addEventListener('DOMContentLoaded', function() {
    const copyrightYears = document.querySelectorAll('.copyright-year');
    const thisYear = new Date().getFullYear();
    copyrightYears.forEach(el => { el.textContent = thisYear; });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Create email content
            const subject = `New Contact Form Message from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

            // Send email to petboa123@gmail.com
            const mailtoLink = `mailto:petboa123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open default email client
            window.open(mailtoLink);

            // Send thank you email to the user
            const thankYouSubject = 'Thank you for contacting Grany\'s Child School';
            const thankYouBody = `Dear ${name},\n\nThank you for contacting Grany's Child School. We have received your message and will get back to you soon.\n\nBest regards,\nGrany's Child School Team`;

            const thankYouMailtoLink = `mailto:${email}?subject=${encodeURIComponent(thankYouSubject)}&body=${encodeURIComponent(thankYouBody)}`;

            // Show thank you message
            contactForm.style.display = 'none';
            thankYouMessage.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Hide thank you message after 5 seconds and show form again
            setTimeout(() => {
                thankYouMessage.style.display = 'none';
                contactForm.style.display = 'block';
            }, 5000);
        });
    }
});