import { Avatar, Button, Dropdown, Form, Input, Navbar, Tooltip } from 'react-daisyui';
import { clsx } from 'clsx';
import { Icon } from '@iconify/react';
import bars3BottomLeft from '@iconify/icons-heroicons/bars-3-bottom-left';
import { Logo } from '~/components/Logo';
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
      <Navbar.Start>
        <Tooltip message='Menu' position='right'>
          <Button color='ghost' tabIndex={0} onClick={toggle} className={clsx({ 'lg:hidden': pathname !== '/' })}>
            <Icon icon={bars3BottomLeft} width={20} height={20} className='inline-block h-5 w-5 md:h-6 md:w-6' />
          </Button>
        </Tooltip>
      </Navbar.Start>
      <Navbar.Center>
        <div className='flex items-center gap-2'>
          <div id='logo' className='ml-2 hidden flex-1'>
            <Logo href={'/'} />
          </div>
          <div className='hidden w-full max-w-sm lg:flex'>
            <Form>
              <Input bordered type='text' className='w-full max-w-xs' placeholder='Search' size='md' />
            </Form>
          </div>
        </div>
      </Navbar.Center>
      <Navbar.End>
        <div className='flex gap-2'>
          {user && (
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
      </Navbar.End>
    </Navbar>
  );
}
