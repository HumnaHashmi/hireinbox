export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const dashboardNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "home" },
];
