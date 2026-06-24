/**
 * Newsletter Popup — INverso / daianavaiani.it
 * Mostra popup dopo 6s oppure su exit-intent (mouse verso l'alto)
 * Non mostra se già visto o già iscritto
 */
(function () {
  'use strict';

  const POPUP_KEY = 'dv_popup_dismissed';
  const POPUP_DONE_KEY = 'dv_popup_subscribed';
  const DELAY_MS = 6000;

  const popup = document.getElementById('newsletter-popup');
  if (!popup) return;

  // Non mostrare se già gestito
  if (localStorage.getItem(POPUP_KEY) || localStorage.getItem(POPUP_DONE_KEY)) return;

  // Se la pagina è già il risultato di un form submit (success), segna come fatto
  const successEl = popup.querySelector('.popup-success');
  if (successEl) {
    localStorage.setItem(POPUP_DONE_KEY, '1');
    return;
  }

  function showPopup() {
    if (popup.style.display === 'flex') return;
    popup.style.display = 'flex';
    requestAnimationFrame(() => {
      popup.classList.add('newsletter-popup--visible');
    });
    document.body.style.overflow = 'hidden';
  }

  function hidePopup(permanent) {
    popup.classList.remove('newsletter-popup--visible');
    document.body.style.overflow = '';
    setTimeout(() => { popup.style.display = 'none'; }, 400);
    if (permanent) localStorage.setItem(POPUP_KEY, '1');
  }

  // Esponi globalmente per il Liquid (form success)
  window.markPopupDone = function () {
    localStorage.setItem(POPUP_DONE_KEY, '1');
    hidePopup(true);
  };

  // Timer
  const timer = setTimeout(showPopup, DELAY_MS);

  // Exit intent
  document.addEventListener('mouseleave', function onLeave(e) {
    if (e.clientY <= 0) {
      clearTimeout(timer);
      showPopup();
      document.removeEventListener('mouseleave', onLeave);
    }
  });

  // Chiudi con X
  const closeBtn = document.getElementById('popup-close');
  if (closeBtn) closeBtn.addEventListener('click', () => hidePopup(true));

  // Chiudi overlay
  const overlay = document.getElementById('popup-overlay');
  if (overlay) overlay.addEventListener('click', () => hidePopup(true));

  // Chiudi "no grazie"
  const skipBtn = document.getElementById('popup-skip');
  if (skipBtn) skipBtn.addEventListener('click', () => hidePopup(true));

  // Chiudi con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePopup(true);
  });
})();
