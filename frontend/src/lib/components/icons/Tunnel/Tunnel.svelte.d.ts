/* eslint-disable @typescript-eslint/no-explicit-any */
/** @typedef {typeof __propDef.props}  DashboardProps */
/** @typedef {typeof __propDef.events}  DashboardEvents */
/** @typedef {typeof __propDef.slots}  DashboardSlots */
export default class Dashboard extends SvelteComponentTyped<
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
export type DashboardProps = typeof __propDef.props;
export type DashboardEvents = typeof __propDef.events;
export type DashboardSlots = typeof __propDef.slots;
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
