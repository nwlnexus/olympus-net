<script lang="ts">
	import type { NavMenu } from '$types/helios';
	import { Menu, MenuItem, MenuItems, MenuButton } from '@rgossiaux/svelte-headlessui';
	export let userMenu: NavMenu[];
</script>

<Menu as="div" class="relative flex-shrink-0">
	<div>
		<MenuButton
			class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<span class="sr-only">Open user menu</span>
			<img
				class="h-8 w-8 rounded-full"
				src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
				alt=""
			/>
		</MenuButton>
	</div>
	<transition
		enter-active-class="transition ease-out duration-100"
		enter-from-class="transform opacity-0 scale-95"
		enter-to-class="transform opacity-100 scale-100"
		leave-active-class="transition ease-in duration-75"
		leave-from-class="transform opacity-100 scale-100"
		leave-to-class="transform opacity-0 scale-95"
	>
		<MenuItems
			class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			{#each userMenu as item}
				<MenuItem let:active>
					<a
						href={item.href}
						class="{active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700"
						>{item.title}</a
					>
				</MenuItem>
			{/each}
		</MenuItems>
	</transition>
</Menu>
