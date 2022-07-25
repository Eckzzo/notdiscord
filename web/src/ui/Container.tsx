import { styled } from '@stitches';

const Container = styled('div', {
  boxSizing: 'border-box',
  flexShrink: 0,
  m: 'auto',
  variants: {
    size: {
      '1': {
        minWidth: '430px',
        maxWidth: '430px',
      },
      '2': {
        minWidth: '715px',
        maxWidth: '715px',
      },
      '3': {
        minWidth: '1145px',
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
