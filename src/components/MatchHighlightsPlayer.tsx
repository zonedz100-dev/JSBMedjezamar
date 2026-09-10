import React, { useState } from 'react';
import { ClubBadge } from './ClubBadge';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Calendar,
  MapPin,
  Trophy,
  Flame,
  CheckCircle2,
  CircleDot,
  Radio,
  Clock,
  ChevronLeft,
} from 'lucide-react';

interface MatchHighlightsPlayerProps {
  onOpenMatchCenter: () => void;
}

interface MatchHighlightSummary {
  id: string;
  homeClubId: string;
  homeName: string;
  awayClubId: string;
  awayName: string;
  score: string;
  date: string;
  competition: string;
  duration: string;
}

const PREVIOUS_SUMMARIES: MatchHighlightSummary[] = [
  {
    id: 'sum-1',
    homeClubId: 'jsbma',
    homeName: 'مجاز عمار',
    awayClubId: 'hamra',
    awayName: 'حمراء عنابة',
    score: '2 v 1',
    date: '10 سبتمبر 2026',
    competition: 'مباراة تحضيرية ودية',
    duration: '08:45',
  },
  {
    id: 'sum-2',
    homeClubId: 'irbeh',
    homeName: 'اتحاد الحجار',
    awayClubId: 'crbd',
    awayName: 'شباب الذرعان',
    score: '1 v 0',
    date: '06 سبتمبر 2026',
    competition: 'مباراة تحضيرية ودية',
    duration: '06:20',
  },
  {
    id: 'sum-3',
    homeClubId: 'orbba',
    homeName: 'أولمبي بومهرة',
    awayClubId: 'crbh',
    awayName: 'شباب هيليوبوليس',
    score: '0 v 0',
    date: '04 سبتمبر 2026',
    competition: 'مباراة تحضيرية ودية',
    duration: '05:10',
  },
];

export const MatchHighlightsPlayer: React.FC<MatchHighlightsPlayerProps> = ({ onOpenMatchCenter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(65); // percentage

  // Recent form records for clubs (the 5 circular dots seen in top right of merr1.png)
  const jsbmaForm = ['win', 'win', 'draw', 'win', 'draw']; // Green, Green, Grey, Green, Grey
  const irbehForm = ['win', 'loss', 'draw', 'win', 'loss'];

  return (
    <section className="w-full space-y-6 select-none">
      
      {/* Section Header (Inspired by merr1.png) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-base md:text-xl font-black text-white flex items-center gap-2">
              <span>ملخصات الفيديو ومركز البث المباشر</span>
              <span className="text-[10px] font-bold bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                HD 1080p
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ملخصات الأهداف، تصريحات المدربين، وتغطية حصرية من قلب المستطيل الأخضر
            </p>
          </div>
        </div>

        {/* Club Form Tracker (Dots Matrix seen in merr1.png top right) */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 px-3.5 py-2 rounded-xl">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block">فورمة مجاز عمار (JSBMA)</span>
            <div className="flex items-center gap-1 mt-1 justify-end">
              {jsbmaForm.map((result, idx) => (
                <span
                  key={idx}
                  title={result === 'win' ? 'فوز' : result === 'draw' ? 'تعادل' : 'خسارة'}
                  className={`w-3 h-3 rounded-full ${
                    result === 'win'
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                      : result === 'draw'
                      ? 'bg-slate-500'
                      : 'bg-red-500'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block">فورمة الحجار (IRBEH)</span>
            <div className="flex items-center gap-1 mt-1 justify-end">
              {irbehForm.map((result, idx) => (
                <span
                  key={idx}
                  title={result === 'win' ? 'فوز' : result === 'draw' ? 'تعادل' : 'خسارة'}
                  className={`w-3 h-3 rounded-full ${
                    result === 'win'
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                      : result === 'draw'
                      ? 'bg-slate-500'
                      : 'bg-red-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Highlights Layout: Video Player + Match Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* THE VIDEO PLAYER (Directly styled after the pitch video in merr1.png) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          
          {/* Video Screen Simulation */}
          <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group">
            {/* Pitch / Action Scene Image */}
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop"
              alt="ملعب سويداني بوجمعة ومباراة كرة القدم"
              className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Dark gradient overlay for HUD visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40" />

            {/* Top Bar Badges inside Video */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="bg-red-600/95 text-white text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>تغطية خاصة • قمة الجولة الأولى</span>
                </span>
                <span className="bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  بث مباشر وقائع اللقاء
                </span>
              </div>

              <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-slate-700 font-mono">
                1080p 60fps
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 border-2 border-white/40 transform group-hover:scale-110 transition-all duration-300 cursor-pointer"
                title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الملخص'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Bottom Scrubber & Video Controls (Matching merr1.png green scrub timeline) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10 space-y-3">
              
              {/* Progress Bar with glowing green timeline */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.round((clickX / rect.width) * 100);
                  setPlaybackProgress(Math.max(0, Math.min(100, newProgress)));
                }}
                className="relative w-full h-2 bg-slate-700/80 rounded-full cursor-pointer group/bar overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full relative"
                  style={{ width: `${playbackProgress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                </div>
              </div>

              {/* Control Buttons & Timestamp */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-400 font-semibold">
                    09:12 / 14:01
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
                    ملعب سويداني بوجمعة
                  </span>
                  <button
                    onClick={onOpenMatchCenter}
                    className="hover:text-white transition cursor-pointer"
                    title="ملء الشاشة"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* OVERLAID MATCH RESULT & SCORER EVENTS (The lower breakdown from merr1.png) */}
          <div className="p-5 md:p-6 bg-slate-950/90 border-t border-slate-800/90 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Away Events (Left in RTL, IRBEH events) */}
            <div className="w-full md:w-5/12 space-y-2 text-right md:text-left order-3 md:order-1">
              <div className="flex items-center gap-2 justify-start md:justify-end mb-1">
                <span className="text-xs font-black text-slate-300">اتحاد الحجار (IRBEH)</span>
                <ClubBadge clubId="irbeh" size="xs" />
              </div>
              
              <div className="space-y-1.5">
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl px-3 py-1.5 text-[11px] flex items-center justify-between gap-2">
                  <span className="text-slate-300 font-semibold truncate">هدف التعادل (ركلة ركنية)</span>
                  <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold px-2 py-0.2 rounded-md font-mono text-[10px]">
                    الدقيقة 55'
                  </span>
                </div>
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl px-3 py-1.5 text-[11px] flex items-center justify-between gap-2">
                  <span className="text-slate-400 truncate">تسديدة خطيرة صدها الدفاع</span>
                  <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.2 rounded-md font-mono text-[10px]">
                    الدقيقة 78'
                  </span>
                </div>
              </div>
            </div>

            {/* Score Pill in Center (2 v 2 like merr1.png) */}
            <div className="flex flex-col items-center justify-center px-4 order-1 md:order-2 shrink-0">
              <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white font-mono font-black text-2xl px-5 py-2 rounded-2xl shadow-xl shadow-red-950/60 tracking-widest border border-red-500/50">
                2 v 2
              </div>
              <span className="text-[10px] font-bold text-amber-400 mt-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                12 سبتمبر 2026
              </span>
              <span className="text-[10px] text-slate-400">ملعب سويداني بوجمعة</span>
            </div>

            {/* Home Events (Right in RTL, JSBMA events) */}
            <div className="w-full md:w-5/12 space-y-2 text-right order-2 md:order-3">
              <div className="flex items-center gap-2 mb-1">
                <ClubBadge clubId="jsbma" size="xs" />
                <span className="text-xs font-black text-white">جيل مجاز عمار (JSBMA)</span>
              </div>

              <div className="space-y-1.5">
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl px-3 py-1.5 text-[11px] flex items-center justify-between gap-2">
                  <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold px-2 py-0.2 rounded-md font-mono text-[10px]">
                    الدقيقة 36'
                  </span>
                  <span className="text-white font-bold truncate">أمين بن عمارة (رأسية محكمة)</span>
                </div>
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl px-3 py-1.5 text-[11px] flex items-center justify-between gap-2">
                  <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.2 rounded-md font-mono text-[10px]">
                    الدقيقة 74'
                  </span>
                  <span className="text-slate-300 truncate">محمد لمين قندوزي (تسديدة قوية صدها الحارس)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* SIDEBAR: MATCH SUMMARY CARDS (Like the Betis & Lille cards in merr1.png) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <h4 className="text-sm font-black text-white flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>ملخصات المباريات الأخيرة</span>
            </h4>

            <div className="space-y-3">
              {PREVIOUS_SUMMARIES.map((sum) => (
                <div
                  key={sum.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3.5 transition group"
                >
                  {/* Clubs & Score */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <ClubBadge clubId={sum.homeClubId} size="xs" />
                      <span className="text-xs font-bold text-white truncate max-w-[85px] sm:max-w-[100px]">
                        {sum.homeName}
                      </span>
                    </div>

                    <div className="font-mono font-black text-sm bg-slate-900 px-2.5 py-1 rounded-lg text-emerald-400 border border-slate-800 shrink-0">
                      {sum.score}
                    </div>

                    <div className="flex items-center gap-2 justify-end min-w-0 flex-1">
                      <span className="text-xs font-bold text-white truncate max-w-[85px] sm:max-w-[100px] text-left">
                        {sum.awayName}
                      </span>
                      <ClubBadge clubId={sum.awayClubId} size="xs" />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-3 px-1">
                    <span>{sum.date}</span>
                    <span>{sum.duration} دقيقة</span>
                  </div>

                  {/* Call to Action Button: "شاهد الملخص الآن" (From merr1.png) */}
                  <button
                    onClick={onOpenMatchCenter}
                    className="w-full py-2.5 min-h-[40px] bg-gradient-to-r from-slate-900 to-slate-800 hover:from-emerald-950 hover:to-slate-900 hover:text-emerald-300 text-slate-300 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                    <span>شاهد الملخص الآن</span>
                  </button>
                </div>
              ))}
            </div>

            {/* View All Match Center CTA */}
            <button
              onClick={onOpenMatchCenter}
              className="w-full mt-4 py-2.5 bg-gradient-to-r from-red-600 via-red-700 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl text-xs font-black shadow-lg shadow-red-950/50 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>دخول مركز القمة الافتتاحية (JSBMA 🆚 IRBEH)</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
