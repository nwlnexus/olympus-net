import { generateLoginURL } from '@cloudflare/pages-plugin-cloudflare-access/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ platform }) => {
	const loginURL = generateLoginURL({
		redirectURL: encodeURI(platform.env.APP_DOMAIN),
		domain: `https://${platform.env.APP_ACCESS_ORG.toLowerCase()}.cloudflareaccess.com`,
		aud: platform.env.APP_ACCESS_AUD
	});

	console.log(loginURL);

	return new Response(null, {
		status: 302,
		headers: {
			Location: loginURL
		}
	});
};
