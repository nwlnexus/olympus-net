<script lang="ts">
	import type { EdgeNode } from '$types/helios';
	import InPlaceEdit from '$lib/components/InPlaceEdit.svelte';

	export let node: EdgeNode;

	function submit(field: string) {
		return ({ detail: newValue }: { detail: string }) => {
			console.log(`updated ${field} to ${newValue}`);
		};
	}
</script>

<div class="p-5">
	<div>
		<h3 class="text-lg leading-6 font-medium text-gray-900">Node Information</h3>
		<p class="mt-1 max-w-2xl text-sm text-gray-500">
			Node specific Information. Used in node communication
		</p>
	</div>
	<div class="mt-5 border-t border-gray-200">
		<dl class="sm:divide-y sm:divide-gray-200">
			<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
				<dt class="text-sm font-medium text-gray-500">Name</dt>
				<InPlaceEdit
					bind:value={node.name}
					on:submit={submit('name')}
					styleClass="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
				/>
			</div>
			<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
				<dt class="text-sm font-medium text-gray-500">FQDN</dt>
				<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{node.fqdn}</dd>
			</div>
			<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
				<dt class="text-sm font-medium text-gray-500">Salary expectation</dt>
				<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
			</div>
			<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
				<dt class="text-sm font-medium text-gray-500">About</dt>
				<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
					Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
					consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud
					in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit
					deserunt qui eu.
				</dd>
			</div>
		</dl>
	</div>
</div>
