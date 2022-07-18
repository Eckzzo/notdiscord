import { styled } from '@stitches';

const Message = styled('span', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '$1',
  color: '$warning',
  fontSize: '$1',
  lineHeight: '$2',
  variants: {
    variant: {
      text: {
        color: '$lowContrast',
      },
      violet: {
        color: '$violetText',
      },
      error: {
        color: '$red',
      },
      success: {
        color: '$green',
      },
      warning: {
        color: '$yellow',
      },
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

export { Message };
