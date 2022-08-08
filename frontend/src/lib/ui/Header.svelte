<script lang="ts">
  import { MenuIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { SearchIcon } from "@rgossiaux/svelte-heroicons/outline";
</script>

<div class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
  <nav class="navbar w-full">
    <div class="flex flex-1 md:gap-1 lg:gap-2">
      <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
        <label for="drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
          <MenuIcon width=20 height=20 />
        </label>
      </span>
      <!-- <div class="flex items-center gap-2">
        <a href="/" aria-current="page" aria-label="Helios Home" class="flex-0 btn btn-ghost px-2">
          <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
            <span class="lowercase text-primary">helios</span>
            <span class="uppercase text-base-content">UI</span>
          </div>
        </a>
        <a href="/docs/changelog" class="link link-hover font-mono text-xs text-opacity-50">
          <div data-tip="Changelog" class="tooltip tooltip-bottom">1.00.0</div>
        </a>
      </div> -->
      <!-- Search Box -->
    </div>
    <div class="flex-0">
      <!-- Sidebar toggle -->
      <!-- User menu -->
    </div>
  </nav>
</div>
