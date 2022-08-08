<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { buildMenus } from '$lib/build_menus';

  export const load: Load = async ({ stuff }) => {
    try {
      const { navMenu, userMenu, settingsMenu } = await buildMenus();
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
</script>

<div class="bg-base-100 drawer drawer-mobile">
  <input id="drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content" style="scroll-behavior:smooth; scroll-padding: 5rem;">
    <Header />
    <div class="p-6 pb-16">
      <!-- Main content -->
      <slot />
    </div>
  </div>
  <Sidebar {navMenu}/>
</div>
