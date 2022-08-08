export function ErrorHandler(e: {
	stdout?;
	message?: string;
	status?: number;
	name?: string;
	error?: string;
}): { status: number; body: { message: string; error: string | undefined } } {
	if (e && e instanceof Error) {
		e = new Error(e.toString());
	}
	let truncatedError = e;
	if (e.stdout) {
		truncatedError = e.stdout;
	}
	const payload = {
		status: truncatedError.status || 500,
		body: {
			message: 'Ooops, something is not okay, are you okay?',
			error: truncatedError.error || truncatedError.message
		}
	};
	if (truncatedError?.name === 'NotFoundError') {
		payload.status = 404;
	}

	return payload;
}
