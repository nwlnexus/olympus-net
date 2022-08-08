import { invalidate } from '$app/navigation';
import { page } from '$app/stores';

type Parameters = {
	pending?: ({ data, form }: { data: FormData; form: HTMLFormElement }) => void;
	error?: ({
		data,
		form,
		response,
		error
	}: {
		data: FormData;
		form: HTMLFormElement;
		response: Response | null;
		error: Error | null;
	}) => void;
	result?: ({
		data,
		form,
		response
	}: {
		data: FormData;
		form: HTMLFormElement;
		response: Response;
	}) => void;
};

type Destroy = { destroy: () => void };
type Enhance = (form: HTMLFormElement, { pending, error, result }?: Parameters) => Destroy;

// this action (https://svelte.dev/tutorial/actions) allows us to
// progressively enhance a <form> that already works without JS
/**
 * @param {HTMLFormElement} form
 * @param {{
 *   pending?: ({ data, form }: { data: FormData; form: HTMLFormElement }) => void;
 *   error?: ({
 *     data,
 *     form,
 *     response,
 *     error
 *   }: {
 *     data: FormData;
 *     form: HTMLFormElement;
 *     response: Response | null;
 *     error: Error | null;
 *   }) => void;
 *   result?: ({
 *     data,
 *     form,
 *     response
 *   }: {
 *     data: FormData;
 *     response: Response;
 *     form: HTMLFormElement;
 *   }) => void;
 * }} [opts]
 */
export const enhance: Enhance = (form, { pending, error, result } = {}) => {
	let current_token: unknown;
	let invalidatePath: URL;

	page.subscribe((path) => {
		invalidatePath = path.url;
	});

	/** @param {SubmitEvent} e */
	async function handleSubmit(e: SubmitEvent) {
		const token = (current_token = {});
		e.preventDefault();

		const data = new FormData(form);

		if (pending) pending({ data, form });

		try {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const response = await fetch(form.action, {
				method: form?.method,
				headers: { accept: 'application/json' },
				body: data
			});

			if (token !== current_token) return;

			if (response.ok) {
				if (result) result({ data, form, response });
				const url = new URL(invalidatePath);
				url.search = url.hash = '';
				invalidate(url.href);
			} else if (error) {
				error({ data, form, error: null, response });
			} else {
				console.error(await response.text());
			}
		} catch (e: unknown) {
			if (error && e instanceof Error) {
				error({ data, form, error: e, response: null });
			}
		}
	}

	form?.addEventListener('submit', handleSubmit);

	return {
		destroy() {
			form?.removeEventListener('submit', handleSubmit);
		}
	};
};
