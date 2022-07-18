import React from 'react';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@ui/Theme';

import { ReactRelayContainer } from '../relay/ReactRelayContainer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ReactRelayContainer Component={Component} props={pageProps} />
    </ThemeProvider>
  );
}
