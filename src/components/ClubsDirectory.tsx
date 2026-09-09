import React, { useState } from 'react';
import { CLUBS_DATA } from '../data/clubsData';
import { Club, Wilaya } from '../types';
import { ClubBadge } from './ClubBadge';
import { Search, ExternalLink, MapPin, Calendar, Shield, Facebook, Globe, X } from 'lucide-react';

interface ClubsDirectoryProps {
  onSelectClubForMatch?: (clubId: string) => void;
}

export const ClubsDirectory: React.FC<ClubsDirectoryProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | 'الكل'>('الكل');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const wilayas: (Wilaya | 'الكل')[] = ['الكل', 'قالمة', 'عنابة', 'الطارف', 'تبسة', 'سوق أهراس'];

  const filteredClubs = CLUBS_DATA.filter((club) => {
    const matchesWilaya = selectedWilaya === 'الكل' || club.wilaya === selectedWilaya;
    const matchesSearch =
      club.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWilaya && matchesSearch;
  });

  return (
    <section id="clubs-directory" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>الرابطة الجهوية لكرة القدم عنابة (LRFA)</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-white">
          أندية القسم الجهوي الأول (16 فريقاً)
        </h2>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          الدليل الكامل والشامل لأندية بطولة الجهوي الأول - موسم 2026/2027 مع الروابط الرسمية وصفحات التواصل
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن النادي أو المدينة..."
              className="w-full pr-10 pl-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 transition"
            />
          </div>

          {/* Wilaya Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {wilayas.map((wilaya) => (
              <button
                key={wilaya}
                onClick={() => setSelectedWilaya(wilaya)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedWilaya === wilaya
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {wilaya === 'الكل' ? 'جميع الولايات' : `ولاية ${wilaya}`}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Clubs Grid (16 clubs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredClubs.map((club) => {
          const isMainTeam = club.id === 'jsbma';
          const isOpponent = club.id === 'irbeh';

          return (
            <div
              key={club.id}
              className={`relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 border transition-all duration-300 hover:-translate-y-1 shadow-lg group ${
                isMainTeam
                  ? 'border-red-500/80 bg-gradient-to-b from-red-950/30 via-slate-900 to-slate-900 ring-1 ring-red-500/30'
                  : isOpponent
                  ? 'border-emerald-500/80 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-900 ring-1 ring-emerald-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Badge & Quick Highlight */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <ClubBadge clubId={club.id} size="md" className="group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    ولاية {club.wilaya}
                  </span>
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base md:text-lg text-white group-hover:text-amber-400 transition">
                      {club.nameAr}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono tracking-wider block">
                    {club.nameFr} ({club.acronym})
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {club.description}
                </p>

                <div className="space-y-1.5 text-[11px] text-slate-300 border-t border-slate-800/80 pt-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>الملعب: {club.stadium.split('/')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>التأسيس: سنة {club.foundedYear}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Links */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedClub(club)}
                  className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  تفاصيل النادي
                </button>

                <div className="flex items-center gap-1.5">
                  {club.officialUrl && (
                    <a
                      href={club.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition"
                      title="صفحة النادي في رابطة عنابة"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {club.facebookUrl && (
                    <a
                      href={club.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white rounded-lg transition"
                      title="الصفحة الرسمية في فيسبوك"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {isMainTeam && (
                <div className="absolute -top-3 right-4 bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                  نادينا • المستضيف
                </div>
              )}
              {isOpponent && (
                <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                  المنافس • الجولة 1
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Club Details Modal */}
      {selectedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-white">
            <button
              onClick={() => setSelectedClub(null)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <ClubBadge clubId={selectedClub.id} size="lg" />
              <div>
                <h3 className="text-xl font-black">{selectedClub.nameAr}</h3>
                <span className="text-xs text-slate-400 block font-mono">
                  {selectedClub.nameFr} • {selectedClub.acronym}
                </span>
                <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  ولاية {selectedClub.wilaya} • مدينة {selectedClub.city}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-300 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <p className="leading-relaxed">{selectedClub.description}</p>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block text-xs">سنة التأسيس:</span>
                  <span className="font-bold text-white">عام {selectedClub.foundedYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">الملعب الرسمي:</span>
                  <span className="font-bold text-white">{selectedClub.stadium}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">الرمز والاختصار:</span>
                  <span className="font-bold text-red-400">{selectedClub.acronym}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">سعة الملعب:</span>
                  <span className="font-bold text-white">{selectedClub.stadiumCapacity || 'غير محددة'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {selectedClub.officialUrl && (
                  <a
                    href={selectedClub.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
                  >
                    <Globe className="w-4 h-4" />
                    موقع الرابطة LRFA
                  </a>
                )}
                {selectedClub.facebookUrl && (
                  <a
                    href={selectedClub.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition border border-slate-700"
                  >
                    <Facebook className="w-4 h-4 text-blue-400" />
                    صفحة فيسبوك
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedClub(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
