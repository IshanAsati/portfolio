import FloatingPillNavigation from '../vendor/FloatingPillNavigation.js';

/**
 * Thin host for the exact Framer "Floating Pill Navigation" module. The module
 * fills its parent, so the caller provides the positioning wrapper.
 */
export default function PillNav(props) {
  return <FloatingPillNavigation {...props} />;
}
