<script lang="ts">
	import SEO from '$components/SEO.svelte';
	import HomepageHero from '$lib/components/homepage/Hero.svelte';
	import HomepagePreview from '$lib/components/homepage/Preview.svelte';
	import HomepageStats from '$lib/components/homepage/Stats.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<SEO title="Main" />
<HomepageHero />

<div class="bg-base-200 flex flex-col items-center gap-20 py-20">
	<HomepagePreview />
	<HomepageStats />
	<div class="flex w-full justify-center">
		<a sveltekit:prefetch href="/dashboard" class="btn btn-primary btn-wide">Dashboard</a>
	</div>
</div>
<Footer />
