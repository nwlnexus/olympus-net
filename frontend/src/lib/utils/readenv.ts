export const readEnv = (id: string, defaultValue = '') => {
	if (import.meta.env[id] !== undefined) {
		return import.meta.env[id];
	}
	return defaultValue;
};
