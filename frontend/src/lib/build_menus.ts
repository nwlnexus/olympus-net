import type { NavMenu } from '$types/helios';
import {
	AdjustmentsIcon,
	LocationMarkerIcon,
	ServerIcon,
	VariableIcon
} from '@rgossiaux/svelte-heroicons/outline';
import { DashboardIcon, StatsSquareUpIcon, TunnelIcon } from './components/icons';

export async function buildMenus(): Promise<Record<string, NavMenu[]>> {
	const navMenu: NavMenu[] = [
		{
			title: 'Dashboard',
			href: '/dashboard',
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
			title: 'Tunnels',
			href: '/tunnels',
			icon: TunnelIcon,
			description: 'All function for tunnels.',
			tags: 'how tunnels'
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
		settingsMenu
	};
}
