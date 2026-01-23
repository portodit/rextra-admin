import { MemberUser } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Eye, AlertTriangle } from "lucide-react";

// Import emblem assets
import emblemStarter from "@/assets/emblem-starter.png";
import emblemBasic from "@/assets/emblem-basic.png";
import emblemPro from "@/assets/emblem-pro.png";
import emblemMax from "@/assets/emblem-max.png";

interface UserTableViewProps {
  users: MemberUser[];
  onViewDetail: (user: MemberUser) => void;
}

const tierEmblems: Record<string, string> = {
  Max: emblemMax,
  Pro: emblemPro,
  Basic: emblemBasic,
  Starter: emblemStarter,
  Standard: emblemStarter,
};

const tierColors: Record<string, { bg: string; text: string }> = {
  Max: { bg: "bg-amber-50", text: "text-amber-700" },
  Pro: { bg: "bg-blue-50", text: "text-blue-700" },
  Basic: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Starter: { bg: "bg-orange-50", text: "text-orange-700" },
  Standard: { bg: "bg-slate-50", text: "text-slate-600" },
};

export function UserTableView({ users, onViewDetail }: UserTableViewProps) {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "REXTRA Club":
        return <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-500 hover:to-teal-500 border-0 text-[10px] font-semibold">REXTRA CLUB</Badge>;
      case "Trial Club":
        return <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-500 hover:to-purple-500 border-0 text-[10px] font-semibold">TRIAL CLUB</Badge>;
      case "Non-Club":
        return <Badge className="bg-slate-500 text-white hover:bg-slate-500 border-0 text-[10px] font-semibold">NON CLUB</Badge>;
    }
  };

  const getTierBadge = (tier: string) => {
    const colors = tierColors[tier] || tierColors.Standard;
    const emblem = tierEmblems[tier] || emblemStarter;
    return (
      <div className="flex items-center gap-2">
        <img src={emblem} alt={tier} className="h-6 w-6 object-contain" />
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
          {tier}
        </span>
      </div>
    );
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="min-w-[200px]">User</TableHead>
            <TableHead className="min-w-[100px]">Kategori</TableHead>
            <TableHead className="min-w-[80px]">Tier</TableHead>
            <TableHead className="min-w-[100px]">Berakhir</TableHead>
            <TableHead className="min-w-[100px]">Sisa Hari</TableHead>
            <TableHead className="min-w-[100px]">Auto-renew</TableHead>
            <TableHead className="w-[80px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id} 
              className="cursor-pointer hover:bg-sky-50/50"
              onClick={() => onViewDetail(user)}
            >
              <TableCell>
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="text-xs font-mono text-muted-foreground">{user.userId}</p>
                </div>
              </TableCell>
              <TableCell>{getCategoryBadge(user.category)}</TableCell>
              <TableCell>{getTierBadge(user.tier)}</TableCell>
              <TableCell>
                {user.endDate ? user.endDate.toLocaleDateString("id-ID") : "-"}
              </TableCell>
              <TableCell>
                <span className={`font-medium flex items-center gap-1 ${
                  user.validityStatus === "Expired" ? "text-red-600" :
                  user.validityStatus === "Expiring" ? "text-amber-600" :
                  "text-foreground"
                }`}>
                  {user.validityStatus === "Expired" 
                    ? `${Math.abs(user.remainingDays)}`
                    : user.remainingDays}
                  {user.validityStatus === "Expiring" && (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  )}
                </span>
              </TableCell>
              <TableCell>
                {user.autoRenew ? (
                  <div className="flex items-center gap-1 text-primary">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">ON</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">OFF</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetail(user);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
