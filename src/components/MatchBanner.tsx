import React, { useState, useEffect } from 'react';
import { ClubBadge, LRFALogo } from './ClubBadge';
import { Calendar, Clock, MapPin, Trophy, Share2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LEAGUE_INFO } from '../data/leagueData';

interface MatchBannerProps {
  onOpenMatchCenter?: () => void;
  onOpenStandings?: () => void;
}

export const MatchBanner: React.FC<MatchBannerProps> = ({
  onOpenMatchCenter,
  onOpenStandings,
}) => {
  // Target Match Date: 19 September 2026 at 15:00:00
  const targetDate = new Date('2026-09-19T15:00:00');

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    const shareText = `⚽ قمة الجولة الأولى للجهوي الأول - رابطة عنابة:\nجيل بلدية مجاز عمار (JSBMA) 🆚 اتحاد الحجار (IRBEH)\n📅 السبت 19 سبتمبر 2026 - 🕒 15:00\n🏟️ ملعب الشهيد سويداني بوجمعة – قالمة`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  return (
    <div id="match-banner-poster" className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-slate-700/60 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Background Stadium Atmosphere with Red & Green Flare */}
      <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-screen bg-cover bg-center"
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop')` }} />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/25 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-600/25 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="relative pt-6 px-4 md:px-8 text-center flex flex-col items-center">
        {/* LRFA Badge */}
        <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-5 py-2 rounded-full border border-slate-700/80 shadow-lg mb-4">
          <LRFALogo size="w-8 h-8" />
          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-400 block leading-tight">الرابطة الجهوية لكرة القدم عنابة</span>
            <span className="text-sm font-black text-white">القسم الجهوي الأول • 2026/2027</span>
          </div>
        </div>

        <div className="inline-block bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-sm md:text-base px-6 py-1.5 rounded-full shadow-lg border border-red-400/40 uppercase tracking-wider mb-2">
          افتتاح الموسم الكروي • الجولة الأولى
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 drop-shadow-sm mt-1">
          قمة كروية مرتقبة بالشرق الجزائري
        </h1>
        <p className="text-xs md:text-sm text-slate-300 max-w-xl mt-1">
          داربي الجوار بطموحات الصعود مبكراً بين أبناء قالمة وعروس البحر عنابة
        </p>
      </div>

      {/* Main Face-Off Section (Replicating the uploaded poster) */}
      <div className="relative z-10 px-4 md:px-8 py-6 md:py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-11 items-center gap-2 md:gap-4">
          
          {/* Home Team: JSB Medjez Amar (Red) */}
          <div className="col-span-5 flex flex-col items-center text-center p-3 md:p-6 rounded-2xl bg-gradient-to-br from-red-950/70 via-slate-900/60 to-red-900/40 border border-red-500/30 backdrop-blur-sm shadow-xl hover:border-red-400/60 transition group">
            <div className="relative mb-3 transform group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-red-600/30 rounded-full blur-xl animate-pulse" />
              <ClubBadge clubId="jsbma" size="xl" className="relative w-24 h-24 md:w-36 md:h-36" />
            </div>

            <span className="inline-block text-[11px] md:text-xs font-bold bg-red-600/30 text-red-300 border border-red-500/30 px-3 py-0.5 rounded-full mb-1">
              المستضيف • ولاية قالمة
            </span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-white leading-tight">
              جيل بلدية مجاز عمار
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs md:text-sm font-black text-red-400 tracking-wider">JSBMA</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-300 font-medium">تأسس 1986</span>
            </div>
            <p className="hidden md:block text-[11px] text-red-200/80 mt-2 font-medium">
              لقب النادي: "الصاعد ميمو" • أسود مجاز عمار
            </p>
          </div>

          {/* VS & Match Spark */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-500 p-[2px] shadow-2xl animate-spin-slow">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <span className="font-black text-base md:text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400">
                    VS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Away Team: IRB El Hadjar (Green) */}
          <div className="col-span-5 flex flex-col items-center text-center p-3 md:p-6 rounded-2xl bg-gradient-to-bl from-emerald-950/70 via-slate-900/60 to-emerald-900/40 border border-emerald-500/30 backdrop-blur-sm shadow-xl hover:border-emerald-400/60 transition group">
            <div className="relative mb-3 transform group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-emerald-600/30 rounded-full blur-xl animate-pulse" />
              <ClubBadge clubId="irbeh" size="xl" className="relative w-24 h-24 md:w-36 md:h-36" />
            </div>

            <span className="inline-block text-[11px] md:text-xs font-bold bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-0.5 rounded-full mb-1">
              الضيف • ولاية عنابة
            </span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-white leading-tight">
              اتحاد بلدية الحجار
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs md:text-sm font-black text-emerald-400 tracking-wider">I.R.B.E.H</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-300 font-medium">تأسس 1975</span>
            </div>
            <p className="hidden md:block text-[11px] text-emerald-200/80 mt-2 font-medium">
              أبناء مصنع الفولاذ • الأخضر والأبيض
            </p>
          </div>

        </div>
      </div>

      {/* Countdown Timer Strip */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-6">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 block">العد التنازلي لصافرة البداية</span>
                <span className="text-sm md:text-base font-bold text-white">السبت 19 سبتمبر 2026</span>
              </div>
            </div>

            {/* Time units */}
            <div className="flex items-center gap-2 md:gap-3 text-center" dir="ltr">
              <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 min-w-[55px]">
                <div className="text-lg md:text-2xl font-black text-red-500">{timeLeft.days}</div>
                <div className="text-[10px] text-slate-400 font-semibold">يوم</div>
              </div>
              <span className="text-slate-600 font-bold">:</span>
              <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 min-w-[55px]">
                <div className="text-lg md:text-2xl font-black text-amber-400">{timeLeft.hours}</div>
                <div className="text-[10px] text-slate-400 font-semibold">ساعة</div>
              </div>
              <span className="text-slate-600 font-bold">:</span>
              <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 min-w-[55px]">
                <div className="text-lg md:text-2xl font-black text-emerald-400">{timeLeft.minutes}</div>
                <div className="text-[10px] text-slate-400 font-semibold">دقيقة</div>
              </div>
              <span className="text-slate-600 font-bold">:</span>
              <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 min-w-[55px]">
                <div className="text-lg md:text-2xl font-black text-cyan-400">{timeLeft.seconds}</div>
                <div className="text-[10px] text-slate-400 font-semibold">ثانية</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Match Meta Card (Direct Replica of the bottom box in poster) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-700/80 rounded-2xl p-4 md:p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-800 text-center gap-4 md:gap-2">
            
            {/* Stadium */}
            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-12 h-12 rounded-full bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-2">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400 font-bold">الملعب والمكان</span>
              <span className="text-base md:text-lg font-black text-white mt-1">
                ملعب الشهيد سويداني بوجمعة
              </span>
              <span className="text-xs text-red-400 font-semibold">ولاية قالمة</span>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400 font-bold">توقيت المباراة</span>
              <span className="text-base md:text-lg font-black text-white mt-1">
                الساعة 15:00 زوالاً
              </span>
              <span className="text-xs text-amber-400 font-semibold">(3:00 مساءً)</span>
            </div>

            {/* Date */}
            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400 font-bold">التاريخ المحدد</span>
              <span className="text-base md:text-lg font-black text-white mt-1">
                السبت
              </span>
              <span className="text-sm font-black text-emerald-400">19 سبتمبر 2026</span>
            </div>

          </div>

          {/* Slogan and Action Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Slogan */}
            <div className="flex items-center gap-3 text-center sm:text-right">
              <span className="text-xs font-bold text-red-400 font-mono tracking-wider">JSBMA</span>
              <span className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400">
                « معاً من أجل كرة أجمل »
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">I.R.B.E.H</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2">
              {onOpenMatchCenter && (
                <button
                  id="btn-open-match-center"
                  onClick={onOpenMatchCenter}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trophy className="w-4 h-4" />
                  مركز المباراة والتشكيلة
                </button>
              )}
              <button
                id="btn-share-poster"
                onClick={handleShare}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition cursor-pointer border border-slate-700"
                title="مشاركة تفاصيل المباراة"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {copiedToast && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 py-2 px-4 rounded-xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم نسخ بيانات المباراة إلى الحافظة بنجاح!</span>
          </div>
        )}
      </div>

    </div>
  );
};
