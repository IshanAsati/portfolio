import InkBleedText from '../vendor/InkBleedText.js';

/** Thin host for the exact Framer "Ink Bleed" module. */
export default function InkBleed(props) {
  return <InkBleedText {...props} />;
}
