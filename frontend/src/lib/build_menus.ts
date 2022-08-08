import type { NavMenu } from '$types/helios';
import AdjustmentsIcon from '@rgossiaux/svelte-heroicons/outline/Adjustments';
import ServerIcon from '@rgossiaux/svelte-heroicons/outline/Server';
import UserIcon from '@rgossiaux/svelte-heroicons/outline/User';
import VariableIcon from '@rgossiaux/svelte-heroicons/outline/Variable';
import LocationMarkerIcon from '@rgossiaux/svelte-heroicons/outline/LocationMarker';
import { DashboardIcon, StatsSquareUpIcon } from './components/icons';

export async function buildMenus(): Promise<Record<string, NavMenu[]>> {
	const navMenu: NavMenu[] = [
		{
			title: 'Dashboard',
			href: '/',
			icon: DashboardIcon,
			description: 'System overview.'
		},
		{
			title: 'Locations',
			href: '/locations',
			icon: LocationMarkerIcon,
			description: 'All functions for tunnels managed by the system.'
		},
		{
			title: 'Nodes',
			href: '/nodes',
			icon: ServerIcon,
			description: 'All functions for edge nodes.'
		},
		{
			title: 'Variables',
			href: '/variables',
			icon: VariableIcon,
			description: 'All functions with variables served by the system.'
		},
		{
			title: 'Reports',
			href: '/reports',
			icon: StatsSquareUpIcon,
			description: 'Reports and reporting functions.'
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: AdjustmentsIcon,
			description: 'System settings.'
		}
	];

	const userMenu: NavMenu[] = [
		{
			title: 'Profile',
			href: '/profile',
			icon: UserIcon,
			description: 'Your profile'
		},
		{
			title: 'Logout',
			href: '/auth/logout',
			icon: UserIcon,
			description: 'Logout'
		}
	];

	const settingsMenu: NavMenu[] = [
		{
			title: 'Variable categories',
			href: '/settings?sec=variables',
			icon: VariableIcon,
			description: 'Adding in new variable categories'
		},
		{
			title: 'Variables 1',
			href: '/settings?sec=variables1',
			icon: VariableIcon,
			description: 'Adding in new variable categories'
		},
		{
			title: 'Variables 2',
			href: '/settings?sec=variables2',
			icon: VariableIcon,
			description: 'Adding in new variable categories'
		}
	];

	return {
		navMenu,
		userMenu,
		settingsMenu
	};
}
