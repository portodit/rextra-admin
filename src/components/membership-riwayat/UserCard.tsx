import { MemberUser } from "./types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RefreshCw, Calendar, Clock, ChevronRight } from "lucide-react";
import { TierBadge, CategoryBadge } from "./StatusBadges";

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
  bgSoft: string; 
  textColor: string;
  borderColor: string;
  ring: string;
}> = {
  Max: { 
    emblem: emblemMax, 
    bgSoft: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    ring: "ring-amber-300"
  },
  Pro: { 
    emblem: emblemPro, 
    bgSoft: "bg-violet-50",
    textColor: "text-violet-700",
    borderColor: "border-violet-200",
    ring: "ring-violet-300"
  },
  Basic: { 
    emblem: emblemBasic, 
    bgSoft: "bg-sky-50",
    textColor: "text-sky-700",
    borderColor: "border-sky-200",
    ring: "ring-sky-300"
  },
  Starter: { 
    emblem: emblemStarter, 
    bgSoft: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    ring: "ring-emerald-300"
  },
  Standard: { 
    emblem: emblemStarter, 
    bgSoft: "bg-slate-50",
    textColor: "text-slate-600",
    borderColor: "border-slate-200",
    ring: "ring-slate-300"
  },
};

export function UserCard({ user, onViewDetail }: UserCardProps) {
  const config = tierConfig[user.tier] || tierConfig.Standard;

  const getValidityStyle = () => {
    if (user.validityStatus === "Expired") {
      return { 
        bg: "bg-red-50", 
        border: "border-red-200",
        text: "text-red-600", 
        ring: "ring-red-300"
      };
    }
    if (user.validityStatus === "Expiring") {
      return { 
        bg: "bg-amber-50", 
        border: "border-amber-200",
        text: "text-amber-600", 
        ring: "ring-amber-300"
      };
    }
    return { 
      bg: "bg-muted/30", 
      border: "border-border/50",
      text: "text-foreground", 
      ring: config.ring
    };
  };

  const validityStyle = getValidityStyle();

  return (
    <div 
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetail(user)}
    >
      <div className="p-5">
        {/* Header: Avatar + Identity + Tier Emblem */}
        <div className="flex items-start gap-3">
          {/* Avatar with status ring */}
          <Avatar className={`h-11 w-11 ring-2 ring-offset-2 ring-offset-background shrink-0 ${validityStyle.ring}`}>
            <AvatarFallback className={`${config.bgSoft} ${config.textColor} font-semibold text-sm`}>
              {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate leading-tight text-[15px]">{user.name}</h3>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
            <p className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">{user.userId}</p>
          </div>
          
          {/* Tier Emblem */}
          <div className="shrink-0">
            <img 
              src={config.emblem} 
              alt={user.tier} 
              className="h-11 w-11 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Status Badges Row - Using shared components */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <TierBadge tier={user.tier} />
          <CategoryBadge category={user.category} />
        </div>

        {/* Duration Info Box */}
        <div className={`mt-4 p-3 rounded-xl border ${validityStyle.bg} ${validityStyle.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {user.endDate ? user.endDate.toLocaleDateString("id-ID") : "Tidak terbatas"}
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
              <Clock className={`h-4 w-4 ${validityStyle.text}`} />
              <span className={`text-sm font-semibold ${validityStyle.text}`}>
                {user.validityStatus === "Expired" 
                  ? `Expired ${Math.abs(user.remainingDays)} hari lalu`
                  : `${user.remainingDays} hari tersisa`}
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
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
