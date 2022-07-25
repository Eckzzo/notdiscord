import { styled, keyframes } from '@stitches';

const rotate = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const dash = keyframes({
  '0%': {
    strokeDasharray: '1, 150',
    strokeDashoffset: '0',
  },
  '50%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: '-35',
  },
  '100%': {
    strokeDasharray: '90, 150',
    strokeDashoffset: '-124',
  },
});

const StyledSpinner = styled('svg', {
  animationName: `${rotate}`,
  animationDuration: '2s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
});

const StyledCircle = styled('circle', {
  animationName: `${dash}`,
  animationDuration: '1.2s',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
});

interface SpinnerProps extends React.ComponentPropsWithoutRef<'svg'> {}

const Spinner: React.FC<SpinnerProps> = props => (
  <StyledSpinner height='1em' width='1em' viewBox='0 0 50 50' {...props}>
    <StyledCircle
      className='path'
      cx='25'
      cy='25'
      r='20'
      fill='none'
      strokeWidth='6'
      stroke='currentColor'
      strokeLinecap='round'
    />
  </StyledSpinner>
);

Spinner.displayName = 'Spinner';

export { Spinner };
