import { Menu } from 'react-daisyui';
import { clsx } from 'clsx';
import { NavLink, useLocation } from '~/remix';
import type { NavMenu } from '~/types/nav';
import { Icon } from '@iconify/react';

type AppSidebarProps = {
  nav: NavMenu;
};

export function AppSidebar({ nav }: AppSidebarProps) {
  const { pathname } = useLocation();
  return (
    <>
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
    </>
  );
}
