export const publicPaths = ['/auth', '/auth/login', '/auth/logout', '/about'];
export const nodeDomains = ['nwlnexus.net', 'nwlnexus.com', 'nwlnexus.xyz'] as const;
export const nodePurpose = ['edge', 'non-edge'] as const;
export const status = ['active', 'inactive', 'pending'] as const;
export const roles = ['admin', 'read', 'owner'] as const;
export const ingressProtos = ['http://', 'https://', 'tcp://', 'udp://', 'ssh://'] as const;
export const pagesThatDontNeedSidebar = ['/'];
