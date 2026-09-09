import React, { useState } from 'react';
import { ClubBadge } from './ClubBadge';
import { Menu, X, Trophy, Shield, Calendar, Newspaper, Info, Phone, Flame } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMatchCenter: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenMatchCenter }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Shield },
    { id: 'match', label: 'قمة الجولة 1', icon: Flame, special: true },
    { id: 'clubs', label: 'أندية الرابطة (16)', icon: Trophy },
    { id: 'standings', label: 'الترتيب والرزنامة', icon: Calendar },
    { id: 'news', label: 'أخبار الفريق', icon: Newspaper },
    { id: 'about', label: 'من نحن', icon: Info },
    { id: 'contact', label: 'اتصل بنا', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'match') {
      onOpenMatchCenter();
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-red-700 via-rose-600 to-emerald-700 text-white text-[11px] md:text-xs py-1.5 px-4 text-center font-bold flex items-center justify-center gap-2 overflow-hidden">
        <span className="animate-pulse">⚽</span>
        <span>القمة الافتتاحية للجهوي الأول: جيل مجاز عمار 🆚 اتحاد الحجار • السبت 19 سبتمبر 2026 بملعب سويداني بوجمعة</span>
        <button
          onClick={onOpenMatchCenter}
          className="bg-black/40 hover:bg-black/60 px-2.5 py-0.5 rounded-full text-[10px] underline cursor-pointer"
        >
          مركز اللقاء ←
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="transform group-hover:rotate-6 transition-transform">
            <ClubBadge clubId="jsbma" size="md" />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-black text-white group-hover:text-red-400 transition">
                جيل بلدية مجاز عمار
              </span>
              <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
                JSBMA
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block -mt-0.5">
              رابطة عنابة لكرة القدم • القسم الجهوي الأول
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.special) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white shadow-md transition cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-bold rounded-xl transition cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 opacity-80" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenMatchCenter}
            className="p-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>القمة</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-red-400" />
                  <span>{item.label}</span>
                </div>
                {item.special && (
                  <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                    السبت 19 سبت
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
