export const DECODE_FONTS = [
  "'Redaction 100', serif",
  "'Faustina', serif",
  "'Montserrat', sans-serif",
  "'Redaction 35', serif",
];

export const END_FONT = "'Redaction 35', serif";

// Uniform-width cipher glyphs to eliminate width jitter
const CIPHER_GLYPHS = '0123456789ABCDEFHKLNPRSTXYZ?#*+';

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
 * Uses fixed-width character slots and zero-layout cursor to eliminate all layout jitter.
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

  // Pre-measure each character's exact rendered width in Redaction 35.
  // Lock this width on each slot so font swaps and cipher flips NEVER jitter or shift neighbors.
  const measuredWidths = charElements.map((c) => {
    const rect = c.getBoundingClientRect();
    return rect.width;
  });

  for (let i = 0; i < charElements.length; i++) {
    const w = measuredWidths[i];
    if (w > 0) {
      charElements[i].style.width = `${w.toFixed(2)}px`;
      charElements[i].style.display = 'inline-block';
      charElements[i].style.textAlign = 'center';
    }
  }

  // Zero-width typewriter cursor: renders cleanly beside characters without pushing layout
  const cursor = document.createElement('span');
  cursor.className = 'decode-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = '|';
  cursor.style.display = 'inline-block';
  cursor.style.width = '0';
  cursor.style.overflow = 'visible';
  cursor.style.marginLeft = '1px';
  cursor.style.color = 'var(--primary, #cf5a3c)';
  cursor.style.setProperty('font-family', END_FONT, 'important');
  cursor.style.lineHeight = '1';
  cursor.style.verticalAlign = 'baseline';
  cursor.style.pointerEvents = 'none';
  cursor.style.userSelect = 'none';
  cursor.style.animation = 'decode-blink 0.7s ease infinite';

  const total = charElements.length;
  // Dynamic typing speed: snappy for long lines, calm for short
  const stepMs = Math.max(22, Math.min(38, Math.round(920 / Math.max(1, total))));
  const FLIPS_PER_CHAR = 3;
  const FLIP_INTERVAL = 22; // ms between font flips
  const AURA_AHEAD = 1; // Subtle 1-character preview aura to keep screen calm

  let head = 0;

  if (charElements[0]?.parentNode) {
    charElements[0].parentNode.insertBefore(cursor, charElements[0]);
  }

  const startAnimation = () => {
    const timer = setInterval(() => {
      if (head >= total) {
        clearInterval(timer);
        // Ensure all characters are locked to final font and content
        charElements.forEach((c) => {
          c.style.opacity = '1';
          c.textContent = c.dataset.char;
          c.style.setProperty('font-family', END_FONT, 'important');
          c.classList.add('is-locked');
        });

        // Let cursor blink at the end before smoothly fading away
        setTimeout(() => {
          cursor.style.transition = 'opacity 0.24s ease';
          cursor.style.opacity = '0';
          setTimeout(() => {
            cursor.remove();
            // Reset fixed widths back to natural flow once fully decoded
            charElements.forEach((c) => {
              c.style.width = '';
              c.style.textAlign = '';
            });
            element.dataset.headingStatus = 'done';
            if (options.onComplete) options.onComplete();
          }, 260);
        }, 240);
        return;
      }

      const currentEl = charElements[head];
      const targetChar = currentEl.dataset.char;

      // Advance zero-width cursor
      if (currentEl.parentNode) {
        currentEl.parentNode.insertBefore(cursor, currentEl.nextSibling);
      }

      // Shimmer 1-char aura ahead of cursor
      for (let offset = 1; offset <= AURA_AHEAD; offset++) {
        const auraEl = charElements[head + offset];
        if (auraEl && !auraEl.classList.contains('is-locked')) {
          const auraChar = auraEl.dataset.char;
          if (auraChar && auraChar.trim()) {
            auraEl.style.opacity = '0.28';
            auraEl.style.setProperty('font-family', getRandomFont(), 'important');
            auraEl.textContent = getRandomCipher();
          }
        }
      }

      head++;

      // Active character decoding
      currentEl.style.opacity = '1';

      if (!targetChar || !targetChar.trim()) {
        // Space / whitespace: snap immediately
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
          }, 90);
        } else {
          // Rapid font & cipher flip within fixed-width slot
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
