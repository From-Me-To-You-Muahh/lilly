function setChromeHeight() {
  const topbar = document.querySelector('.topbar');
  const header = document.querySelector('.header');
  const height = (topbar?.offsetHeight || 0) + (header?.offsetHeight || 0);
  if (height > 0) {
    document.documentElement.style.setProperty('--chrome-height', `${height}px`);
  }
}
setChromeHeight();
window.addEventListener('resize', setChromeHeight);
window.addEventListener('load', setChromeHeight);

const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  const openMenu = () => {
    menu.classList.add('open');
    toggle.classList.add('open');
    toggle.textContent = '✕';
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    if (menu.classList.contains('open')) closeMenu();
    else openMenu();
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

const quoteForm = document.getElementById('quoteForm');
const quoteSuccess = document.getElementById('quoteSuccess');

if (quoteForm) {
  quoteForm.addEventListener('submit', async e => {
    e.preventDefault();

    const submitButton = quoteForm.querySelector('button[type="submit"]');
    const status = quoteForm.querySelector('.form-status');
    const formData = new FormData(quoteForm);
    const payload = Object.fromEntries(formData.entries());

    payload.source = "Lily's Kvalitet Städ website";
    payload.page = window.location.href;
    payload.submitted_at = new Date().toISOString();

    if (status) {
      status.textContent = 'Skickar din offertförfrågan...';
      status.className = 'form-status';
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Skickar...';
    }

    try {
      const response = await fetch(quoteForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-make-apikey': 'wivciz-gyrMo5-gympep'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      quoteForm.reset();

      if (quoteSuccess) {
        quoteForm.style.display = 'none';
        quoteSuccess.classList.add('visible');
        quoteSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (status) {
        status.textContent = 'Tack! Din offertförfrågan har skickats. Vi återkommer så snart som möjligt.';
        status.classList.add('success');
      } else {
        alert('Tack! Din offertförfrågan har skickats.');
      }
    } catch (error) {
      console.error('Quote form submission failed:', error);
      if (status) {
        status.textContent = 'Något gick fel. Försök igen eller kontakta oss på info@lilyskvalitetstad.se.';
        status.classList.add('error');
      } else {
        alert('Något gick fel. Försök igen eller kontakta oss på info@lilyskvalitetstad.se.');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Skicka offertförfrågan';
      }
    }
  });
}

const quoteAnotherBtn = document.getElementById('quoteAnotherBtn');
if (quoteAnotherBtn && quoteForm && quoteSuccess) {
  quoteAnotherBtn.addEventListener('click', () => {
    quoteSuccess.classList.remove('visible');
    quoteForm.style.display = '';
    const status = quoteForm.querySelector('.form-status');
    if (status) {
      status.textContent = '';
      status.className = 'form-status';
    }
    quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

document.querySelectorAll('form:not(#quoteForm)').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Tack! Formuläret är redo att kopplas till e-post, CRM eller backend.');
  });
});

const scrollTopBtn = document.querySelector('.scroll-top-btn');
if (scrollTopBtn) {
  const toggleScrollBtn = () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 480);
  };
  toggleScrollBtn();
  window.addEventListener('scroll', toggleScrollBtn, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
