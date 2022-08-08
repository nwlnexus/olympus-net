import { EdgeNode, AppEnv, AppRequest, EdgeNodePartial } from '@/types';
import { findNodeByFQDN, filteredQuery, nanoidID, nanoidToken, retrieveAll } from '@/utils';
import { nodeCreateValidator } from '@/validators';
import { error, json } from 'itty-router-extras';

// export async function authenticateNode(req: AppRequest, env: AppEnv): Promise<Response> {
//   if (typeof req.uuid === undefined) {
//     return error(400, { error: 'You must include a node.' });
//   } else {
//     const uuid = req.uuid!;
//     const kv_result: KVNamespaceGetWithMetadataResult<EdgeNode, unknown> =
//       await env.HELIOS_KV.getWithMetadata(`a:${uuid}`, { type: 'json' });
//     if (kv_result !== null) {
//       return json({ phash: kv_result.value!.phash });
//     } else {
//       return error(404, { error: 'Invalid account' });
//     }
//   }
// }

// export async function updateNodes(req: AppRequest, env: AppEnv): Promise<Response> {
//   // const { pathname } = new URL(req.url);
//   const uuid: string | undefined = req.uuid;
//   const res: { status: string; message?: string; detail?: string }[] = [];
//   if (typeof uuid === 'undefined') {
//     return error(400, { error: 'You must include an account to be processed.' });
//   }
//   if (typeof req.content === 'undefined' || Object.keys(req.content).length <= 0) {
//     return error(400, { error: 'You must include account data to be processed.' });
//   }
//   const data: EdgeNodePartial[] | undefined = Object.assign(req.content);
//   if (typeof data !== 'undefined') {
//     const { valid, errors } = accUpdateValidator.validate(data);
//     if (valid) {
//       const kv_result: KVNamespaceGetWithMetadataResult<EdgeNode, unknown> =
//         await env.HELIOS_KV.getWithMetadata(`a:${uuid}`, { type: 'json' });
//       if (kv_result !== null) {
//         kv_result.value = Object.assign(data);
//         res.push({
//           status: 'success',
//         });
//       }
//     } else {
//       const err = errors.at(-1);
//       res.push({
//         status: 'failed',
//         message: 'Error occured.',
//         detail: `Error: ${err?.error}`,
//       });
//     }
//   }
//   return json(res);
// }

export async function createNodes(req: AppRequest, env: AppEnv): Promise<Response> {
	const res: { status: string; message?: string; detail?: string }[] = [];
	if (typeof req.content === 'undefined' || Object.keys(req.content).length <= 0) {
		return error(400, { error: 'You must include account data to be processed.' });
	}
	const data: EdgeNodePartial = Object.assign(req.content && req.content);
	const { valid, errors } = nodeCreateValidator.validate(data);
	if (valid) {
		const n: EdgeNode = {
			uuid: nanoidID(),
			token: nanoidToken(),
			status: 'active',
			...data
		};
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const node_check = await findNodeByFQDN(env, n.fqdn!);
		if (node_check.length !== 0) {
			res.push({
				status: 'failed',
				message: 'An node with that email already exists.'
			});
			return json(res, { status: 500 });
		}
		const kv_resp = await env.HELIOS_KV.put(`n:${n.uuid}`, JSON.stringify(n));
		if (kv_resp === null) {
			res.push({
				status: 'failed',
				message: 'System error occured while attempting to persist this node.'
			});
			return json(res, { status: 500 });
		} else {
			res.push({
				status: 'success',
				message: `Node ID: ${n.uuid}`
			});
			return json(res, { status: 201 });
		}
	} else {
		const err = errors.at(-1);
		res.push({
			status: 'failed',
			message: 'Error occured.',
			detail: `Error: ${err?.error}`
		});
		return json(res, { status: 500 });
	}
}

// export async function deleteNodes(req: AppRequest, env: AppEnv): Promise<Response> {
//   const uuid = req.uuid;
//   if (typeof uuid === 'undefined') {
//     return new Response(null, { status: 204 });
//   }
//   const kv_resp: KVNamespaceGetWithMetadataResult<EdgeNode, unknown> =
//     await env.HELIOS_KV.getWithMetadata(`a:${uuid}`, { type: 'json' });
//   if (kv_resp === null) {
//     return new Response('', { status: 204 });
//   }
//   const acc = kv_resp.value!;
//   acc.status = 'inactive';
//   await env.HELIOS_KV.put(`a:${uuid}`, JSON.stringify(acc));

//   return new Response(null, { status: 204 });
// }

export async function listNodes(req: AppRequest, env: AppEnv): Promise<Response> {
	const { searchParams, pathname } = new URL(req.url);
	const params = [...searchParams];
	const uuid = req.uuid;

	if (typeof uuid === 'string') {
		// This case the base64 encoding of the email was provided as a path param.
		// Even if filter search params were provided, they will be ignored. we won't bother invoking filtering on 1 record.
		const acc: object | null = await env.HELIOS_KV.get(`n:${uuid}`, { type: 'json' });
		if (acc === null) {
			return error(404, { error: 'No record found.' });
		}
		return json(acc as object);
	} else if (typeof uuid === 'undefined' && params.length > 0) {
		// This case the base64 encoding of the email was NOT provided as a path param
		// BUT filter search params were provided.
		const filterRegEx = new RegExp('^filter.(.*)$', 'i');
		const paramFilter = params.filter((i) => i[0].match(filterRegEx));

		if (paramFilter.length <= 0) {
			return error(400, 'No filter specified.');
		} else {
			const queryParams = paramFilter.map((i) => {
				return {
					f: i[0].split('.')[1],
					v: i[1]
				};
			});
			const res = (
				await Promise.all(
					queryParams.map(async (e) => {
						return await filteredQuery(e.f, e.v, env, pathname);
					})
				)
			).flat();
			return json(res);
		}
	} else {
		return json((await retrieveAll(env, 'nodes')) as EdgeNode[]);
	}
}
