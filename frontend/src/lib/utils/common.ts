import type { RequestEvent } from '@sveltejs/kit';
import { customAlphabet } from 'nanoid';

export const nanoidID = customAlphabet('0123456789abcdef', 44);
export const nanoidToken = customAlphabet('0123456789abcdef', 96);

export const getUserSession = async (event: RequestEvent): Promise<SessionData> => {
	const data = event?.locals?.session?.data;
	const payload = {
		...data,
		status: 200,
		body: {
			message: 'OK'
		}
	};

	return payload;
};

export function toggleNav(o: boolean): boolean {
	o = !o;
	return o;
}

// export function isAccountStatus(name: string): boolean {
// 	const accStatus = status.find((validStatus) => validStatus === name);
// 	if (accStatus) {
// 		return true;
// 	}
// 	return false;
// }

// export function isAccountRole(name: string): boolean {
// 	const accRole = roles.find((validRoles) => validRoles === name);
// 	if (accRole) {
// 		return true;
// 	}
// 	return false;
// }

export function daysToMaxage(days: number) {
	const today = new Date();
	const resultDate = new Date(today);
	resultDate.setDate(today.getDate() + days);

	return resultDate.getTime() / 1000 - today.getTime() / 1000;
}

export function maxAgeToDateOfExpiry(maxAge: number) {
	return new Date(Date.now() + maxAge * 1000);
}

export function base64Encode(buf: ArrayBuffer) {
	let string = '';
	new Uint8Array(buf).forEach((byte) => {
		string += String.fromCharCode(byte);
	});
	return btoa(string);
}

export function base64Decode(string: string) {
	string = atob(string);
	const length = string.length,
		buf = new ArrayBuffer(length),
		bufView = new Uint8Array(buf);
	for (let i = 0; i < length; i++) {
		bufView[i] = string.charCodeAt(i);
	}
	return buf;
}
