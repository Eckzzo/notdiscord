import { styled } from '@stitches';

const Link = styled('a', {
  color: '$violetText',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export { Link };
