import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  Droplets,
  Settings
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Farm Map", href: "/map", icon: Map },
  { name: "Irrigation", href: "/irrigation", icon: Droplets },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-60 flex-col bg-agro-bg-overlay border-r">
      <div className="flex h-14 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="AgroSmart" className="h-8 w-8" />
          <span className="font-bold text-agro-green">AgroSmart</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  isActive && "bg-agro-green-light/20 text-agro-green-dark font-medium"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <div className="rounded-lg bg-agro-green-light/10 p-3">
          <p className="text-sm font-medium text-agro-green">System Status</p>
          <p className="text-xs text-muted-foreground">All systems online</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-agro-success animate-pulse"></div>
            <span className="text-xs text-agro-success">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}