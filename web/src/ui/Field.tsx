import React from 'react';

import { Flex } from './Flex';
import { styled } from '@stitches';
import { Message } from './Message';
import { FieldContext, useFieldContext } from '../context/FieldContext';

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const StyledLabel = styled('label', {
  maxWidth: 'fit-content',
  color: '$hiContrast',
  fontSize: '$2',
  lineHeight: '$3',
});

const StyledInput = styled('input', {
  position: 'relative',
  display: 'flex',
  width: '100%',
  px: '$2',
  borderRadius: '$2',
  color: '$gray900',
  fontSize: '$3',
  lineHeight: '$3',
  height: '$9',
  '@sm': {
    fontSize: '$2',
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: '$bg',
        border: '1px solid $gray300',
        boxShadow: '$sm',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        '&:placeholder': {
          color: '$gray600',
        },
        '&:focus': {
          outline: 'none',
          boxShadow: '0px 0px 0px 3px $colors$violetA400',
        },
        '&:hover, &:focus': {
          borderColor: '$violet400',
        },
      },
      secondary: {
        border: '1px solid $grayA200',
        backgroundColor: '$grayA200',
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        '&:focus': {
          outline: 'none',
        },
        '&:hover, &:focus': {
          backgroundColor: '$grayA300',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

/* -------------------------------------------------------------------------------------------------
 * Label
 * ----------------------------------------------------------------------------------------------- */

interface LabelProps extends React.ComponentPropsWithRef<typeof StyledLabel> {
  children?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useFieldContext('Field.Label');
    return (
      <StyledLabel htmlFor={id} {...props} ref={ref}>
        {children}
      </StyledLabel>
    );
  },
);

Label.displayName = 'Label';

/* -------------------------------------------------------------------------------------------------
 * Input
 * ----------------------------------------------------------------------------------------------- */

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<typeof StyledInput>
>((props, ref) => {
  const { id } = useFieldContext('Field.Input');
  return <StyledInput id={id} {...props} ref={ref} />;
});

Input.displayName = 'Input';

/* -------------------------------------------------------------------------------------------------
 * Field
 * ----------------------------------------------------------------------------------------------- */

interface FieldProps {
  children?: React.ReactNode;
}

interface FieldComposition {
  Label: typeof Label;
  Input: typeof Input;
}

const Field: React.FC<FieldProps> & FieldComposition = ({ children }) => {
  return <FieldContext>{children}</FieldContext>;
};

Field.Label = Label;
Field.Input = Input;

/* -------------------------------------------------------------------------------------------------
 * TextField
 * ----------------------------------------------------------------------------------------------- */

interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, error, label, ...props }, ref) => {
    return (
      <Field>
        <Flex direction="column" gap={2} grow>
          <Field.Label>{label}</Field.Label>
          <Field.Input {...props} ref={ref} />
          {error && <Message variant="error">{error}</Message>}
        </Flex>
      </Field>
    );
  },
);

TextField.displayName = 'TextField';

export { Field, TextField };
