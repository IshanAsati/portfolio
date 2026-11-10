import InkBleedText from '../vendor/InkBleedText.js';

const DISPLAY = {
  fontFamily: "'Fraunces', Georgia, serif",
  fontWeight: 400,
  letterSpacing: '-0.04em',
  lineHeight: '0.95em',
};

/**
 * The exact Framer "Ink Bleed" module with the site's display face and ink
 * colour applied as defaults. Every prop still passes straight through.
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
    ...rest
  } = props;

  return (
    <div className={className} id={id} style={style}>
      <InkBleedText
        text={text}
        tag={tag}
        align={align}
        color={color}
        font={DISPLAY}
        sizing={{ mode: 'fluid', min, max, scale }}
        {...rest}
      />
    </div>
  );
}
