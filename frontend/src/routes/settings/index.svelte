<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { NavMenu } from '$types/helios';
	import ChevronLeftIcon from '@rgossiaux/svelte-heroicons/outline/ChevronLeft';

	export let settingsMenu: NavMenu[];
	export let section: string;

	let currentSection = false;
</script>

<svelte:head>
	<title>Helios | Settings</title>
	<meta name="description" content="Helios app" />
</svelte:head>

<div>
  Settings
</div>
