import React, { useState, useEffect, useRef } from 'react';
import { ClubBadge } from './ClubBadge';
import { TopMatchCenterStrip } from './TopMatchCenterStrip';
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
  ChevronDown,
  Search,
  Play,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMatchCenter: () => void;
  onOpenHighlights?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMatchCenter,
  onOpenHighlights,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [competitionsDropdownOpen, setCompetitionsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCompetitionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setCompetitionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHighlightsClick = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('highlights-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 w-full select-none transition-all duration-300">
      
      {/* 1. TOP LIVE & UPCOMING MATCH STRIP (Directly inspired by merr1.png) */}
      <TopMatchCenterStrip onOpenMatchCenter={onOpenMatchCenter} />

      {/* 2. MAIN SPORTS PORTAL NAVBAR (Styled as merr1.png) */}
      <div
        className={`w-full transition-all duration-300 border-b border-slate-800/80 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl py-2'
            : 'bg-slate-950/90 backdrop-blur-md shadow-lg py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
          
          {/* Brand Identity / Official Club Crest */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 md:gap-3 cursor-pointer select-none group shrink-0"
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
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm md:text-lg font-black text-white tracking-tight group-hover:text-red-400 transition-colors">
                  الجيل الصاعد مجاز عمار
                </h1>
                <span className="text-[10px] font-black font-mono tracking-wider bg-gradient-to-r from-red-600 to-rose-700 text-white px-1.5 py-0.2 rounded-md shadow-sm border border-red-500/30">
                  JSBMA
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-slate-400 mt-0.5 font-medium">
                <span className="text-emerald-400 font-semibold">الجهوي الأول • عنابة</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">تأسس 1986</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Styled as merr1.png: آخر الأخبار, مواعيد, ملخصات, مسابقات ودوريات, بث مباشر) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1 rounded-2xl border border-slate-800/90 shadow-inner">
            
            {/* 1. آخر الأخبار (Latest News) */}
            <button
              onClick={() => handleNavClick('news')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>آخر الأخبار</span>
            </button>

            {/* 2. مواعيد (Fixtures / Standings) */}
            <button
              onClick={() => handleNavClick('standings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'standings'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>مواعيد</span>
            </button>

            {/* 3. ملخصات (Highlights & Videos from merr1.png) */}
            <button
              onClick={handleHighlightsClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-current" />
              <span>ملخصات</span>
              <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                فيديو
              </span>
            </button>

            {/* 4. مسابقات ودوريات (Competitions Dropdown with Chevron from merr1.png) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCompetitionsDropdownOpen(!competitionsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer ${
                  activeTab === 'clubs' || competitionsDropdownOpen
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>مسابقات ودوريات</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${competitionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {competitionsDropdownOpen && (
                <div className="absolute top-full mt-1.5 right-0 w-60 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-fade-in text-right">
                  <button
                    onClick={() => handleNavClick('clubs')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    <span>أندية الجهوي الأول (16 نادياً)</span>
                    <span className="text-[10px] bg-red-600/30 text-red-400 px-2 py-0.5 rounded-md">
                      LRFA
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavClick('standings')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    <span>جدول الترتيب والرزنامة</span>
                    <span className="text-[10px] bg-emerald-600/30 text-emerald-400 px-2 py-0.5 rounded-md">
                      2026/2027
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavClick('news')}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    <span>تصفيات كأس الجزائر 2027</span>
                    <span className="text-[10px] bg-amber-600/30 text-amber-400 px-2 py-0.5 rounded-md">
                      رسمي
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 5. بث مباشر (Live with pulsing red beacon from merr1.png) */}
            <button
              onClick={onOpenMatchCenter}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black text-rose-300 hover:text-white hover:bg-red-950/60 transition-all cursor-pointer group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span>بث مباشر</span>
            </button>

            {/* 6. عن النادي (About Club) */}
            <button
              onClick={() => handleNavClick('about')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>عن النادي</span>
            </button>
          </nav>

          {/* Search Input & Social Links Group (Signature from merr1.png) */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث في الأخبار والفرق..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNavClick('news');
                  }
                }}
                className="w-44 focus:w-56 bg-slate-900 border border-slate-800 focus:border-red-500 text-xs text-slate-200 placeholder-slate-500 rounded-xl pr-8 pl-3 py-1.5 transition-all duration-300 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 right-2.5 pointer-events-none" />
            </div>

            {/* Social Media Links Icons (as seen in merr1.png) */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:bg-blue-600 hover:border-blue-500 transition shadow-sm"
                title="فيسبوك"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:bg-slate-800 hover:border-slate-700 transition shadow-sm"
                title="تويتر / X"
              >
                <span className="text-xs font-black font-sans">𝕏</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:bg-pink-600 hover:border-pink-500 transition shadow-sm"
                title="إنستغرام"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:bg-red-600 hover:border-red-500 transition shadow-sm"
                title="يوتيوب"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Actions: Live shortcut + Toggle Drawer */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenMatchCenter}
              className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl text-xs font-black shadow-md border border-red-500/40 active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>مباشر</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 min-h-[40px] flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl cursor-pointer transition-colors shadow-sm active:scale-95"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800/90 px-4 py-4 space-y-2 shadow-2xl animate-fade-in">
          
          {/* Search inside mobile menu */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="ابحث في الأخبار والفرق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-xl pr-9 pl-3 py-2.5 focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3" />
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'home' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>الرئيسية</span>
          </button>

          <button
            onClick={() => handleNavClick('news')}
            className={`w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'news' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Newspaper className="w-4 h-4 text-red-400" />
              <span>آخر الأخبار</span>
            </div>
            <span className="text-[10px] bg-red-950 border border-red-500/40 text-red-300 px-2 py-0.5 rounded-full">
              جديد
            </span>
          </button>

          <button
            onClick={() => handleNavClick('standings')}
            className={`w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'standings' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>مواعيد ورزنامة البطولة</span>
            </div>
          </button>

          <button
            onClick={handleHighlightsClick}
            className="w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl text-xs font-bold bg-slate-900/80 text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Play className="w-4 h-4 text-emerald-400 fill-current" />
              <span>ملخصات وفيديو المباريات</span>
            </div>
            <span className="text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full">
              HD
            </span>
          </button>

          <button
            onClick={() => handleNavClick('clubs')}
            className={`w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'clubs' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>أندية الجهوي الأول (16 نادياً)</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'about' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-blue-400" />
              <span>عن النادي وتاريخه (1986)</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full flex items-center justify-between p-3 min-h-[44px] rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'contact' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>اتصل بنا</span>
            </div>
          </button>
        </div>
      )}

    </header>
  );
};
