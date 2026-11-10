/**
 * Re-export framer-motion with motion always on. The site owner explicitly
 * wants the animations regardless of the OS reduce-motion preference.
 */
export * from 'framer-motion';
export const useReducedMotion = () => false;
