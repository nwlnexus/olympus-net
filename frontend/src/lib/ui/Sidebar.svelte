<script lang="ts">
  import type { NavMenu } from '$types/helios';
  import { page } from '$app/stores';

  export let navMenu: NavMenu[];
</script>

<!-- Narrow sidebar -->
<div class="drawer-side" style="scroll-behavior: smooth; scroll-padding-top: 5em;">
  <label for="drawer" class="drawer-overlay"></label>
  <aside class="bg-base-200 w-80">
    <div class="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex">
      <a href="/" aria-current="page" aria-label="Helios Home" class="flex-0 btn btn-ghost px-2">
        <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
          <span class="lowercase text-primary">helios</span>
          <span class="uppercase text-base-content">UI</span>
          </div>
      </a>
      <a href="/docs/changelog" class="link link-hover font-mono text-xs text-opacity-50">
        <div data-tip="Changelog" class="tooltip tooltip-bottom">1.00.0</div>
      </a>
    </div>
    <div class="h-4"></div>
    <ul class="menu menu-compact flex flex-col p-0 px-4">
      {#each navMenu as item}
        <li>
          <a
            sveltekit:prefetch href={item.href}
            class="{$page.url.pathname === item.href ? 'flex gap-4 active' : 'flex gap-4'}"
            aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          >
            <span class="flex-none">
              <svelte:component this={item.icon} class="w-6 h-6 stroke-current" width=24 height=24/>
            </span>
            <span class="flex-1">{item.title}</span>
          </a>
        </li>
      {/each}
    </ul>
    <div class="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent"></div>
  </aside>
</div>
