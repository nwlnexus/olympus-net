import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, platform }) => {
	return {
		body: {
			nodes: []
		}
	};
};

// export const post: RequestHandler = async ({ request }: RequestEvent) => {
// 	const body = await request.formData();
// 	const data: EdgeNodePartial = {
// 		name: body.get('name') as string,
// 		fqdn: `${body.get('name') as string}.${body.get('fqdn') as string}`,
// 		kind: body.get('kind') as NodePurpose
// 	};

// 	if (data === null) {
// 		return {
// 			status: 400,
// 			headers: {
// 				'content-type': 'application/json;charset=UTF-8'
// 			},
// 			body: {
// 				message: JSON.stringify('You must include account data to be processed.')
// 			}
// 		};
// 	}

// 	const { valid, errors } = nodeCreateValidator.validate(data);
// 	if (valid) {
// 		const node: EdgeNode = {
// 			uuid: nanoidID(),
// 			token: nanoidToken(),
// 			status: 'active',
// 			...data
// 		};
// 		const node_check = await findNodeByFQDN(node.fqdn);
// 		if (node_check.length !== 0) {
// 			return {
// 				status: 400,
// 				headers: {
// 					'content-type': 'application/json;charset=UTF-8'
// 				},
// 				body: {
// 					message: JSON.stringify('An node with that FQDN already exists.')
// 				}
// 			};
// 		}
// 		const kv_resp = await KVHELIOS?.put(`n:${node.uuid}`, JSON.stringify(node));
// 		if (kv_resp) {
// 			return {
// 				status: 201,
// 				headers: {
// 					'content-type': 'application/json;charset=UTF-8'
// 				}
// 			};
// 		}
// 	} else {
// 		const err = errors.at(-1);
// 		return {
// 			status: 400,
// 			headers: {
// 				'content-type': 'application/json;charset=UTF-8'
// 			},
// 			body: {
// 				message: JSON.stringify(err)
// 			}
// 		};
// 	}

// 	return {};
// };

// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
// const redirect = {
// 	status: 303,
// 	headers: {
// 		location: '/todos'
// 	}
// };
