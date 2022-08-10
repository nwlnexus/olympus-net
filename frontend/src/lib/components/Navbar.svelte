<script lang="ts">
	import { page } from '$app/stores';
	import Search from '../components/Search.svelte';
	import { ChevronDownIcon } from '@rgossiaux/svelte-heroicons/outline';
	import { MenuIcon } from '@rgossiaux/svelte-heroicons/outline';
	import { MoonIcon } from '@rgossiaux/svelte-heroicons/outline';
	import { SunIcon } from '@rgossiaux/svelte-heroicons/outline';
	import { UserCircleIcon } from '@rgossiaux/svelte-heroicons/outline';

	const { userMenu } = $page.stuff;
	export let drawerContentScrollY: number;

	$: switchNavbarStyle = drawerContentScrollY > 40 ? true : false;
</script>

<div
	class={`
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100
  ${
		$page.url.pathname == '/'
			? switchNavbarStyle
				? 'bg-base-100 text-base-content shadow-sm'
				: 'text-primary-content'
			: switchNavbarStyle
			? 'bg-base-100 text-base-content shadow-sm'
			: 'bg-base-100 text-base-content'
	}
  `}
>
	<nav class="navbar w-full">
		<div class="flex flex-1 md:gap-1 lg:gap-2">
			<span
				class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
				data-tip="Menu"
			>
				<label
					for="drawer"
					class="btn btn-square btn-ghost drawer-button {$page.url.pathname != '/'
						? 'lg:hidden'
						: ''}"
				>
					<MenuIcon width="20" height="20" />
				</label>
			</span>
			<div class={`flex items-center gap-2 ${$page.url.pathname === '/' ? '' : 'lg:hidden'}`}>
				<a
					href="/"
					aria-current="page"
					aria-label="Helios Home"
					class={`flex-0 btn btn-ghost px-2 ${
						switchNavbarStyle || $page.url.pathname != '/' ? '' : 'hidden'
					}`}
				>
					<div
						class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl"
					>
						<span
							class={`lowercase ${
								switchNavbarStyle || $page.url.pathname != '/'
									? 'text-primary'
									: 'text-primary-content'
							}`}>helios</span
						>
						<span
							class={`uppercase ${
								switchNavbarStyle || $page.url.pathname != '/'
									? 'text-base-content'
									: 'text-primary-content'
							}`}>UI</span
						>
					</div>
				</a>
				<a
					href="/docs/changelog"
					class={`link link-hover font-mono text-xs text-opacity-50 ${
						switchNavbarStyle || $page.url.pathname != '/' ? '' : 'hidden'
					}`}
				>
					<div data-tip="Changelog" class="tooltip tooltip-bottom">1.00.0</div>
				</a>
			</div>
			<div class="hidden w-full max-w-sm lg:flex">
				<Search />
			</div>
		</div>
		<div class="flex-0">
			<div title="User menu" class="dropdown dropdown-end">
				<div tabindex="0" class="btn gap-1 normal-case btn-ghost">
					<UserCircleIcon
						width="20"
						height="20"
						class="inline-block h-5 w-5 stroke-current md:w-6 md:h-6"
					/>
					<ChevronDownIcon width="12" height="12" />
				</div>
				<ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
					{#each userMenu as { href, title }}
						<li>
							<a {href}>{title}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</nav>
</div>
