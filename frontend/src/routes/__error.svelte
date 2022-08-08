<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status }) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script lang="ts">
	export let status: number;
	export let error: Error | null;
</script>

<div class="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
	<div class="max-w-max mx-auto">
		<main class="sm:flex">
			<p class="text-4xl font-extrabold text-slate-600 sm:text-5xl">{status}</p>
			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<h1 class="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
						An error occured....
					</h1>
					<h1 class="text-4xl font-extrabold text-blue-900 tracking-tight sm:text-5xl">
						&#58;&#40;
					</h1>
					<br />
					<p class="mt-1 text-base text-blue-500">
						{error}
					</p>
				</div>
				<div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
					<a
						href="/"
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Go back home
					</a>
					<a
						href="/support"
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Contact support
					</a>
				</div>
			</div>
		</main>
	</div>
</div>
