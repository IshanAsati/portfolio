export const DECODE_FONTS = [
  "'Redaction 100', serif",
  "'Faustina', serif",
  "'Montserrat', sans-serif",
  "'Redaction 35', serif",
];

export const END_FONT = "'Redaction 35', serif";

const CIPHER_GLYPHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#%&*?@+-/§~=<>[]';

const processedElements = new WeakSet();

export function getRandomFont() {
  return DECODE_FONTS[Math.floor(Math.random() * DECODE_FONTS.length)];
}

function getRandomCipher() {
  return CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
}

/**
 * Decodes a sentence from left to right typewriter style while rapidly switching fonts
 * and scrambling cipher glyphs ahead of the typewriter cursor.
 *
 * @param {HTMLElement} element - The heading element to animate.
 * @param {Object} [options]
 * @param {number} [options.delay=0] - Initial delay in seconds.
 * @param {Function} [options.onComplete] - Callback when animation finishes.
 */
export function decodeSentence(element, options = {}) {
  if (!element) return;
  if (element.dataset.headingDecoded === 'true' || processedElements.has(element)) {
    return;
  }

  element.dataset.headingDecoded = 'true';
  element.dataset.headingStatus = 'active';
  processedElements.add(element);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const originalText = element.textContent || '';
  if (!originalText.trim()) {
    element.dataset.headingStatus = 'done';
    return;
  }

  // Preserve accessible label for screen readers
  if (!element.getAttribute('aria-label')) {
    element.setAttribute('aria-label', originalText.trim());
  }

  const charElements = [];

  function wrapText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text) return;

      const fragment = document.createDocumentFragment();
      const segments = text.split(/(\s+)/);

      for (const segment of segments) {
        if (!segment) continue;

        if (/^\s+$/.test(segment)) {
          const spaceSpan = document.createElement('span');
          spaceSpan.className = 'decode-space';
          spaceSpan.textContent = segment;
          fragment.appendChild(spaceSpan);
        } else {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'decode-word';

          for (let i = 0; i < segment.length; i++) {
            const char = segment[i];
            const charSpan = document.createElement('span');
            charSpan.className = 'decode-char';
            charSpan.dataset.char = char;
            charSpan.textContent = char;

            if (prefersReduced) {
              charSpan.style.opacity = '1';
              charSpan.style.setProperty('font-family', END_FONT, 'important');
              charSpan.classList.add('is-locked');
            } else {
              charSpan.style.opacity = '0';
              charSpan.style.setProperty('font-family', END_FONT, 'important');
              charSpan.style.willChange = 'opacity, font-family, color';
            }

            wordSpan.appendChild(charSpan);
            charElements.push(charSpan);
          }
          fragment.appendChild(wordSpan);
        }
      }

      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (['SCRIPT', 'STYLE', 'SVG', 'NOSCRIPT'].includes(node.tagName)) return;
      if (node.classList.contains('decode-char') || node.classList.contains('decode-cursor')) return;

      const children = Array.from(node.childNodes);
      for (const child of children) {
        wrapText(child);
      }
    }
  }

  wrapText(element);

  if (prefersReduced || !charElements.length) {
    charElements.forEach((c) => {
      c.style.opacity = '1';
      c.style.setProperty('font-family', END_FONT, 'important');
      c.classList.add('is-locked');
    });
    element.dataset.headingStatus = 'done';
    if (options.onComplete) options.onComplete();
    return;
  }

  // Typewriter cursor
  const cursor = document.createElement('span');
  cursor.className = 'decode-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = '|';
  cursor.style.display = 'inline-block';
  cursor.style.marginLeft = '1px';
  cursor.style.color = 'var(--primary, #cf5a3c)';
  cursor.style.setProperty('font-family', END_FONT, 'important');
  cursor.style.lineHeight = '1';
  cursor.style.verticalAlign = 'baseline';
  cursor.style.animation = 'decode-blink 0.7s ease infinite';

  const total = charElements.length;
  // Dynamic typing speed scaled to sentence length: snappy for long lines, deliberate for short
  const stepMs = Math.max(18, Math.min(34, Math.round(850 / Math.max(1, total))));
  const FLIPS_PER_CHAR = 4;
  const FLIP_INTERVAL = 18; // ms between fast font & cipher flips
  const AURA_AHEAD = 3; // Characters ahead shimmering with scramble glyphs

  let head = 0;

  if (charElements[0]?.parentNode) {
    charElements[0].parentNode.insertBefore(cursor, charElements[0]);
  }

  const startAnimation = () => {
    const timer = setInterval(() => {
      if (head >= total) {
        clearInterval(timer);
        // Ensure all characters are locked to final font
        charElements.forEach((c) => {
          c.style.opacity = '1';
          c.textContent = c.dataset.char;
          c.style.setProperty('font-family', END_FONT, 'important');
          c.classList.add('is-locked');
        });

        // Let cursor blink at the end before smoothly fading away
        setTimeout(() => {
          cursor.style.transition = 'opacity 0.28s ease';
          cursor.style.opacity = '0';
          setTimeout(() => {
            cursor.remove();
            element.dataset.headingStatus = 'done';
            if (options.onComplete) options.onComplete();
          }, 300);
        }, 280);
        return;
      }

      const currentEl = charElements[head];
      const targetChar = currentEl.dataset.char;

      // Advance typewriter cursor
      if (currentEl.parentNode) {
        currentEl.parentNode.insertBefore(cursor, currentEl.nextSibling);
      }

      // Shimmer aura ahead of cursor
      for (let offset = 1; offset <= AURA_AHEAD; offset++) {
        const auraEl = charElements[head + offset];
        if (auraEl && !auraEl.classList.contains('is-locked')) {
          const auraChar = auraEl.dataset.char;
          if (auraChar && auraChar.trim()) {
            auraEl.style.opacity = '0.35';
            auraEl.style.setProperty('font-family', getRandomFont(), 'important');
            auraEl.textContent = getRandomCipher();
          }
        }
      }

      head++;

      // Active character decoding
      currentEl.style.opacity = '1';

      if (!targetChar || !targetChar.trim()) {
        // Whitespace or empty character: snap immediately
        currentEl.style.setProperty('font-family', END_FONT, 'important');
        currentEl.textContent = targetChar;
        currentEl.classList.add('is-locked');
        return;
      }

      let flip = 0;
      const flipTimer = setInterval(() => {
        flip++;
        if (flip >= FLIPS_PER_CHAR) {
          clearInterval(flipTimer);
          // Snap lock into final font and character
          currentEl.textContent = targetChar;
          currentEl.style.setProperty('font-family', END_FONT, 'important');
          currentEl.classList.add('is-locked');
          currentEl.classList.add('is-locking');
          setTimeout(() => {
            currentEl.classList.remove('is-locking');
          }, 110);
        } else {
          // Rapid font & cipher flip
          currentEl.style.setProperty('font-family', getRandomFont(), 'important');
          currentEl.textContent = getRandomCipher();
        }
      }, FLIP_INTERVAL);
    }, stepMs);
  };

  if (options.delay && options.delay > 0) {
    setTimeout(startAnimation, options.delay * 1000);
  } else {
    startAnimation();
  }
}

/**
 * Initializes typewriter decode on all headings across the page.
 * Idempotent: headings will never be observed or decoded twice.
 */
export function initHeadingDecode() {
  if (typeof window === 'undefined') return;

  const selector =
    'h1:not(.sr-only), h2:not(.sr-only), h3:not(.sr-only), [data-heading-decode]';

  const allFound = Array.from(document.querySelectorAll(selector));

  const eligible = allFound.filter((el) => {
    if (
      el.dataset.headingSkip === 'true' ||
      el.dataset.headingDecoded === 'true' ||
      el.dataset.headingObserved === 'true' ||
      el.closest('.sr-only') ||
      processedElements.has(el)
    ) {
      return false;
    }
    return true;
  });

  // Mark all eligible as observed right away
  eligible.forEach((el) => {
    el.dataset.headingObserved = 'true';
  });

  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = entry.target;
                observer.unobserve(target);
                decodeSentence(target);
              }
            });
          },
          { rootMargin: '180px 0px 40px 0px', threshold: 0.05 }
        )
      : null;

  eligible.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewport) {
      // Decode immediately on page load for above-the-fold headings
      decodeSentence(el);
    } else if (observer) {
      observer.observe(el);
    } else {
      decodeSentence(el);
    }
  });
}
