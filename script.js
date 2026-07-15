// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Scroll-reveal for sections ----------
const revealTargets = document.querySelectorAll('.section, .skill-card, .project-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

const validators = {
  name: (value) => value.trim().length >= 2 ? '' : 'Please enter at least 2 characters.',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  message: (value) => value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
};

function validateField(field) {
  const validator = validators[field.name];
  if (!validator) return true;
  const errorEl = document.getElementById(field.name + 'Error');
  const message = validator(field.value);
  if (message) {
    field.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
    return false;
  } else {
    field.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
    return true;
  }
}

['name', 'email', 'message'].forEach(id => {
  const field = document.getElementById(id);
  field.addEventListener('keyup', () => validateField(field));
  field.addEventListener('change', () => validateField(field));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')];
  const results = fields.map(validateField);
  const reasonField = document.getElementById('reason');

  if (!reasonField.value) {
    status.textContent = 'Please choose a reason for contact.';
    status.style.color = '#c0473f';
    return;
  }

  if (results.every(Boolean)) {
    // No backend wired up yet — this is where a PHP endpoint (Task 3) would receive the data.
    status.textContent = `Thanks — I'll get back to you soon.`;
    status.style.color = '';
    form.reset();
  } else {
    status.textContent = 'Please fix the highlighted fields.';
    status.style.color = '#c0473f';
  }
});
