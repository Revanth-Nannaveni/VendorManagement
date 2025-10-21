import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  RefreshCw,
  UserMinus,
  FileText,
  Calendar,
  ListChecks,
  Bell,
  User,
  HelpCircle,
  Menu,
  X,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Inbox,
  CheckCircle,
  UserX,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
 
const fteMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Onboarding Request", url: "/onboarding", icon: UserPlus },
  { title: "Replacement Request", url: "/replacement", icon: RefreshCw },
  { title: "Offboarding Request", url: "/offboarding", icon: UserMinus },
  { title: "Spend Summary", url: "/rate-card", icon: FileText },
  { title: "Interviews Calendar", url: "/interview", icon: Calendar },
  // { title: "Pipeline View", url: "/pipeline-view", icon: TrendingUp },
  // { title: "Request Tracking", url: "/request-tracking", icon: ListChecks },
  // { title: "Video Verification", url: "/video-verification", icon: Calendar },
];
 
const businessDeskMenuItems = [
  { title: "Dashboard", url: "/business-dashboard", icon: LayoutDashboard },
  { title: "Approval Inbox", url: "/approval-inbox", icon: CheckSquare },
  // { title: "Rate Card Review", url: "/business-rate-card", icon: FileText },
  { title: "Budget Management", url: "/budget-management", icon: DollarSign },
  // { title: "Pipeline View", url: "/pipeline-view", icon: TrendingUp },
  // { title: "Request Tracking", url: "/business-request-tracking", icon: ListChecks },
];
 
const vendorMenuItems = [
  { title: "Dashboard", url: "/vendor-dashboard", icon: LayoutDashboard },
  { title: "Request Inbox", url: "/vendor-request-inbox", icon: Inbox },
  // { title: "Submit Rate Card", url: "/vendor-submit-ratecard", icon: FileText },
  // { title: "Schedule Interview", url: "/vendor-schedule-interview", icon: Calendar },
  { title: "Confirmation", url: "/vendor-confirmation", icon: CheckCircle },
  // { title: "Offboarding", url: "/vendor-offboarding-request", icon: UserX },
];
 
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("fte-lead");
  const navigate = useNavigate();
 
  useEffect(() => {
    const storedUser = localStorage.getItem("vomsUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    }
  }, []);
 
  const menuItems =
    userRole === "business-desk"
      ? businessDeskMenuItems
      : userRole === "vendor"
      ? vendorMenuItems
      : fteMenuItems;
 
  const handleLogout = () => {
    localStorage.removeItem("vomsUser");
    toast.success("Logged out successfully");
    navigate("/");
  };
 
  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
 
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
 
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">VOMS</h1>
          </div>
 
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.url}>
                  <NavLink
                    to={item.url}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-base",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              ))}
             
            </ul>
          </nav>
 
          {/* Footer */}
          <div className="p-4 ">
            <button
                  onClick={handleLogout}
                  style={{color : "red", }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-base w-full text-left",
                    "text-sidebar-foreground hover:bg-red-100"
                  )}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
            <p className="text-xs text-muted-foreground text-center">
              {/* © 2025 VMS v1.0 */}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
 