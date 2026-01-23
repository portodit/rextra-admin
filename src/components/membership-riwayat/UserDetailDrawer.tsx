import { MemberUser, JourneyEvent } from "./types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RefreshCw, Coins, Gift, Lock, ExternalLink, Calendar, Clock,
  ArrowRight, ShoppingCart, TrendingUp, TrendingDown, Play, XCircle, RotateCcw
} from "lucide-react";
import { generateMockJourneyEvents } from "./mockData";
import { useMemo } from "react";

// Import emblem assets
import emblemStarter from "@/assets/emblem-starter.png";
import emblemBasic from "@/assets/emblem-basic.png";
import emblemPro from "@/assets/emblem-pro.png";
import emblemMax from "@/assets/emblem-max.png";

interface UserDetailDrawerProps {
  user: MemberUser | null;
  open: boolean;
  onClose: () => void;
}

const tierEmblems: Record<string, string> = {
  Max: emblemMax,
  Pro: emblemPro,
  Basic: emblemBasic,
  Starter: emblemStarter,
  Standard: emblemStarter,
};

const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  Max: { bg: "bg-amber-100/60", text: "text-amber-700", border: "border-amber-200" },
  Pro: { bg: "bg-blue-100/60", text: "text-blue-700", border: "border-blue-200" },
  Basic: { bg: "bg-emerald-100/60", text: "text-emerald-700", border: "border-emerald-200" },
  Starter: { bg: "bg-orange-100/60", text: "text-orange-700", border: "border-orange-200" },
  Standard: { bg: "bg-slate-100/60", text: "text-slate-600", border: "border-slate-200" },
};

const eventIcons: Record<string, React.ElementType> = {
  "First Purchase": ShoppingCart,
  "Renewal": RotateCcw,
  "Upgrade": TrendingUp,
  "Downgrade": TrendingDown,
  "Trial Start": Play,
  "Expired": XCircle,
};

export function UserDetailDrawer({ user, open, onClose }: UserDetailDrawerProps) {
  const journeyEvents = useMemo(() => 
    user ? generateMockJourneyEvents(user.id) : [], 
    [user]
  );

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    if (!journeyEvents.length) return { totalPurchase: 0, totalDuration: 0, transactionCount: 0 };
    
    const purchaseEvents = journeyEvents.filter(e => !e.isFuture && e.total !== undefined);
    const totalPurchase = purchaseEvents.reduce((sum, e) => sum + (e.total || 0), 0);
    const totalDuration = purchaseEvents.reduce((sum, e) => {
      const durationMatch = e.duration?.match(/(\d+)/);
      return sum + (durationMatch ? parseInt(durationMatch[1]) : 0);
    }, 0);
    
    return { totalPurchase, totalDuration, transactionCount: purchaseEvents.length };
  }, [journeyEvents]);

  if (!user) return null;

  const tierColor = tierColors[user.tier] || tierColors.Standard;
  const tierEmblem = tierEmblems[user.tier] || emblemStarter;

  const getCategoryBadge = () => {
    switch (user.category) {
      case "REXTRA Club":
        return (
          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-[10px] font-semibold px-2 py-0.5 shadow-md">
            REXTRA CLUB
          </Badge>
        );
      case "Trial Club":
        return (
          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 text-[10px] font-semibold px-2 py-0.5 shadow-md">
            TRIAL CLUB
          </Badge>
        );
      case "Non-Club":
        return (
          <Badge className="absolute -top-2 -right-2 bg-slate-500 text-white border-0 text-[10px] font-semibold px-2 py-0.5 shadow-md">
            NON CLUB
          </Badge>
        );
    }
  };

  const formatCurrency = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-4 md:p-6 border-b border-border">
          <SheetTitle className="text-left text-lg">Detail Status Membership</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 md:p-6 space-y-6">
            {/* STATUS MEMBERSHIP TERKINI */}
            <section className="relative border border-border/60 rounded-xl p-4 space-y-4">
              {getCategoryBadge()}
              
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                STATUS MEMBERSHIP TERKINI
              </h3>
              
              {/* Tier Display with Emblem */}
              <div className={`flex items-center gap-4 p-3 rounded-xl ${tierColor.bg} ${tierColor.border} border`}>
                <img 
                  src={tierEmblem} 
                  alt={user.tier} 
                  className="h-14 w-14 object-contain drop-shadow-md"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold ${tierColor.text}`}>{user.tier}</span>
                    <Badge className={`${tierColor.bg} ${tierColor.text} ${tierColor.border} border text-[10px] font-medium`}>
                      Plan
                    </Badge>
                  </div>
                  {user.autoRenew && (
                    <div className="flex items-center gap-1 mt-1 text-primary">
                      <RefreshCw className="h-3 w-3" />
                      <span className="text-xs font-medium">Auto-renew Aktif</span>
                    </div>
                  )}
                </div>
              </div>

              {/* User Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Nama</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium truncate">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">User ID</p>
                  <p className="font-medium font-mono text-xs">{user.userId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tanggal Mulai</p>
                  <p className="font-medium">{user.startDate.toLocaleDateString("id-ID")}</p>
                </div>
                {user.endDate && (
                  <>
                    <div>
                      <p className="text-xs text-muted-foreground">Tanggal Berakhir</p>
                      <p className="font-medium">{user.endDate.toLocaleDateString("id-ID")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sisa Durasi</p>
                      <p className={`font-semibold ${
                        user.validityStatus === "Expired" ? "text-red-600" :
                        user.validityStatus === "Expiring" ? "text-amber-600" :
                        "text-foreground"
                      }`}>
                        {user.validityStatus === "Expired" 
                          ? `Expired ${Math.abs(user.remainingDays)} hari lalu`
                          : `${user.remainingDays} hari`}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* BENEFIT STATUS MEMBERSHIP */}
            <section className="border border-border/60 rounded-xl p-4 space-y-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                BENEFIT STATUS MEMBERSHIP
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Coins className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Saldo Token</p>
                      <p className="font-semibold">{user.tokenBalance.toLocaleString("id-ID")} token</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Riwayat
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-violet-50/50 rounded-lg border border-violet-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-100 rounded-lg">
                      <Gift className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Poin</p>
                      <p className="font-semibold">{user.pointsBalance.toLocaleString("id-ID")} poin</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Riwayat
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg border border-sky-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <Lock className="h-4 w-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Akses Fitur</p>
                      <p className="font-semibold">{user.entitlementCount} entitlement aktif</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Detail
                  </Button>
                </div>
              </div>
            </section>

            {/* Summary Stats */}
            <section className="border border-border/60 rounded-xl p-4 space-y-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                RINGKASAN MEMBERSHIP
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{summaryStats.transactionCount}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Total Transaksi</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-lg font-bold text-foreground">{summaryStats.totalDuration}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Total Bulan</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(summaryStats.totalPurchase)}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Total Bayar</p>
                </div>
              </div>
            </section>

            {/* Tabs for Timeline & Transactions */}
            <section className="border border-border/60 rounded-xl overflow-hidden">
              <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="w-full bg-muted/30 rounded-none border-b border-border p-0 h-auto">
                  <TabsTrigger 
                    value="transactions" 
                    className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-sm font-medium"
                  >
                    Riwayat Transaksi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="timeline" 
                    className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-sm font-medium"
                  >
                    Timeline Journey
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="transactions" className="p-4 mt-0 space-y-3">
                  {journeyEvents
                    .filter((e) => !e.isFuture && e.total !== undefined)
                    .slice(0, 10)
                    .map((event) => {
                      const EventIcon = eventIcons[event.title.split(" ")[0] + " " + (event.title.split(" ")[1] || "")] || ShoppingCart;
                      return (
                        <div key={event.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <EventIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{event.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">
                                {event.date.toLocaleDateString("id-ID")}
                              </span>
                              {event.duration && (
                                <>
                                  <span className="text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{event.duration}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-semibold text-sm">{event.total ? formatCurrency(event.total) : "-"}</p>
                            <div className="flex items-center gap-1 justify-end mt-0.5">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{event.statusBefore}</span>
                              <ArrowRight className="h-2.5 w-2.5 text-muted-foreground" />
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">{event.statusAfter}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Lihat Semua di Tab Transaksi
                    <ExternalLink className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </TabsContent>

                <TabsContent value="timeline" className="p-4 mt-0">
                  <div className="relative pl-6">
                    {/* Vertical line */}
                    <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border" />
                    
                    {journeyEvents.map((event, index) => {
                      const EventIcon = eventIcons[event.title.split(" ")[0] + " " + (event.title.split(" ")[1] || "")] || ShoppingCart;
                      return (
                        <div key={event.id} className="relative pb-6 last:pb-0">
                          {/* Timeline dot */}
                          <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                            event.isFuture 
                              ? 'bg-muted border-2 border-border' 
                              : 'bg-primary shadow-md shadow-primary/30'
                          }`}>
                            {!event.isFuture && <EventIcon className="h-2.5 w-2.5 text-primary-foreground" />}
                          </div>

                          {/* Event content */}
                          <div className={`ml-2 p-3 rounded-lg border ${
                            event.isFuture 
                              ? 'bg-muted/30 border-dashed border-muted-foreground/30' 
                              : 'bg-card border-border/50 shadow-sm'
                          }`}>
                            <div className="flex items-center justify-between">
                              <p className={`font-medium text-sm ${event.isFuture ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {event.title}
                              </p>
                              {event.total && !event.isFuture && (
                                <span className="text-xs font-semibold text-primary">{formatCurrency(event.total)}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{event.date.toLocaleDateString("id-ID")}</span>
                              </div>
                              {!event.isFuture && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${tierColors[event.statusBefore]?.bg || 'bg-slate-100'} ${tierColors[event.statusBefore]?.text || 'text-slate-600'} font-medium`}>
                                {event.statusBefore}
                              </span>
                              <ArrowRight className="h-3 w-3 text-muted-foreground" />
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${tierColors[event.statusAfter]?.bg || 'bg-slate-100'} ${tierColors[event.statusAfter]?.text || 'text-slate-600'} font-medium`}>
                                {event.statusAfter}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
