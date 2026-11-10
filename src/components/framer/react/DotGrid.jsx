import DotGridBackground from '../vendor/DotGridBackground.js';

/**
 * Thin host for the exact Framer "Dot Grid BG" module. The module renders a
 * bare canvas, so this positions it to fill its parent without changing the
 * component's own behaviour or props.
 */
export default function DotGrid(props) {
  const { className = '', style, ...rest } = props;

  return (
    <div
      className={className}
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
