import React from 'react';

function createRootContext<T extends object | null>(rootName: string, defaultContext?: T) {
  const Context = React.createContext<T | undefined>(defaultContext);

  function Provider(props: T & { children?: React.ReactNode }) {
    const { children, ...context } = props;
    const value = context as T;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useRootContext(consumerName: string) {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;

    throw new Error(`${consumerName} must be used within ${rootName}`);
  }

  Provider.displayName = rootName + 'Provider';
  return [Provider, useRootContext] as const;
}

export { createRootContext };
