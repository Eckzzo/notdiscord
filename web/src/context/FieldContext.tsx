import { useId } from 'react';
import { createRootContext } from './Root';

interface FieldContextValue {
  id: string;
}

const [FieldContextProvider, useFieldContext] = createRootContext<FieldContextValue>('FieldContext');

interface FieldContextProps {
  children?: React.ReactNode;
}

const FieldContext: React.FC<FieldContextProps> = ({ children }) => {
  const id = useId();
  return <FieldContextProvider id={id}>{children}</FieldContextProvider>;
};

export { FieldContext, useFieldContext };
