import { styled } from '@stitches';

const SubNav = styled('nav', {
  width: '280px',
  height: '100%',
  borderRight: '1px solid $gray300',
});

const SubNavButton = styled('button', {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '$2',
  p: '$3',
  color: '$hiContrast',
  backgroundColor: 'transparent',
  fontSize: '$2',
  fontWeight: '$medium',
  border: 'none',
  borderRadius: '$1',
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$grayA200',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$grayA100',
        '&:hover': {
          backgroundColor: '$grayA100',
          cursor: 'default',
        },
      },
    },
  },
});

export { SubNav, SubNavButton };
