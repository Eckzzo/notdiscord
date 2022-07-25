import React from 'react';
import { useTheme } from 'next-themes';
import { GearIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { styled } from '@stitches';
import { IconButton } from '@ui/IconButton';
import { useIsMounted } from 'hooks/useIsMounted';

const StyledThemeFAB = styled(IconButton, {
  position: 'absolute',
  right: 0,
  top: 0,
  m: '$4',
});

const ThemeFAB: React.FC = () => {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <StyledThemeFAB variant='secondary' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'system' && <GearIcon />}
      {theme === 'dark' && <MoonIcon />}
      {theme === 'light' && <SunIcon />}
    </StyledThemeFAB>
  );
};

export { ThemeFAB };
