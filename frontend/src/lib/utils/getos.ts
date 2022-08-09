export const getOS = () => {
	const userAgent = window.navigator.userAgent.toLowerCase(),
		macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
		windowsPlatforms = /(win32|win64|windows|wince)/i,
		iosPlatforms = /(iphone|ipad|ipod)/i;

	let os = '';

	if (macosPlatforms.test(userAgent)) {
		os = 'macos';
	} else if (iosPlatforms.test(userAgent)) {
		os = 'ios';
	} else if (windowsPlatforms.test(userAgent)) {
		os = 'windows';
	} else if (/android/.test(userAgent)) {
		os = 'android';
	} else if (!os && /linux/.test(userAgent)) {
		os = 'linux';
	}

	return os;
};
