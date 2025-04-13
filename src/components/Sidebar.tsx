
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, Calendar, Clock, Menu, X, Home } from "lucide-react";
import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  icon: React.ElementType;
  route: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: Home,
    route: "/",
  },
  {
    label: "Notes",
    icon: BookOpen,
    route: "/notes",
  },
  {
    label: "Documents",
    icon: FileText,
    route: "/documents",
  },
  {
    label: "Assignments",
    icon: Calendar,
    route: "/assignments",
  },
  {
    label: "Pomodoro",
    icon: Clock,
    route: "/pomodoro",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="font-semibold text-lg animate-fade-in">StudyFlow</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.route}
            className={cn(
              "flex items-center gap-4 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              "focus-ring"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            StudyFlow v1.0.0
          </div>
        )}
      </div>
    </div>
  );
}
