import { Avatar, Button, Dropdown, Navbar, Tooltip } from 'react-daisyui';
import { clsx } from 'clsx';
import { Icon } from '@iconify/react';
import bars3BottomLeft from '@iconify/icons-heroicons/bars-3-bottom-left';
import { useLocation } from '~/remix';
import type { User } from '~/types/user';
import { ThemeChanger } from '~/components/ThemeChanger';
import { AppSearch } from '~/components/AppSearch';
import { Logo } from '~/components/Logo';

type AppNavbarProps = {
  toggleMenu: () => void;
  user: User | null;
};

export function AppNavbar({ toggleMenu, user }: AppNavbarProps) {
  const { pathname } = useLocation();

  return (
    <Navbar>
      <div className='flex flex-1 md:gap-1 lg:gap-2'>
        <Tooltip message='Menu' position='bottom'>
          <Button color='ghost' tabIndex={0} onClick={toggleMenu} className={clsx({ 'lg:hidden': pathname !== '/' })}>
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
          <Button href={'./auth/login'} color={'primary'} animation={true} className='ml-2'>
            Log in
          </Button>
        ) : (
          <Dropdown vertical='end'>
            <Button color='ghost' className='avatar ml-1' shape='circle'>
              <Avatar shape='circle' size='xs' letters={user.displayName.at(0)} />
            </Button>
            <Dropdown.Menu className='menu-compact w-52'>
              <Dropdown.Item href={'/profile'}>Profile</Dropdown.Item>
              <div className='mt-2 h-2 border-t' />
              <Dropdown.Item href='/auth/logout'>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
}
