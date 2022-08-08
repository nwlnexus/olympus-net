import { bindings } from '$utils';

const { HERMES_URL, JANUS_URL, HELIOS_COM_SECRET_TOKEN } = bindings();

/**
 * @param {string} method
 * @param {string} endpoint
 * @param {string} resource
 * @param {Record<string, unknown>} [data]
 */
export function api(
	method: string,
	endpoint: string,
	resource: string,
	data?: Record<string, unknown>
) {
	let ep: string;
	let headers: Record<string, string>;
	if (endpoint.toLowerCase() === 'janus') {
		ep = JANUS_URL as string;
		headers = {
			'content-type': 'application/json',
			'x-custom-token': HELIOS_COM_SECRET_TOKEN as string
		};
	} else if (endpoint.toLowerCase() === 'hermes') {
		ep = HERMES_URL as string;
		headers = {
			'content-type': 'application/json',
			'x-custom-token': HELIOS_COM_SECRET_TOKEN as string
		};
	} else {
		ep = endpoint;
		headers = {
			'content-type': 'application/json'
		};
	}

	return fetch(`${ep}/${resource}`, {
		method,
		headers,
		body: data && JSON.stringify(data)
	});
}
