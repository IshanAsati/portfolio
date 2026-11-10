/**
 * Retro Mode unlocked via the Konami Code.
 * Sequence: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight (and optional B, A).
 *
 * Transforms the site into an authentic 1980s CRT amber-phosphor terminal set in bitmapped "Redaction 100".
 */

const KONAMI_ARROWS = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
];

const FULL_KONAMI = [
  ...KONAMI_ARROWS,
  'b',
  'a',
];

let inputBuffer = [];
let bufferTimer = null;
let initialized = false;

function playRetroChime() {
  try {
    const AudioCtx = window.AudioContext || window['webkitAudioContext'];
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5 arcade arpeggio
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + i * 0.07 + 0.18);
    });
  } catch (e) {}
}

function updateHUD(enabled) {
  if (typeof document === 'undefined') return;
  let hud = document.getElementById('retro-hud-badge');
  if (enabled) {
    if (!hud) {
      hud = document.createElement('button');
      hud.id = 'retro-hud-badge';
      hud.className = 'retro-hud-badge';
      hud.setAttribute('type', 'button');
      hud.setAttribute('aria-label', 'Exit Retro Mode');
      hud.innerHTML = `
        <span class="retro-hud-dot" aria-hidden="true"></span>
        <span class="retro-hud-text">RETRO 1984 CRT // CLICK TO EXIT</span>
      `;
      hud.addEventListener('click', () => toggleRetroMode(false));
      document.body.appendChild(hud);
    }
  } else if (hud) {
    hud.remove();
  }
}

export function toggleRetroMode(forceState) {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;
  const isCurrentlyRetro = html.classList.contains('retro-mode');
  const nextState = typeof forceState === 'boolean' ? forceState : !isCurrentlyRetro;

  if (nextState) {
    html.classList.add('retro-mode');
    try {
      localStorage.setItem('portfolio_retro_mode', 'true');
    } catch (e) {}
    playRetroChime();
    updateHUD(true);
  } else {
    html.classList.remove('retro-mode');
    try {
      localStorage.removeItem('portfolio_retro_mode');
    } catch (e) {}
    updateHUD(false);
  }
}

export function initRetroMode() {
  if (typeof window === 'undefined') return;

  // Restore saved retro preference
  try {
    if (localStorage.getItem('portfolio_retro_mode') === 'true') {
      document.documentElement.classList.add('retro-mode');
      updateHUD(true);
    }
  } catch (e) {}

  if (initialized) return;
  initialized = true;

  window.addEventListener('keydown', (e) => {
    // If Esc is pressed while in retro mode, toggle off
    if (e.key === 'Escape' && document.documentElement.classList.contains('retro-mode')) {
      toggleRetroMode(false);
      return;
    }

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    // Reset buffer if typing pauses for > 2.5s
    clearTimeout(bufferTimer);
    bufferTimer = setTimeout(() => {
      inputBuffer = [];
    }, 2500);

    inputBuffer.push(key);
    if (inputBuffer.length > 16) {
      inputBuffer.shift();
    }

    // Check if either arrow sequence or full konami code was typed
    const isArrowMatch =
      inputBuffer.length >= KONAMI_ARROWS.length &&
      KONAMI_ARROWS.every((k, i) => inputBuffer[inputBuffer.length - KONAMI_ARROWS.length + i] === k);

    const isFullMatch =
      inputBuffer.length >= FULL_KONAMI.length &&
      FULL_KONAMI.every((k, i) => inputBuffer[inputBuffer.length - FULL_KONAMI.length + i] === k);

    if (isArrowMatch || isFullMatch) {
      inputBuffer = [];
      toggleRetroMode();
    }
  });
}
