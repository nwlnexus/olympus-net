import type { NavMenu } from '~/types/nav';
import { json } from '@remix-run/cloudflare';

export async function getNavItems() {
  // TODO: Build this out to be more dynamic.
  //  Maybe even consider calling a worker or KV

  const navMenu: NavMenu | [] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: 'heroicons:presentation-chart-bar'
    },
    {
      href: '/locations',
      label: 'Locations',
      icon: 'heroicons:building-office-2'
    },
    {
      href: '/nodes',
      label: 'Nodes',
      icon: 'heroicons:server-stack'
    },
    {
      href: '/tunnels',
      label: 'Tunnels',
      icon: 'heroicons:link'
    },
    {
      href: '/reports',
      label: 'Reports',
      icon: 'heroicons:document-chart-bar'
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: 'heroicons:cog'
    }
  ];
  const userMenu: NavMenu | [] = [
    {
      href: '/profile',
      label: 'Profile'
    }
  ];

  return json({
    navMenu,
    userMenu
  });
}
