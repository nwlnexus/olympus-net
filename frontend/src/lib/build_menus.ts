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
			description: 'System overview.',
			tags: 'how home'
		},
		{
			title: 'Locations',
			href: '/locations',
			icon: LocationMarkerIcon,
			description: 'All functions for tunnels managed by the system.',
			tags: 'how locations'
		},
		{
			title: 'Nodes',
			href: '/nodes',
			icon: ServerIcon,
			description: 'All functions for edge nodes.',
			tags: 'how nodes'
		},
		{
			title: 'Variables',
			href: '/variables',
			icon: VariableIcon,
			description: 'All functions with variables served by the system.',
			tags: 'how variables'
		},
		{
			title: 'Reports',
			href: '/reports',
			icon: StatsSquareUpIcon,
			description: 'Reports and reporting functions.',
			tags: 'how reports'
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: AdjustmentsIcon,
			description: 'System settings.',
			tags: 'how settings'
		}
	];

	const userMenu: NavMenu[] = [
		{
			title: 'Profile',
			href: '/profile',
			icon: UserIcon,
			description: 'Your profile',
			tags: 'how profile'
		},
		{
			title: 'Logout',
			href: '/auth/logout',
			icon: UserIcon,
			description: 'Logout',
			tags: 'how logout'
		}
	];

	const settingsMenu: NavMenu[] = [
		{
			title: 'Variable categories',
			href: '/settings?sec=variables',
			icon: VariableIcon,
			description: 'Adding in new variable categories',
			tags: 'how variables'
		},
		{
			title: 'Variables 1',
			href: '/settings?sec=variables1',
			icon: VariableIcon,
			description: 'Adding in new variable categories',
			tags: 'how variables 1'
		},
		{
			title: 'Variables 2',
			href: '/settings?sec=variables2',
			icon: VariableIcon,
			description: 'Adding in new variable categories',
			tags: 'how home variables 2'
		}
	];

	return {
		navMenu,
		userMenu,
		settingsMenu
	};
}
