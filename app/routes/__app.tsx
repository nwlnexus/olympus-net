import { Logo } from '~/components';
import { Icon } from '@iconify/react';
import bars3BottomLeft from '@iconify/icons-heroicons/bars-3-bottom-left';
import { getNavItems } from '~/utils/navigation.server';
import { json, Outlet, useCatch, useLoaderData, useLocation, type LoaderArgs } from '~/remix';
import { useState, useEffect } from 'react';
import type { AppNav } from '~/types/nav';
import { Button, Navbar } from 'react-daisyui';

export const loader = async ({ context }: LoaderArgs) => {
  const nav_resp: Response = await getNavItems();
  const nav: AppNav = await nav_resp.json();

  return json({ nav });
};

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pageHeading, setPageHeading] = useState<string | null>(null);
  const { nav } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const sidebarNavigation = nav.navMenu;
  const userNavigation = nav.userMenu;

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

  return (
    <>
      <div className='flex w-full'>
        {/** Navbar */}
        <Navbar>
          <Navbar.Start>
            <Button color='ghost' variant='outline'>
              <Icon icon={bars3BottomLeft} />
            </Button>
          </Navbar.Start>
          <Navbar.End>
            <Button>Click</Button>
          </Navbar.End>
        </Navbar>
      </div>

      {/* Content Area */}
      {/* <div className='flex flex-1 flex-col overflow-hidden'> */}
      {/* Main content */}
      {/* <div className='flex flex-1 items-stretch overflow-hidden dark:bg-slate-700'> */}
      {/* <main className='flex-1 overflow-y-auto'> */}
      {/* Primary column */}
      {/* <section aria-labelledby='primary-heading' className='flex h-full min-w-0 flex-1 flex-col lg:order-last'> */}
      {/* <h1 id='primary-heading' className='sr-only'> */}
      {/* {pageHeading} */}
      {/* </h1> */}
      {/* <div className={'p-2'}> */}
      {/* <Outlet /> */}
      {/* </div> */}
      {/* </section> */}
      {/* </main> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
