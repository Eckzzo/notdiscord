import { keyframes, css } from '@stitches';

const popIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.75)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const popOut = keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.75)' },
});

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const moveIn = {
  top: keyframes({
    '0%': { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' },
    '100%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
  }),
  right: keyframes({
    '0%': { opacity: 0, transform: 'translate3d(-40%, -50%, 0)' },
    '100%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
  }),
  bottom: keyframes({
    '0%': { opacity: 0, transform: 'translate3d(-50%, -40%, 0)' },
    '100%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
  }),
  left: keyframes({
    '0%': { opacity: 0, transform: 'translate3d(-60%, -50%, 0)' },
    '100%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
  }),
};

const moveOut = {
  top: keyframes({
    '0': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
    '100%': { opacity: 0, transform: 'translate3d(-50%, -60%, 0)' },
  }),
  right: keyframes({
    '0%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
    '100%': { opacity: 0, transform: 'translate3d(-40%, -50%, 0)' },
  }),
  bottom: keyframes({
    '0%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
    '100%': { opacity: 0, transform: 'translate3d(-50%, -40%, 0)' },
  }),
  left: keyframes({
    '0%': { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
    '100%': { opacity: 0, transform: 'translate3d(-60%, -50%, 0)' },
  }),
};

const popStyles = css({
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationFillMode: 'forwards',
  willChange: 'transform, opacity',
});

const fadeStyles = css({
  animationDuration: '200ms',
  animationTimingFunction: 'ease',
  animationFillMode: 'forwards',
  willChange: 'opacity',
});

const moveStyles = css({
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationFillMode: 'forwards',
  willChange: 'transform, opacity',
});

export {
  popIn,
  popOut,
  fadeIn,
  fadeOut,
  moveIn,
  moveOut,
  popStyles,
  fadeStyles,
  moveStyles,
};
