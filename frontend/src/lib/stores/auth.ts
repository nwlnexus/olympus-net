import type { UserDetail } from '$types/helios';
import { type Writable, writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const userDetail: Writable<UserDetail | Record<string, unknown>> = writable({});
export const popupOpen = writable(false);
