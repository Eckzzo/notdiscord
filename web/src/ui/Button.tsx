import { styled, css } from '@stitches';

const buttonStyles = css({
  variants: {
    variant: {
      primary: {
        border: 'none',
        color: 'white',
        backgroundColor: '$violet500',
        boxShadow: '$violet-sm',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: '$violet600',
        },
      },
      secondary: {
        border: '1px solid $gray200',
        backgroundColor: '$panel',
        boxShadow: '$md',
        color: '$hiContrast',
        transition: 'border-color 0.2s ease, color 0.2s ease',
        '&:hover': {
          borderColor: '$gray400',
        },
      },
      tertiary: {
        border: '1px solid transparent',
        color: '$violetText',
        backgroundColor: '$violetA200',
        transition: 'border 0.2s ease',
        '&:hover': {
          border: '1px solid $violetText',
        },
      },
      ghost: {
        color: '$violetText',
        backgroundColor: 'transparent',
        border: 'none',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: '$violetA200',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const Button = styled('button', buttonStyles, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontWeight: '$medium',
  gap: '$2',
  cursor: 'pointer',
  variants: {
    size: {
      sm: {
        height: '$7',
        px: '$2',
        borderRadius: '$2',
        fontSize: '$1',
        lineHeight: '$2',
      },
      md: {
        height: '$9',
        px: '$3',
        borderRadius: '$3',
        fontSize: '$2',
        lineHeight: '$3',
      },
    },
    isFullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isFullWidth: false,
  },
});

export { Button, buttonStyles };
