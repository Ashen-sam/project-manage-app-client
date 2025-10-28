export interface SidebarProps {
  className?: string;
}

export interface HeaderBarProps {
  className?: string;
  title?: string;
}

export interface GlobalLayoutProps {
  children?: React.ReactNode;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href: string;
  badge?: string | number;
}

export interface SidebarNavProps {
  items: NavItem[];
  className?: string;
}
