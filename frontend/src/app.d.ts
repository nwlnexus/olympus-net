/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	interface Platform {
		env: {
			WORKER_URL: string;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		};
		caches: CacheStorage & { default: Cache };
	}
	// interface Session {}
	interface Stuff {
		pages: import('$types/helios').NavMenu[];
	}
}

interface SessionData {
	uuid?: string | null;
	permission?: string;
	lang?: string;
}
