import React, { useState, useEffect } from 'react';
import { ClubBadge } from './ClubBadge';
import {
  Menu,
  X,
  Trophy,
  Shield,
  Calendar,
  Newspaper,
  Info,
  Phone,
  Flame,
  Radio,
  Sparkles,
  ChevronDown,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMatchCenter: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenMatchCenter }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Shield },
    { id: 'clubs', label: 'أندية الجهوي الأول', icon: Trophy, badge: '16 نادياً' },
    { id: 'standings', label: 'الترتيب والرزنامة', icon: Calendar },
    { id: 'news', label: 'أخبار النادي', icon: Newspaper, badge: 'جديد' },
    { id: 'about', label: 'عن النادي', icon: Info },
    { id: 'contact', label: 'اتصل بنا', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full select-none transition-all duration-300">
      {/* 1. Top Prestige Micro-Bar (Ticker & Match Bulletin) */}
      <div className="bg-slate-950/95 border-b border-slate-800/80 text-slate-300 text-xs py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Right: Club Status & Official Tag */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>الموقع الرسمي • جيل مجاز عمار (تأسس 1984)</span>
            </span>
            <span className="hidden sm:inline-block text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <Shield className="w-3 h-3 text-red-500" />
              <span>الرابطة الجهوية لكرة القدم عنابة (LRFA)</span>
            </span>
          </div>

          {/* Center/Left: Next Match Marquee Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMatchCenter}
              className="group flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-200 hover:text-white hover:bg-red-900/60 hover:border-red-400 transition-all cursor-pointer shadow-sm"
              title="انقر لفتح مركز القمة الافتتاحية"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 animate-bounce transition-transform" />
              <span className="font-extrabold text-[11px] tracking-tight">
                قمة الجولة 1: JSBMA 🆚 IRBEH
              </span>
              <span className="hidden md:inline-block text-[10px] text-amber-300/90 font-medium">
                • السبت 19 سبتمبر (15:00)
              </span>
              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold mr-1">
                مركز اللقاء
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 border-b border-slate-800/80 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl py-2.5'
            : 'bg-slate-950/90 backdrop-blur-md shadow-lg py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Identity / Official Club Crest */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer select-none group shrink-0"
          >
            <div className="relative">
              <ClubBadge
                clubId="jsbma"
                size="md"
                className="transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-xl font-black text-white tracking-tight group-hover:text-red-400 transition-colors">
                  الجيل الصاعد مجاز عمار
                </h1>
                <span className="text-[10px] md:text-xs font-black font-mono tracking-wider bg-gradient-to-r from-red-600 to-rose-700 text-white px-2 py-0.5 rounded-md shadow-sm border border-red-500/30">
                  JSBMA
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-medium">
                <span>القسم الجهوي الأول</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-red-400/90 font-semibold">ولاية قالمة</span>
                <span className="hidden sm:inline text-slate-500">• 1984</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-2xl border border-slate-800/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-900/30 ring-1 ring-red-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.id === 'news'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Secondary Action CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={onOpenMatchCenter}
              className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-red-600 via-red-700 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-lg shadow-red-900/40 border border-red-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="tracking-wide">مركز القمة 19 سبتمبر</span>
            </button>
          </div>

          {/* Mobile Actions: Match Shortcut + Toggle Drawer */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenMatchCenter}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl text-xs font-black shadow-md border border-red-500/40"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>القمة</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl cursor-pointer transition-colors shadow-sm"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer with Smooth Slide */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800/90 px-4 py-5 space-y-2 shadow-2xl animate-fadeIn">
          {/* Quick Header in mobile drawer */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-bold text-slate-300">أقسام الموقع الرسمية:</span>
            <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-mono">
              الموسم 2026/2027
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                    : 'bg-slate-900/70 text-slate-200 hover:bg-slate-900 hover:text-white border border-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Direct Match Center Mobile Card */}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMatchCenter();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-500/40 text-white shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                <div className="text-right">
                  <span className="block text-xs font-black text-white">مركز قمة الجولة الأولى</span>
                  <span className="text-[10px] text-slate-400">السبت 19 سبتمبر 2026 • 15:00</span>
                </div>
              </div>
              <span className="text-[10px] font-black bg-red-600 px-2.5 py-1 rounded-lg">
                دخول ←
              </span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
