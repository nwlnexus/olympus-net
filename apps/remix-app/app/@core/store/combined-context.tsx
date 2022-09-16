import type { ReactNode } from 'react';
import { ContextProviderComposer } from '~/store/context-provider-composer';
import { GlobalStateProvider } from '~/store/global/global.provider';

export const CombinedContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ContextProviderComposer contextProviders={[<GlobalStateProvider key={'global_state_provider'} />]}>
        {children}
      </ContextProviderComposer>
    </>
  );
};
