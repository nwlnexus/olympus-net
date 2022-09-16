import type { ReactNode } from 'react';
import { cloneElement } from 'react';

export const ContextProviderComposer = ({
  contextProviders,
  children
}: {
  contextProviders: ReactNode[];
  children: any;
}) => {
  return contextProviders.reduceRight((children, parent) => cloneElement(parent, { children }), children);
};
