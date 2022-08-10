import type { SvelteComponentTyped } from 'svelte';
/// <reference types="@sveltejs/kit" />

import { ingressProtos, nodePurpose, roles, status } from '../constants';

export interface NavMenu {
	title: string;
	href: string;
	icon: SvelteComponentTyped | string;
	badge?: string;
	description?: string;
	sub?: NavMenu[];
	hidden?: boolean;
	highlightAnotherItem?: string;
	tags: string;
}

export interface LinkStyle {
	active: string;
	inactive: string;
}

export interface Cookies {
	'kit.session'?: string;
	'kit.helios'?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Session<SessionType = Record<string, any>> {
	shouldSendToClient?: boolean;
	data: SessionType & {
		expires?: Date;
	};
	refresh: (expires_in_days?: number) => boolean;
	destroy: () => boolean;
}
export interface SessionOptions {
	key?: string;
	secret: CBinaryLike | { id: number; secret: CBinaryLike }[];
	expires?: number;
	rolling?: true | number;
	cookie?: Omit<CookieSerializeOptions, 'expires' | 'maxAge' | 'encode'>;
}

export type AccountStatus = typeof status[number];
export type NodeStatus = typeof status[number];
export const accountStatusCheck: Set<string> = new Set(status);

export type AccountRoles = typeof roles[number];
export const accountRolesCheck: Set<string> = new Set(roles);

export type RecordType = 'accounts' | 'nodes';
export type RecordTypePrefix = 'a' | 'n' | null;

export type Account = {
	uuid?: string;
	phash?: string;
	status?: AccountStatus;
	email?: string;
	fname?: string;
	lname?: string;
	permission?: AccountRoles;
	title?: string;
	about?: string;
	img?: string | ArrayBuffer | null;
	cover?: string | ArrayBuffer | null;
};

export type NodePurpose = typeof nodePurpose[number];
export interface EdgeNodePartial {
	name: string;
	fqdn: string;
	kind: NodePurpose;
}
export interface EdgeNode extends EdgeNodePartial {
	uuid: string;
	token: string;
	status: NodeStatus;
	irs?: IngressProtos[];
	cfd_id?: string;
}

export type IngressProtos = typeof ingressProtos[number];
interface EdgeNodeIngressRoute {
	hostname: string;
	service: string;
	port?: number;
	proto?: IngressProtos;
}

export interface UIState {
	showRAside: boolean;
}
