import { useEffect, useRef, useState } from 'react';
import DotGridBackground from '../vendor/DotGridBackground.js';

const MOBILE_QUERY = '(max-width: 768px), (hover: none) and (pointer: coarse)';

/**
 * Thin host for the exact Framer "Dot Grid BG" module. The module renders a
 * bare canvas, so this positions it to fill its parent without changing the
 * component's own behaviour or props.
 *
 * The module only listens for pointer events on its own canvas, and this host
 * keeps that canvas out of hit testing (`pointer-events: none`) so it can sit
 * underneath page content. To keep the field cursor-reactive anyway, window
 * pointer movement is replayed onto the canvas as synthetic mouse events.
 *
 * For mobile devices (touch screens and small viewports), the canvas and RAF
 * loop are omitted entirely to preserve battery, performance, and screen clarity.
 */
export default function DotGrid(props) {
  const { className = '', style, ...rest } = props;
  const hostRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();

    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = hostRef.current?.querySelector('canvas');
    if (!canvas) return;

    let inside = false;

    const send = (type, x, y) => {
      canvas.dispatchEvent(
        new MouseEvent(type, {
          bubbles: false,
          cancelable: false,
          clientX: x,
          clientY: y,
          view: window,
        })
      );
    };

    const track = (event) => {
      const rect = canvas.getBoundingClientRect();
      const over =
        rect.width > 0 &&
        rect.height > 0 &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (over && !inside) {
        inside = true;
        send('mouseenter', event.clientX, event.clientY);
      } else if (!over && inside) {
        inside = false;
        send('mouseleave', event.clientX, event.clientY);
      }

      if (over) send('mousemove', event.clientX, event.clientY);
    };

    const release = () => {
      if (!inside) return;
      inside = false;
      send('mouseleave', -1, -1);
    };

    window.addEventListener('pointermove', track, { passive: true });
    window.addEventListener('pointerdown', track, { passive: true });
    window.addEventListener('blur', release);
    document.addEventListener('mouseleave', release);

    return () => {
      window.removeEventListener('pointermove', track);
      window.removeEventListener('pointerdown', track);
      window.removeEventListener('blur', release);
      document.removeEventListener('mouseleave', release);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={hostRef}
      className={['dot-grid', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <DotGridBackground width="100%" height="100%" {...rest} />
    </div>
  );
}
