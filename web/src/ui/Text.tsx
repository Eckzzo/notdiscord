import { styled } from '@stitches';

const Text = styled('span', {
  variants: {
    weight: {
      normal: {
        fontWeight: '$normal',
      },
      medium: {
        fontWeight: '$medium',
      },
      semibold: {
        fontWeight: '$semibold',
      },
    },
    color: {
      violet: {
        color: '$violetText',
      },
      lowContrast: {
        color: '$lowContrast',
      },
      hiContrast: {
        color: '$hiContrast',
      },
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
    uppercase: {
      true: {
        textTransform: 'uppercase',
      },
    },
    spaced: {
      true: {
        letterSpacing: '0.08em',
      },
    },
    variant: {
      p1: {
        fontSize: '$2',
        lineHeight: '$2',
      },
      p2: {
        fontSize: '$3',
        lineHeight: '$3',
      },
      p3: {
        fontSize: '$4',
        lineHeight: '$4',
      },
      cap: {
        fontSize: '$1',
        lineHeight: '$1',
      },
    },
  },
  defaultVariants: {
    variant: 'p1',
    color: 'hiContrast',
    weight: 'normal',
    underline: false,
    uppercase: false,
  },
});

export { Text };
