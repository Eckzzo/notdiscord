import React from 'react';
import { styled } from '@stitches';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

/* -------------------------------------------------------------------------------------------------
 * Viewport
 * ----------------------------------------------------------------------------------------------- */

const Viewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  borderRadius: 'inherit',
});

Viewport.displayName = 'ScrollAreaViewport';

/* -------------------------------------------------------------------------------------------------
 * Scrollbar
 * ----------------------------------------------------------------------------------------------- */

const Scrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: '2px',
  background: 'rgba(128, 128, 128, 0.2)',
  opacity: 1,
  transition: 'background 150ms ease',

  '&:hover': {
    background: 'rgba(128, 128, 128, 0.4)',
  },

  "&[data-orientation='vertical']": {
    width: '10px',
  },

  "&[data-orientation='horizontal']": {
    height: '10px',
    flexDirection: 'column',
  },
});

Scrollbar.displayName = 'Scrollbar';

/* -------------------------------------------------------------------------------------------------
 * ScrollThumb
 * ----------------------------------------------------------------------------------------------- */

const ScrollThumb = styled(ScrollAreaPrimitive.Thumb, {
  position: 'relative',
  flex: 1,
  background: '$grayA600',
  borderRadius: '$2',

  '&::before': {
    content: '',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minHeight: '44px',
    minWidth: '44px',
  },
});

ScrollThumb.displayName = 'ScrollThumb';

/* -------------------------------------------------------------------------------------------------
 * Corner
 * ----------------------------------------------------------------------------------------------- */

const Corner = styled(ScrollAreaPrimitive.Corner, {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

Corner.displayName = 'ScrollAreaCorner';

/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * ----------------------------------------------------------------------------------------------- */

interface ScrollAreaProps {
  children?: React.ReactNode;
  type?: 'auto' | 'hover' | 'scroll' | 'always';
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(({ children, ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.Root ref={ref} {...props}>
      <Viewport>{children}</Viewport>
      <Scrollbar orientation='vertical'>
        <ScrollThumb />
      </Scrollbar>
      <Corner />
    </ScrollAreaPrimitive.Root>
  );
});

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
