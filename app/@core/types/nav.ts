export type AppNav = {
  navMenu: NavMenu | [];
  userMenu: NavMenu | [];
};

export type NavMenu = Array<{
  href: string;
  label: string;
  icon?: string;
  description?: string;
  children?: NavMenu;
}>;
