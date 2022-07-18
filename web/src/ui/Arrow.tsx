import React from 'react';

import { styled } from '@stitches';

const Stroke = styled('path', {
  fill: '$grayA400',
});

const Pointer = styled('path', {
  fill: '$panel',
});

const StyledArrow = styled('svg', {
  display: 'block',
});

const Arrow = React.forwardRef<SVGSVGElement, {}>((_, ref) => {
  return (
    <StyledArrow
      width="20"
      height="5"
      viewBox="0 0 20 5"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <Stroke d="M5 0H15L10 5L5 0Z" />
      <Pointer d="M6 0H14L10 4L6 0Z" />
    </StyledArrow>
  );
});

Arrow.displayName = 'Arrow';

export { Arrow };
