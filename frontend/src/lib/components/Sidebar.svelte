<script lang="ts">
	import Search from './Search.svelte';
	import { page } from '$app/stores';

	const { navMenu } = $page.stuff;
	export let closeDrawer: () => void;
	export let openDrawer: () => void;
	export let drawerSidebarScrollY: number;

	$: switchNavbarStyle = drawerSidebarScrollY > 40 ? true : false;
</script>

<div
	class={`z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden ${
		$page.url.pathname == '/' ? '' : 'lg:flex'
	} ${switchNavbarStyle ? 'shadow-sm' : ''}`}
>
	<a href="/" aria-current="page" aria-label="Helios Home" class="flex-0 btn btn-ghost px-2">
		<div
			class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl"
		>
			<span class="lowercase text-primary">helios</span>
			<span class="uppercase text-base-content">UI</span>
		</div>
	</a>
	<a href="/docs/changelog" class="link link-hover font-mono text-xs text-opacity-50">
		<div data-tip="Changelog" class="tooltip tooltip-bottom">1.00.0</div>
	</a>
</div>

<div
	class={`bg-base-200 sticky top-0 z-10 grid grid-row-2 gap-y-2 w-full bg-opacity-90 py-3 px-2 backdrop-blur lg:hidden ${
		switchNavbarStyle ? 'shadow-sm' : ''
	}`}
>
	<div class="flex w-full">
		<Search on:search={closeDrawer} on:focus={openDrawer} />
	</div>
</div>

<div class="h-4" />

<ul class="menu menu-compact flex flex-col p-0 px-4">
	{#each navMenu as { href, icon, title, hidden, badge, highlightAnotherItem }}
		{#if !hidden}
			<li>
				<a
					sveltekit:prefetch
					{href}
					id={$page.url.pathname.startsWith(href + '/') ? 'active-menu' : ''}
					class={`flex gap-4 ${$page.url.pathname === href ? 'active' : ''} ${
						$page.url.pathname === highlightAnotherItem + '/' ? 'active' : ''
					} ${$page.url.pathname.startsWith(href + '/') ? 'active' : ''}`}
					aria-current={$page.url.pathname === href ? 'page' : undefined}
					on:click={closeDrawer}
				>
					{#if icon && icon !== ''}
						<span class="flex-none">
							<svelte:component this={icon} class="w-6 h-6 stroke-current" width="24" height="24" />
						</span>
					{/if}
					<span class="flex-1">{title}</span>
					{#if badge && badge != ''}
						<span class="badge badge-sm flex-none lowercase">{badge}</span>
					{/if}
				</a>
			</li>
		{/if}
	{/each}
</ul>
