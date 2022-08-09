<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { buildMenus } from '$lib/build_menus';

  export const load: Load = async ({ url, stuff }) => {
    try {
      const { navMenu, userMenu } = await buildMenus();
      return {
        props: {
          navMenu,
          userMenu
        },
        stuff: stuff
      }
    } catch (e) {
      return { e };
    }
  }
</script>

<script lang="ts">
  import '../app.css';
  import Header from "$lib/ui/Header.svelte";
  import Sidebar from '$lib/ui/Sidebar.svelte';
  import type { NavMenu } from '$types/helios';

  export let navMenu: NavMenu[];
  export let userMenu: NavMenu[];
  let displayMenu: boolean;

  $: displayMenu, console.log(displayMenu);
</script>

<div class="bg-base-100 drawer drawer-mobile">
  <input id="drawer" type="checkbox" class="drawer-toggle" bind:checked={displayMenu} />
  <div class="drawer-content" style="scroll-behavior:smooth; scroll-padding: 5rem;">
    <Header {userMenu} />
      <!-- Main content -->
      <slot />
  </div>
  <Sidebar {navMenu} bind:displayMenu />
</div>
