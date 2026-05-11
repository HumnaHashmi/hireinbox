export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const dashboardNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "home" },
  { label: "New Campaign", href: "/dashboard/new-campaign", icon: "plus" },
  { label: "History", href: "/dashboard/history", icon: "clock" },
  { label: "Profile", href: "/dashboard/profile", icon: "user" },
  { label: "Upgrade", href: "/dashboard/upgrade", icon: "star" },
];
