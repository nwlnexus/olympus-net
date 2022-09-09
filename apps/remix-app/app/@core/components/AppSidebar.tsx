import { Divider, Menu } from 'react-daisyui';
import { clsx } from 'clsx';
import { NavLink, useLocation } from '~/remix';
import type { NavMenu } from '~/types/nav';
import { Icon } from '@iconify/react';
import { Logo } from '~/components/Logo';

type AppSidebarProps = {
  nav: NavMenu;
};

export function AppSidebar({ nav }: AppSidebarProps) {
  const { pathname } = useLocation();
  return (
    <div>
      <div
        className={clsx(
          'sticky top-0 z-20 hidden items-center gap-2 bg-base-200 bg-opacity-90 px-4 py-2 backdrop-blur',
          { 'lg:flex': pathname !== '/' }
        )}
      >
        <Logo href={'/'} />
      </div>

      <Divider />
      <Menu vertical={true} className='p-0'>
        {nav.map(item => (
          <Menu.Item key={item.label} className='hover-bordered'>
            <NavLink to={item.href} className={clsx({ active: pathname.startsWith(item.href) })}>
              {item.icon && <Icon icon={item.icon} />}
              {item.label}
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
      <div className='pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t from-base-200 to-transparent' />
    </div>
  );
}
