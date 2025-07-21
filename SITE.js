/* BUTTON FUNCTIONALITY */
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}
function scrollToAbout() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
}
function scrollToAbout2() {
    document.getElementById('about2').scrollIntoView({
        behavior: 'smooth'
    });
}

/* FORM FUNCTIONALITY */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const responseMsg = document.getElementById('response');

    if (form && submitBtn && responseMsg) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Disable the submit button to prevent multiple clicks
            submitBtn.disabled = true;
            submitBtn.textContent = "SENDING...";
            responseMsg.textContent = "";
            responseMsg.style.color = "#666";

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const organisation = document.getElementById('organisation').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Client-side validation
            if (firstName.length < 2) {
                showError("First name must be at least 2 characters long.");
                return;
            }

            if (lastName.length < 2) {
                showError("Last name must be at least 2 characters long.");
                return;
            }

            if (!isValidEmail(email)) {
                showError("Please enter a valid email address.");
                return;
            }

            if (phone.length < 7) {
                showError("Please enter a valid phone number.");
                return;
            }

            // Prepare form data
            const formData = new FormData(form);

            try {
                const response = await fetch('contact.php', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                if (result.success) {
                    showSuccess(result.message || "Thank you! Your message has been sent successfully.");
                    form.reset();
                } else {
                    showError(result.error || "Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error('Error:', error);
                showError("Network error. Please check your connection and try again.");
            } finally {
                // Re-enable the submit button
                submitBtn.disabled = false;
                submitBtn.textContent = "SUBMIT";
            }
        });
    }

    // Helper functions
    function showError(message) {
        responseMsg.textContent = "❌ " + message;
        responseMsg.style.color = "#e74c3c";
        submitBtn.disabled = false;
        submitBtn.textContent = "SUBMIT";
    }

    function showSuccess(message) {
        responseMsg.textContent = "✅ " + message;
        responseMsg.style.color = "#27ae60";
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

/* ABOUT PAGE ANIMATIONS */
function animateAboutSection() {
    const section = document.querySelector('#about');
    const left = document.querySelector('.ellipse-container');
    const right = document.querySelector('.right-container');

    if (section && left && right) {
        const sectionRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how far the section is in view
        const progress = Math.min(Math.max(1 - sectionRect.top / windowHeight, 0), 1);

        // Fade + slide based on scroll progress
        left.style.opacity = progress;
        right.style.opacity = progress;

        left.style.transform = `translateX(${(-100 + progress * 100)}px)`;
        right.style.transform = `translateX(${(100 - progress * 100)}px)`;
    }
}

// Run animations on various events
window.addEventListener('scroll', animateAboutSection);
window.addEventListener('hashchange', animateAboutSection);
window.addEventListener('DOMContentLoaded', animateAboutSection);