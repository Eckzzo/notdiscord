import { css } from '@stitches';

const itemStyles = css({
  position: 'relative',
  fontSize: '$1',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$1',
  padding: '$2',
  gap: '$2',
  cursor: 'default',
  variants: {
    variant: {
      primary: {
        color: '$hiContrast',
        '&:focus': {
          backgroundColor: '$violet500',
          color: 'white',
          outline: 'none',
        },
      },
      secondary: {
        color: '$hiContrast',
        '&:focus': {
          backgroundColor: '$grayA200',
          outline: 'none',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export { itemStyles };
