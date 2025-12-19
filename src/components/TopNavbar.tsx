import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopNavbarProps {
  className?: string;
  onMenuClick?: () => void;
}

export function TopNavbar({ className, onMenuClick }: TopNavbarProps) {
  return (
    <header className={`h-14 md:h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 ${className}`}>
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden h-9 w-9"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search - Hidden on mobile */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari menu atau fitur..."
            className="pl-9 w-[200px] md:w-[300px] h-9 bg-muted/50 border-transparent focus:border-primary"
          />
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* Divider - Hidden on mobile */}
        <div className="hidden md:block h-8 w-px bg-border" />

        {/* Admin Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <Avatar className="h-8 w-8 md:h-9 md:w-9">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              AD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
