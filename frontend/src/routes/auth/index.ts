import {
	generateLoginURL,
	generateLogoutURL
} from '@cloudflare/pages-plugin-cloudflare-access/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ platform, url }) => {
	const action = url.searchParams.get('action');

	switch (action) {
		case 'login': {
			const loginURL = generateLoginURL({
				redirectURL: encodeURI(platform.env.APP_DOMAIN),
				domain: `https://${platform.env.APP_ACCESS_ORG.toLowerCase()}.cloudflareaccess.com`,
				aud: platform.env.APP_ACCESS_AUD
			});

			return new Response(null, {
				status: 302,
				headers: {
					Location: loginURL
				}
			});
		}
		case 'logout': {
			return new Response(null, {
				status: 302,
				headers: {
					Location: generateLogoutURL({
						domain: `https://${platform.env.APP_ACCESS_ORG.toLowerCase()}.cloudflareaccess.com`
					})
				}
			});
		}
		default:
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/'
				}
			});
	}
};
