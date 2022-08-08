/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SessionOptions } from '$types/helios';
import type { Handle } from '@sveltejs/kit';
import CookieSession from './core';

export function handleSession(
	options: SessionOptions,
	passedHandle: Handle = async ({ event, resolve }) => resolve(event)
): Handle {
	return async function handle({ event, resolve }) {
		const { session, cookies } = CookieSession(event.request.headers, options) as any as {
			session: { 'set-cookie': string };
			cookies: Record<string, string>;
		};

		(event.locals as any).session = session;
		(event.locals as any).cookies = cookies;

		const response = await passedHandle({ event, resolve });

		if (!session['set-cookie']) {
			return response;
		}

		const sessionCookie = session['set-cookie'];
		response.headers.append('set-cookie', sessionCookie);

		return response;
	};
}
