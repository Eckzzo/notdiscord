import { styled } from '@stitches';

const Heading = styled('h1', {
  m: 0,
  variants: {
    weight: {
      semibold: {
        fontWeight: '$semibold',
      },
      bold: {
        fontWeight: '$bold',
      },
      extrabold: {
        fontWeight: '$extrabold',
      },
    },
    color: {
      default: {
        color: '$hiContrast',
      },
      violet: {
        color: '$violetText',
      },
    },
    variant: {
      h1: {
        fontSize: '$9',
        lineHeight: '$8',
        '@md': {
          fontSize: '$10',
          lineHeight: '$9',
        },
      },
      h2: {
        fontSize: '$8',
        lineHeight: '$7',
        '@md': {
          fontSize: '$9',
          lineHeight: '$8',
        },
      },
      h3: {
        fontSize: '28px',
        lineHeight: '$6',
        '@md': {
          fontSize: '$8',
          lineHeight: '$7',
        },
      },
      h4: {
        fontSize: '$6',
        lineHeight: '$5',
        '@md': {
          fontSize: '28px',
          lineHeight: '$6',
        },
      },
      h5: {
        fontSize: '$5',
        lineHeight: '$4',
        '@md': {
          fontSize: '$6',
          lineHeight: '$5',
        },
      },
      h6: {
        fontSize: '$3',
        lineHeight: '$3',
        '@md': {
          fontSize: '$5',
          lineHeight: '$4',
        },
      },
    },
  },
  defaultVariants: {
    weight: 'semibold',
    color: 'default',
    variant: 'h3',
  },
});

export { Heading };
