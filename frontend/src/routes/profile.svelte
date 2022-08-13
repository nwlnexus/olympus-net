<script lang="ts">
	import SEO from '$components/SEO.svelte';
	import { userDetail } from '$lib/stores/auth';
</script>

<SEO title="Profile" />
{Object.entries($userDetail)}
