import { useEffect, useRef } from 'react';
import { decodeSentence, END_FONT } from '../../../scripts/headingDecode.js';

/**
 * SiteInk renders prominent fluid titles with the left-to-right typewriter
 * font-decoding animation.
 */
export default function SiteInk(props) {
  const {
    text,
    tag = 'h1',
    align = 'left',
    min = 36,
    max = 110,
    scale = 9,
    color = '#f4efe6',
    className = '',
    id,
    style,
    trigger = 'inView',
    delay = 0,
  } = props;

  const ref = useRef(null);
  const Tag = tag || 'h1';
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasTriggeredRef.current) return;

    const start = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      decodeSentence(el, { delay });
    };

    if (trigger === 'load') {
      start();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      start();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            start();
          }
        });
      },
      { rootMargin: '180px 0px 40px 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, trigger]);

  return (
    <div className={className} id={id} style={style}>
      <Tag
        ref={ref}
        data-heading-skip="true"
        data-heading-decode="true"
        style={{
          margin: 0,
          width: '100%',
          display: 'block',
          color,
          textAlign: align,
          fontFamily: END_FONT,
          fontSize: `clamp(${min}px, ${scale}vw, ${max}px)`,
          fontWeight: 400,
          lineHeight: '1.02em',
          letterSpacing: '-0.025em',
          wordBreak: 'break-word',
        }}
      >
        {text}
      </Tag>
    </div>
  );
}
