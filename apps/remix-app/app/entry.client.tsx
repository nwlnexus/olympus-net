import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';
import { GlobalStateProvider } from '~/store/global/global.provider';

hydrateRoot(
  document,
  <GlobalStateProvider>
    <RemixBrowser />
  </GlobalStateProvider>
);
