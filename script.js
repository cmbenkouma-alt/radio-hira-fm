const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const playBtn = document.querySelector('#playBtn');
const status = document.querySelector('#playerStatus');
const frame = document.querySelector('#radioFrame');

const RADIO_PAGE_URL = 'https://radiohirafm.radio12345.com/';

const setStatus = (message) => {
  if (status) status.textContent = message;
};

document.querySelector('#year').textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

playBtn?.addEventListener('click', () => {
  if (frame) {
    frame.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setStatus('Lecteur radio ouvert · المشغل الإذاعي مفتوح');
  }
});

frame?.addEventListener('load', () => {
  setStatus('Lecteur officiel prêt · المشغل الرسمي جاهز');
});

// Keep the official listening page as a reliable fallback while the direct
// Shoutcast stream is being configured for HTTPS playback.
window.RadioHiraFM = {
  playerUrl: RADIO_PAGE_URL,
  station: 'Radio Hira FM',
  location: 'Moribabougou, Mali'
};
