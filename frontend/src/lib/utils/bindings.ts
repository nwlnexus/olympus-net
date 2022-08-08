// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
type bindsFunc = (promise: Promise<unknown>) => void;
type Binds = {
	WAITUNTIL?: bindsFunc | undefined;
	KVHELIOS?: KVNamespace;
	[key: string]: string | KVNamespace | DurableObjectNamespace | bindsFunc | undefined;
};
interface listParams {
	prefix?: string;
}

const binds: Partial<Binds> = {};

const devDO = function (url: string, secret: string) {
	// development connector for Durable Objects
	// NB this will only work if the export default request handler for your durable object
	// uses the header structure to reference the object id.
	// ie if you have a line like:
	//    const id = env.DOCRYPT.idFromName(name);
	// then that name variable should come from request header called idFromName eg:
	//    const name = request.headers.get(idFromName)
	// this isolates the id from the url structure which should allow this to work in pretty much all cases.

	const newUniqueId = function (_options = {}) {
		return { newUniqueId: true };
	};

	const idFromName = function (name: string) {
		return { idFromName: name };
	};

	const idFromString = function (hexId: string) {
		return { idFromString: hexId };
	};

	const get = function (idStruct) {
		const alarm = function () {
			throw "Sorry, haven't figured out the best way to implement alarm yet";
		};

		const myFetch = function (resource: string, init: RequestInit = {}) {
			let request;
			if (typeof resource === 'string') {
				init.headers = init.headers || {};
				init.headers = { ...init.headers, ...idStruct };
				init.headers!['Access-Key'] = secret;
				request = new Request(`${url}${resource}`, init);
			} else {
				request = resource;
			}
			return fetch(request);
		};

		return {
			alarm,
			fetch: myFetch
		};
	};

	return {
		newUniqueId,
		idFromName,
		idFromString,
		get
	};
};

const devKV = function (url: string, secret: string) {
	const get = async function (key: string) {
		const response = await fetch(`${url}/${encodeURIComponent(key)}`, {
			headers: { 'Access-Key': secret, 'Content-Type': 'application/json' }
		});
		return await response.json();
	};
	const getWithMetadata = async function (key: string) {
		const response = await fetch(`${url}/${encodeURIComponent(key)}`, {
			headers: { 'Access-Key': secret, 'Content-Type': 'application/json' }
		});
		return await response.json();
	};
	const put = async function (key: string, value: unknown) {
		const response = await fetch(`${url}/${encodeURIComponent(key)}`, {
			headers: { 'Access-Key': secret, 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(value)
		});
		return await response.json();
	};
	const list = async function ({ prefix }: listParams = {}) {
		const response = await fetch(`${url}/?prefix=${prefix ? encodeURIComponent(prefix) : ''}`, {
			headers: { 'Access-Key': secret, 'Content-Type': 'application/json' }
		});
		return await response.json();
	};
	const del = async function (key: string) {
		const response = await fetch(`${url}/${encodeURIComponent(key)}`, {
			headers: { 'Access-Key': secret, 'Content-Type': 'application/json' },
			method: 'DELETE'
		});
		return await response.json();
	};

	return { get, getWithMetadata, put, list, delete: del };
};

export const bindTo = function (platform: App.Platform, ...names: string[]) {
	if (platform && platform.env) {
		names.forEach((n) => {
			if (n === 'WAITUNTIL') {
				binds.WAITUNTIL = (promise: Promise<unknown>) => platform.context.waitUntil(promise);
			} else if (!binds[n]) {
				binds[n] = platform.env[n];
			} else {
				throw `No binding macthing ${n} was found.`;
			}
		});
	} else if (import.meta && import.meta.env) {
		const secret = import.meta.env.VITE_SECRET;

		names.forEach((name) => {
			if (!binds[name]) {
				const envVarName = `VITE_${name}`;
				if (name.startsWith('KV')) {
					binds[name] = devKV(import.meta.env[envVarName], secret);
				} else if (name.startsWith('DO')) {
					binds[name] = devDO(import.meta.env[envVarName], secret);
				} else if (name === 'WAITUNTIL') {
					binds.WAITUNTIL = async (promise) => {
						return await promise;
					};
				} else {
					binds[name] = import.meta.env[envVarName];
					if (!binds[name]) {
						binds[name] = process.env[name];
					}
				}
			}
		});
	} else {
		if (Object.keys(binds).length < 1) {
			throw 'No initial binding specified or platform or import meta env was missing.';
		}
	}
	return binds;
};

export const bindings = function () {
	if (!binds) {
		throw 'You must call usedBindings with the name of the variables you are going to need before calling bindings.';
	}
	return binds;
};
