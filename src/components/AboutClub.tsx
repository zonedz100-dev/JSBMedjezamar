import React from 'react';
import { ClubBadge } from './ClubBadge';
import { Trophy, History, Shield, HeartHandshake, Target, MapPin, Users, Award } from 'lucide-react';

export const AboutClub: React.FC = () => {
  return (
    <section id="about-club-section" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-black border border-red-500/30 p-8 md:p-12 mb-12 shadow-2xl text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold">
              <History className="w-3.5 h-3.5" />
              <span>تاريخ عريق منذ عام 1986</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              نادي جيل بلدية مجاز عمار
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              قلعة كروية شامخة في ولاية قالمة تمثل طموح الشباب وعشق الساحرة المستديرة. أربعة عقود من العطاء الرياضي والوفاء للألوان الحمراء والبيضاء.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <div className="bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-xl">
                <span className="text-xs text-slate-400 block">سنة التأسيس</span>
                <span className="font-black text-lg text-amber-400">1986 م</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-xl">
                <span className="text-xs text-slate-400 block">ألوان النادي</span>
                <span className="font-black text-lg text-red-400">الأحمر والأبيض</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-xl">
                <span className="text-xs text-slate-400 block">اللقب الشعبي</span>
                <span className="font-black text-lg text-white">الصاعد ميمو</span>
              </div>
            </div>
          </div>

          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl" />
            <ClubBadge clubId="jsbma" size="xl" className="relative w-36 h-36 md:w-48 md:h-48" />
          </div>

        </div>
      </div>

      {/* Narrative & History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
          <h3 className="text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <History className="w-5 h-5 text-red-500" />
            قصة التأسيس والمشوار
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            تأسس نادي جيل بلدية مجاز عمار عام 1986 بمبادرة من خيرة شباب ومحبي الرياضة في البلدية. انطلقت المسيرة من الملاعب الترابية البسيطة والبطولات الولائية حتى ارتقى النادي خطوة بخطوة إلى الرابطة الجهوية لكرة القدم عنابة.
          </p>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            طوال مسيرته، عُرف الفريق بالروح القتالية العالية والانتماء الصادق للمنطقة، حتى استحق لقب "الصاعد ميمو" وأصبح رمزاً لبلدية مجاز عمار وعموم ولاية قالمة.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
          <h3 className="text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Target className="w-5 h-5 text-emerald-500" />
            الأهداف والرؤية المستقبلية
          </h3>
          <ul className="space-y-3 text-xs md:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
              <span><strong>التألق في الجهوي الأول:</strong> المنافسة بشرف على تأشيرة الصعود إلى قسم ما بين الرابطات هذا الموسم 2026/2027.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
              <span><strong>تكوين الفئات الصغرى:</strong> احتضان الفئات الشبانية (أواسط، أشبال، أصاغر) وتوفير بيئة احترافية لهم.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
              <span><strong>ترسيخ الروح الرياضية:</strong> إعلاء مبادئ الأخوة الكروية مع كافة الأندية الشقيقة تحت شعار "معاً من أجل كرة أجمل".</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Core Values Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base mb-1">الهوية والانتماء</h4>
          <p className="text-xs text-slate-400">الفخر بتمثيل مجاز عمار وعروس الشرق قالمة في مختلف الميادين</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base mb-1">الطموح والشجاعة</h4>
          <p className="text-xs text-slate-400">اللعب بروح الأسد في كل مواجهة واللعب دائماً من أجل الانتصار</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base mb-1">الروح الرياضية</h4>
          <p className="text-xs text-slate-400">الاحترام المتبادل بين الفرق والتشجيع النظيف في المدرجات</p>
        </div>
      </div>
    </section>
  );
};
