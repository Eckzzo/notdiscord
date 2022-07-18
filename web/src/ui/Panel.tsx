import { styled, css } from '@stitches';

const panelStyles = css({
  border: '1px solid $gray200',
  borderRadius: '$2',
  backgroundColor: '$panel',
  boxShadow: '$lg',
});

const Panel = styled('div', panelStyles);

export { panelStyles, Panel };
