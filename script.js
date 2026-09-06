const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const playBtn = document.querySelector('#playBtn');
const player = document.querySelector('#radioPlayer');
const status = document.querySelector('#playerStatus');

document.querySelector('#year').textContent = new Date().getFullYear();
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

/*
 * RADIO HIRA FM — configuration du direct
 *
 * RADIO_STREAM_URL doit être l'adresse AUDIO réelle du flux (MP3/AAC/HLS).
 * Exemple : https://serveur.exemple.tld/live.mp3
 *
 * Une page web d'écoute (https://...) n'est PAS elle-même un flux audio.
 * Si le fournisseur ne donne qu'une page d'écoute, son lecteur doit fournir
 * soit une URL de stream, soit un code d'intégration compatible.
 */
const RADIO_STREAM_URL = '';

function setStatus(message) {
  if (status) status.textContent = message;
}

playBtn?.addEventListener('click', async () => {
  if (!RADIO_STREAM_URL) {
    setStatus("Le flux audio réel doit encore être relié au lecteur.");
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
