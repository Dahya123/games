import { useState, useEffect, useRef, FC, ReactNode, createContext, useContext } from "react";
import { Search, Gamepad2, Smartphone, Star, ExternalLink, Loader2, TrendingUp, Sparkles, ArrowLeft, Download, Calendar, Users, Info, Apple, Menu, X, Clock, Zap, Trophy, Flame, CheckCircle2, Globe, Mail, MapPin, ShieldCheck, StarHalf, Moon, Sun, Heart, LayoutDashboard, Share2, Hash, ArrowRight, Play, Rocket, MousePointer2 } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation, useSearchParams } from "react-router-dom";

// Types
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => { },
});

const useTheme = () => useContext(ThemeContext);

interface AppData {
  appId: string;
  title: string;
  icon: string;
  developer: string;
  score: number;
  scoreText: string;
  summary: string;
  url: string;
  genre?: string;
}

// Helper for SEO
function SEO({ title, description, keywords }: any) {
  return (
    <Helmet>
      <title>{title} | GamesBoards</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
}

// Navbar Component
function Navbar({ searchTerm, setSearchTerm, onSearch }: any) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 px-4 md:px-8",
      isScrolled ? "py-2 bg-background/80 backdrop-blur-xl border-b border-border shadow-lg" : "py-6 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Gamepad2 className="text-white w-7 h-7" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-foreground leading-none">
            Games<span className="text-primary italic">Boards</span>
          </span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-lg relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search amazing games..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            onFocus={() => { if (window.location.pathname !== "/") navigate("/"); }}
            className="w-full bg-secondary/80 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-[2rem] h-14 pl-14 pr-6 text-sm font-bold shadow-sm outline-none"
          />
        </div>

        {/* Menu Links - Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-muted-foreground overflow-hidden">
          <Link to="/" className="hover:text-primary">Home</Link>
          <button onClick={() => { navigate("/"); window.scrollTo({ top: 100 }); }} className="hover:text-primary">Games</button>
          <button onClick={() => { navigate("/"); window.scrollTo({ top: 400 }); }} className="hover:text-primary">Apps</button>
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          <Link to="/help" className="hover:text-primary">Support</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 bg-secondary/50 hover:bg-primary/20 hover:text-primary hidden sm:flex"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 border-b-2" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl p-6 lg:hidden">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Appearance</span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 px-4 font-black uppercase text-[10px]"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <><Moon className="w-3 h-3" /> Dark</> : <><Sun className="w-3 h-3" /> Light</>}
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary rounded-2xl h-12 pl-12 pr-4 text-sm font-bold border-none outline-none"
              />
            </div>
            <div className="flex flex-col gap-4 font-black uppercase tracking-widest text-lg">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link to="/help" onClick={() => setIsMobileMenuOpen(false)}>Support</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// (Removed Hero section for a cleaner grid-first portal)

// Global cache for Prefetching to make details feel instant
const detailCache: Record<string, any> = {};

// App Card Component
const AppCard: FC<{ app: AppData; onClick: () => void }> = ({ app, onClick }) => {
  const prefetch = async () => {
    if (detailCache[app.appId]) return;
    try {
      const res = await fetch(`/api/app/${app.appId}`);
      if (res.ok) {
        detailCache[app.appId] = await res.json();
      }
    } catch (e) {
      console.warn("Prefetch failed", e);
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={prefetch}
      className="group cursor-pointer p-4 bg-card rounded-[2.5rem] border-2 border-transparent hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden rounded-[2rem] mb-4 shadow-xl">
        <img
          src={app.icon}
          alt={app.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-black border-none font-black text-[9px] py-0.5 px-2 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
            {app.scoreText || "4.5"}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center">
          <div className="bg-primary p-4 rounded-[1.5rem] shadow-2xl">
            <Play className="w-6 h-6 text-primary-foreground fill-current" />
          </div>
        </div>
      </div>

      <div className="px-1 space-y-1.5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-lg font-black uppercase tracking-tighter italic line-clamp-1 flex-1 group-hover:text-primary">{app.title}</h3>
          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100">
            <MousePointer2 className="w-2.5 h-2.5 text-muted-foreground" />
          </div>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 font-mono line-clamp-1">{app.developer}</p>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed opacity-80">{app.summary}</p>

        <div className="pt-3 mt-auto">
          <Button className="w-full rounded-[1.5rem] bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground h-11 text-xs font-black uppercase tracking-widest group/btn">
            PLAY NOW
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Skeleton Grid
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
        <div key={i} className="p-4 bg-card rounded-[2.5rem] border-2 border-transparent space-y-4">
          <Skeleton className="aspect-square rounded-[2rem]" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-10 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

// HomePage Component
function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apps, setApps] = useState<AppData[]>([]);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeStore, setActiveStore] = useState<'play' | 'apple'>('play');
  const [limit, setLimit] = useState(100);
  const navigate = useNavigate();

  const category = searchParams.get("category") || "GAME";
  const collection = searchParams.get("collection") || "TOP_FREE";
  const searchTerm = searchParams.get("search") || "";

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        // Filter and map to simple names, handling both strings and objects
        const formatted = data
          .map((c: any) => {
            const rawName = typeof c === 'string' ? c : (c?.name || "");
            if (!rawName) return null;
            return {
              id: rawName,
              name: rawName.replace(/_/g, ' ').replace('GAME ', '').replace('FAMILY ', '')
            };
          })
          .filter(Boolean)
          .sort((a, b) => a!.name.localeCompare(b!.name));
        setCategories(formatted as { id: string, name: string }[]);
      }
    } catch (e) {
      console.error("Failed to fetch categories", e);
    }
  };

  const fetchApps = async (isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const currentLimit = isLoadMore ? limit + 50 : 100;
      if (isLoadMore) setLimit(currentLimit);
      else setLimit(100);

      const endpoint = searchTerm
        ? `/api/search?term=${encodeURIComponent(searchTerm)}&num=${isLoadMore ? currentLimit : 100}`
        : `/api/apps/top?category=${category}&collection=${collection}&num=${isLoadMore ? currentLimit : 100}&store=${activeStore}`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setApps([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchApps();
  }, [category, searchTerm, activeStore, collection]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="GamesBoards - Discover the Best Apps & Games" description="GamesBoards is your ultimate hub for discovering the most addictive, high-quality Android and iOS games and apps." />
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={(s: string) => setSearchParams({ category, collection, search: s || "" })}
      />

      <main id="grid" className="max-w-7xl mx-auto px-4 pb-32 pt-32">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="rounded-full px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase font-black tracking-widest text-[10px]">
                {searchTerm ? "Search Results" : "Discovery Hub"}
              </Badge>
              <div className="h-px flex-1 bg-border/50 lg:hidden" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
              {searchTerm ? "Results" : "Recommended Experiences"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Collection Switcher (Only for Play Store) */}
            {!searchTerm && (
              <div className="flex bg-card/50 backdrop-blur-sm rounded-[2rem] p-1.5 border border-border/50">
                {['TOP_FREE', 'TOP_PAID', 'GROSSING'].map((coll) => (
                  <button
                    key={coll}
                    onClick={() => setSearchParams({ category, collection: coll, search: searchTerm })}
                    className={cn(
                      "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest",
                      collection === coll ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {coll.replace('TOP_', '')}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">Browse Categories</h3>
            <div className="h-px flex-1 bg-border/30" />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 h-20">
            <button
              onClick={() => setSearchParams({ category: "GAME", collection, search: searchTerm })}
              className={cn(
                "h-full px-10 rounded-3xl text-xs font-black uppercase tracking-widest whitespace-nowrap border-2 flex items-center justify-center shrink-0 shadow-sm",
                category === "GAME" ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20" : "bg-card border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              All
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id, collection, search: searchTerm })}
                className={cn(
                  "h-full px-10 rounded-3xl text-xs font-black uppercase tracking-widest whitespace-nowrap border-2 flex items-center justify-center shrink-0 group relative overflow-hidden shadow-sm",
                  category === cat.id ? "bg-foreground border-foreground text-background" : "bg-card border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? <SkeletonGrid /> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {apps.map((app: AppData) => (
                <AppCard
                  key={app.appId}
                  app={app}
                  onClick={() => navigate(`/app/${app.appId}`, { state: { initialAppData: app } })}
                />
              ))}
            </div>

            {apps.length > 0 && limit < 1000 && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <Button
                  onClick={() => fetchApps(true)}
                  disabled={loadingMore}
                  className="rounded-full px-16 h-20 text-xl font-black uppercase italic tracking-tighter shadow-xl bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground group"
                >
                  {loadingMore ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Load More
                      <ArrowRight className="w-6 h-6 ml-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {!loading && apps.length === 0 && (
          <div className="text-center py-20 bg-secondary/10 rounded-[3rem] border-2 border-dashed border-border/50">
            <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold">No results found</h3>
            <p className="text-muted-foreground">Try searching for something else!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// AdSense component for easy placement
function AdPlacement({ slot, format = "auto", className = "" }: { slot?: string, format?: string, className?: string }) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Small delay to ensure the DOM has settled and avoids race conditions
    // during fast route transitions or StrictMode double-mounts
    const timer = setTimeout(() => {
      try {
        if (adRef.current) {
          // Check if this specific element is already being processed or finished
          const status = adRef.current.getAttribute('data-adsbygoogle-status');
          const isInitialized = adRef.current.getAttribute('data-ad-initialized');

          if (!status && !isInitialized) {
            // CRITICAL: AdSense requires the parent to have a visible width to calculate responsive sizes
            // We check clientWidth of the ref or its parent
            const availableWidth = adRef.current.parentElement?.clientWidth || 0;

            if (availableWidth > 0) {
              // Check if there are ANY ads waiting to be filled in the entire DOM
              const unprocessedAds = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status="done"])');

              if (unprocessedAds.length > 0) {
                adRef.current.setAttribute('data-ad-initialized', 'true');
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              }
            }
          }
        }
      } catch (e: any) {
        // Suppress common benign SPA AdSense errors
        const isBoringError =
          e?.message?.includes('already have ads') ||
          e?.message?.includes('availableWidth=0');

        if (!isBoringError) {
          console.error("AdSense error", e);
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("overflow-hidden flex items-center justify-center my-8 min-h-[100px] bg-secondary/5 rounded-3xl border border-dashed border-border/50", className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-3436116862976071"
        data-ad-slot={slot || "7436116862"}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Detail Page
function DetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Use cached data or passed state for instant initial render
  const initialData = location.state?.initialAppData || null;
  const [app, setApp] = useState<any>(detailCache[id!] || initialData);
  const [loading, setLoading] = useState(!detailCache[id!]);

  useEffect(() => {
    const fetchDetails = async () => {
      // If we already have full cached data, don't show loader but still refresh in background if needed
      if (!detailCache[id!]) setLoading(true);

      try {
        const res = await fetch(`/api/app/${id}`);
        const data = await res.json();
        setApp(data);
        detailCache[id!] = data;
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading && !app) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;
  if (!app) return <HomePage />;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <SEO title={app.title} description={app.summary} />
      <Navbar />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -ml-64 -mb-64" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-32 max-w-6xl">
        <div>
          <Button variant="ghost" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} className="mb-8 rounded-full hover:bg-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>

        {/* Ad Placement 1: Top of Page */}
        <AdPlacement className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <header className="flex flex-col md:flex-row gap-10 items-start">
              <div className="relative group shrink-0">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40" />
                <img src={app.icon} className="relative w-48 h-48 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white dark:border-border" referrerPolicy="no-referrer" />
              </div>

              <div className="space-y-6 flex-1 pt-4">
                <div className="space-y-2">
                  <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {app.genre || "Top Choice"}
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] text-foreground mix-blend-plus-lighter">{app.title}</h1>
                </div>
                <p className="text-2xl text-primary font-black uppercase tracking-widest italic">{app.developer}</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Downloads</span>
                    <Badge className="bg-secondary/50 text-foreground text-xs font-bold px-5 py-2 rounded-full border border-border/50">{app.installs || "10M+"}</Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Content</span>
                    <Badge className="bg-secondary/50 text-foreground text-xs font-bold px-5 py-2 rounded-full border border-border/50">{app.contentRating || "Everyone"}</Badge>
                  </div>
                </div>
              </div>
            </header>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Gallery</h2>
                <div className="flex gap-2">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <div className="w-4 h-1 bg-border rounded-full" />
                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
                {app.screenshots?.map((s: string, i: number) => (
                  <img
                    key={i}
                    src={s}
                    className="h-[500px] min-w-[280px] md:min-w-[400px] shrink-0 rounded-[3rem] border-4 border-white/5 shadow-2xl object-cover hover:ring-[12px] ring-primary/20 cursor-zoom-in snap-center"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>

            {/* Ad Placement 2: Mid Content (Visual Break) */}
            <AdPlacement className="my-16" />

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">About this Experience</h2>
                <Info className="w-8 h-8 text-primary/30" />
              </div>
              <div className="prose prose-xl prose-invert text-muted-foreground/90 leading-relaxed font-medium bg-card/40 p-10 md:p-14 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
                {/* Background loading pulse if we only have partial data */}
                {loading && (
                  <div className="absolute top-4 right-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/50">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Loading full details...
                  </div>
                )}

                <div
                  className="space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: (app.descriptionHTML || app.description || app.summary || "").replace(/\n/g, '<br/>')
                  }}
                />

                {/* Simulated Detailed Metadata */}
                <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-10 not-prose">
                  <div className="space-y-4">
                    <h4 className="text-primary font-black uppercase tracking-widest text-[11px] italic">Gameplay Mechanics</h4>
                    <div className="space-y-3">
                      {["High Fidelity Graphics", "Real-time Multiplayer", "Dynamic Environments"].map(feature => (
                        <div key={feature} className="flex items-center gap-3 bg-secondary/30 p-4 rounded-2xl border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm font-bold uppercase tracking-tight text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-primary font-black uppercase tracking-widest text-[11px] italic">Technical Summary</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Optimized for the latest mobile hardware architectures. Features low-latency input systems and advanced volumetric lighting for a truly immersive experience.
                    </p>
                    <Badge variant="outline" className="rounded-full border-primary/20 text-primary uppercase text-[9px] font-black px-4 py-2">Verified Content</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Store Buttons */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Button
                className="group h-24 rounded-[2.5rem] bg-foreground text-background hover:bg-primary hover:text-white flex items-center justify-between px-10 shadow-2xl shadow-black/10"
                onClick={() => window.open(app.url, '_blank')}
              >
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] block opacity-50">Download now</span>
                  <span className="text-2xl font-black italic uppercase tracking-tighter">Get on Google Play</span>
                </div>
                <Gamepad2 className="w-10 h-10" />
              </Button>

              {app.appStoreUrl && (
                <Button
                  className="group h-24 rounded-[2.5rem] bg-black text-white hover:bg-[#333] flex items-center justify-between px-10 shadow-2xl shadow-black/20"
                  onClick={() => window.open(app.appStoreUrl, '_blank')}
                >
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] block opacity-50">App Store link</span>
                    <span className="text-2xl font-black italic uppercase tracking-tighter">Download for iOS</span>
                  </div>
                  <Apple className="w-10 h-10" />
                </Button>
              )}
            </div>

            {/* Ad Placement 3: Above Similar Games */}
            <AdPlacement className="my-16" />

            {/* Similar Apps Section Removed from here to move outside the grid */}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div>
              <Card className="rounded-[3.5rem] bg-secondary/20 p-10 space-y-8 border-none sticky top-32 backdrop-blur-3xl ring-1 ring-white/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest opacity-50">Community Rating</span>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                      <Sparkles className="w-3 h-3" /> BEST
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-6xl font-black italic tracking-tighter">{app.scoreText || "4.6"}</span>
                    <div className="space-y-1">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className={cn("w-4 h-4", i <= Math.floor(app.score) ? "fill-primary text-primary" : "text-muted-foreground")} />
                        ))}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{app.reviews || "120K"} reviews</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-border/10 space-y-4">
                  <Button variant="outline" className="w-full h-16 rounded-[2.5rem] border-border/50 text-xs font-black uppercase tracking-[0.2em] gap-2 hover:bg-secondary">
                    <Heart className="w-4 h-4" /> Save to vault
                  </Button>
                </div>

                <div className="pt-8 border-t border-border/10 grid grid-cols-2 gap-y-6 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                  <div className="space-y-1">
                    <span className="block opacity-50">Version</span>
                    <span className="text-foreground text-xs">{app.version || "V2.4.1"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block opacity-50">Size</span>
                    <span className="text-foreground text-xs">{app.size || "124 MB"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block opacity-50">Category</span>
                    <span className="text-foreground text-xs">{app.genre || "Action"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block opacity-50">Last Update</span>
                    <span className="text-foreground text-xs">{app.updated ? new Date(app.updated).toLocaleDateString() : "Today"}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Similar Apps Section - Full Width Immersive */}
      {app.similar && app.similar.length > 0 && (
        <section className="bg-secondary/10 py-32 border-y border-border/50 mt-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-end justify-between border-b border-border/50 pb-12 mb-20 gap-8">
              <div className="space-y-6">
                <Badge className="bg-primary text-white border-none rounded-full px-6 py-1.5 font-black uppercase tracking-[0.2em] text-[10px]">More Like This</Badge>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">Recommended<br /><span className="text-primary italic">Experiences</span></h2>
              </div>
              <Button variant="outline" className="rounded-full h-20 px-10 font-black uppercase tracking-widest text-xs gap-4 group border-2 border-primary/20 hover:bg-primary hover:text-white shadow-xl shadow-primary/10" onClick={() => navigate('/')}>
                EXPLORE ALL GAMES <ArrowRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
              {app.similar.slice(0, 10).map((similarApp: any) => (
                <div
                  key={similarApp.appId}
                  onMouseEnter={async () => {
                    if (detailCache[similarApp.appId]) return;
                    try {
                      const res = await fetch(`/api/app/${similarApp.appId}`);
                      if (res.ok) detailCache[similarApp.appId] = await res.json();
                    } catch { }
                  }}
                  onClick={() => navigate(`/app/${similarApp.appId}`, { state: { initialAppData: similarApp } })}
                  className="group cursor-pointer flex flex-col p-8 bg-card/50 hover:bg-card rounded-[4rem] border-2 border-transparent hover:border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-primary/20"
                >
                  <div className="relative mb-8">
                    <img src={similarApp.icon} className="w-full aspect-square rounded-[3rem] shadow-2xl object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      <span className="text-xs font-black text-white">{similarApp.scoreText || "4.5"}</span>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1 px-2">
                    <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-tight line-clamp-2 group-hover:text-primary">{similarApp.title}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] line-clamp-1 opacity-60">{similarApp.developer}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border/10 flex items-center justify-between px-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-primary/80 italic">Play Now</span>
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-secondary/10 pt-20 pb-12 rounded-t-[4rem] px-4 md:px-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <Gamepad2 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black uppercase italic tracking-tighter">Games<span className="text-primary">Boards</span></span>
            </Link>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-sm">
              Your ultimate destination for discovering incredible Android & iOS games and apps. Modern, safe, and built for performance.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Discover</h4>
            <ul className="space-y-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <li><Link to="/" className="hover:text-primary">Trending</Link></li>
              <li><Link to="/" className="hover:text-primary">Popular</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog News</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Company</h4>
            <ul className="space-y-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/help" className="hover:text-primary">Support</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Advertise</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">© 2026 GamesBoards. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="w-5 h-5 text-muted-foreground hover:text-primary"><Globe className="w-full h-full" /></a>
            <a href="#" className="w-5 h-5 text-muted-foreground hover:text-primary"><Mail className="w-full h-full" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// (Removed Vlog logic)

// Blog Components
function BlogPreview() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[1, 2, 3].map(i => <Skeleton key={i} className="h-[400px] rounded-[3rem]" />)}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post: any) => (
        <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="group">
          <div className="bg-card/40 border border-white/5 rounded-[3rem] overflow-hidden flex flex-col h-full hover:bg-card hover:shadow-2xl transition-all">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={post.cover_image || "https://picsum.photos/seed/blog/800/500"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} referrerPolicy="no-referrer" />
            </div>
            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[9px] font-black uppercase text-primary border-primary/20">{post.tags?.split(',')[0] || "News"}</Badge>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{new Date(post.published_at).toLocaleDateString()}</span>
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-primary">{post.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 font-medium flex-1">{post.description}</p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic text-primary">Read Article</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Gaming Blog & News" description="The latest gaming releases, tech deep dives, and app reviews from GamesBoards." />
      <Navbar />

      <main className="container mx-auto px-4 py-32 max-w-7xl">
        <header className="mb-20 space-y-4">
          <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full">Editorial Hub</Badge>
          <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">The<br /><span className="text-primary italic">Blog</span></h1>
          <p className="text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic">Fresh insights from the world of gaming and applications, curated daily for the modern enthusiast.</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-[450px] rounded-[4rem]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col">
                <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden border-4 border-white/5 shadow-2xl">
                  <img src={post.cover_image || `https://picsum.photos/seed/${post.id}/800/600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-10 left-10">
                    <Badge className="bg-primary text-white border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">{post.tags?.split(',')[0] || "Featured"}</Badge>
                  </div>
                </div>
                <div className="pt-8 px-4 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>{post.user.name}</span>
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-[0.9] group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground line-clamp-2 font-medium leading-relaxed">{post.description}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Static Page Layout
function StaticPageLayout({ title, icon: Icon, children }: any) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title={title} description={`Learn more about ${title} on GamesBoards.`} />
      <Navbar />
      <main className="container mx-auto px-4 py-32 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter flex items-center gap-6">
            {Icon && <Icon className="w-16 h-16 text-primary" />}
            {title}
          </h1>
        </header>

        {/* Ad Placement in Static Pages */}
        <AdPlacement className="mb-12" />

        <div className="prose prose-xl prose-invert text-muted-foreground max-w-none">
          {children}
        </div>

        {/* Bottom Ad for longer legal pages */}
        <AdPlacement className="mt-20" />
      </main>
      <Footer />
    </div>
  );
}

function AboutPage() {
  return (
    <StaticPageLayout title="About Us" icon={Rocket}>
      <div className="space-y-8">
        <p className="text-2xl font-bold text-foreground italic">Welcome to GamesBoards – your ultimate destination for high-quality mobile gaming and application discovery.</p>

        <section className="space-y-6">
          <h3 className="text-3xl font-black italic uppercase text-foreground">Our Vision</h3>
          <p>We believe that finding your next favorite app shouldn't be a chore. With millions of apps across various stores, the best gems often get lost in the noise. GamesBoards was built to filter through that noise and bring the most innovative, addictive, and high-performance "boards" (apps) directly to you.</p>
        </section>

        <section className="space-y-6">
          <h3 className="text-3xl font-black italic uppercase text-foreground">What We Offer</h3>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Expert Curation:</strong> Every app on our platform is evaluated for quality and performance.</li>
            <li><strong>Lightning Fast Discovery:</strong> Our portal is optimized for speed, ensuring you spend less time waiting and more time playing.</li>
            <li><strong>SEO Focused:</strong> We provide detailed insights and descriptions to help you understand exactly what you're downloading.</li>
            <li><strong>Safe & Secure:</strong> We strictly provide links to official stores like Google Play and the App Store, ensuring your security is never compromised.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h3 className="text-3xl font-black italic uppercase text-foreground">Our Team</h3>
          <p>Based in the heart of the digital gaming community, our team consists of passionate developers, gamers, and curators dedicated to improving the mobile ecosystem. We drink a lot of coffee and play even more games so that you only have to play the best ones.</p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

function HelpPage() {
  return (
    <StaticPageLayout title="Support" icon={Info}>
      <p className="text-2xl font-bold text-foreground mb-8 italic">We're here to help you get the most out of GamesBoards.</p>
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-3xl font-black italic uppercase text-foreground">What is GamesBoards?</h3>
          <p>GamesBoards is a premier discovery platform for mobile games and applications. We curate the best experiences from the App Store and Play Store, providing a centralized hub for gamers to find their next favorite obsession.</p>
        </section>
        <section className="space-y-4">
          <h3 className="text-3xl font-black italic uppercase text-foreground">Is it free?</h3>
          <p>Yes, our service is completely free to use. We do not charge users for browsing or discovering content. Some games listed may contain in-app purchases as per their respective developers.</p>
        </section>
        <section className="space-y-4">
          <h3 className="text-3xl font-black italic uppercase text-foreground">How do I download?</h3>
          <p>When you find an app you like, click the "Play Store" or "App Store" buttons to be redirected to the official store listing where you can safely download the experience.</p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy" icon={ShieldCheck}>
      <div className="space-y-8">
        <p>At GamesBoards, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GamesBoards and how we use it.</p>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">Consent</h3>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">Information we collect</h3>
          <p>We do not collect personal identification information directly. We use standard log files that record visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">Google DoubleClick DART Cookie</h3>
          <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">Third Party Privacy Policies</h3>
          <p>GamesBoards's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

function ContactPage() {
  return (
    <StaticPageLayout title="Contact" icon={Mail}>
      <div className="space-y-8">
        <p className="text-xl">Have a suggestion or need to report a bug? Reach out to our team.</p>

        <div className="bg-secondary/20 p-8 rounded-[3rem] border border-white/5 space-y-6">
          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-2">Direct Email</h4>
            <a href="mailto:hello@gamesboards.com" className="text-3xl md:text-5xl font-black italic tracking-tighter text-foreground hover:text-primary transition-colors">hello@gamesboards.com</a>
          </div>

          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-2">Support Response Time</h4>
            <p className="text-muted-foreground font-medium">We aim to respond to all inquiries within 24-48 business hours.</p>
          </div>
        </div>

        <section className="pt-8">
          <h3 className="text-3xl font-black italic uppercase text-foreground mb-4">Advertise with us</h3>
          <p>Interested in featuring your game or app on GamesBoards? Contact our marketing team at <code className="text-primary bg-primary/10 px-2 py-1 rounded">ads@gamesboards.com</code> for our media kit and placement options.</p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

function TermsPage() {
  return (
    <StaticPageLayout title="Terms & Conditions" icon={ShieldCheck}>
      <div className="space-y-8">
        <p>By accessing this website, you agree to be bound by these Terms and Conditions of use. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">1. Use License</h3>
          <p>Permission is granted to temporarily view the materials (information or software) on GamesBoards's website for personal, non-commercial transitory viewing only.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">2. Disclaimer</h3>
          <p>The materials on GamesBoards's website are provided on an 'as is' basis. GamesBoards makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">3. Limitations</h3>
          <p>In no event shall GamesBoards or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GamesBoards's website.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black italic uppercase text-foreground">4. Accuracy of Materials</h3>
          <p>The materials appearing on GamesBoards's website could include technical, typographical, or photographic errors. GamesBoards does not warrant that any of the materials on its website are accurate, complete or current.</p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={cn("min-h-screen", theme === 'dark' ? "dark bg-background text-foreground" : "bg-background text-foreground tracking-tight")}>
        {children}
        {/* Floating Theme Toggle - Kept for accessibility */}
        <Button
          onClick={toggleTheme}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl z-50 bg-primary text-primary-foreground flex items-center justify-center p-0 border-4 border-background"
        >
          {theme === 'light' ? <Moon className="w-8 h-8" /> : <Sun className="w-8 h-8" />}
        </Button>
      </div>
    </ThemeContext.Provider>
  );
}

// App Wrapper
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/app/:id" element={<DetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
