// floating bar (every page)
const bar = document.getElementById('siteBar');
if (bar) {
  const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// pre-select the service from a link (Contact page only)
const service = document.getElementById('service');
const wanted = new URLSearchParams(location.search).get('service');
if (service && wanted) service.value = wanted;

// enquiry forms (Contact page and Education page)
document.querySelectorAll('.contact-form, .ev-form').forEach((form) => {
  const ok  = form.querySelector('.form-confirm');
  const bad = form.querySelector('.form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ok.hidden = bad.hidden = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) { form.reset(); ok.hidden = false; } else { bad.hidden = false; }
    } catch (err) {
      bad.hidden = false;
    }
  });
});