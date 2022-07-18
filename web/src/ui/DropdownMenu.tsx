import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { Arrow } from './Arrow';
import { styled } from '@stitches';
import { itemStyles } from './Menu';
import { panelStyles } from './Panel';
import { popStyles, popIn, popOut } from './Animation';

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const Item = styled(DropdownMenuPrimitive.Item, itemStyles);

const RadioItem = styled(DropdownMenuPrimitive.RadioItem, itemStyles, {
  pl: '$6',
});

const RightSlot = styled('div', {
  pl: '$2',
  ml: 'auto',
});

const ItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Separator = styled(DropdownMenuPrimitive.Separator, {
  height: '1px',
  backgroundColor: '$grayA300',
  margin: '$1',
});

const TriggerItem = styled(DropdownMenuPrimitive.TriggerItem, itemStyles, {
  '&[data-state="open"]': {
    backgroundColor: '$violet500',
    color: 'white',
  },
});

const Content = styled(DropdownMenuPrimitive.Content, panelStyles, popStyles, {
  p: '$1',
  minWidth: '260px',
  '&[data-state="open"]': {
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

/* -------------------------------------------------------------------------------------------------
 * Arrow
 * ----------------------------------------------------------------------------------------------- */

const DropdownMenuArrow = () => {
  return (
    <DropdownMenuPrimitive.Arrow asChild>
      <Arrow />
    </DropdownMenuPrimitive.Arrow>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu
 * ----------------------------------------------------------------------------------------------- */

interface DropdownMenuComposition {
  Item: typeof Item;
  Content: typeof Content;
  RadioItem: typeof RadioItem;
  RightSlot: typeof RightSlot;
  Separator: typeof Separator;
  Arrow: typeof DropdownMenuArrow;
  TriggerItem: typeof TriggerItem;
  ItemIndicator: typeof ItemIndicator;
  Trigger: typeof DropdownMenuPrimitive.Trigger;
  RadioGroup: typeof DropdownMenuPrimitive.RadioGroup;
}

const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps> &
  DropdownMenuComposition = ({ children }) => {
  return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>;
};

DropdownMenu.Item = Item;
DropdownMenu.Content = Content;
DropdownMenu.RadioItem = RadioItem;
DropdownMenu.RightSlot = RightSlot;
DropdownMenu.Separator = Separator;
DropdownMenu.Arrow = DropdownMenuArrow;
DropdownMenu.TriggerItem = TriggerItem;
DropdownMenu.ItemIndicator = ItemIndicator;
DropdownMenu.Trigger = DropdownMenuPrimitive.Trigger;
DropdownMenu.RadioGroup = DropdownMenuPrimitive.RadioGroup;

export { DropdownMenu };
