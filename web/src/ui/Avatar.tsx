import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { Box } from './Box';
import { Status } from './Status';
import { styled, VariantProps, CSS } from '@stitches';

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const StyledAvatar = styled(AvatarPrimitive.Root, {
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  flexShrink: 0,
  position: 'relative',
  fontFamily: 'inherit',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  color: '$hiContrast',
  border: '1px solid $violetA400',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    boxShadow: 'inset 0px 0px 1px rgba(0, 0, 0, 0.12)',
  },

  variants: {
    size: {
      '1': {
        size: '$3',
      },
      '2': {
        size: '$4',
      },
      '3': {
        size: '$5',
      },
      '4': {
        size: '$6',
      },
      '5': {
        size: '$7',
      },
      '6': {
        size: '$9',
      },
      '9': {
        size: '60px',
        m: '$2',
      },
    },
    variant: {
      hiContrast: {
        backgroundColor: '$hiContrast',
        color: '$loContrast',
      },
      gray: {
        backgroundColor: '$gray500',
      },
      violet: {
        backgroundColor: '$violet500',
      },
    },
    shape: {
      square: {
        borderRadius: '$2',
      },
      circle: {
        borderRadius: '50%',
      },
    },
    inactive: {
      true: {
        opacity: '.3',
      },
    },
    interactive: {
      true: {
        '&:hover': {
          cursor: 'pointer',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          backgroundColor: 'rgba(0,0,0,.08)',
          opacity: '0',
          pointerEvents: 'none',
          transition: 'opacity 25ms linear',
        },
        '@hover': {
          '&:hover': {
            '&::after': {
              opacity: '1',
            },
          },
        },
        '&[data-state="open"]': {
          '&::after': {
            backgroundColor: 'rgba(0,0,0,.12)',
            opacity: '1',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: '6',
    variant: 'violet',
    shape: 'square',
  },
});

const StyledAvatarImage = styled(AvatarPrimitive.Image, {
  display: 'flex',
  objectFit: 'cover',
  boxSizing: 'border-box',
  height: '100%',
  verticalAlign: 'middle',
  width: '100%',
});

const StyledAvatarFallback = styled(AvatarPrimitive.Fallback, {
  textTransform: 'uppercase',
  color: 'white',
  fontWeight: '$medium',
  variants: {
    size: {
      '1': {
        fontSize: '$1',
        lineHeight: '$2',
      },
      '2': {
        fontSize: '$3',
      },
      '3': {
        fontSize: '$6',
      },
      '4': {
        fontSize: '$7',
      },
      '5': {
        fontSize: '$8',
      },
      '6': {
        fontSize: '$9',
      },
      '9': {
        fontSize: '$10',
      },
    },
  },
  defaultVariants: {
    size: '2',
  },
});

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * ----------------------------------------------------------------------------------------------- */

type StatusVariants = React.ComponentProps<typeof Status>;
type StatusColors = Pick<StatusVariants, 'variant'>;
type AvatarVariants = VariantProps<typeof StyledAvatar>;
type AvatarPrimitiveProps = React.ComponentProps<typeof AvatarPrimitive.Root>;

type AvatarProps = AvatarPrimitiveProps &
  AvatarVariants & {
    css?: CSS;
    alt?: string;
    src?: string;
    fallback?: React.ReactNode;
    status?: StatusColors['variant'];
  };

const Avatar = React.forwardRef<React.ElementRef<typeof StyledAvatar>, AvatarProps>(
  ({ alt, src, fallback, size, variant, shape, css, status, ...props }, forwardedRef) => {
    return (
      <Box
        css={{
          ...css,
          position: 'relative',
          height: 'fit-content',
          width: 'fit-content',
        }}
      >
        <StyledAvatar {...props} ref={forwardedRef} size={size} variant={variant} shape={shape}>
          <StyledAvatarImage alt={alt} src={src} />
          <StyledAvatarFallback size={size}>{fallback?.toString().slice(0, 2)}</StyledAvatarFallback>
        </StyledAvatar>
        {status && (
          <Box
            css={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              boxShadow: '0 0 0 3px $colors$loContrast',
              borderRadius: '$round',
              mr: '-2px',
              mb: '-2px',
            }}
          >
            <Status size={size && size > 2 ? '2' : '1'} variant={status} />
          </Box>
        )}
      </Box>
    );
  },
);

Avatar.displayName = 'Avatar';

export { Avatar };
