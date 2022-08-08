<script lang="ts">
	import { zxcvbn, debounce, zxcvbnOptions } from '@zxcvbn-ts/core';
	import type { ZxcvbnResult } from '@zxcvbn-ts/core';
	import zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
	import zxcvbnEnPackage from '@zxcvbn-ts/language-en';
	import type { Account } from '$types/helios';

	export let team: Account[];

	let addMember = false;
	let addingMember = false;
	let avatar: string | ArrayBuffer | null;
	let files: FileList;
	let fileInput: HTMLInputElement;
	let password: string;
	let confirmPassword: string;
	let passwdScore: boolean;
	let zxcvbnResult: ZxcvbnResult | null;
	const newMember: Account = { status: 'pending' };
	let error: unknown;

	const zOptions = {
		translations: zxcvbnEnPackage.translations,
		useLevenshteinDistance: true,
		graphs: zxcvbnCommonPackage.adjacencyGraphs,
		dictionary: {
			...zxcvbnCommonPackage.dictionary,
			...zxcvbnEnPackage.dictionary
		}
	};

	zxcvbnOptions.setOptions(zOptions);

	const useZxcvbn = async () => {
		if (password) {
			zxcvbnResult = await zxcvbn(password);
		} else {
			zxcvbnResult = null;
		}
	};

	const debouncedZxcvbn = debounce(useZxcvbn, 10, true);

	const getBase64 = (img: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onloadend = () => {
			avatar = reader.result;
		};
	};

	const handleAddMember = async () => {
		addingMember = true;
		try {
			if (typeof avatar === 'string') {
				newMember.img = avatar;
			}
			const submit = await fetch('/team', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify([newMember, password])
			});
			let response = await submit.json();
		} catch (err) {
			error = err;
		} finally {
			addingMember = false;
			addMember = false;
		}
	};
</script>

<svelte:head>
	<title>Helios | Accounts</title>
	<meta name="description" content="Helios app" />
</svelte:head>

<div class="sm:flex sm:items-center">
	<div class="sm:flex-auto">
		{#if addMember}
			<p class="mt-2 text-sm text-gray-700">Add a member to the team.</p>
		{:else}
			<p class="mt-2 text-sm text-gray-700">
				A list of all the users in your account including their name, title, email and role.
			</p>
		{/if}
	</div>
	<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
		<button
			on:click={() => (addMember = !addMember)}
			type="button"
			class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
			>{addMember ? 'Cancel' : 'Add user'}</button
		>
	</div>
</div>
{#if addMember}
	<br />
	<form
		class="space-y-8 divide-y divide-gray-200"
		id="add-team-member"
		on:submit|preventDefault={handleAddMember}
	>
		<div class="space-y-8 divide-y divide-gray-200">
			<div>
				<div>
					<p class="mt-1 text-sm text-gray-500">
						This information will be displayed publicly so be careful what you share.
					</p>
				</div>
				<div class="pt-8">
					<div>
						<h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
						<p class="mt-1 text-sm text-gray-500">
							Use a permanent address where you can receive mail.
						</p>
					</div>
					<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div class="sm:col-span-3">
							<label for="first-name" class="block text-sm font-medium text-gray-700">
								First name
							</label>
							<div class="mt-1">
								<input
									type="text"
									name="first-name"
									id="first-name"
									autocomplete="given-name"
									bind:value={newMember.fname}
									class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div class="sm:col-span-3">
							<label for="last-name" class="block text-sm font-medium text-gray-700">
								Last name
							</label>
							<div class="mt-1">
								<input
									type="text"
									name="last-name"
									id="last-name"
									autocomplete="family-name"
									bind:value={newMember.lname}
									class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>
						<div class="sm:col-span-3">
							<label for="title" class="block text-sm font-medium text-gray-700"> Title </label>
							<div class="mt-1">
								<input
									id="title"
									name="title"
									type="text"
									bind:value={newMember.title}
									class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>
						<div class="sm:col-span-3">
							<label for="role" class="block text-sm font-medium text-gray-700"> Role </label>
							<div class="mt-1">
								<select
									id="role"
									name="role"
									class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									bind:value={newMember.permission}
								>
									<option value="read">Read</option>
									<option value="admin">Administrator</option>
									<option value="owner">Owner</option>
								</select>
							</div>
						</div>
						<div class="sm:col-span-4">
							<label for="email" class="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div class="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autocomplete="email"
									required
									bind:value={newMember.email}
									class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>
						<div class="sm:col-span-3">
							<label for="password" class="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div class="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autocomplete="password"
									required
									class={passwdScore
										? ''
										: '"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"'}
									bind:value={password}
									on:input={debouncedZxcvbn}
								/>
							</div>
						</div>

						<div class="sm:col-span-3">
							{#if zxcvbnResult}
								<label for="password-strength" class="block text-sm font-medium text-gray-700">
									Password Strength
								</label>
								<div class="mt-1">{zxcvbnResult.score}</div>
							{/if}
						</div>
						<div class="sm:col-span-3">
							<label for="confirm-password" class="block text-sm font-medium text-gray-700">
								Confirm Password
							</label>
							<div class="mt-1">
								<input
									id="confirm-password"
									name="confirm-password"
									type="password"
									autocomplete="password"
									required
									class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									bind:value={confirmPassword}
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
					<div class="sm:col-span-6">
						<label for="about" class="block text-sm font-medium text-gray-700"> About </label>
						<div class="mt-1">
							<textarea
								id="about"
								name="about"
								rows="3"
								class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
							/>
						</div>
						<p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
					</div>

					<div class="sm:col-span-6">
						<label for="photo" class="block text-sm font-medium text-gray-700"> Photo </label>
						<div class="mt-1 flex items-center">
							<span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
								{#if avatar}
									<img id="avatar" src={avatar.toString()} alt="avatar" />
								{:else}
									<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
								{/if}
							</span>
							<input
								class="hidden"
								id="file-to-upload"
								type="file"
								accept=".png,.jpg,.jpeg"
								bind:this={fileInput}
								bind:files
								on:change={() => getBase64(files[0])}
							/>
							<button
								on:click={() => fileInput.click()}
								type="button"
								class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>Change</button
							>
						</div>
					</div>

					<div class="sm:col-span-6">
						<label for="cover-photo" class="block text-sm font-medium text-gray-700">
							Cover photo
						</label>
						<div
							class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
						>
							<div class="space-y-1 text-center">
								<svg
									class="mx-auto h-12 w-12 text-gray-400"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
									aria-hidden="true"
								>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<div class="flex text-sm text-gray-600">
									<label
										for="file-upload"
										class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
									>
										<span>Upload a file</span>
										<input id="file-upload" name="file-upload" type="file" class="sr-only" />
									</label>
									<p class="pl-1">or drag and drop</p>
								</div>
								<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pt-5">
			<div class="flex justify-end">
				<button
					on:click={() => (addMember = !addMember)}
					type="button"
					class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>Cancel</button
				>
				<button
					type="submit"
					form="add-team-member"
					class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>Save</button
				>
			</div>
		</div>
	</form>
{:else}
	<div
		class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
	>
		<table class="min-w-full divide-y divide-gray-300">
			<thead class="bg-gray-50">
				<tr>
					<th
						scope="col"
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
						>Title</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
						>Email</th
					>
					<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th
					>
					<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each team as user}
					<tr>
						<td
							class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
						>
							{user.fname}
							{user.lname}
							<dl class="font-normal lg:hidden">
								<dt class="sr-only">Title</dt>
								<dd class="mt-1 truncate text-gray-700">{user.title}</dd>
								<dt class="sr-only sm:hidden">Email</dt>
								<dd class="mt-1 truncate text-gray-500 sm:hidden">{user.email}</dd>
							</dl>
						</td>
						<td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{user.title}</td>
						<td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{user.email}</td>
						<td class="px-3 py-4 text-sm text-gray-500">{user.permission}</td>
						<td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
							<a href="/team/{user.uuid}" class="text-indigo-600 hover:text-indigo-900"
								>Edit<span class="sr-only">, {user.fname} {user.lname}</span></a
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
