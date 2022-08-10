<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { buildMenus } from '$lib/build_menus';

	export const load: Load = async ({ stuff }) => {
		try {
			const { userMenu, settingsMenu, navMenu } = await buildMenus();
			return {
				props: {
					navMenu,
					userMenu
				},
				stuff: {
					...stuff,
					pages: [...userMenu, ...settingsMenu, ...navMenu]
				}
			};
		} catch (e) {
			return { e };
		}
	};
</script>

<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Navbar from '$lib/ui/Navbar.svelte';
	import Sidebar from '$lib/ui/Sidebar.svelte';
	import type { NavMenu } from '$types/helios';
	import { page } from '$app/stores';
	import { pagesThatDontNeedSidebar } from '$lib/constants';

	let drawercontent: HTMLDivElement;
	let drawerContentScrollY = 0;
	function parseContentScroll() {
		drawerContentScrollY = drawercontent.scrollTop;
	}

	let drawersidebar: HTMLDivElement;
	let drawerSidebarScrollY = 0;
	function parseSidebarScroll() {
		drawerSidebarScrollY = drawersidebar.scrollTop;
	}

	onMount(() => {
		parseContentScroll();
		parseSidebarScroll();
	});

	afterNavigate(() => {
		drawercontent.scrollTop = 0;
	});

	let checked = false;
	function closeDrawer() {
		checked = false;
	}

	function openDrawer() {
		checked = true;
	}

	export let navMenu: NavMenu[];
	export let userMenu: NavMenu[];
</script>

<div
	class={`bg-base-100 drawer ${
		pagesThatDontNeedSidebar.includes($page.url.pathname) ? '' : 'drawer-mobile'
	}`}
>
	<input id="drawer" type="checkbox" class="drawer-toggle" bind:checked />
	<div
		bind:this={drawercontent}
		on:scroll={parseContentScroll}
		class={`drawer-content`}
		style="scroll-behavior:smooth; scroll-padding: 5rem;"
	>
		<Navbar {userMenu} {drawerContentScrollY} />
		<div class={`${pagesThatDontNeedSidebar.includes($page.url.pathname) ? '' : 'p-6 pb-16'}`}>
			<slot />
		</div>
	</div>
	<div
		class="drawer-side"
		style="scroll-behavior: smooth; scroll-padding-top: 5rem;"
		bind:this={drawersidebar}
		on:scroll={parseSidebarScroll}
	>
		<label for="drawer" class="drawer-overlay" />
		<aside class="bg-base-200 w-80">
			<Sidebar {navMenu} {closeDrawer} {openDrawer} {drawerSidebarScrollY} />
			<div
				class="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent"
			/>
		</aside>
	</div>
</div>

<!-- <style global>
	code[class*='language-'],
	pre[class*='language-'] {
		background: unset;
	}
	.prose pre[class*='language-'] {
		max-width: 48rem;
		background-color: hsl(var(--n));
		color: hsl(var(--nc));
	}
</style> -->
