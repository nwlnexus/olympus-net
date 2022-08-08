import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { bindings } from '$utils';

const { KVHELIOS } = bindings();

type GetParams = {
	uuid: string;
};

type GetResponseBody = {
	node: string | Record<string, never>;
};

export const get: RequestHandler<GetParams, GetResponseBody> = async ({ params }) => {
	const data = await KVHELIOS?.get(`n:${params.uuid}`);

	if (typeof data === 'undefined' || data === null) {
		return {
			status: 404,
			body: {
				node: {}
			}
		};
	} else {
		return {
			body: {
				node: data
			}
		};
	}
};
