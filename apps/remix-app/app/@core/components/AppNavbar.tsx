import { Avatar, Button, Dropdown, Navbar, Tooltip } from 'react-daisyui';
import { clsx } from 'clsx';
import { Icon } from '@iconify/react';
import bars3BottomLeft from '@iconify/icons-heroicons/bars-3-bottom-left';
import { AppSearch, Logo, ThemeChanger } from '~/components';
import type { NavMenu } from '~/types/nav';
import { useLocation } from '~/remix';
import type { User } from '~/types/user';

type AppNavbarProps = {
  nav: NavMenu;
  toggle: () => void;
  user: User | null;
};

export function AppNavbar({ nav, toggle, user }: AppNavbarProps) {
  const { pathname } = useLocation();

  return (
    <Navbar>
      <div className='flex flex-1 md:gap-1 lg:gap-2'>
        <Tooltip message='Menu' position='right'>
          <Button color='ghost' tabIndex={0} onClick={toggle} className={clsx({ 'lg:hidden': pathname !== '/' })}>
            <Icon icon={bars3BottomLeft} width={20} height={20} className='inline-block h-5 w-5 md:h-6 md:w-6' />
          </Button>
        </Tooltip>
        <div className={clsx('flex items-center gap-2', { 'lg:hidden': pathname === '/' })}>
          <div id='logo' className='ml-2 hidden flex-1'>
            <Logo href={'/'} />
          </div>
        </div>
        <div className='hidden w-full max-w-sm lg:flex'>
          <AppSearch />
        </div>
      </div>
      <div className='flex-0'>
        <ThemeChanger />
        {user === null ? (
          <Button href={'./auth/login'} color={'primary'} animation={true}>
            Log in
          </Button>
        ) : (
          <Dropdown vertical='end'>
            <Button color='ghost' className='avatar' shape='circle'>
              <Avatar shape='circle' size='xs' letters={user.displayName.at(0)} />
            </Button>
            <Dropdown.Menu className='menu-compact w-52'>
              {nav.map(item => (
                <Dropdown.Item key={item.label} href={item.href}>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
}
