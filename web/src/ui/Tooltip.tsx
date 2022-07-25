import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { Text } from './Text';
import { Arrow } from './Arrow';
import { styled } from '@stitches';
import { popStyles, popIn, popOut } from './Animation';

const Content = styled(TooltipPrimitive.Content, popStyles, {
  p: '$2',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid $grayA300',
  borderRadius: '$2',
  backgroundColor: '$panel',
  boxShadow: '$md',
  '&[data-state="delayed-open"]': {
    animationName: `${popIn}`,
    '&[data-side="top"]': { tranformOrigin: 'bottom' },
    '&[data-side="right"]': { transformOrigin: 'left' },
    '&[data-side="bottom"]': { transformOrigin: 'top' },
    '&[data-side="left"]': { transformOrigin: 'right' },
  },
  '&[data-state="closed"]': {
    animationName: `${popOut}`,
    '&[data-side="top"]': { tranformOrigin: 'bottom' },
    '&[data-side="right"]': { transformOrigin: 'left' },
    '&[data-side="bottom"]': { transformOrigin: 'top' },
    '&[data-side="left"]': { transformOrigin: 'right' },
  },
});

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement;
    content: React.ReactNode;
  };

function Tooltip({ children, content, open, defaultOpen, delayDuration, onOpenChange, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      delayDuration={delayDuration}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <Content {...props}>
        <Text variant='cap'>{content}</Text>
        <TooltipPrimitive.Arrow asChild>
          <Arrow />
        </TooltipPrimitive.Arrow>
      </Content>
    </TooltipPrimitive.Root>
  );
}

export { Tooltip };
