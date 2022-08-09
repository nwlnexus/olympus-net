export const publicPaths = ['/auth', '/auth/login', '/auth/logout', '/about'];
export const nodeDomains = ['nwlnexus.net', 'nwlnexus.com', 'nwlnexus.xyz'] as const;
export const nodePurpose = ['edge', 'non-edge'] as const;
export const status = ['active', 'inactive', 'pending'] as const;
export const roles = ['admin', 'read', 'owner'] as const;
export const ingressProtos = ['http://', 'https://', 'tcp://', 'udp://', 'ssh://'] as const;
export const pagesThatDontNeedSidebar = ['/'];
export const siteData = {
	title: 'Helios',
	desc: 'Helios application',
	card: '/images/default.jpg'
};
export const siteStats = {
	components: '47',
	themes: '29',
	githubStars: '+12,000',
	npmInstalls: '+1,000,000'
};
