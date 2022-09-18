import type { EntryContext } from '~/remix';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { GlobalStateProvider } from '~/store/global/global.provider';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const view = renderToString(
    <GlobalStateProvider>
      <RemixServer context={remixContext} url={request.url} />
    </GlobalStateProvider>
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + view, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
