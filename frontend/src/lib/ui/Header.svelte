<script lang="ts">
  import { page } from '$app/stores';
  import Logo from './Logo.svelte';
  import type { NavMenu } from "$types/helios";
  import { MenuIcon } from "@rgossiaux/svelte-heroicons/outline";
  // import { MoonIcon } from "@rgossiaux/svelte-heroicons/outline";
  // import { SunIcon } from "@rgossiaux/svelte-heroicons/outline";

  export let userMenu: NavMenu[];
</script>

<div class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
  <nav class="navbar w-full">
    <div class="flex flex-1 md:gap-1 lg:gap-2">
      <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
        <label for="drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
          <MenuIcon width=20 height=20 />
        </label>
      </span>
      {#if $page.url.pathname === '/' }
        <div class="flex items-center gap-2">
          <Logo />
        </div>
      {/if}
      <!-- Search Box -->
    </div>
    <div class="flex-0">
      <!-- <label class="swap swap-rotate">
        <input type="checkbox" />
        <SunIcon class="swap-on fill-current w-10 h-10" width="10" height="10" />
        <MoonIcon class="swap-off fill-current w-10 h-10" width="10" height="10" />
      </label> -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost rounded-btn">User</label>
        <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
          {#each userMenu as item}
            <li>
              <a href={item.href}>{item.title}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </nav>
</div>
