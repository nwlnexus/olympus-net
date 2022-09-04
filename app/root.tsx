import globalStyles from '~/styles/tailwind.css';
import { clsx } from 'clsx';
import { getThemeSession } from '~/utils/theme.server';
import { json } from '@remix-run/cloudflare';
import { NonFlashOfWrongThemeEls, type Theme, ThemeProvider, useTheme } from '~/utils/theme-provider';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from '@remix-run/react';
// Import types
import type { ReactNode } from 'react';
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import type { AppNav } from '~/@core/types/nav';
import { Logo } from '~/components';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'heliosUI',
  viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: globalStyles }];

type LoaderData = {
  data: {
    theme: Theme | null;
  };
  nav: AppNav;
  ENV?: Record<string, unknown>;
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const themeSession = await getThemeSession(request, context.SESSION_SECRET);

  const data = {
    theme: themeSession.getTheme()
  };

  return json({
    data
  });
};

const Document = ({ children, title }: { children: ReactNode | ReactNode[]; title?: string }) => {
  const [theme] = useTheme();
  const { data } = useLoaderData<LoaderData>();

  return (
    <html lang='en' className={clsx(theme)}>
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  const { data } = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <Document>
        <Outlet />
      </Document>
    </ThemeProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <html lang='en' className='dark h-full'>
      <head>
        <title>{caught.status}</title>
        <Meta />
        <Links />
      </head>
      <body className={'h-full'}>
        <div className='min-h-full bg-slate-700 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
          <div className='mx-auto max-w-max'>
            <main className='sm:flex'>
              <p className='text-4xl font-bold tracking-tight text-red-600 sm:text-5xl'>{caught.status}</p>
              <div className='sm:ml-6'>
                <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
                  <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>{caught.statusText}</h1>
                  <p className='mt-1 text-base text-gray-500'>{message}</p>
                </div>
                <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
                  <a
                    href='/'
                    className='inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
                  >
                    Go back home
                  </a>
                  <a
                    href='/support'
                    className='inline-flex items-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
                  >
                    Contact support
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}