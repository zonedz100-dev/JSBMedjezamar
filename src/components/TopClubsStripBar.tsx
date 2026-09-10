import React, { useState } from 'react';
import { CLUBS_DATA } from '../data/clubsData';
import { Club } from '../types';
import { ClubBadge } from './ClubBadge';
import { Shield, Sparkles, ChevronLeft, ChevronRight, ExternalLink, ZoomIn, X, Info } from 'lucide-react';

interface TopClubsStripBarProps {
  onSelectClub?: (club: Club) => void;
  onNavigateToClubs?: () => void;
}

export const TopClubsStripBar: React.FC<TopClubsStripBarProps> = ({
  onSelectClub,
  onNavigateToClubs,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClubPreview, setSelectedClubPreview] = useState<Club | null>(null);
  const [viewMode, setViewMode] = useState<'badges' | 'strip'>('badges');

  const handleClubClick = (club: Club) => {
    setSelectedClubPreview(club);
    onSelectClub?.(club);
  };

  return (
    <aside
      id="top-clubs-strip-bar"
      aria-label="شريط أندية القسم الجهوي الأول"
      className="bg-slate-900/90 border-b border-slate-800/80 shadow-md relative z-30 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Label & Indicator */}
          <div className="flex items-center justify-between w-full md:w-auto px-2 md:px-0 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] md:text-xs font-black text-white tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                <Shield className="w-3.5 h-3.5 text-red-500" />
                <span>أندية الجهوي الأول (16 فريقاً):</span>
              </span>
            </div>

            {/* Quick View Switcher */}
            <div className="flex items-center gap-1.5 text-[10px]">
              <button
                onClick={() => setViewMode(viewMode === 'badges' ? 'strip' : 'badges')}
                className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
                title={viewMode === 'badges' ? 'عرض الشريط الموحد كصورة' : 'عرض الشعارات كأيقونات تفاعلية'}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{viewMode === 'badges' ? 'عرض صورة الشريط' : 'عرض تفاعلي'}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-2 py-1 rounded-md bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 border border-red-500/30 transition flex items-center gap-1 cursor-pointer"
                title="تكبير صورة الشعارات المعتمدة"
              >
                <ZoomIn className="w-3 h-3" />
                <span>تكبير</span>
              </button>
            </div>
          </div>

          {/* Mode 1: Interactive Badges Bar */}
          {viewMode === 'badges' && (
            <div className="w-full md:flex-1 overflow-x-auto scrollbar-none py-1 px-1">
              <div className="flex items-center justify-start md:justify-center gap-2 min-w-max">
                {CLUBS_DATA.map((club, index) => {
                  const isMain = club.id === 'jsbma';
                  const isOpponent = club.id === 'irbeh';

                  return (
                    <button
                      key={club.id}
                      onClick={() => handleClubClick(club)}
                      className={`group relative flex items-center gap-1.5 py-1.5 px-2.5 min-h-[38px] rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
                        isMain
                          ? 'bg-amber-500/15 border border-amber-400/80 shadow-sm ring-1 ring-amber-400/30 hover:bg-amber-500/25'
                          : isOpponent
                          ? 'bg-emerald-950/40 border border-emerald-500/60 hover:bg-emerald-900/40'
                          : 'bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                      title={`${index + 1}. ${club.nameAr} (${club.nameFr}) - ولاية ${club.wilaya}`}
                    >
                      <div className="relative shrink-0">
                        <ClubBadge clubId={club.id} size="xs" className="group-hover:scale-110 transition-transform" />
                        {isMain && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-slate-950" />
                        )}
                      </div>

                      <div className="text-right flex flex-col items-start leading-none">
                        <span className={`text-[10px] font-bold truncate max-w-[70px] ${
                          isMain ? 'text-amber-300' : isOpponent ? 'text-emerald-400' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {club.shortName}
                        </span>
                        <span className="text-[8px] text-slate-500 font-mono">
                          {club.acronym}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mode 2: Integrated Composite Strip Image View */}
          {viewMode === 'strip' && (
            <div
              onClick={() => setIsModalOpen(true)}
              className="w-full md:flex-1 overflow-x-auto cursor-pointer py-1 px-2 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-red-500/40 transition group"
              title="انقر للتكبير والاطلاع على التفاصيل"
            >
              <img
                src="/images/r1_official_clubs_strip_dark.png"
                alt="شريط شعارات أندية الجهوي الأول"
                className="w-full min-w-[700px] h-9 md:h-10 object-contain mx-auto group-hover:scale-[1.01] transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

        </div>
      </div>

      {/* Mini Club Detail Drawer / Popup when a club is clicked */}
      {selectedClubPreview && (
        <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <ClubBadge clubId={selectedClubPreview.id} size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">
                    {selectedClubPreview.nameAr} ({selectedClubPreview.acronym})
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                    ولاية {selectedClubPreview.wilaya}
                  </span>
                  {selectedClubPreview.id === 'jsbma' && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                      فريقنا
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  الملعب: {selectedClubPreview.stadium} • سنة التأسيس: {selectedClubPreview.foundedYear}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={selectedClubPreview.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px]"
              >
                <span>موقع الرابطة</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {onNavigateToClubs && (
                <button
                  onClick={() => {
                    setSelectedClubPreview(null);
                    onNavigateToClubs();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <span>دليل الأندية الكامل</span>
                  <ChevronLeft className="w-3 h-3" />
                </button>
              )}

              <button
                onClick={() => setSelectedClubPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Modal Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="text-sm md:text-base font-bold text-white">
                    شريط شعارات أندية بطولة القسم الجهوي الأول (16 نادياً)
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    الرابطة الجهوية لكرة القدم عنابة (LRFA) • موسم 2026/2027
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto max-h-[65vh] p-4 bg-slate-950 rounded-xl border border-slate-800/80">
              <img
                src="/images/r1_official_clubs_strip_dark.png"
                alt="شريط شعارات أندية بطولة الجهوي الأول عالي الدقة"
                className="w-full min-w-[850px] h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>تم استكمال الشعارات الناقصة بدقة عالية وترتيب الفرق الـ 16 رسمياً.</span>
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="/images/r1_official_clubs_strip_dark.png"
                  download="LRFA_Clubs_Strip_HD.png"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition flex items-center gap-2"
                >
                  <span>تحميل الصورة بدقة عالية</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
