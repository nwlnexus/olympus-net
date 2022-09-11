type AppNav = {
  navMenu: NavMenu | [];
};

type NavMenu = Array<{
  href: string;
  label: string;
  icon?: string;
  description?: string;
  children?: NavMenu;
}>;

export type { AppNav, NavMenu };
