/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Account, AppEnv, AppRequest, PartialAccount } from '@/types';
import { filteredQuery, findAccountByEmail, nanoidID, retrieveAll } from '@/utils';
import { accCreateValidator, accUpdateValidator } from '@/validators';
import { decode } from '@cfworker/base64url';
import { error, json } from 'itty-router-extras';

export async function authenticateAccount(req: AppRequest, env: AppEnv): Promise<Response> {
	if (typeof req.content === 'undefined') {
		return error(400, { error: 'You must include an account.' });
	} else {
		const data: PartialAccount = Object.assign(req.content!);
		if (typeof data === 'undefined') {
			return error(400, { error: 'You must include an account.' });
		}
		const { email, phash } = data;
		const acc = await findAccountByEmail(env, decode(email));
		if (acc == []) {
			return error(404, 'Account not found');
		} else if (phash === acc[0].phash) {
			return json({
				uuid: acc[0].uuid,
				permission: acc[0].permission
			});
		} else {
			return error(403, 'Invalid credentials.');
		}
	}
}

export async function updateAccounts(req: AppRequest, env: AppEnv): Promise<Response> {
	// const { pathname } = new URL(req.url);
	const uuid: string | undefined = req.uuid;
	const res: { status: string; message?: string; detail?: string }[] = [];
	if (typeof uuid === 'undefined') {
		return error(400, { error: 'You must include an account to be processed.' });
	}
	if (typeof req.content === 'undefined' || Object.keys(req.content).length <= 0) {
		return error(400, { error: 'You must include account data to be processed.' });
	}
	const data: PartialAccount[] | undefined = Object.assign(req.content);
	if (typeof data !== 'undefined') {
		const { valid, errors } = accUpdateValidator.validate(data);
		if (valid) {
			const kv_result: KVNamespaceGetWithMetadataResult<Account, unknown> =
				await env.HELIOS_KV.getWithMetadata(`a:${uuid}`, { type: 'json' });
			if (kv_result !== null) {
				const updated_acc = { ...kv_result.value, ...data };
				await env.HELIOS_KV.put(`a:${uuid}`, JSON.stringify(updated_acc));
				res.push({
					status: 'success'
				});
			}
		} else {
			const err = errors.at(-1);
			res.push({
				status: 'failed',
				message: 'Error occured.',
				detail: `Error: ${err?.error}`
			});
		}
	}
	return json(res);
}

export async function createAccounts(req: AppRequest, env: AppEnv): Promise<Response> {
	const res: { status: string; message?: string; detail?: string }[] = [];
	if (typeof req.content === 'undefined' || Object.keys(req.content).length <= 0) {
		return error(400, { error: 'You must include account data to be processed.' });
	}
	const data: PartialAccount[] = Object.assign(req.content!);
	console.log(data);
	for (const account of data) {
		const { valid, errors } = accCreateValidator.validate(account);
		if (valid) {
			const acc: Account = {
				uuid: nanoidID(),
				status: 'active',
				...account
			};
			const acct_check = await findAccountByEmail(env, account.email);
			if (typeof acc.permission === 'undefined') {
				acc.permission = 'read';
			}
			if (typeof acc.title === 'undefined') {
				acc.title = 'None';
			}
			if (acct_check.length !== 0) {
				res.push({
					status: 'failed',
					message: 'An account with that email already exists.'
				});
				continue;
			}
			const kv_resp = await env.HELIOS_KV.put(`a:${acc.uuid}`, JSON.stringify(acc));
			if (kv_resp === null) {
				res.push({
					status: 'failed',
					message: 'System error occured while attempting to persist this account.'
				});
			} else {
				res.push({
					status: 'success',
					message: `Account ID: ${acc.uuid}`
				});
			}
		} else {
			const err = errors.at(-1);
			res.push({
				status: 'failed',
				message: 'Error occured.',
				detail: `Error: ${err?.error}`
			});
		}
	}
	return json(res, { status: 200 });
}

export async function deleteAccounts(req: AppRequest, env: AppEnv): Promise<Response> {
	const uuid = req.uuid;
	if (typeof uuid === 'undefined') {
		return new Response(null, { status: 204 });
	}
	const kv_resp: KVNamespaceGetWithMetadataResult<Account, unknown> =
		await env.HELIOS_KV.getWithMetadata(`a:${uuid}`, { type: 'json' });
	if (kv_resp === null) {
		return new Response('', { status: 204 });
	}
	const acc = kv_resp.value!;
	acc.status = 'inactive';
	await env.HELIOS_KV.put(`a:${uuid}`, JSON.stringify(acc));

	return new Response(null, { status: 204 });
}

export async function listAccounts(req: AppRequest, env: AppEnv): Promise<Response> {
	const { searchParams, pathname } = new URL(req.url);
	const params = [...searchParams];
	const uuid = req.uuid;

	if (typeof uuid === 'string') {
		// This case the base64 encoding of the email was provided as a path param.
		// Even if filter search params were provided, they will be ignored. we won't bother invoking filtering on 1 record.
		const acc: object | null = await env.HELIOS_KV.get(`a:${uuid}`, { type: 'json' });
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
		const res: Account[] | unknown = await retrieveAll(env, 'accounts');
		return json(res as object);
	}
}
