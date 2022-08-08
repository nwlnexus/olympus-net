/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { encode } from '@cfworker/base64url';
import CryptoJS from 'crypto-js';
import { bindings } from '$utils';
import type { Account } from '$types/helios';

const { JANUS_URL, HELIOS_COM_SECRET_TOKEN } = bindings();

export const post: RequestHandler = async (event: RequestEvent) => {
	try {
		const { email, password } = await event.request.json();
		const hash = CryptoJS.HmacSHA256(password, HELIOS_COM_SECRET_TOKEN! as string);
		const int_resp = await fetch(`${JANUS_URL}/login`, {
			method: 'POST',
			headers: {
				'x-custom-token': HELIOS_COM_SECRET_TOKEN! as string,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: encode(email),
				phash: hash.toString()
			})
		});

		if (int_resp.status === 404) {
			return {
				status: 404
			};
		}
		const resp: Account = await int_resp.json();
		event.locals.session.data = Object.assign(resp);
		return {
			status: 200
		};
	} catch (err) {
		return {
			body: {},
			status: 400
		};
	}
};
