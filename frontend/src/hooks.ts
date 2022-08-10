import cloudflareAdapterPlatform from './helpers/_mf';
import cookie from 'cookie';
import { handleSession } from '$components/session/handle';
import { locales } from '$lib/translations';
import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = handleSession(
	{
		key: import.meta.env.VITE_COOKIE_TAG,
		secret: import.meta.env.VITE_COOKIE_KEY,
		expires: 1,
		cookie: {
			secure: true
		}
	},
	async ({ event, resolve }) => {
		const { url, request } = event;
		const supportedLocales = locales.get();
		event.platform = await cloudflareAdapterPlatform(event.platform);

		console.log(event.platform);

		let locale = '';
		let response: Response;

		if (event.locals.cookies['lang']) {
			locale = event.locals.cookies['lang'];
		} else if (typeof locale === 'undefined') {
			locale = `${`${request.headers.get('accept-language')}`.match(
				/[a-zA-Z]+?(?=-|_|,|;)/
			)}`.toLowerCase();
		}

		if (!supportedLocales.includes(locale)) locale = 'en';

		try {
			if (event.locals.cookies) {
				if (event.locals.cookies[import.meta.env.VITE_COOKIE_KEY]) {
					const newSession = {};
					if (JSON.stringify(event.locals.session.data) !== JSON.stringify(newSession)) {
						event.locals.session.data = { ...newSession };
					}
				}
			}

			response = await resolve(event, {
				transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale}">`)
			});
		} catch (e) {
			console.error(e);
			response = await resolve(event, {
				transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale}">`)
			});
		}

		response.headers.append(
			'Set-Cookie',
			cookie.serialize('lang', locale, {
				path: '/',
				sameSite: 'strict',
				maxAge: 30 * 24 * 60 * 60
			})
		);

		return response;
	}
);

export const getSession: GetSession = function (event) {
	return {
		lang: event.locals.cookies['lang'],
		...event.locals.session.data
	};
};
