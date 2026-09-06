const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const playBtn = document.querySelector('#playBtn');
const player = document.querySelector('#radioPlayer');
const status = document.querySelector('#playerStatus');

const RADIO_PAGE_URL = 'https://radiohirafm.radio12345.com/';
const RADIO_STREAM_URL = '';

document.querySelector('#year').textContent = new Date().getFullYear();
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

function setStatus(message) {
  if (status) status.textContent = message;
}

function openOfficialPlayerInsideSite() {
  const card = document.querySelector('.live-card');
  if (!card || card.querySelector('.radio-frame')) return;

  const frame = document.createElement('iframe');
  frame.className = 'radio-frame';
  frame.title = 'Lecteur officiel Radio Hira FM';
  frame.src = RADIO_PAGE_URL;
  frame.allow = 'autoplay; encrypted-media';
  frame.style.width = '100%';
  frame.style.height = '150px';
  frame.style.border = '0';
  frame.style.borderRadius = '16px';
  frame.style.marginTop = '18px';
  frame.style.background = '#f5f5f5';
  frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

  player?.remove();
  playBtn?.remove();
  status?.remove();
  card.appendChild(frame);

  const fallback = document.createElement('a');
  fallback.className = 'official-link';
  fallback.href = RADIO_PAGE_URL;
  fallback.target = '_blank';
  fallback.rel = 'noopener';
  fallback.textContent = 'Ouvrir le lecteur officiel · فتح المشغل الرسمي';
  fallback.style.display = 'inline-block';
  fallback.style.marginTop = '12px';
  fallback.style.color = '#075b45';
  fallback.style.fontWeight = '700';
  fallback.style.fontSize = '12px';
  card.appendChild(fallback);
}

playBtn?.addEventListener('click', async () => {
  if (!RADIO_STREAM_URL) {
    setStatus('Connexion au lecteur officiel Radio Hira FM…');
    openOfficialPlayerInsideSite();
    return;
  }

  if (player.paused) {
    try {
      player.src = RADIO_STREAM_URL;
      await player.play();
      playBtn.textContent = '❚❚';
      setStatus('Lecture en direct · مباشر');
    } catch (error) {
      console.error('Radio Hira FM:', error);
      setStatus("Le flux n'a pas pu être lancé. Vérifiez l'URL du stream.");
    }
  } else {
    player.pause();
    playBtn.textContent = '▶';
    setStatus('Lecture en pause');
  }
});

player?.addEventListener('waiting', () => setStatus('Connexion au direct…'));
player?.addEventListener('playing', () => setStatus('Lecture en direct · مباشر'));
player?.addEventListener('error', () => setStatus('Erreur du flux radio.'));
