import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';

const GLOBAL_STATE = {
  isLoggedIn: false,
  showNewNodeMdl: false,
  showNewLocationMdl: false,
  showNewTunnelMdl: false
};

type Action =
  | { type: 'OPEN_NEWNODE_MDL' }
  | { type: 'CLOSE_NEWNODE_MDL' }
  | { type: 'OPEN_NEWTUNNEL_MDL' }
  | { type: 'CLOSE_NEWTUNNEL_MDL' }
  | { type: 'OPEN_NEWLOCATION_MDL' }
  | { type: 'CLOSE_NEWLOCATION_MDL' };
type Dispatch = (action: Action) => void;

const GlobalContext = createContext<{ state: typeof GLOBAL_STATE; dispatch: Dispatch } | undefined>(undefined);

const globalReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'OPEN_NEWNODE_MDL':
      return {
        ...state,
        showNewNodeMdl: true
      };
    case 'CLOSE_NEWNODE_MDL':
      return {
        ...state,
        showNewNodeMdl: false
      };
    case 'OPEN_NEWTUNNEL_MDL':
      return {
        ...state,
        showNewTunnelMdl: true
      };
    case 'CLOSE_NEWTUNNEL_MDL':
      return {
        ...state,
        showNewTunnelMdl: false
      };
    case 'OPEN_NEWLOCATION_MDL':
      return {
        ...state,
        showNewLocationMdl: true
      };
    case 'CLOSE_NEWLOCATION_MDL':
      return {
        ...state,
        showNewLocationMdl: false
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
