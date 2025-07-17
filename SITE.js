/* BUTTON FUNCTIONALITY */
function scrollToContact() 
{
    document.getElementById('contact').scrollIntoView({
       /*  behavior: 'smooth' */
    });
}
/*FORM FUNCTIONALITY */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const responseMsg = document.getElementById('response');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Disable the submit button to prevent multiple clicks
    submitBtn.disabled = true;
    responseMsg.textContent = "Sending...";

    // Extra check: simple client-side validation
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (firstName.length < 2 || lastName.length < 2 || email === "" || phone === "") {
      responseMsg.textContent = "Please fill in all required fields correctly.";
      submitBtn.disabled = false;
      return;
    }

    // Prepare form data
    const formData = new FormData(form);

    try {
      const res = await fetch('contact.php', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      if (result.success) {
        responseMsg.textContent = "✅ Thank you! Your message has been sent.";
        form.reset();
      } else {
        responseMsg.textContent = "❌ Sorry! " + (result.error || "Something went wrong.");
      }
    } catch (err) {
      responseMsg.textContent = "❌ Server error. Please try again later.";
    }

    submitBtn.disabled = false;
  });

/* ABOUT PAGE ANIMATIONS */
/* SCROLL */
window.addEventListener('scroll', () => 
{
    const section = document.querySelector('#about');
    const left = document.querySelector('.ellipse-container');
    const right = document.querySelector('.right-container');

    const sectionRect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // How far is section into view? 0 = bottom, 1 = fully in view
    const progress = Math.min(Math.max(1 - sectionRect.top / windowHeight, 0), 1);

    // Apply transforms based on progress
    left.style.opacity = progress;
    right.style.opacity = progress;

    left.style.transform = `translateX(${(-100 + progress * 100)}px)`;
    right.style.transform = `translateX(${(100 - progress * 100)}px)`;
});
function animateAboutSection() {
  const section = document.querySelector('#about');
  const left = document.querySelector('.ellipse-container');
  const right = document.querySelector('.right-container');

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

// Run on scroll
window.addEventListener('scroll', animateAboutSection);

// Also run when user clicks an anchor that jumps to #about
window.addEventListener('hashchange', animateAboutSection);

// Also run on page load (in case user reloads while at #about)
window.addEventListener('DOMContentLoaded', animateAboutSection);


