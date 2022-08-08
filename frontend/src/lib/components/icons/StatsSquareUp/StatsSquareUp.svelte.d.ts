/* eslint-disable @typescript-eslint/no-explicit-any */
/** @typedef {typeof __propDef.props}  StatsSquareUpProps */
/** @typedef {typeof __propDef.events}  StatsSquareUpEvents */
/** @typedef {typeof __propDef.slots}  StatsSquareUpSlots */
export default class StatsSquareUp extends SvelteComponentTyped<
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
export type StatsSquareUpProps = typeof __propDef.props;
export type StatsSquareUpEvents = typeof __propDef.events;
export type StatsSquareUpSlots = typeof __propDef.slots;
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
