const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
}

const quoteForm = document.getElementById('quoteForm');

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
      if (status) {
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

document.querySelectorAll('form:not(#quoteForm)').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Tack! Formuläret är redo att kopplas till e-post, CRM eller backend.');
  });
});

const lightbox = document.getElementById('galleryLightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.gallery-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Förstorad städbild';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const full = item.dataset.full || (img ? img.src : '');
      openLightbox(full, img ? img.alt : '');
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}
