/* eslint-disable @typescript-eslint/no-explicit-any */
/** @typedef {typeof __propDef.props}  KubernetesProps */
/** @typedef {typeof __propDef.events}  KubernetesEvents */
/** @typedef {typeof __propDef.slots}  KubernetesSlots */
export default class Kubernetes extends SvelteComponentTyped<
	{
		[x: string]: any;
	},
	{
		click: MouseEvent;
		mouseover: MouseEvent;
		mouseenter: MouseEvent;
		mouseleave: MouseEvent;
		keydown: KeyboardEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	},
	{
		default: Record<string, unkown>;
	}
> {}
export type KubernetesProps = typeof __propDef.props;
export type KubernetesEvents = typeof __propDef.events;
export type KubernetesSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: any;
	};
	events: {
		click: MouseEvent;
		mouseover: MouseEvent;
		mouseenter: MouseEvent;
		mouseleave: MouseEvent;
		keydown: KeyboardEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: Record<string, unkown>;
	};
};
export {};
