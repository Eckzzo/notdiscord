import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';

const { styled, css, theme, createTheme, getCssText, globalCss, keyframes, config, reset } = createStitches({
  theme: {
    colors: {
      gray50: 'rgba(250, 250, 250, 1)',
      gray100: 'rgba(245, 245, 245, 1)',
      gray200: 'rgba(229, 229, 229, 1)',
      gray300: 'rgba(212, 212, 212, 1)',
      gray400: 'rgba(163, 163, 163, 1)',
      gray500: 'rgba(115, 115, 115, 1)',
      gray600: 'rgba(52, 52, 52, 1)',
      gray700: 'rgba(40, 40, 40, 1)',
      gray800: 'rgba(26, 26, 26, 1)',
      gray900: 'rgba(23, 23, 23, 1)',
      grayA50: 'rgba(163, 163, 163, 0.05)',
      grayA100: 'rgba(163, 163, 163, 0.1)',
      grayA200: 'rgba(163, 163, 163, 0.2)',
      grayA300: 'rgba(163, 163, 163, 0.3)',
      grayA400: 'rgba(163, 163, 163, 0.4)',
      grayA500: 'rgba(163, 163, 163, 0.5)',
      grayA600: 'rgba(163, 163, 163, 0.6)',
      grayA700: 'rgba(163, 163, 163, 0.7)',
      grayA800: 'rgba(163, 163, 163, 0.8)',
      grayA900: 'rgba(163, 163, 163, 0.9)',
      violet50: 'rgba(245, 243, 255, 1)',
      violet100: 'rgba(237, 233, 254, 1)',
      violet200: 'rgba(221, 214, 254, 1)',
      violet300: 'rgba(196, 181, 253, 1)',
      violet400: 'rgba(167, 139, 250, 1)',
      violet500: 'rgba(139, 92, 246, 1)',
      violet600: 'rgba(124, 58, 237, 1)',
      violet700: 'rgba(109, 40, 217, 1)',
      violet800: 'rgba(91, 33, 182, 1)',
      violet900: 'rgba(76, 29, 149, 1)',
      violetA50: 'rgba(167, 139, 250, 0.05)',
      violetA100: 'rgba(167, 139, 250, 0.1)',
      violetA200: 'rgba(167, 139, 250, 0.2)',
      violetA300: 'rgba(167, 139, 250, 0.3)',
      violetA400: 'rgba(167, 139, 250, 0.4)',
      violetA500: 'rgba(167, 139, 250, 0.5)',
      violetA600: 'rgba(167, 139, 250, 0.6)',
      violetA700: 'rgba(167, 139, 250, 0.7)',
      violetA800: 'rgba(167, 139, 250, 0.8)',
      violetA900: 'rgba(167, 139, 250, 0.9)',
      // Semantic Colors
      hiContrast: '$gray900',
      lowContrast: '$gray500',
      violetText: '$violet600',
      canvas: 'hsl(0 0% 93%)',
      panel: 'white',
      bg: 'white',
      green: 'rgba(34, 197, 94, 1)',
      yellow: 'rgba(234, 179, 8, 1)',
      red: 'rgba(239, 68, 68, 1)',
      warning: 'rgba(239, 68, 68, 1)',
      transparentPanel: 'hsl(0 0% 0% / 97%)',
      shadowLight: 'hsl(206 22% 7% / 35%)',
      shadowDark: 'hsl(206 22% 7% / 20%)',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '32px',
      8: '48px',
      9: '64px',
      10: '80px',
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '20px',
      6: '24px',
      7: '30px',
      8: '34px',
      9: '40px',
      10: '48px',
    },
    lineHeights: {
      1: '12px',
      2: '16px',
      3: '20px',
      4: '24px',
      5: '28px',
      6: '36px',
      7: '40px',
      8: '48px',
      9: '56px',
      10: '80px',
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
    shadows: {
      sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      base: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.06)',
      'violet-sm': '0px 1px 2px $colors$violetA400',
      'violet-base': '0px 1px 3px $colors$violetA400, 0px 1px 2px $colors$violetA400',
      'violet-md': '0px 4px 6px -1px $colors$violetA400, 0px 2px 4px -1px $colors$violetA400',
      'violet-lg': '0px 10px 15px -3px $colors$violetA400, 0px 4px 6px -2px $colors$violetA400',
      'violet-xl': '0px 20px 25px -5px $colors$violetA400, 0px 10px 10px -5px $colors$violetA400',
      'violet-2xl': '0px 25px 50px -12px $colors$violetA400',
      'violet-inner': 'box-shadow: inset 0px 2px 4px $colors$violetA400',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),
  },
});

const darkTheme = createTheme('dark-theme', {
  colors: {
    gray50: 'rgba(23, 23, 23, 1)',
    gray100: 'rgba(26, 26, 26, 1)',
    gray200: 'rgba(40, 40, 40, 1)',
    gray300: 'rgba(52, 52, 52, 1)',
    gray400: 'rgba(115, 115, 115, 1)',
    gray500: 'rgba(163, 163, 163, 1)',
    gray600: 'rgba(212, 212, 212, 1)',
    gray700: 'rgba(229, 229, 229, 1)',
    gray800: 'rgba(245, 245, 245, 1)',
    gray900: 'rgba(250, 250, 250, 1)',
    hiContrast: '$gray900',
    lowContrast: '$gray500',
    violetText: '$violet400',
    canvas: 'hsl(0 0% 15%)',
    panel: '$gray300',
    bg: '$gray100',
    green: 'rgba(74, 222, 128, 1)',
    red: 'rgba(239, 68, 68, 1)',
    yellow: 'rgba(253, 224, 71, 1)',
    warning: 'rgba(248, 113, 113, 1)',
    transparentPanel: 'hsl(0 100% 100% / 97%)',
    shadowLight: 'hsl(206 22% 7% / 35%)',
    shadowDark: 'hsl(206 22% 7% / 20%)',
  },
});

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    fontFamily: 'Inter',
  },
  '*:after': {
    boxSizing: 'border-box',
    fontFamily: 'Inter',
  },
  '*:before': {
    boxSizing: 'border-box',
    fontFamily: 'Inter',
  },
  body: {
    margin: 0,
  },
});

globalStyles();

type CSS = Stitches.CSS<typeof config>;

export type { CSS };
export type { VariantProps } from '@stitches/react';
export { styled, css, theme, createTheme, getCssText, globalCss, keyframes, config, reset, darkTheme };
