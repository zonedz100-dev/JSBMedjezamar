/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { MatchBanner } from './components/MatchBanner';
import { MatchCenterModal } from './components/MatchCenterModal';
import { ClubsDirectory } from './components/ClubsDirectory';
import { ChampionshipStandings } from './components/ChampionshipStandings';
import { TeamNews } from './components/TeamNews';
import { AboutClub } from './components/AboutClub';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClubBadge } from './components/ClubBadge';
import { TopClubsStripBar } from './components/TopClubsStripBar';
import { CLUBS_DATA } from './data/clubsData';
import { NEWS_ARTICLES } from './data/newsData';
import { Trophy, Calendar, Flame, ArrowLeft, Shield, MapPin, ChevronLeft } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMatchCenterOpen, setIsMatchCenterOpen] = useState<boolean>(false);

  const jsbma = CLUBS_DATA.find((c) => c.id === 'jsbma') || CLUBS_DATA[0];
  const irbeh = CLUBS_DATA.find((c) => c.id === 'irbeh') || CLUBS_DATA[1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-red-600 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMatchCenter={() => setIsMatchCenterOpen(true)}
      />

      {/* Official 16 Clubs Logo Strip - Directly Under Main Menu */}
      <TopClubsStripBar
        onNavigateToClubs={() => {
          setActiveTab('clubs');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main App Container */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* Top Match Poster Hero */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
              <MatchBanner
                onOpenMatchCenter={() => setIsMatchCenterOpen(true)}
                onOpenStandings={() => {
                  setActiveTab('standings');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* Quick Stats & League Overview Bar */}
            <section className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('clubs')}
                  className="bg-slate-900/80 border border-slate-800 hover:border-red-500/50 p-4 rounded-2xl transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold">أندية البطولة</span>
                    <Trophy className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2">16 نادياً</div>
                  <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1 font-semibold">
                    استعرض الدليل <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div
                  onClick={() => setIsMatchCenterOpen(true)}
                  className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-500/40 p-4 rounded-2xl transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-red-300 font-bold">المباراة القادمة</span>
                    <Flame className="w-5 h-5 text-red-500 animate-bounce" />
                  </div>
                  <div className="text-lg font-black text-white mt-2 truncate">ضد اتحاد الحجار</div>
                  <span className="text-[11px] text-amber-400 flex items-center gap-1 mt-1 font-semibold">
                    السبت 19 سبتمبر • 15:00
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('standings')}
                  className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-2xl transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold">الجولة الأولى</span>
                    <Calendar className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2">8 مباريات</div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                    جدول الجولات <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div
                  onClick={() => setIsMatchCenterOpen(true)}
                  className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 p-4 rounded-2xl transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold">معقل اللقاء</span>
                    <MapPin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-base font-black text-white mt-2 truncate">سويداني بوجمعة</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">قالمة • 15,000 مقعد</span>
                </div>
              </div>
            </section>

            {/* Quick Preview: 16 Clubs Showcase */}
            <section className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">
                    أندية القسم الجهوي الأول - رابطة عنابة
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400">
                    16 نادياً يتنافسون على الصعود هذا الموسم (2026/2027)
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('clubs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs md:text-sm font-bold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>عرض جميع الفرق الـ 16</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Horizontal quick clubs roll - All 16 Clubs */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <div
                  onClick={() => {
                    setActiveTab('clubs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer mb-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 hover:border-red-500/40 transition group"
                  title="انقر لعرض شريط الشعارات المعتمدة الكامل"
                >
                  <img
                    src="/images/r1_official_clubs_strip_dark.png"
                    alt="شريط شعارات أندية الجهوي الأول (16 نادياً)"
                    className="w-full h-auto object-contain py-2 px-3 group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2">
                  {CLUBS_DATA.map((club) => (
                    <div
                      key={club.id}
                      onClick={() => {
                        setActiveTab('clubs');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`p-2 rounded-xl bg-slate-950/60 border text-center transition cursor-pointer hover:-translate-y-0.5 group ${
                        club.id === 'jsbma'
                          ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/50 shadow-md'
                          : club.id === 'irbeh'
                          ? 'border-emerald-500/80 bg-emerald-950/20 shadow-md'
                          : 'border-slate-800/80 hover:border-slate-700'
                      }`}
                      title={`${club.nameAr} (${club.acronym})`}
                    >
                      <div className="mx-auto mb-1 flex justify-center group-hover:scale-110 transition-transform">
                        <ClubBadge clubId={club.id} size="sm" />
                      </div>
                      <span className="text-[10px] font-bold text-white block truncate">
                        {club.shortName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Latest News Preview */}
            <section className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">
                    أحدث أخبار جيل مجاز عمار
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400">
                    مستجدات التحضيرات والحصص التدريبية قبل مواجهة السبت
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('news');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs md:text-sm font-bold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>المزيد من الأخبار</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NEWS_ARTICLES.slice(0, 3).map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      setActiveTab('news');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition cursor-pointer group shadow-xl"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <span className="text-[11px] text-slate-400 block mb-1">
                        {article.date}
                      </span>
                      <h4 className="font-bold text-sm text-white group-hover:text-red-400 transition line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: CLUBS DIRECTORY */}
        {activeTab === 'clubs' && (
          <ClubsDirectory />
        )}

        {/* VIEW 3: STANDINGS & FIXTURES */}
        {activeTab === 'standings' && (
          <ChampionshipStandings
            onOpenMarqueeMatch={() => setIsMatchCenterOpen(true)}
          />
        )}

        {/* VIEW 4: TEAM NEWS */}
        {activeTab === 'news' && (
          <TeamNews />
        )}

        {/* VIEW 5: ABOUT JSBMA */}
        {activeTab === 'about' && (
          <AboutClub />
        )}

        {/* VIEW 6: CONTACT */}
        {activeTab === 'contact' && (
          <ContactSection />
        )}

      </main>

      {/* Match Center Hub Modal */}
      <MatchCenterModal
        isOpen={isMatchCenterOpen}
        onClose={() => setIsMatchCenterOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMatchCenter={() => setIsMatchCenterOpen(true)}
      />

    </div>
  );
}
