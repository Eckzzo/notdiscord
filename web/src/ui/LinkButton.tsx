import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { styled } from '@stitches';

const StyledLinkButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '$2',
  borderRadius: '$2',
  fontWeight: '$medium',
  backgroundColor: 'transparent',
  border: 'none',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    cursor: 'pointer',
  },
  variants: {
    variant: {
      primary: {
        color: '$violetText',
        '&:hover': {
          backgroundColor: '$violetA200',
        },
      },
      secondary: {
        color: '$hiContrast',
        '&:hover': {
          backgroundColor: '$grayA200',
        },
      },
    },
    size: {
      sm: {
        height: '$7',
        px: '$2',
        fontSize: '$1',
        lineHeight: '$2',
      },
      md: {
        height: '$9',
        px: '$3',
        fontSize: '$2',
        lineHeight: '$3',
      },
    },
    active: {
      true: {
        backgroundColor: '$violetA200',
        '&:hover': {
          cursor: 'default',
          backgroundColor: '$violetA200',
        },
      },
    },
    isFullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'secondary',
      active: true,
      css: {
        backgroundColor: '$grayA200',
        '&:hover': {
          backgroundColor: '$grayA200',
        },
      },
    },
  ],
  defaultVariants: {
    size: 'sm',
    variant: 'primary',
  },
});

interface LinkButtonProps extends React.ComponentPropsWithRef<typeof StyledLinkButton> {
  href: string;
}

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(({ href, children, ...props }, ref) => {
  const router = useRouter();

  return (
    <NextLink href={href} passHref>
      <StyledLinkButton ref={ref} role='link' active={router.asPath === href} {...props}>
        {children}
      </StyledLinkButton>
    </NextLink>
  );
});

LinkButton.displayName = 'LinkButton';

export { LinkButton };
