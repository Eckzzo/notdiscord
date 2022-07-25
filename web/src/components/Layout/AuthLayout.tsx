import React from 'react';

import { styled } from '@stitches';
import { ThemeFAB } from './ThemeFAB';

const StyledAuthLayout = styled('main', {
  display: 'flex',
  height: '100vh',
  backgroundColor: '$violetA100',
});

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <StyledAuthLayout>
      <ThemeFAB />
      {children}
    </StyledAuthLayout>
  );
};

export { AuthLayout };
