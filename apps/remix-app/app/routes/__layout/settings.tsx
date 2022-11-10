import type { NavMenu } from '~/types/nav';
import { clsx } from 'clsx';
import { Icon } from '@iconify/react';
import { Outlet, useLocation } from '~/remix';
import type { LoaderArgs } from '~/remix';
import { isLoggedIn } from '~/services/verify-logged-in';

export const loader = async ({ request, context }: LoaderArgs) => {
  await isLoggedIn(request, context);

  return null;
};

export default function Settings() {
  const subNavigation: NavMenu = [
    {
      label: 'Account',
      description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
      href: '/settings/accounts',
      icon: 'heroicons:cog'
    },
    {
      label: 'Notifications',
      description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
      href: '#',
      icon: 'heroicons:bell'
    },
    {
      label: 'Security',
      description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
      href: '#',
      icon: 'heroicons:key'
    },
    {
      label: 'Appearance',
      description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
      href: '#',
      icon: 'heroicons:photo'
    },
    {
      label: 'Integrations',
      description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
      href: '#',
      icon: 'heroicons:squares-plus'
    }
  ];
  const { pathname } = useLocation();

  return (
    <div className='relative flex flex-1 xl:overflow-hidden'>
      {/* Secondary sidebar */}
      <nav
        aria-label='Sections'
        className='border-blue-gray-200 hidden w-96 flex-shrink-0 border-r bg-white dark:bg-slate-700 xl:flex xl:flex-col'
      >
        <div className='border-blue-gray-200 flex h-16 flex-shrink-0 items-center border-b px-6'>
          <p className='text-blue-gray-900 text-lg font-medium'>Settings</p>
        </div>
        <div className='min-h-0 flex-1 overflow-y-auto'>
          {subNavigation.map(item => (
            <a
              key={item.label}
              href={item.href}
              className={clsx(
                item.href === pathname ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                'border-blue-gray-200 flex border-b p-6'
              )}
              aria-current={item.href === pathname ? 'page' : undefined}
            >
              {item.icon && (
                <Icon
                  icon={item.icon}
                  className='text-blue-gray-400 -mt-0.5 h-6 w-6 flex-shrink-0'
                  aria-hidden='true'
                />
              )}
              <div className='ml-3 text-sm'>
                <p className='text-blue-gray-900 font-medium'>{item.label}</p>
                <p className='text-blue-gray-500 mt-1'>{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <Outlet />
    </div>
  );
}
