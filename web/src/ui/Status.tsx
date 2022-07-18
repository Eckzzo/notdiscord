import { styled } from '@stitches';

const Status = styled('div', {
  border: '1px solid white',
  borderRadius: '50%',
  flexShrink: 0,

  variants: {
    size: {
      '1': {
        size: '$2',
      },
      '2': {
        size: '$3',
      },
    },
    variant: {
      gray: {
        backgroundColor: '$gray500',
      },
      green: {
        backgroundColor: '$green',
      },
      yellow: {
        backgroundColor: '$yellow',
      },
      red: {
        backgroundColor: '$red',
      },
    },
  },
  defaultVariants: {
    size: '2',
    variant: 'gray',
  },
});

export { Status };
