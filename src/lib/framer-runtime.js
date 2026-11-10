/**
 * Minimal stand-in for the Framer runtime imports that marketplace components
 * use (`addPropertyControls`, `ControlType`, `RenderTarget`,
 * `useIsStaticRenderer`). The components themselves are vendored verbatim from
 * framerusercontent.com; only the editor-only hooks are no-ops here.
 */
export const ControlType = new Proxy(
  {},
  {
    get: () => 'ControlType',
  },
);

export const addPropertyControls = () => {};

export const RenderTarget = {
  current: () => 'site',
  canvas: 'canvas',
  thumbnail: 'thumbnail',
  export: 'export',
};

export const useIsStaticRenderer = () => false;
