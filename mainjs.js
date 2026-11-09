document.addEventListener('DOMContentLoaded', function () {

  // ----- Mobile menu toggle -----
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close the menu after tapping a link
    header.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Lightbox: enlarge gallery photos when clicked -----
  const photos = document.querySelectorAll('.photo-card img');
  if (!photos.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const content = document.createElement('div');
  content.className = 'lightbox-content';

  const img = document.createElement('img');
  img.className = 'lightbox-image';
  img.alt = '';

  const caption = document.createElement('div');
  caption.className = 'lightbox-caption';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close photo');
  closeBtn.innerHTML = '&times;';

  content.appendChild(img);
  content.appendChild(caption);
  overlay.appendChild(content);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  let lastFocused = null;

  function show(src, alt) {
    lastFocused = document.activeElement;
    img.src = src;
    img.alt = alt || '';
    caption.textContent = alt || '';
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    closeBtn.focus();
  }

  function hide() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') hide();
  }

  closeBtn.addEventListener('click', hide);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === content) hide();
  });

  photos.forEach(function (photo) {
    photo.tabIndex = 0;
    photo.addEventListener('click', function () { show(this.src, this.alt); });
    photo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        show(this.src, this.alt);
      }
    });
  });
});
