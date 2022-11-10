import { getNavItems } from '~/utils/navigation.server';
import { type LoaderArgs, json, Outlet, useCatch, useLoaderData, useLocation } from '~/remix';
import { useState, useEffect } from 'react';
import type { AppNav } from '~/types/nav';
import { clsx } from 'clsx';
import { Drawer, Modal } from 'react-daisyui';
import { pagesThatDontNeedSidebar } from '~/core/constants';
import { useGlobalState } from '~/store/global/global.provider';
import { AppSidebar } from '~/components/AppSidebar';
import { AppNavbar } from '~/components/AppNavbar';
import { NewNodeForm } from '~/components/NewNodeForm';
import { isLoggedIn } from '~/services/verify-logged-in';
import invariant from 'tiny-invariant';
import type { User } from '~/types/user';

export const loader = async ({ request, context }: LoaderArgs) => {
  const user = await isLoggedIn(request, context);
  invariant(user);

  const nav_resp: Response = await getNavItems();
  const nav: AppNav = await nav_resp.json();
  return json({ nav, user });
};

export default function AppLayout() {
  const [pageHeading, setPageHeading] = useState<string | null>(null);
  const { state, dispatch } = useGlobalState();
  const { nav, user } = useLoaderData<{ nav: AppNav; user: User | never }>();
  const { pathname } = useLocation();
  const sidebarNavigation = nav.navMenu;

  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => setIsMobile(e.matches));
  }, []);

  useEffect(
    (p = pathname) => {
      if (p === '/') {
        setPageHeading('Home');
      } else if (p === '/profile') {
        setPageHeading('Profile');
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

  return (
    <>
      <div className='flex flex-wrap'>
        <Drawer
          id='main-menu'
          open={showSidebar}
          sideClassName={clsx(
            'hidden items-top gap-2',
            {
              'lg:flex': pathname !== '/'
            },
            'scroll-smooth scroll-pt-20'
          )}
          onClickOverlay={toggleSidebar}
          mobile={!pagesThatDontNeedSidebar.includes(pathname) || isMobile}
          side={<AppSidebar nav={sidebarNavigation} toggle={toggleSidebar} />}
        >
          {pathname === '/' ? (
            ''
          ) : (
            <div className='sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur duration-100'>
              <AppNavbar toggleMenu={toggleSidebar} user={user} />
            </div>
          )}

          {/* Content Area */}
          <div
            className={clsx('flex flex-1 flex-col overflow-hidden', {
              'p-6 pb-16': pagesThatDontNeedSidebar.includes(pathname)
            })}
          >
            {/* Main content */}
            <div className='flex flex-1 items-stretch overflow-hidden'>
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
        {/* New Node Modal */}
        <Modal
          id='mdl-new-node'
          open={state.showNewNodeMdl}
          onClickBackdrop={() => dispatch({ type: 'CLOSE_NEWNODE_MDL' })}
          className='w-11/12 max-w-5xl'
        >
          <Modal.Header>New Node</Modal.Header>
          <Modal.Body>
            <NewNodeForm />
          </Modal.Body>
        </Modal>
        {/* New Tunnel Modal */}
        <Modal
          id='mdl-new-tunnel'
          open={state.showNewTunnelMdl}
          onClickBackdrop={() => dispatch({ type: 'CLOSE_NEWTUNNEL_MDL' })}
          className='w-11/12 max-w-5xl'
        >
          <Modal.Header>New Tunnel</Modal.Header>
        </Modal>
        {/* New Location Modal */}
        <Modal
          id='mdl-new-location'
          open={state.showNewLocationMdl}
          onClickBackdrop={() => dispatch({ type: 'CLOSE_NEWLOCATION_MDL' })}
          className='w-11/12 max-w-5xl'
        >
          <Modal.Header>New Location</Modal.Header>
        </Modal>
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

export function ErrorBoundary({ error }: { error: any }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
