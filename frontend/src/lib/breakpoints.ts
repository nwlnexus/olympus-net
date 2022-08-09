import { useMediaQuery } from '$lib/mediaQuery';
import resolveConfig from 'tailwindcss/resolveConfig.js';
import tailwindConfig from '../../tailwind.config.mjs?url';
import type { Config } from 'tailwindcss';

export function increaseWithUnit(target: number | string, delta: number) {
	if (typeof target === 'number') return target + delta;
	const value = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || '';
	const unit = target.slice(value.length);
	const result = parseFloat(value) + delta;
	if (Number.isNaN(result)) return target;
	return result + unit;
}

export function useBreakpoints() {
	const fullConfig = resolveConfig(tailwindConfig as unknown as Config);
	const breakpoints = fullConfig.theme!.screens;

	function getValue(k: string, delta = 0) {
		let v = breakpoints[k];

		if (delta != null) v = increaseWithUnit(v, delta);

		if (typeof v === 'number') v = `${v}px`;

		return v;
	}

	function match(query: string) {
		if (!window) return false;
		return window.matchMedia(query).matches;
	}

	const greater = (k: string) => {
		return useMediaQuery(`(min-width: ${getValue(k)})`);
	};

	const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
		Object.defineProperty(shortcuts, k, {
			get: () => greater(k),
			enumerable: true,
			configurable: true
		});
		return shortcuts;
	}, {});

	return {
		greater,
		smaller(k: string) {
			return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`);
		},
		between(a: string, b: string) {
			return useMediaQuery(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
		},
		isGreater(k: string) {
			return match(`(min-width: ${getValue(k)})`);
		},
		isSmaller(k: string) {
			return match(`(max-width: ${getValue(k, -0.1)})`);
		},
		isInBetween(a: string, b: string) {
			return match(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
		},
		...shortcutMethods
	};
}
