import { styled } from '@stitches';

const Container = styled('div', {
  boxSizing: 'border-box',
  flexShrink: 0,
  ml: 'auto',
  mr: 'auto',
  variants: {
    size: {
      '1': {
        maxWidth: '430px',
      },
      '2': {
        maxWidth: '715px',
      },
      '3': {
        maxWidth: '1145px',
      },
      '4': {
        maxWidth: 'none',
      },
    },
  },
  defaultVariants: {
    size: '4',
  },
});

export { Container };
