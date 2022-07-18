import { styled } from '@stitches';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

const Separator = styled(SeparatorPrimitive.Root, {
  flexShrink: 0,
  margin: 0,
  border: 'none',
  backgroundColor: '$gray300',
  '&[data-orientation="horizontal"]': {
    width: '100%',
    height: '1px',
  },
  '&[data-orientation="vertical"]': {
    size: '$1',
    borderRadius: '100%',
  },
});

export { Separator };
