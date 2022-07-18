import { styled } from '@stitches';
import { buttonStyles } from './Button';

const IconButton = styled('button', buttonStyles, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontWeight: '$semibold',
  cursor: 'pointer',
  variants: {
    size: {
      xs: {
        p: '$1',
        size: '$5',
        borderRadius: '$1',
        fontSize: '$1',
      },
      sm: {
        size: '$7',
        borderRadius: '$2',
        fontSize: '$3',
      },
      md: {
        size: '$9',
        borderRadius: '$3',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export { IconButton };
