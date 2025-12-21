import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  MessageSquareText,
  ThumbsUp,
  Target,
  Smile,
  TrendingUp,
  TrendingDown,
  Lightbulb,
} from "lucide-react";

// Mock data for Mahasiswa feedback (Likert 1-7)
const mahasiswaFeedbackData = [
  { id: "MHS001", kemudahanTes: 6, relevansiRekomendasi: 5, kepuasanFitur: 6, kendala: ["Durasi tes terasa terlalu lama", "Tampilan atau navigasi membingungkan"] },
  { id: "MHS002", kemudahanTes: 7, relevansiRekomendasi: 7, kepuasanFitur: 6, kendala: [] },
  { id: "MHS003", kemudahanTes: 4, relevansiRekomendasi: 3, kepuasanFitur: 4, kendala: ["Ada pertanyaan yang membingungkan", "Penjelasan hasil tes terlalu panjang atau sulit dipahami", "Kendala lainnya"] },
  { id: "MHS004", kemudahanTes: 5, relevansiRekomendasi: 6, kepuasanFitur: 5, kendala: ["Tampilan atau navigasi membingungkan"] },
  { id: "MHS005", kemudahanTes: 7, relevansiRekomendasi: 6, kepuasanFitur: 7, kendala: [] },
  { id: "MHS006", kemudahanTes: 6, relevansiRekomendasi: 5, kepuasanFitur: 6, kendala: ["Durasi tes terasa terlalu lama"] },
  { id: "MHS007", kemudahanTes: 3, relevansiRekomendasi: 4, kepuasanFitur: 3, kendala: ["Mengalami error/bug (macet, loading lama, atau tidak bisa lanjut)", "Tampilan atau navigasi membingungkan", "Kendala lainnya"] },
  { id: "MHS008", kemudahanTes: 6, relevansiRekomendasi: 7, kepuasanFitur: 6, kendala: [] },
  { id: "MHS009", kemudahanTes: 5, relevansiRekomendasi: 5, kepuasanFitur: 5, kendala: ["Penjelasan hasil tes terlalu panjang atau sulit dipahami"] },
  { id: "MHS010", kemudahanTes: 7, relevansiRekomendasi: 6, kepuasanFitur: 7, kendala: [] },
  { id: "MHS011", kemudahanTes: 6, relevansiRekomendasi: 6, kepuasanFitur: 6, kendala: [] },
  { id: "MHS012", kemudahanTes: 2, relevansiRekomendasi: 2, kepuasanFitur: 2, kendala: ["Mengalami error/bug (macet, loading lama, atau tidak bisa lanjut)", "Ada pertanyaan yang membingungkan"] },
  { id: "MHS013", kemudahanTes: 7, relevansiRekomendasi: 7, kepuasanFitur: 7, kendala: [] },
  { id: "MHS014", kemudahanTes: 5, relevansiRekomendasi: 4, kepuasanFitur: 5, kendala: ["Durasi tes terasa terlalu lama"] },
  { id: "MHS015", kemudahanTes: 6, relevansiRekomendasi: 6, kepuasanFitur: 6, kendala: [] },
];

// Previous period mock data for trend calculation
const previousPeriodData = {
  totalFeedback: 12,
  avgKemudahan: 5.1,
  avgRelevansi: 4.8,
  avgKepuasan: 4.9,
};

// Modern vibrant colors
const COLORS = {
  blue: "#6366F1",
  green: "#22C55E", 
  amber: "#F59E0B",
  red: "#EF4444",
  purple: "#A855F7",
};

interface MahasiswaVisualizationProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function MahasiswaVisualization({ selectedCategory, onCategoryChange }: MahasiswaVisualizationProps) {
  const [timeRange, setTimeRange] = useState("all-time");

  // Calculate statistics
  const stats = useMemo(() => {
    const total = mahasiswaFeedbackData.length;
    const avgKemudahan = mahasiswaFeedbackData.reduce((sum, d) => sum + d.kemudahanTes, 0) / total;
    const avgRelevansi = mahasiswaFeedbackData.reduce((sum, d) => sum + d.relevansiRekomendasi, 0) / total;
    const avgKepuasan = mahasiswaFeedbackData.reduce((sum, d) => sum + d.kepuasanFitur, 0) / total;

    const totalTrend = ((total - previousPeriodData.totalFeedback) / previousPeriodData.totalFeedback) * 100;
    const kemudahanTrend = ((avgKemudahan - previousPeriodData.avgKemudahan) / previousPeriodData.avgKemudahan) * 100;
    const relevansiTrend = ((avgRelevansi - previousPeriodData.avgRelevansi) / previousPeriodData.avgRelevansi) * 100;
    const kepuasanTrend = ((avgKepuasan - previousPeriodData.avgKepuasan) / previousPeriodData.avgKepuasan) * 100;

    return {
      total,
      avgKemudahan: avgKemudahan.toFixed(1),
      avgRelevansi: avgRelevansi.toFixed(1),
      avgKepuasan: avgKepuasan.toFixed(1),
      totalTrend: totalTrend.toFixed(0),
      kemudahanTrend: kemudahanTrend.toFixed(0),
      relevansiTrend: relevansiTrend.toFixed(0),
      kepuasanTrend: kepuasanTrend.toFixed(0),
    };
  }, []);

  // Prepare chart data with highlight for max value
  const prepareDistributionData = (key: "kemudahanTes" | "relevansiRekomendasi" | "kepuasanFitur", highlightColor: string) => {
    const data = [1, 2, 3, 4, 5, 6, 7].map((score) => ({
      score: score.toString(),
      count: mahasiswaFeedbackData.filter((d) => d[key] === score).length,
    }));
    
    const maxCount = Math.max(...data.map(d => d.count));
    
    return data.map(d => ({
      ...d,
      fill: d.count === maxCount && d.count > 0 ? highlightColor : `${highlightColor}30`,
    }));
  };

  // Calculate positive percentage for insight
  const calculatePositivePercentage = (key: "kemudahanTes" | "relevansiRekomendasi" | "kepuasanFitur") => {
    const positiveCount = mahasiswaFeedbackData.filter((d) => d[key] >= 6).length;
    return Math.round((positiveCount / mahasiswaFeedbackData.length) * 100);
  };

  // Kendala analysis
  const kendalaAnalysis = useMemo(() => {
    const noKendala = mahasiswaFeedbackData.filter((d) => d.kendala.length === 0).length;
    const hasKendala = mahasiswaFeedbackData.length - noKendala;
    
    const kendalaTypes: Record<string, number> = {
      "Durasi tes terlalu lama": 0,
      "Pertanyaan membingungkan": 0,
      "Error/bug sistem": 0,
      "Penjelasan sulit dipahami": 0,
      "Navigasi membingungkan": 0,
      "Kendala lainnya": 0,
    };

    const kendalaMap: Record<string, string> = {
      "Durasi tes terasa terlalu lama": "Durasi tes terlalu lama",
      "Ada pertanyaan yang membingungkan": "Pertanyaan membingungkan",
      "Mengalami error/bug (macet, loading lama, atau tidak bisa lanjut)": "Error/bug sistem",
      "Penjelasan hasil tes terlalu panjang atau sulit dipahami": "Penjelasan sulit dipahami",
      "Tampilan atau navigasi membingungkan": "Navigasi membingungkan",
      "Kendala lainnya": "Kendala lainnya",
    };

    mahasiswaFeedbackData.forEach((d) => {
      d.kendala.forEach((k) => {
        const mapped = kendalaMap[k];
        if (mapped && kendalaTypes.hasOwnProperty(mapped)) {
          kendalaTypes[mapped]++;
        }
      });
    });

    const kendalaData = Object.entries(kendalaTypes)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    const maxKendala = Math.max(...kendalaData.map(d => d.count));

    return {
      noKendala,
      hasKendala,
      hasKendalaPercentage: Math.round((hasKendala / mahasiswaFeedbackData.length) * 100),
      kendalaData: kendalaData.map(d => ({
        ...d,
        fill: d.count === maxKendala && d.count > 0 ? COLORS.red : `${COLORS.red}30`,
      })),
    };
  }, []);

  // Donut chart data
  const donutData = [
    { name: "Tidak ada kendala", value: kendalaAnalysis.noKendala },
    { name: "Ada kendala", value: kendalaAnalysis.hasKendala },
  ];

  // Mini trend data for cards
  const miniTrendData = [
    { value: 10 }, { value: 12 }, { value: 11 }, { value: 14 }, { value: 13 }, { value: 15 }
  ];

  // Overview Card Component
  const OverviewCard = ({ 
    icon: Icon, 
    title, 
    value, 
    trend, 
    trendData,
    accentColor 
  }: { 
    icon: React.ElementType; 
    title: string; 
    value: string | number; 
    trend: string; 
    trendData: { value: number }[];
    accentColor: string;
  }) => {
    const trendNumber = parseFloat(trend);
    const isPositive = trendNumber >= 0;

    return (
      <Card className="border-0 bg-gradient-to-br from-card to-muted/30 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${accentColor}15` }}>
              <Icon className="h-4 w-4" style={{ color: accentColor }} />
            </div>
            <span className="text-sm text-muted-foreground font-bold">{title}</span>
          </div>
          <div className="space-y-1.5">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <div className={`flex items-center gap-1.5 text-xs font-medium ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
              {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              <span>
                {isPositive ? "Naik" : "Turun"} {Math.abs(trendNumber)}% dibanding minggu lalu
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-20 opacity-50">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${accentColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accentColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={accentColor}
                fill={`url(#gradient-${accentColor.replace('#', '')})`}
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  };

  // Insight Box Component
  const InsightBox = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/50 dark:border-amber-800/30 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50">
          <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </div>
        <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">{children}</p>
      </div>
    </div>
  );

  // Modern Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-foreground text-background px-4 py-2.5 rounded-xl shadow-xl">
          <p className="text-sm font-semibold">Skor {label}</p>
          <p className="text-xs opacity-80">{payload[0].value} respon</p>
        </div>
      );
    }
    return null;
  };

  // Custom bar shape with rounded corners
  const RoundedBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    const radius = 8;
    
    if (height <= 0) return null;
    
    return (
      <g>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={radius}
          ry={radius}
          style={{ filter: fill.length < 10 ? 'url(#glow)' : 'none' }}
        />
      </g>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Visualisasi Data Umpan Balik
        </h2>
        <p className="text-muted-foreground mt-1">
          Ringkasan visual untuk memahami tren kemudahan, relevansi rekomendasi, kepuasan, dan kendala penggunaan.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <OverviewCard
          icon={MessageSquareText}
          title="Total Feedback"
          value={stats.total}
          trend={stats.totalTrend}
          trendData={miniTrendData}
          accentColor={COLORS.purple}
        />
        <OverviewCard
          icon={ThumbsUp}
          title="Rata-rata Kemudahan"
          value={`${stats.avgKemudahan}/7`}
          trend={stats.kemudahanTrend}
          trendData={miniTrendData}
          accentColor={COLORS.blue}
        />
        <OverviewCard
          icon={Target}
          title="Rata-rata Relevansi"
          value={`${stats.avgRelevansi}/7`}
          trend={stats.relevansiTrend}
          trendData={miniTrendData}
          accentColor={COLORS.green}
        />
        <OverviewCard
          icon={Smile}
          title="Rata-rata Kepuasan"
          value={`${stats.avgKepuasan}/7`}
          trend={stats.kepuasanTrend}
          trendData={miniTrendData}
          accentColor={COLORS.amber}
        />
      </div>

      {/* Control Section */}
      <Card className="border-0 bg-card/50 backdrop-blur rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Kontrol Visualisasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full md:w-[200px] rounded-xl border-border/50">
                <SelectValue placeholder="Pilih Kategori Tes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tes-profil-karier">Tes Profil Karier</SelectItem>
                <SelectItem value="tes-riasec">Tes RIASEC</SelectItem>
                <SelectItem value="tes-kepribadian">Tes Kepribadian</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full md:w-[180px] rounded-xl border-border/50">
                <SelectValue placeholder="Rentang Waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">Sepanjang waktu</SelectItem>
                <SelectItem value="weekly">Mingguan</SelectItem>
                <SelectItem value="monthly">Bulanan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Tingkat Kemudahan */}
        <Card className="border-0 bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: COLORS.blue }} />
              Tingkat Kemudahan Menyelesaikan Tes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareDistributionData("kemudahanTes", COLORS.blue)} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                  <XAxis 
                    dataKey="score" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Skala Likert (1-7)", position: "bottom", offset: 10, fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.3)', radius: 8 }} />
                  <Bar dataKey="count" shape={<RoundedBar />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <InsightBox>
              <strong>Wawasan:</strong> Sebanyak <strong>{calculatePositivePercentage("kemudahanTes")}%</strong> mahasiswa menilai tes mudah diselesaikan (skor 6-7).
            </InsightBox>
          </CardContent>
        </Card>

        {/* Chart 2: Tingkat Relevansi */}
        <Card className="border-0 bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: COLORS.green }} />
              Tingkat Relevansi Rekomendasi Profesi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareDistributionData("relevansiRekomendasi", COLORS.green)} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                  <XAxis 
                    dataKey="score" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Skala Likert (1-7)", position: "bottom", offset: 10, fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.3)', radius: 8 }} />
                  <Bar dataKey="count" shape={<RoundedBar />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <InsightBox>
              <strong>Wawasan:</strong> <strong>{calculatePositivePercentage("relevansiRekomendasi")}%</strong> mahasiswa merasa rekomendasi profesi sesuai dengan profil mereka.
            </InsightBox>
          </CardContent>
        </Card>

        {/* Chart 3: Tingkat Kepuasan */}
        <Card className="border-0 bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: COLORS.amber }} />
              Tingkat Kepuasan Keseluruhan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareDistributionData("kepuasanFitur", COLORS.amber)} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                  <XAxis 
                    dataKey="score" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Skala Likert (1-7)", position: "bottom", offset: 10, fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.3)', radius: 8 }} />
                  <Bar dataKey="count" shape={<RoundedBar />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <InsightBox>
              <strong>Wawasan:</strong> <strong>{calculatePositivePercentage("kepuasanFitur")}%</strong> mahasiswa puas dengan Tes Profil Karier.
            </InsightBox>
          </CardContent>
        </Card>

        {/* Chart 4: Tingkat Kendala (Donut) */}
        <Card className="border-0 bg-card rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-emerald-500 to-rose-500" />
              Tingkat Kendala Penggunaan Fitur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="#16A34A" />
                    </linearGradient>
                    <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="100%" stopColor="#DC2626" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    stroke="none"
                  >
                    <Cell fill="url(#greenGradient)" />
                    <Cell fill="url(#redGradient)" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--foreground))",
                      color: "hsl(var(--background))",
                      borderRadius: "12px",
                      border: "none",
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={40}
                    formatter={(value) => <span className="text-sm font-medium text-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <InsightBox>
              <strong>Wawasan:</strong> <strong>{kendalaAnalysis.hasKendalaPercentage}%</strong> respon melaporkan setidaknya satu kendala dalam penggunaan.
            </InsightBox>
          </CardContent>
        </Card>
      </div>

      {/* Chart 5: Ragam Kendala (Full Width) */}
      <Card className="border-0 bg-card rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: COLORS.red }} />
            Ragam Kendala Penggunaan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={kendalaAnalysis.kendalaData} 
                layout="vertical" 
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  width={160}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--foreground))",
                    color: "hsl(var(--background))",
                    borderRadius: "12px",
                    border: "none",
                  }}
                  formatter={(value: number) => [`${value} respon`, "Jumlah"]}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <InsightBox>
            <strong>Wawasan:</strong> Kendala terbanyak adalah "<strong>{kendalaAnalysis.kendalaData[0]?.name}</strong>" dengan {kendalaAnalysis.kendalaData[0]?.count} laporan.
          </InsightBox>
        </CardContent>
      </Card>

      {/* Stacked Bar Chart */}
      <Card className="border-0 bg-card rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-rose-500 via-amber-500 to-emerald-500" />
            Perbandingan Komposisi Respon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "Kemudahan",
                    negatif: mahasiswaFeedbackData.filter((d) => d.kemudahanTes <= 3).length,
                    netral: mahasiswaFeedbackData.filter((d) => d.kemudahanTes >= 4 && d.kemudahanTes <= 5).length,
                    positif: mahasiswaFeedbackData.filter((d) => d.kemudahanTes >= 6).length,
                  },
                  {
                    name: "Relevansi",
                    negatif: mahasiswaFeedbackData.filter((d) => d.relevansiRekomendasi <= 3).length,
                    netral: mahasiswaFeedbackData.filter((d) => d.relevansiRekomendasi >= 4 && d.relevansiRekomendasi <= 5).length,
                    positif: mahasiswaFeedbackData.filter((d) => d.relevansiRekomendasi >= 6).length,
                  },
                  {
                    name: "Kepuasan",
                    negatif: mahasiswaFeedbackData.filter((d) => d.kepuasanFitur <= 3).length,
                    netral: mahasiswaFeedbackData.filter((d) => d.kepuasanFitur >= 4 && d.kepuasanFitur <= 5).length,
                    positif: mahasiswaFeedbackData.filter((d) => d.kepuasanFitur >= 6).length,
                  },
                ]}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
              >
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                  width={70} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--foreground))",
                    color: "hsl(var(--background))",
                    borderRadius: "12px",
                    border: "none",
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={40}
                  formatter={(value) => (
                    <span className="text-sm font-medium text-foreground capitalize">
                      {value} ({value === "negatif" ? "1-3" : value === "netral" ? "4-5" : "6-7"})
                    </span>
                  )}
                />
                <Bar dataKey="negatif" stackId="a" fill="#EF4444" name="Negatif" radius={[0, 0, 0, 0]} />
                <Bar dataKey="netral" stackId="a" fill="#F59E0B" name="Netral" />
                <Bar dataKey="positif" stackId="a" fill="#22C55E" name="Positif" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <InsightBox>
            <strong>Wawasan:</strong> Secara keseluruhan, respon positif mendominasi di ketiga metrik dengan proporsi tertinggi pada aspek Kemudahan Tes.
          </InsightBox>
        </CardContent>
      </Card>
    </div>
  );
}
