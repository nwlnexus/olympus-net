import type { UserDetail } from '$types/helios';
import { isAuthenticated, popupOpen, userDetail } from '$lib/stores/auth';
import createAuth0Client, { Auth0Client, type PopupLoginOptions } from '@auth0/auth0-spa-js';

async function createClient() {
	const auth0Client = await createAuth0Client({
		domain: import.meta.env.VITE_AUTH0_DOMAIN,
		client_id: import.meta.env.VITE_AUTH0_CLIENT_ID
	});

	return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?: PopupLoginOptions) {
	popupOpen.set(true);
	try {
		await client.loginWithPopup(options);

		userDetail.set((await client.getUser()) as UserDetail);
		isAuthenticated.set(true);
	} catch (e) {
		console.log(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(client: Auth0Client) {
	return client.logout();
}

const auth = {
	createClient,
	loginWithPopup,
	logout
};

export default auth;
