<script lang="ts">
	import { CheckCircleIcon } from '@rgossiaux/svelte-heroicons/outline';
</script>

<div
	class="from-primary to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-20"
>
	<div
		class="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-40 lg:flex-row lg:items-end lg:gap-0 xl:gap-20"
	>
		<div class="lg:pl-10 lg:pb-32">
			<div class="mb-2 py-4 text-center lg:py-10 lg:text-left">
				<h1 class="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl">heliosUI</h1>
				<h2 class="font-title text-lg font-extrabold sm:text-2xl lg:text-3xl">
					System management app. <br />Built on serverless technology stacks <br />with both
					serverless and server(full)🤔🤣 management capabilities.
				</h2>
			</div>
			<div
				class="flex w-full flex-col items-center space-y-10 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0"
			>
				<div class="my-2 flex max-w-sm flex-col gap-2 text-left">
					<div class="flex gap-2">
						<CheckCircleIcon width="20" height="20" class="inline-block h-6 w-6 stroke-current" />
						System management
					</div>
					<div class="flex gap-2">
						<CheckCircleIcon width="20" height="20" class="inline-block h-6 w-6 stroke-current" />
						System reporting
					</div>
					<div class="flex gap-2">
						<CheckCircleIcon width="20" height="20" class="inline-block h-6 w-6 stroke-current" />
						Zero Trust management
					</div>
				</div>
				<div class="mockup-window w-full border border-base-300">
					<div class="flex justify-center px-4 py-16 border-t border-base-300">heliosUI!</div>
				</div>
			</div>
			<div class="mt-4 flex flex-1 justify-center space-x-2 lg:mt-6 lg:justify-start">
				<a
					sveltekit:prefetch
					href="/dashboard"
					class="btn btn-ghost btn-active lg:btn-lg normal-case"
				>
					<span class="hidden sm:inline">Dashboard</span>
					<span class="inline sm:hidden">Dashboard</span>
				</a>
			</div>
		</div>
	</div>
	<svg
		class="fill-secondary col-start-1 row-start-1 h-auto w-full"
		width="1600"
		height="595"
		viewBox="0 0 1600 595"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"
		/></svg
	>
</div>
