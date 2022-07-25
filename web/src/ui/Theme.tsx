import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { theme, darkTheme } from '@stitches';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      value={{ light: theme.className, dark: darkTheme.className }}
    >
      {children}
    </NextThemeProvider>
  );
}

export { ThemeProvider };
