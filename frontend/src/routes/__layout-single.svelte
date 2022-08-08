<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { buildMenus } from '$lib/build_menus';

	export const load: Load = async () => {
		const navMenu = await buildMenus();

		return {
			props: {
				navMenu
			}
		};
	};
</script>

<script lang="ts">
	import '../styles/app.css';
</script>

<slot />
