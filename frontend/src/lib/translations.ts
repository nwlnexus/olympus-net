import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
	fallbackLocale: 'en',
	translations: {
		es: { lang },
		fr: { lang },
		en: { lang }
	},
	loaders: [
		{
			locale: 'es',
			key: '',
			loader: async () => (await import('./locales/es.json')).default
		},
		{
			locale: 'fr',
			key: '',
			loader: async () => (await import('./locales/fr.json')).default
		},
		{
			locale: 'en',
			key: '',
			loader: async () => (await import('./locales/en.json')).default
		}
	]
};

export const { t, locales, locale, loadTranslations } = new i18n(config);
