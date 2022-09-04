import { Fragment, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import type { AppNav } from '~/types/nav';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Outlet, useCatch, useLoaderData, useLocation } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { getNavItems } from '~/utils/navigation.server';
import { DarkModeToggle, Logo } from '~/components';
import { Icon } from '@iconify/react';

type LoaderData = {
  nav: AppNav;
};

export const loader: LoaderFunction = async () => {
  const nav_resp: Response = await getNavItems();
  const nav: AppNav = await nav_resp.json();

  return json({ nav });
};

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pageHeading, setPageHeading] = useState<string | null>(null);
  const { nav } = useLoaderData<LoaderData>();
  const location = useLocation();
  const sidebarNavigation = nav.navMenu;
  const userNavigation = nav.userMenu;

  useEffect(
    (p = location.pathname) => {
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
    [pageHeading, sidebarNavigation, location.pathname]
  );

  return (
    <>
      <div className='flex h-full'>
        {/* Narrow sidebar */}
        <div className='sticky hidden w-28 overflow-y-auto bg-slate-700 md:block'>
          <div className='flex w-full flex-col items-center py-6'>
            <div className='flex flex-shrink-0 items-center'>
              <Logo />
            </div>
            {/* Narrow sidebar collapse button */}
            {/* TODO: write code to handle this properly */}
            <div className='relative mt-3'>
              <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                <div className='w-full border-t border-white' />
              </div>
              <div className='relative flex justify-center'>
                <span className='bg-slate-700 px-2 text-gray-500'>
                  <Icon icon={'heroicons:chevron-left'} className='h-5 w-5 text-gray-500' aria-hidden='true' />
                </span>
              </div>
            </div>
            <div className='mt-6 w-full flex-1 space-y-1 px-2'>
              {sidebarNavigation.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    item.href === location.pathname
                      ? 'bg-slate-800 text-amber-400'
                      : 'text-gray-100 hover:bg-slate-800 hover:text-white',
                    'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
                  )}
                  aria-current={item.href === location.pathname ? 'page' : undefined}
                >
                  {item.icon && (
                    <Icon
                      icon={item.icon}
                      className={clsx(
                        item.href === location.pathname ? 'text-white' : 'text-gray-300 group-hover:text-white',
                        'h-6 w-6'
                      )}
                      aria-hidden='true'
                    />
                  )}
                  <span className='mt-2'>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as='div' className='relative z-20 md:hidden' onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-slate-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-slate-700 pt-5 pb-4'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-1 right-0 -mr-14 p-1'>
                      <button
                        type='button'
                        className='flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:outline-amber-400 focus:ring-2'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon icon={'heroicons:x-mark-solid'} className='h-6 w-6 text-white' aria-hidden='true' />
                        <span className='sr-only'>Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex flex-shrink-0 items-center px-4'>
                    <Logo />
                  </div>
                  <div className='mt-5 h-0 flex-1 overflow-y-auto px-2'>
                    <nav className='flex h-full flex-col'>
                      <div className='space-y-1'>
                        {sidebarNavigation.map(item => (
                          <a
                            key={item.label}
                            href={item.href}
                            className={clsx(
                              item.href === location.pathname
                                ? 'bg-slate-800 text-amber-400'
                                : 'text-gray-100 hover:bg-slate-800 hover:text-white',
                              'group flex items-center rounded-md py-2 px-3 text-sm font-medium'
                            )}
                            aria-current={item.href === location.pathname ? 'page' : undefined}
                          >
                            {item.icon && (
                              <Icon
                                icon={item.icon}
                                className={clsx(
                                  item.href === location.pathname
                                    ? 'text-white'
                                    : 'text-gray-300 group-hover:text-white',
                                  'mr-3 h-6 w-6'
                                )}
                                aria-hidden='true'
                              />
                            )}
                            <span>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='w-14 flex-shrink-0' aria-hidden='true'>
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className='flex flex-1 flex-col overflow-hidden'>
          <header className='sticky w-full'>
            <div className='relative z-10 flex h-16 flex-shrink-0 border-b border-slate-200 bg-slate-500 shadow-sm dark:bg-slate-700'>
              <button
                type='button'
                className='border-r border-slate-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden'
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className='sr-only'>Open sidebar</span>
                <Icon icon={'heroicons:bars-3-bottom-left'} className='h-6 w-6' aria-hidden='true' />
              </button>
              <div className='flex flex-1 justify-between px-4 sm:px-6'>
                <div className='flex flex-1'>
                  <form className='flex w-full md:ml-0' action='#' method='GET'>
                    <label htmlFor='search-field' className='sr-only'>
                      Search all files
                    </label>
                    <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
                        <Icon
                          icon={'heroicons:magnifying-glass-20-solid'}
                          className='h-5 w-5 flex-shrink-0'
                          aria-hidden='true'
                        />
                      </div>
                      <input
                        name='search-field'
                        id='search-field'
                        className='h-full w-full border-transparent bg-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0'
                        placeholder='Search'
                        type='search'
                      />
                    </div>
                  </form>
                </div>
                <div className='ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative flex-shrink-0'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                          alt=''
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation.map(item => (
                          <Menu.Item key={item.label}>
                            {({ active = item.href === location.pathname }) => (
                              <a
                                href={item.href}
                                className={clsx(active ? 'bg-slate-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                {item.label}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* UI Adjustment dropdown */}
                  <Menu as='div' className='relative flex-shrink-0'>
                    <div>
                      <Menu.Button className='flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'>
                        <Icon
                          icon={'heroicons:adjustments-horizontal'}
                          width={20}
                          height={20}
                          className={'h-8 w-8 text-primary-100'}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <span className={'truncate px-4 py-2 text-sm text-gray-700'}>Dark Mode Toggle</span>
                        <span>
                          <DarkModeToggle />
                        </span>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className='flex flex-1 items-stretch overflow-hidden dark:bg-slate-700'>
            <main className='flex-1 overflow-y-auto'>
              {/* Primary column */}
              <section aria-labelledby='primary-heading' className='flex h-full min-w-0 flex-1 flex-col lg:order-last'>
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
      </div>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <>
      <div className='min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
        <div className='mx-auto max-w-max'>
          <main className='sm:flex'>
            <p className='text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl'>{caught.status}</p>
            <div className='sm:ml-6'>
              <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>{caught.statusText}</h1>
                <p className='mt-1 text-base text-gray-500'>Please check the URL in the address bar and try again.</p>
              </div>
              <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
                <a
                  href='/'
                  className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Go back home
                </a>
                <a
                  href='/support'
                  className='inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Contact support
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='mx-auto max-w-screen-xl grid-cols-2 content-center gap-8 py-8 px-4 md:grid lg:py-16 lg:px-6'>
          <div className='self-center'>
            <h1 className='mb-4 text-2xl font-bold text-primary-600 dark:text-primary-500'>500 Internal Error</h1>
            <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:mb-10'>
              {error.message}
            </p>
            <blockquote>{error.stack}</blockquote>
            <p className='mb-4 text-gray-500 dark:text-gray-400'>Here are some helpful links:</p>
            <ul className='flex items-center space-x-4 text-gray-500 dark:text-gray-400'>
              <li>
                <a href='/support' className='underline hover:text-gray-900 dark:hover:text-white'>
                  Support
                </a>
              </li>
              <li>
                <a href='/' className='underline hover:text-gray-900 dark:hover:text-white'>
                  Return to home
                </a>
              </li>
            </ul>
          </div>
          <img
            className='mx-auto mb-4 hidden md:flex'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/500/500.svg'
            alt='500 Server Error'
          />
        </div>
      </section>
    </>
  );
}
