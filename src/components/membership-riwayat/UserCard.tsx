import { MemberUser } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RefreshCw, AlertTriangle, Calendar, Clock, ChevronRight } from "lucide-react";

// Import emblem assets
import emblemStarter from "@/assets/emblem-starter.png";
import emblemBasic from "@/assets/emblem-basic.png";
import emblemPro from "@/assets/emblem-pro.png";
import emblemMax from "@/assets/emblem-max.png";

interface UserCardProps {
  user: MemberUser;
  onViewDetail: (user: MemberUser) => void;
}

const tierConfig: Record<string, { 
  emblem: string; 
  gradient: string; 
  bgSoft: string; 
  textColor: string;
  borderColor: string;
}> = {
  Max: { 
    emblem: emblemMax, 
    gradient: "from-amber-400 to-orange-500", 
    bgSoft: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200"
  },
  Pro: { 
    emblem: emblemPro, 
    gradient: "from-blue-400 to-indigo-500", 
    bgSoft: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200"
  },
  Basic: { 
    emblem: emblemBasic, 
    gradient: "from-emerald-400 to-teal-500", 
    bgSoft: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200"
  },
  Starter: { 
    emblem: emblemStarter, 
    gradient: "from-orange-400 to-amber-500", 
    bgSoft: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200"
  },
  Standard: { 
    emblem: emblemStarter, 
    gradient: "from-slate-400 to-slate-500", 
    bgSoft: "bg-slate-50",
    textColor: "text-slate-600",
    borderColor: "border-slate-200"
  },
};

export function UserCard({ user, onViewDetail }: UserCardProps) {
  const config = tierConfig[user.tier] || tierConfig.Standard;

  const getCategoryBadge = () => {
    switch (user.category) {
      case "REXTRA Club":
        return (
          <Badge className="absolute -top-2 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-[10px] font-semibold px-2.5 py-0.5 shadow-md">
            REXTRA CLUB
          </Badge>
        );
      case "Trial Club":
        return (
          <Badge className="absolute -top-2 right-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 text-[10px] font-semibold px-2.5 py-0.5 shadow-md">
            TRIAL CLUB
          </Badge>
        );
      case "Non-Club":
        return (
          <Badge className="absolute -top-2 right-3 bg-slate-500 text-white border-0 text-[10px] font-semibold px-2.5 py-0.5 shadow-md">
            NON CLUB
          </Badge>
        );
    }
  };

  const getValidityIndicator = () => {
    if (user.validityStatus === "Expired") {
      return { 
        bg: "bg-red-50", 
        border: "border-red-200",
        text: "text-red-600", 
        label: "Expired",
        ring: "ring-red-300"
      };
    }
    if (user.validityStatus === "Expiring") {
      return { 
        bg: "bg-amber-50", 
        border: "border-amber-200",
        text: "text-amber-600", 
        label: "Segera Berakhir",
        ring: "ring-amber-300"
      };
    }
    return null;
  };

  const validityIndicator = getValidityIndicator();

  return (
    <div 
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetail(user)}
    >
      {/* Category Badge - Top Right Corner */}
      {getCategoryBadge()}
      
      <div className="p-5 pt-4">
        {/* Header: Avatar + Identity + Tier Emblem */}
        <div className="flex items-start gap-4">
          {/* Avatar with status ring */}
          <Avatar className={`h-12 w-12 ring-2 ring-offset-2 ring-offset-background shrink-0 ${validityIndicator?.ring || 'ring-primary/20'}`}>
            <AvatarFallback className={`${config.bgSoft} ${config.textColor} font-semibold text-sm`}>
              {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          {/* User Info */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="font-semibold text-foreground truncate leading-tight">{user.name}</h3>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
            <p className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">{user.userId}</p>
          </div>
          
          {/* Tier Emblem */}
          <div className="shrink-0">
            <img 
              src={config.emblem} 
              alt={user.tier} 
              className="h-12 w-12 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Tier Badge - Soft color */}
        <div className="mt-4 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.bgSoft} ${config.textColor} ${config.borderColor} border text-xs font-semibold`}>
            {user.tier} Plan
          </span>
          
          {/* Validity Warning */}
          {validityIndicator && (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${validityIndicator.bg} ${validityIndicator.border} border ${validityIndicator.text} text-xs font-medium`}>
              <AlertTriangle className="h-3 w-3" />
              {validityIndicator.label}
            </span>
          )}
        </div>

        {/* Duration Info - Clean card style */}
        <div className={`mt-4 p-3 rounded-xl border ${
          validityIndicator 
            ? `${validityIndicator.bg} ${validityIndicator.border}` 
            : 'bg-muted/30 border-border/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {user.endDate ? user.endDate.toLocaleDateString("id-ID") : "Tidak ada batas waktu"}
              </span>
            </div>
            {user.autoRenew && (
              <div className="flex items-center gap-1 text-primary">
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Auto</span>
              </div>
            )}
          </div>
          
          {user.endDate && (
            <div className="mt-2 flex items-center gap-2">
              <Clock className={`h-4 w-4 ${validityIndicator?.text || 'text-foreground'}`} />
              <span className={`text-sm font-semibold ${validityIndicator?.text || 'text-foreground'}`}>
                {user.validityStatus === "Expired" 
                  ? `${Math.abs(user.remainingDays)} hari lalu`
                  : `${user.remainingDays} hari tersisa`}
              </span>
            </div>
          )}
        </div>

        {/* CTA Button - Clean and minimal */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4 justify-between text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(user);
          }}
        >
          <span className="text-sm font-medium">Lihat Detail</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
