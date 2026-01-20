import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HelpCircle,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  CreditCard,
  Crown,
  Zap,
  AlertTriangle,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// Mock data for charts
const chartData = [
  { day: "Sen", masuk: 18500, keluar: 12300 },
  { day: "Sel", masuk: 22400, keluar: 15600 },
  { day: "Rab", masuk: 32450, keluar: 28120 },
  { day: "Kam", masuk: 28900, keluar: 19800 },
  { day: "Jum", masuk: 35200, keluar: 24500 },
  { day: "Sab", masuk: 19800, keluar: 14200 },
  { day: "Min", masuk: 15200, keluar: 10500 },
];

// Mock data for activity table
const activityData = [
  {
    id: "1",
    waktu: "14:32",
    tanggal: "20 Jan 2026",
    user: "john@example.com",
    userName: "John Doe",
    jenis: "IN" as const,
    sumber: "Top Up",
    refId: "TXN-2847",
    jumlah: 5000,
    saldoSetelah: 15000,
    status: "Berhasil" as const,
  },
  {
    id: "2",
    waktu: "14:28",
    tanggal: "20 Jan 2026",
    user: "maria@example.com",
    userName: "Maria Garcia",
    jenis: "OUT" as const,
    sumber: "Pemakaian",
    refId: "USE-9821",
    jumlah: 120,
    saldoSetelah: 8880,
    status: "Berhasil" as const,
  },
  {
    id: "3",
    waktu: "14:15",
    tanggal: "20 Jan 2026",
    user: "budi@example.com",
    userName: "Budi Santoso",
    jenis: "IN" as const,
    sumber: "Membership",
    refId: "MBR-4562",
    jumlah: 2000,
    saldoSetelah: 12000,
    status: "Berhasil" as const,
  },
  {
    id: "4",
    waktu: "13:58",
    tanggal: "20 Jan 2026",
    user: "siti@example.com",
    userName: "Siti Aminah",
    jenis: "OUT" as const,
    sumber: "Pemakaian",
    refId: "USE-9819",
    jumlah: 85,
    saldoSetelah: 4915,
    status: "Berhasil" as const,
  },
  {
    id: "5",
    waktu: "13:42",
    tanggal: "20 Jan 2026",
    user: "agus@example.com",
    userName: "Agus Prasetyo",
    jenis: "IN" as const,
    sumber: "Top Up",
    refId: "TXN-2846",
    jumlah: 10000,
    saldoSetelah: 25000,
    status: "Berhasil" as const,
  },
  {
    id: "6",
    waktu: "13:21",
    tanggal: "20 Jan 2026",
    user: "rina@example.com",
    userName: "Rina Wati",
    jenis: "OUT" as const,
    sumber: "Pemakaian",
    refId: "USE-9815",
    jumlah: 200,
    saldoSetelah: 3800,
    status: "Gagal" as const,
  },
  {
    id: "7",
    waktu: "12:55",
    tanggal: "20 Jan 2026",
    user: "doni@example.com",
    userName: "Doni Kusuma",
    jenis: "IN" as const,
    sumber: "Membership",
    refId: "MBR-4561",
    jumlah: 3500,
    saldoSetelah: 18500,
    status: "Berhasil" as const,
  },
  {
    id: "8",
    waktu: "12:30",
    tanggal: "20 Jan 2026",
    user: "lina@example.com",
    userName: "Lina Mariana",
    jenis: "IN" as const,
    sumber: "Top Up",
    refId: "TXN-2845",
    jumlah: 25000,
    saldoSetelah: 45000,
    status: "Berhasil" as const,
  },
];

// Mock alerts
const alerts = [
  { id: "1", message: "3 transaksi top up gagal hari ini", type: "error" },
  { id: "2", message: "Lonjakan pemakaian +150% dari user @john", type: "warning" },
];

type ViewState = "loading" | "empty" | "error" | "data";

export default function SistemTokenIkhtisar() {
  const [viewState, setViewState] = useState<ViewState>("data");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedTab, setSelectedTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [showAlerts, setShowAlerts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // KPI Cards data
  const kpiCards = [
    {
      title: "Token Masuk",
      value: 125450,
      delta: 12,
      deltaPositive: true,
      icon: ArrowUpRight,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      tooltip: "Total token bertambah dari top up + alokasi + penyesuaian",
    },
    {
      title: "Token Keluar",
      value: 89320,
      delta: 8,
      deltaPositive: false,
      icon: ArrowDownRight,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      tooltip: "Total token berkurang dari pemakaian fitur",
    },
    {
      title: "Net Flow",
      value: 36130,
      delta: 45,
      deltaPositive: true,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      tooltip: "Selisih token masuk dikurangi token keluar",
    },
    {
      title: "Top Up Berhasil",
      value: 45,
      delta: 5,
      deltaPositive: true,
      icon: CreditCard,
      color: "text-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-950/30",
      tooltip: "Jumlah transaksi top up yang berhasil",
      isCount: true,
    },
    {
      title: "Alokasi Membership",
      value: 78920,
      delta: 18,
      deltaPositive: true,
      icon: Crown,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      tooltip: "Total token masuk dari event membership",
    },
    {
      title: "Pemakaian Token",
      value: 89320,
      delta: 3,
      deltaPositive: true,
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      tooltip: "Total token keluar akibat konsumsi fitur",
    },
  ];

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const masuk = payload.find((p: any) => p.dataKey === "masuk")?.value || 0;
      const keluar = payload.find((p: any) => p.dataKey === "keluar")?.value || 0;
      const netFlow = masuk - keluar;
      
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-medium mb-2">{label}, 20 Jan 2026</p>
          <div className="space-y-1">
            <p className="text-emerald-600">Token Masuk: +{formatNumber(masuk)}</p>
            <p className="text-red-600">Token Keluar: -{formatNumber(keluar)}</p>
            <p className={netFlow >= 0 ? "text-blue-600 font-medium" : "text-red-600 font-medium"}>
              Net Flow: {netFlow >= 0 ? "+" : ""}{formatNumber(netFlow)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Loading State
  const LoadingState = () => (
    <div className="space-y-6">
      {/* KPI Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Chart Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Empty State
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Coins className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Belum Ada Aktivitas Token</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Aktivitas token akan muncul setelah ada top up, alokasi membership, atau pemakaian fitur.
      </p>
      <div className="flex gap-3">
        <Button variant="outline">Ke Pengadaan Token</Button>
        <Button>Ke Alokasi Membership</Button>
      </div>
    </div>
  );

  // Error State
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Gagal Memuat Data</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Terjadi kesalahan saat memuat data. Silakan coba lagi.
      </p>
      <Button onClick={() => setViewState("data")}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Coba Lagi
      </Button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/sistem-token/ikhtisar">Sistem Token</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Ikhtisar Token</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ikhtisar Token</h1>
            <p className="text-muted-foreground mt-1">
              Pantau pergerakan token masuk dan keluar, serta ringkasan pemakaian token pada periode tertentu.
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-sm">
                Token adalah unit mata uang dalam sistem REXTRA yang digunakan untuk mengakses fitur berbayar.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Control Bar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Period & Tabs */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Hari Terakhir</SelectItem>
                  <SelectItem value="30d">30 Hari Terakhir</SelectItem>
                  <SelectItem value="90d">90 Hari Terakhir</SelectItem>
                  <SelectItem value="custom">Kustom</SelectItem>
                </SelectContent>
              </Select>

              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
                <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:flex">
                  <TabsTrigger value="semua">Semua</TabsTrigger>
                  <TabsTrigger value="topup">Top Up</TabsTrigger>
                  <TabsTrigger value="alokasi">Alokasi</TabsTrigger>
                  <TabsTrigger value="pemakaian">Pemakaian</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1 lg:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari user, email, atau reference ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua</SelectItem>
                  <SelectItem value="berhasil">Berhasil</SelectItem>
                  <SelectItem value="gagal">Gagal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Demo State Toggle (for development) */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground mr-2">Demo State:</span>
            {(["data", "loading", "empty", "error"] as ViewState[]).map((state) => (
              <Button
                key={state}
                variant={viewState === state ? "default" : "outline"}
                size="sm"
                onClick={() => setViewState(state)}
                className="text-xs h-7"
              >
                {state}
              </Button>
            ))}
          </div>
        </div>

        {/* Content based on state */}
        {viewState === "loading" && <LoadingState />}
        {viewState === "empty" && <EmptyState />}
        {viewState === "error" && <ErrorState />}
        {viewState === "data" && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {kpiCards.map((kpi, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {kpi.title}
                          </p>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-3 w-3 text-muted-foreground/60" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-[200px]">{kpi.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-2xl font-bold">
                          {kpi.isCount ? kpi.value : formatNumber(kpi.value)}
                          {!kpi.isCount && <span className="text-lg font-normal ml-1">token</span>}
                          {kpi.isCount && <span className="text-lg font-normal ml-1">transaksi</span>}
                        </p>
                        <div className="flex items-center gap-1 text-xs">
                          {kpi.deltaPositive ? (
                            <TrendingUp className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-emerald-600" />
                          )}
                          <span className="text-emerald-600">
                            {kpi.deltaPositive ? "+" : "-"}{kpi.delta}%
                          </span>
                          <span className="text-muted-foreground">vs periode sblm</span>
                        </div>
                      </div>
                      <div className={`p-2.5 rounded-lg ${kpi.bgColor}`}>
                        <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Alerts Panel */}
            {showAlerts && alerts.length > 0 && (
              <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Perlu Ditinjau
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setShowAlerts(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <div className="space-y-2">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-amber-700 dark:text-amber-300">
                          • {alert.message}
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-amber-700">
                          Tinjau
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Grafik Tren: Token Masuk vs Token Keluar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] lg:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        className="text-xs"
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value / 1000}k`}
                        className="text-xs"
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="masuk"
                        name="Token Masuk"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorMasuk)"
                      />
                      <Area
                        type="monotone"
                        dataKey="keluar"
                        name="Token Keluar"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorKeluar)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Activity Table */}
            <Card>
              <CardHeader>
                <div>
                  <CardTitle className="text-base font-semibold">
                    Aktivitas Token Terbaru
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Daftar pergerakan token terbaru sesuai filter periode
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">Waktu</TableHead>
                        <TableHead className="min-w-[150px]">User</TableHead>
                        <TableHead className="min-w-[70px]">Jenis</TableHead>
                        <TableHead className="min-w-[120px]">Sumber</TableHead>
                        <TableHead className="min-w-[120px]">Ref ID</TableHead>
                        <TableHead className="min-w-[100px] text-right">Jumlah</TableHead>
                        <TableHead className="min-w-[100px] text-right">Saldo Setelah</TableHead>
                        <TableHead className="min-w-[90px]">Status</TableHead>
                        <TableHead className="min-w-[80px]">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="text-sm">{item.waktu}</div>
                            <div className="text-xs text-muted-foreground">{item.tanggal}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">{item.userName}</div>
                            <div className="text-xs text-muted-foreground">{item.user}</div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                item.jenis === "IN"
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                                  : "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                              }
                            >
                              {item.jenis}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{item.sumber}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                {item.refId}
                              </code>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(item.refId)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                item.jenis === "IN"
                                  ? "text-emerald-600 font-medium"
                                  : "text-red-600 font-medium"
                              }
                            >
                              {item.jenis === "IN" ? "+" : "-"}
                              {formatNumber(item.jumlah)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {formatNumber(item.saldoSetelah)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={item.status === "Berhasil" ? "default" : "destructive"}
                              className={
                                item.status === "Berhasil"
                                  ? "bg-emerald-500 hover:bg-emerald-600"
                                  : ""
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan 1-8 dari 96 aktivitas
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Previous</span>
                    </Button>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="w-8"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <span className="px-2 text-muted-foreground">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8"
                        onClick={() => setCurrentPage(12)}
                      >
                        12
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <span className="hidden sm:inline mr-1">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
