import type { RequestEvent } from '@sveltejs/kit';
import { bindings } from '$utils';
import type { Account } from '$types/helios';
import CryptoJS from 'crypto-js';

const { JANUS_URL, HELIOS_COM_SECRET_TOKEN } = bindings();
/** @type {import('./__types/team').RequestHandler} */
export async function get() {
	const team_res = await fetch(`${JANUS_URL}/accounts`, {
		method: 'GET',
		headers: {
			'x-custom-token': HELIOS_COM_SECRET_TOKEN as string,
			'Content-Type': 'application/json'
		}
	});

	if (team_res) {
		const team = await team_res.json();
		return {
			body: { team }
		};
	}
	return {
		status: 404
	};
}

/** @type {import('./__types/team').RequestHandler} */
export async function post({ request }: RequestEvent) {
	const [data, password]: [Account, string] = await request.json();

	data.phash = CryptoJS.HmacSHA256(password, HELIOS_COM_SECRET_TOKEN as string).toString();

	const submit_member = await fetch(`${JANUS_URL}/accounts`, {
		method: 'POST',
		headers: {
			'x-custom-token': HELIOS_COM_SECRET_TOKEN as string,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([data])
	});

	const resp: { status?: string; message?: string; detail?: string }[] = await submit_member.json();

	if (resp[0].status === 'failed') {
		return {
			status: 400
		};
	}
	return {
		status: 200
	};
}
