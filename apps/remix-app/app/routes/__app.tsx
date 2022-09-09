import { AppSidebar, AppNavbar } from '~/components';
import { getNavItems } from '~/utils/navigation.server';
import { type LoaderArgs, json, Outlet, redirect, useCatch, useLoaderData, useLocation } from '~/remix';
import { useState, useEffect } from 'react';
import type { AppNav } from '~/types/nav';
import { clsx } from 'clsx';
import { Drawer } from 'react-daisyui';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { generateConfigs } from '~/utils/auth-config.server';
import { pagesThatDontNeedSidebar } from '~/core/constants';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);
  const user = await authenticator.isAuthenticated(request);
  const { pathname } = request.url;

  if (!user && pathname !== '/') {
    return redirect('/auth/login');
  }

  const nav_resp: Response = await getNavItems();
  const nav: AppNav = await nav_resp.json();
  return json({ nav, user });
};

export default function AppLayout() {
  const [pageHeading, setPageHeading] = useState<string | null>(null);
  const { nav, user } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const sidebarNavigation = nav.navMenu;
  const userNavigation = nav.userMenu;

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(
    (p = pathname) => {
      if (p === '/') {
        setPageHeading('Home');
      } else {
        setPageHeading(
          sidebarNavigation.filter(i => {
            return p.startsWith(i.href);
          })[0].label
        );
      }
    },
    [pageHeading, sidebarNavigation, pathname]
  );

  console.log('Show sidebar?', showSidebar);
  return (
    <>
      <div className='flex flex-wrap'>
        <Drawer
          open={showSidebar}
          sideClassName='w-80 scroll-smooth scroll-pt-20'
          contentClassName='scroll-behavior: smooth; scroll-padding-top: 5rem;'
          onClickOverlay={toggleSidebar}
          mobile={!pagesThatDontNeedSidebar.includes(pathname)}
          side={<AppSidebar nav={sidebarNavigation} />}
        >
          {/* Navbar */}
          <div className='sticky top-0 z-30 bg-opacity-90 backdrop-blur'>
            <AppNavbar nav={userNavigation} toggle={toggleSidebar} user={user && user} />
          </div>

          {/* Content Area */}
          <div
            className={clsx('flex flex-1 flex-col overflow-hidden', {
              'p-6 pb-16': pagesThatDontNeedSidebar.includes(pathname)
            })}
          >
            {/* Main content */}
            <div className='flex flex-1 items-stretch overflow-hidden dark:bg-slate-700'>
              <main className='flex-1 overflow-y-auto'>
                {/* Primary column */}
                <section
                  aria-labelledby='primary-heading'
                  className='flex h-full min-w-0 flex-1 flex-col lg:order-last'
                >
                  <h1 id='primary-heading' className='sr-only'>
                    {pageHeading}
                  </h1>
                  <div className={'p-2'}>
                    <Outlet />
                  </div>
                </section>
              </main>
            </div>
          </div>
        </Drawer>
      </div>
    </>
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
  );
}
