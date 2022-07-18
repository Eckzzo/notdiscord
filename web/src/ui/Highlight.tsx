import { styled } from '@stitches';

const Highlight = styled('span', {
  variants: {
    color: {
      hiContrast: {
        color: '$hiContrast',
      },
      lowContrast: {
        color: '$lowContrast',
      },
      violet: {
        color: '$violetText',
      },
    },
  },
  defaultVariants: {
    color: 'hiContrast',
  },
});

export { Highlight };
