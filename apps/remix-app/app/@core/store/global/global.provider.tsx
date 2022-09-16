import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';

type Action = { type: 'OPEN_NEWNODE_MDL' } | { type: 'CLOSE_NEWNODE_MDL' };
type Dispatch = (action: Action) => void;
type GlobalContextType = {
  showNewNodeMdl: boolean;
};
const GlobalContext = createContext<{ state: GlobalContextType; dispatch: Dispatch } | undefined>(undefined);

const globalReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'OPEN_NEWNODE_MDL':
      return {
        ...state,
        showNewNodeMDL: true
      };
    case 'CLOSE_NEWNODE_MDL':
      return {
        ...state,
        showNewNodeMDL: false
      };
    default:
      return state;
  }
};

function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(globalReducer, GLOBAL_STATE);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </>
  );
}

function useGlobalState() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalSateProvider');
  }
  return context;
}

export { GlobalStateProvider, useGlobalState };
