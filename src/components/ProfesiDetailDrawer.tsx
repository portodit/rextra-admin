import { useState } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  Edit, 
  Code, 
  Palette, 
  PenTool, 
  Megaphone, 
  Settings, 
  BarChart3, 
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Info,
  CheckCircle2,
  BookOpen,
  Award,
  Laptop
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Profesi {
  id: string;
  nama: string;
  alias?: string;
  kategori: string;
  kategoriIcon: React.ElementType;
  subKategori: string[];
  riasec: string;
  diperbarui: string;
}

// Extended mock data for detail view
const mockDetailData = {
  imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
  tentangProfesi: "Software Engineer adalah profesional yang merancang, mengembangkan, dan memelihara sistem perangkat lunak. Mereka menerapkan prinsip-prinsip rekayasa perangkat lunak untuk membuat aplikasi yang handal, efisien, dan dapat diskalakan. Pekerjaan ini melibatkan pemecahan masalah kompleks, kolaborasi tim, dan pembelajaran teknologi baru secara berkelanjutan.",
  aktivitasProfesi: [
    "Menganalisis kebutuhan pengguna dan menerjemahkannya menjadi spesifikasi teknis",
    "Merancang arsitektur sistem dan memilih teknologi yang tepat",
    "Menulis kode yang bersih, efisien, dan terdokumentasi dengan baik",
    "Melakukan code review dan memastikan kualitas kode tim",
    "Debugging dan troubleshooting masalah teknis",
    "Berkolaborasi dengan tim produk, desain, dan QA",
    "Mengikuti perkembangan teknologi dan best practices terbaru"
  ],
  kompetensiUtama: [
    { nama: "Programming Languages", prioritas: "Wajib" },
    { nama: "Data Structures & Algorithms", prioritas: "Wajib" },
    { nama: "System Design", prioritas: "Wajib" },
    { nama: "Database Management", prioritas: "Wajib" },
    { nama: "Version Control (Git)", prioritas: "Wajib" },
    { nama: "API Development", prioritas: "Dianjurkan" },
    { nama: "Cloud Computing", prioritas: "Dianjurkan" }
  ],
  kompetensiPendukung: [
    { nama: "Problem Solving", prioritas: "Wajib" },
    { nama: "Communication", prioritas: "Wajib" },
    { nama: "Team Collaboration", prioritas: "Wajib" },
    { nama: "Critical Thinking", prioritas: "Dianjurkan" },
    { nama: "Time Management", prioritas: "Dianjurkan" },
    { nama: "Adaptability", prioritas: "Dianjurkan" }
  ],
  perangkatTeknologi: [
    "Visual Studio Code", "IntelliJ IDEA", "Git", "Docker", "Kubernetes",
    "AWS/GCP/Azure", "PostgreSQL", "MongoDB", "Redis", "Jira", "Confluence"
  ],
  pendidikanFormal: [
    "S1 Teknik Informatika",
    "S1 Ilmu Komputer", 
    "S1 Sistem Informasi",
    "S1 Teknik Elektro"
  ],
  pendidikanNonFormal: [
    { nama: "Bootcamp Full Stack Development", penyelenggara: "Hacktiv8, Purwadhika" },
    { nama: "AWS Certified Developer", penyelenggara: "Amazon Web Services" },
    { nama: "Google Cloud Professional", penyelenggara: "Google Cloud" },
    { nama: "Certified Kubernetes Administrator", penyelenggara: "CNCF" }
  ],
  jenjangKarier: [
    { posisi: "Junior Software Engineer", pengalaman: "0-2 tahun", gaji: "Rp 6-12 juta/bulan" },
    { posisi: "Mid-Level Software Engineer", pengalaman: "2-4 tahun", gaji: "Rp 12-25 juta/bulan" },
    { posisi: "Senior Software Engineer", pengalaman: "4-7 tahun", gaji: "Rp 25-45 juta/bulan" },
    { posisi: "Staff/Principal Engineer", pengalaman: "7-10 tahun", gaji: "Rp 45-80 juta/bulan" },
    { posisi: "Engineering Manager/CTO", pengalaman: "10+ tahun", gaji: "Rp 80+ juta/bulan" }
  ],
  kondisiPasarKerja: [
    "Permintaan tinggi dengan pertumbuhan 22% per tahun di Indonesia",
    "Banyak peluang remote work dan work from anywhere",
    "Kompetisi ketat untuk posisi di perusahaan teknologi besar",
    "Startup dan UMKM semakin membutuhkan talenta digital",
    "Skill AI/ML menjadi nilai tambah yang signifikan"
  ]
};

interface ProfesiDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profesi: Profesi | null;
  isLoading?: boolean;
}

export const ProfesiDetailDrawer = ({
  open,
  onOpenChange,
  profesi,
  isLoading = false,
}: ProfesiDetailDrawerProps) => {
  const [activeTab, setActiveTab] = useState("profil");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleBack = () => {
    onOpenChange(false);
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
  };

  if (!profesi && !isLoading) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="w-full sm:max-w-2xl p-0 overflow-hidden flex flex-col"
        aria-describedby="profesi-detail-description"
      >
        <span id="profesi-detail-description" className="sr-only">
          Detail informasi profesi {profesi?.nama}
        </span>
        
        {/* Top Bar - Sticky */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <h2 className="text-base font-semibold text-foreground hidden sm:block">
            Detail Item Profesi Digital
          </h2>
          <Button size="sm" onClick={handleEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Highlight Profesi Card */}
            {isLoading ? (
              <div className="border border-border/60 rounded-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ) : profesi && (
              <div className="border border-border/60 rounded-lg overflow-hidden bg-card">
                {/* Profession Image */}
                <div className="relative w-full h-48 bg-muted">
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Skeleton className="w-full h-full" />
                    </div>
                  )}
                  {imageError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center text-muted-foreground">
                        <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Gambar tidak tersedia</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={mockDetailData.imageUrl}
                      alt={profesi.nama}
                      className={cn(
                        "w-full h-full object-cover transition-opacity duration-300",
                        imageLoaded ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>

                {/* Profession Info */}
                <div className="p-4 space-y-4">
                  <div>
                    <h1 className="text-xl font-bold text-foreground">{profesi.nama}</h1>
                    {profesi.alias && (
                      <p className="text-sm text-muted-foreground mt-0.5">{profesi.alias}</p>
                    )}
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Kategori with Icon */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                      <profesi.kategoriIcon className="h-4 w-4" />
                      {profesi.kategori}
                    </div>

                    {/* Sub-kategori chips */}
                    {profesi.subKategori.slice(0, 2).map((sub, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-secondary text-secondary-foreground"
                      >
                        {sub}
                      </span>
                    ))}
                    {profesi.subKategori.length > 2 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-secondary text-secondary-foreground">
                        +{profesi.subKategori.length - 2}
                      </span>
                    )}

                    {/* RIASEC Badge */}
                    <Badge variant="outline" className="gap-1 font-semibold">
                      RIASEC: {profesi.riasec}
                    </Badge>
                  </div>

                  {/* System Metadata */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/40">
                    <span>ID: {profesi.id}</span>
                    <span>Diperbarui: {profesi.diperbarui}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Menu */}
            {!isLoading && profesi && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted/50">
                  <TabsTrigger 
                    value="profil" 
                    className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Profil Profesi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="kualifikasi"
                    className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Kualifikasi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="prospek"
                    className="text-xs sm:text-sm py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Prospek Kerja
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Profil Profesi */}
                <TabsContent value="profil" className="mt-6 space-y-4">
                  {/* Tentang Profesi */}
                  <div className="border border-border/60 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
                      <Info className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Tentang Profesi</h3>
                    </div>
                    <div className="p-4">
                      {mockDetailData.tentangProfesi ? (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {mockDetailData.tentangProfesi}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Deskripsi profesi belum tersedia
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Aktivitas Profesi */}
                  <div className="border border-border/60 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Aktivitas Profesi</h3>
                    </div>
                    <div className="p-4">
                      {mockDetailData.aktivitasProfesi.length > 0 ? (
                        <ul className="space-y-2.5">
                          {mockDetailData.aktivitasProfesi.map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span className="text-sm text-muted-foreground">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Aktivitas profesi belum tersedia
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 2: Kualifikasi Profesi */}
                <TabsContent value="kualifikasi" className="mt-6 space-y-4">
                  {/* Kompetensi Profesi */}
                  <div className="border border-border/60 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
                      <Award className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Kompetensi Profesi</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Hard Skills */}
                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Kompetensi Utama (Hard Skills)</p>
                        <div className="flex flex-wrap gap-2">
                          {mockDetailData.kompetensiUtama.map((skill, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs bg-secondary"
                            >
                              <span className="text-secondary-foreground">{skill.nama}</span>
                              <span className={cn(
                                "px-1.5 py-0.5 rounded text-[10px] font-medium",
                                skill.prioritas === "Wajib" 
                                  ? "bg-primary/20 text-primary" 
                                  : "bg-muted text-muted-foreground"
                              )}>
                                {skill.prioritas}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Soft Skills */}
                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Kompetensi Pendukung (Soft Skills)</p>
                        <div className="flex flex-wrap gap-2">
                          {mockDetailData.kompetensiPendukung.map((skill, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs bg-secondary"
                            >
                              <span className="text-secondary-foreground">{skill.nama}</span>
                              <span className={cn(
                                "px-1.5 py-0.5 rounded text-[10px] font-medium",
                                skill.prioritas === "Wajib" 
                                  ? "bg-primary/20 text-primary" 
                                  : "bg-muted text-muted-foreground"
                              )}>
                                {skill.prioritas}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Perangkat & Teknologi */}
                  <div className="border border-border/60 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
                      <Laptop className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Perangkat & Teknologi</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {mockDetailData.perangkatTeknologi.map((tool, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-accent text-accent-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pendidikan Profesi */}
                  <div className="border border-border/60 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Pendidikan Profesi</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Formal Education */}
                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Pendidikan Formal</p>
                        <div className="flex flex-wrap gap-2">
                          {mockDetailData.pendidikanFormal.map((edu, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-secondary text-secondary-foreground"
                            >
                              {edu}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Non-Formal Education */}
                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Pendidikan Non-Formal</p>
                        <div className="space-y-2">
                          {mockDetailData.pendidikanNonFormal.map((program, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 p-3 rounded-lg bg-muted/50 border border-border/40"
                            >
                              <span className="text-sm font-medium text-foreground">{program.nama}</span>
                              <span className="text-xs text-muted-foreground">{program.penyelenggara}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 3: Prospek Kerja Profesi */}
                <TabsContent value="prospek" className="mt-6 space-y-4">
                  {/* Jenjang Karier */}
                  <div className="border border-border/60 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Jenjang Karier</h3>
                    </div>
                    <div className="p-4">
                      <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-border" />
                        
                        <div className="space-y-4">
                          {mockDetailData.jenjangKarier.map((level, idx) => (
                            <div key={idx} className="relative flex items-start gap-4 pl-8">
                              {/* Dot */}
                              <div className={cn(
                                "absolute left-1.5 top-2 w-3 h-3 rounded-full border-2 border-background",
                                idx === 0 ? "bg-primary" : "bg-muted-foreground/50"
                              )} />
                              
                              <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border/40">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div>
                                    <p className="text-sm font-semibold text-foreground">{level.posisi}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {level.pengalaman}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400">
                                    <DollarSign className="h-3 w-3" />
                                    {level.gaji}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kondisi Pasar Kerja */}
                  <div className="border border-border/60 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/40">
                      <Users className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">Kondisi Pasar Kerja</h3>
                    </div>
                    <div className="p-4">
                      {mockDetailData.kondisiPasarKerja.length > 0 ? (
                        <ul className="space-y-2.5">
                          {mockDetailData.kondisiPasarKerja.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">{idx + 1}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Informasi kondisi pasar kerja belum tersedia
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/* Loading State for Tabs */}
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
