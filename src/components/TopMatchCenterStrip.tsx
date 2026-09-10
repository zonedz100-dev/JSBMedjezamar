import React, { useRef } from 'react';
import { ClubBadge } from './ClubBadge';
import { ChevronRight, ChevronLeft, Flame, Radio } from 'lucide-react';

interface MatchItem {
  id: string;
  homeClubId: string;
  homeName: string;
  awayClubId: string;
  awayName: string;
  score?: string;
  time?: string;
  status: 'live' | 'upcoming' | 'finished';
  liveMinute?: string;
  competition: string;
  isMarquee?: boolean;
}

const ROUND_1_MATCHES: MatchItem[] = [
  {
    id: 'm1',
    homeClubId: 'jsbma',
    homeName: 'مجاز عمار',
    awayClubId: 'irbeh',
    awayName: 'اتحاد الحجار',
    time: '15:00',
    status: 'upcoming',
    competition: 'الجهوي 1 • قمة الجولة',
    isMarquee: true,
  },
  {
    id: 'm2',
    homeClubId: 'hamra',
    homeName: 'حمراء عنابة',
    awayClubId: 'crbd',
    awayName: 'شباب الذرعان',
    time: '15:00',
    status: 'upcoming',
    competition: 'الجهوي الأول',
  },
  {
    id: 'm3',
    homeClubId: 'irbsa',
    homeName: 'اتحاد سيدي عمار',
    awayClubId: 'usmb',
    awayName: 'اتحاد بوخضرة',
    score: '1 - 1',
    liveMinute: '72\'',
    status: 'live',
    competition: 'كأس الجزائر • الدور 1',
  },
  {
    id: 'm4',
    homeClubId: 'crbh',
    homeName: 'شباب هيليوبوليس',
    awayClubId: 'orbba',
    awayName: 'أولمبي بومهرة',
    score: '2 - 2',
    status: 'finished',
    competition: 'تحضيري ودي',
  },
  {
    id: 'm5',
    homeClubId: 'nrbb',
    homeName: 'نجم البسباس',
    awayClubId: 'mbb',
    awayName: 'مشعل برحال',
    time: '15:00',
    status: 'upcoming',
    competition: 'الجهوي الأول',
  },
  {
    id: 'm6',
    homeClubId: 'osmt',
    homeName: 'أولمبي الطارف',
    awayClubId: 'jst',
    awayName: 'جيل طاشة',
    time: '15:00',
    status: 'upcoming',
    competition: 'الجهوي الأول',
  },
  {
    id: 'm7',
    homeClubId: 'wmt',
    homeName: 'وفاق تبسة',
    awayClubId: 'esfba',
    awayName: 'وفاق بئر العاتر',
    score: '3 - 1',
    status: 'finished',
    competition: 'كأس الرابطة',
  },
  {
    id: 'm8',
    homeClubId: 'essa',
    homeName: 'وفاق سوق أهراس',
    awayClubId: 'ese',
    awayName: 'نجم العقلة',
    time: '15:00',
    status: 'upcoming',
    competition: 'الجهوي الأول',
  },
];

interface TopMatchCenterStripProps {
  onOpenMatchCenter: () => void;
}

export const TopMatchCenterStrip: React.FC<TopMatchCenterStripProps> = ({ onOpenMatchCenter }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-slate-950 border-b border-slate-800/90 text-slate-200 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex items-center gap-2">
        
        {/* Navigation Arrow Right (scrolls in RTL) */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex shrink-0 w-8 h-10 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl items-center justify-center transition shadow-sm z-10 cursor-pointer"
          title="التالي"
          aria-label="التالي"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Matches Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ROUND_1_MATCHES.map((match) => {
            const isLive = match.status === 'live';
            const isFinished = match.status === 'finished';

            return (
              <div
                key={match.id}
                onClick={onOpenMatchCenter}
                className={`shrink-0 flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 shadow-sm min-w-[220px] sm:min-w-[245px] md:min-w-[265px] ${
                  match.isMarquee
                    ? 'bg-gradient-to-r from-red-950/80 via-slate-900 to-emerald-950/80 border-red-500/50 hover:border-red-400 ring-1 ring-red-500/30'
                    : isLive
                    ? 'bg-slate-900/95 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Home Club */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="shrink-0">
                    <ClubBadge clubId={match.homeClubId} size="xs" />
                  </div>
                  <span className="text-[11px] md:text-xs font-bold text-slate-200 truncate max-w-[75px] sm:max-w-[90px]">
                    {match.homeName}
                  </span>
                </div>

                {/* Score / Time Status */}
                <div className="flex flex-col items-center justify-center px-1.5 shrink-0">
                  {isLive ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xs md:text-sm font-black text-emerald-400 tracking-wider font-mono">
                        {match.score}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.2 rounded-full mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {match.liveMinute}
                      </span>
                    </div>
                  ) : isFinished ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xs md:text-sm font-black text-white tracking-wider font-mono">
                        {match.score}
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold bg-slate-800 px-2 py-0.2 rounded mt-0.5">
                        انتهت
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] md:text-xs font-black text-white font-mono bg-slate-800/90 px-2 py-0.5 rounded-lg border border-slate-700">
                        {match.time}
                      </span>
                      <span className={`text-[9px] font-semibold mt-0.5 ${match.isMarquee ? 'text-amber-400 flex items-center gap-0.5' : 'text-slate-400'}`}>
                        {match.isMarquee && <Flame className="w-2.5 h-2.5 text-amber-400" />}
                        {match.isMarquee ? 'القمة' : 'قريباً'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Away Club */}
                <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                  <span className="text-[11px] md:text-xs font-bold text-slate-200 truncate max-w-[75px] sm:max-w-[90px] text-left">
                    {match.awayName}
                  </span>
                  <div className="shrink-0">
                    <ClubBadge clubId={match.awayClubId} size="xs" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrow Left (scrolls in RTL) */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex shrink-0 w-8 h-10 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl items-center justify-center transition shadow-sm z-10 cursor-pointer"
          title="السابق"
          aria-label="السابق"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
