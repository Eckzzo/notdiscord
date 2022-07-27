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

const StyledFileInputLabel = styled('label', {
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  '&:after': {
    position: 'absolute',
    content: 'Edit',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '$2',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    fontSize: '$1',
    fontWeight: '$medium',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'opacity 0.2s ease',
    opacity: 0,
  },
  '&:hover': {
    '&:after': {
      opacity: 1,
    },
  },
});

const StyledFileInput = styled('input', {
  opacity: 0,
  size: '0.1px',
  position: 'absolute',
});

/* -------------------------------------------------------------------------------------------------
 * Label
 * ----------------------------------------------------------------------------------------------- */

interface LabelProps extends React.ComponentPropsWithRef<typeof StyledLabel> {
  children?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, ...props }, ref) => {
  const { id } = useFieldContext('Field.Label');
  return (
    <StyledLabel htmlFor={id} {...props} ref={ref}>
      {children}
    </StyledLabel>
  );
});

Label.displayName = 'Label';

/* -------------------------------------------------------------------------------------------------
 * Input
 * ----------------------------------------------------------------------------------------------- */

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithRef<typeof StyledInput>>((props, ref) => {
  const { id } = useFieldContext('Field.Input');
  return <StyledInput {...props} id={id} ref={ref} />;
});

Input.displayName = 'Input';

/* -------------------------------------------------------------------------------------------------
 * FileInput
 * ----------------------------------------------------------------------------------------------- */

interface FileInputProps {
  children?: React.ReactNode;
}

const FileInput: React.FC<FileInputProps> = ({ children }) => {
  const { id } = useFieldContext('Field.File');
  return (
    <Flex>
      <StyledFileInputLabel htmlFor={id}>{children}</StyledFileInputLabel>
      <StyledFileInput id={id} type='file' accept='image/jpeg, image/png' />
    </Flex>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Field
 * ----------------------------------------------------------------------------------------------- */

interface FieldProps {
  children?: React.ReactNode;
}

interface FieldComposition {
  Label: typeof Label;
  Input: typeof Input;
  FileInput: typeof FileInput;
}

const Field: React.FC<FieldProps> & FieldComposition = ({ children }: FieldProps) => {
  return <FieldContext>{children}</FieldContext>;
};

Field.Label = Label;
Field.Input = Input;
Field.FileInput = FileInput;

/* -------------------------------------------------------------------------------------------------
 * TextField
 * ----------------------------------------------------------------------------------------------- */

interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({ error, label, ...props }, ref) => {
  return (
    <Field>
      <Flex direction='column' gap={1} grow>
        <Field.Label>{label}</Field.Label>
        <Field.Input {...props} ref={ref} />
        {error && <Message variant='error'>{error}</Message>}
      </Flex>
    </Field>
  );
});

TextField.displayName = 'TextField';

export { Field, TextField };
