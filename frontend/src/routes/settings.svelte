<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { buildMenus } from '$lib/build_menus';

	export const load: Load = async ({ stuff }) => {
		try {
			const { settingsMenu } = await buildMenus();
			return {
				props: {
					settingsMenu
				},
				stuff: stuff
			};
		} catch (e) {
			return { e };
		}
	};
</script>

<script lang="ts">
	import type { NavMenu } from '$types/helios';

	export let settingsMenu: NavMenu[];

	let currentSection = false;
</script>

<svelte:head>
	<title>Helios | Settings</title>
	<meta name="description" content="Helios app" />
</svelte:head>

Settings
{settingsMenu}
