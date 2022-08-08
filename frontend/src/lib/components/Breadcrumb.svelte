<script lang="ts">
	import type { NavMenu } from '$types/helios';
	import HomeIcon from '@rgossiaux/svelte-heroicons/outline/Home';
	import ChevronRightIcon from '@rgossiaux/svelte-heroicons/outline/ChevronRight';
	import { page } from '$app/stores';

	export let navMenu: NavMenu[];
	let crumbs: { href: string; title: string }[] = [];

	const buildCrumbs = (path: string) => {
		crumbs = [];
		if (path === '/') {
			crumbs = [];
		} else {
			const leafs = path.split('/').filter((e) => e !== '');
			leafs.forEach((e) => {
				const l = navMenu.find((item) => item.href === `/${e}`);
				console.log(l);
				if (typeof l !== 'undefined') {
					crumbs.push({ href: l.href, title: l.title });
				}
			});
		}

		console.log(crumbs);
	};

	$: $page.url.pathname, buildCrumbs($page.url.pathname);
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex items-center space-x-4">
		<li>
			<div>
				<a href="/" class="text-gray-400 hover:text-gray-500">
					<HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
					<span class="sr-only">Home</span>
				</a>
			</div>
		</li>
		{#each crumbs as crumb}
			<li>
				<div class="flex items-center">
					<ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
					<a
						href={crumb.href}
						class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
						aria-current={crumb.href === $page.url.pathname ? true : undefined}>{crumb.title}</a
					>
				</div>
			</li>
		{/each}
	</ol>
</nav>
