import { Menu } from 'react-daisyui';
import { clsx } from 'clsx';
import { NavLink, useLocation } from '~/remix';
import type { NavMenu } from '~/types/nav';
import { Icon } from '@iconify/react';
import { Logo } from '~/components';

type AppSidebarProps = {
  nav: NavMenu;
  toggle?: () => void;
};

export function AppSidebar({ nav, toggle }: AppSidebarProps) {
  const { pathname } = useLocation();
  return (
    <div className='w-80 overflow-y-auto bg-base-100 p-0 text-base-content'>
      <div
        className={clsx(
          'sticky top-0 z-20 hidden items-center gap-2 bg-base-200 bg-opacity-90 px-4 py-2 backdrop-blur',
          { 'lg:flex': pathname !== '/' }
        )}
      >
        <Logo showVersion={true} />
      </div>
      <div className='h-4' />
      <Menu vertical={true} className='p-0'>
        {nav.map(item => (
          <Menu.Item key={item.label} className='hover-bordered'>
            <NavLink
              to={item.href}
              className={clsx({ active: pathname.startsWith(item.href) })}
              onClick={toggle && toggle}
            >
              {item.icon && <Icon icon={item.icon} />}
              {item.label}
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
