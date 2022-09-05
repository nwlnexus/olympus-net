import globalStyles from '~/styles/tailwind.css';
import {
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
  Links,
  LiveReload,
  Meta,
  json,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from '~/remix';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'heliosUI',
  viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: globalStyles }];

export const loader = async ({ request, context }: LoaderArgs) => {
  return json({});
};

export default function App() {
  return (
    <html lang='en' data-theme='dark'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
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
    <html lang='en'>
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
                    className='bg-primary-600 hover:bg-primary-700 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
                  >
                    Go back home
                  </a>
                  <a
                    href='/support'
                    className='bg-primary-100 text-primary-700 hover:bg-primary-200 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
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
