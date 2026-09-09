import React, { useState } from 'react';
import { X, Trophy, MapPin, Clock, Calendar, Users, Shield, Award, BarChart3, CheckCircle, Flame } from 'lucide-react';
import { ClubBadge } from './ClubBadge';
import { JSBMA_SQUAD } from '../data/newsData';

interface MatchCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatchCenterModal: React.FC<MatchCenterModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lineups' | 'comparison' | 'poll' | 'stadium'>('overview');
  
  // Interactive Fan Prediction Poll state
  const [pollVotes, setPollVotes] = useState<{ jsbma: number; draw: number; irbeh: number }>({
    jsbma: 142,
    draw: 38,
    irbeh: 89,
  });
  const [userVote, setUserVote] = useState<'jsbma' | 'draw' | 'irbeh' | null>(null);

  if (!isOpen) return null;

  const totalVotes = pollVotes.jsbma + pollVotes.draw + pollVotes.irbeh;
  const jsbmaPercent = Math.round((pollVotes.jsbma / totalVotes) * 100);
  const drawPercent = Math.round((pollVotes.draw / totalVotes) * 100);
  const irbehPercent = Math.round((pollVotes.irbeh / totalVotes) * 100);

  const handleVote = (choice: 'jsbma' | 'draw' | 'irbeh') => {
    if (userVote) return;
    setUserVote(choice);
    setPollVotes((prev) => ({
      ...prev,
      [choice]: prev[choice] + 1,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden my-auto text-white">
        
        {/* Header with Match Highlights */}
        <div className="relative p-6 bg-gradient-to-r from-red-950 via-slate-900 to-emerald-950 border-b border-slate-700">
          <button
            id="close-match-center"
            onClick={onClose}
            className="absolute top-5 left-5 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-red-600/30 text-red-300 border border-red-500/40 rounded-full text-xs font-bold mb-2">
              بطاقة مباراة القمة • الجولة الأولى
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              جيل بلدية مجاز عمار vs اتحاد بلدية الحجار
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              السبت 19 سبتمبر 2026 • 15:00 زوالاً • ملعب الشهيد سويداني بوجمعة – قالمة
            </p>
          </div>

          {/* Teams Header Badges */}
          <div className="flex items-center justify-center gap-6 md:gap-12 mt-4">
            <div className="flex items-center gap-2">
              <ClubBadge clubId="jsbma" size="lg" />
              <div className="text-right">
                <span className="font-black text-base md:text-lg block text-red-400">مجاز عمار</span>
                <span className="text-[11px] text-slate-400">تأسس 1986</span>
              </div>
            </div>

            <div className="text-xl md:text-2xl font-black text-amber-400 italic bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
              ضد
            </div>

            <div className="flex items-center gap-2">
              <div className="text-left">
                <span className="font-black text-base md:text-lg block text-emerald-400">اتحاد الحجار</span>
                <span className="text-[11px] text-slate-400">تأسس 1975</span>
              </div>
              <ClubBadge clubId="irbeh" size="lg" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto text-xs md:text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 py-3 px-5 font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-red-500 text-red-400 bg-red-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('lineups')}
            className={`flex items-center gap-2 py-3 px-5 font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'lineups'
                ? 'border-red-500 text-red-400 bg-red-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            التشكيلة المحتملة
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 py-3 px-5 font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'comparison'
                ? 'border-red-500 text-red-400 bg-red-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            مقارنة الناديين
          </button>
          <button
            onClick={() => setActiveTab('poll')}
            className={`flex items-center gap-2 py-3 px-5 font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'poll'
                ? 'border-red-500 text-red-400 bg-red-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            توقعات الأنصار ({totalVotes})
          </button>
          <button
            onClick={() => setActiveTab('stadium')}
            className={`flex items-center gap-2 py-3 px-5 font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'stadium'
                ? 'border-red-500 text-red-400 bg-red-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            دليل الملعب والوصول
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6 max-h-[60vh] overflow-y-auto">
          
          {/* 1. OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> تفاصيل الموعد والمكان
                  </h4>
                  <ul className="text-xs md:text-sm space-y-2 text-slate-300">
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">البطولة:</span>
                      <span className="font-bold text-white">الجهوي الأول لرابطة عنابة</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">المرحلة:</span>
                      <span className="font-bold text-white">الجولة الأولى (الافتتاحية)</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">التاريخ:</span>
                      <span className="font-bold text-emerald-400">السبت 19 سبتمبر 2026</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">توقيت الانطلاق:</span>
                      <span className="font-bold text-amber-400">الساعة 15:00 زوالاً</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">الملعب:</span>
                      <span className="font-bold text-white">ملعب الشهيد سويداني بوجمعة – قالمة</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> التحكيم والتنظيم
                  </h4>
                  <ul className="text-xs md:text-sm space-y-2 text-slate-300">
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">طاقم التحكيم:</span>
                      <span className="font-bold text-white">طاقم فيدرالي معتمد من LRFA</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">مراقب اللقاء:</span>
                      <span className="font-bold text-white">مندوب رسمي من الرابطة الجهوية</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">فتح الأبواب للجماهير:</span>
                      <span className="font-bold text-white">الساعة 13:00 زوالاً</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700/40 pb-1.5">
                      <span className="text-slate-400">شعار الروح الرياضية:</span>
                      <span className="font-bold text-amber-400">معاً من أجل كرة أجمل</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">التغطية الإعلامية:</span>
                      <span className="font-bold text-white">بث مباشر عبر صفحة النادي الرسمية</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Match Highlights Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-red-900/30 via-slate-800/40 to-emerald-900/30 border border-slate-700">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> أهمية المباراة
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  تكتسي هذه المواجهة الافتتاحية طابعاً خاصاً لكونها تجمع بين فريقين من ألمع أندية الشرق الجزائري؛ حيث يسعى 
                  <strong className="text-red-400 mx-1">جيل بلدية مجاز عمار</strong> لتسجيل بداية مثالية على أرضه بملعب الشهيد سويداني بوجمعة واستغلال الحافز المعنوي للأنصار،
                  بينما يدخل <strong className="text-emerald-400 mx-1">اتحاد الحجار</strong> اللقاء بطموح العودة بالزاد كاملاً وتأكيد جاهزيته للعب ورقة الصعود هذا الموسم.
                </p>
              </div>
            </div>
          )}

          {/* 2. LINEUPS */}
          {activeTab === 'lineups' && (
            <div className="space-y-6">
              {/* Tactical Pitch Visual */}
              <div className="relative bg-emerald-900/90 border-2 border-white/40 rounded-2xl p-4 md:p-6 shadow-inner overflow-hidden text-center">
                {/* Field markings */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/40 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-28 h-28 border-2 border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
                
                <h4 className="text-sm font-black text-white bg-slate-900/80 inline-block px-4 py-1 rounded-full border border-slate-700 mb-6">
                  التشكيلة الأساسية المحتملة لجيل مجاز عمار (4 - 3 - 3)
                </h4>

                {/* Attackers */}
                <div className="grid grid-cols-3 gap-2 mb-8 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">7</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded">بلال شلغوم (جناح)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">9</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded">سمير خرفان (هداف)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">11</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded">طارق قاسم (جناح)</span>
                  </div>
                </div>

                {/* Midfielders */}
                <div className="grid grid-cols-3 gap-2 mb-8 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">8</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded">عادل بوجمعة</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">6</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded">سفيان مرزوق (ارتكاز)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">10</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded">منير بوقرة (صانع)</span>
                  </div>
                </div>

                {/* Defenders */}
                <div className="grid grid-cols-4 gap-1 md:gap-2 mb-8 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">3</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-1 py-0.5 rounded">سعيد رياض</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">4</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-1 py-0.5 rounded">كريم سلطاني (C)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">5</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-1 py-0.5 rounded">فاروق دريد</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">2</span>
                    <span className="text-[11px] font-bold text-white mt-1 bg-black/60 px-1 py-0.5 rounded">حمزة عماري</span>
                  </div>
                </div>

                {/* Goalkeeper */}
                <div className="flex flex-col items-center relative z-10">
                  <span className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-md border-2 border-white">1</span>
                  <span className="text-[11px] font-bold text-white mt-1 bg-black/70 px-2 py-0.5 rounded">أمين بوشارب (حارس مرمى)</span>
                </div>
              </div>

              {/* Bench Players */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h5 className="text-xs font-bold text-slate-400 mb-2">دكة الاحتياط لجيل مجاز عمار:</h5>
                <div className="flex flex-wrap gap-2">
                  {JSBMA_SQUAD.filter(p => !p.isKey).map(player => (
                    <span key={player.number} className="text-xs bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md border border-slate-600">
                      {player.number} • {player.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="py-3 px-2 text-right">جيل مجاز عمار (JSBMA)</th>
                      <th className="py-3 px-2 text-center text-amber-400">المعيار</th>
                      <th className="py-3 px-2 text-left">اتحاد الحجار (IRBEH)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    <tr>
                      <td className="py-3 px-2 font-bold text-red-400">1986 (40 سنة)</td>
                      <td className="py-3 px-2 text-center text-slate-400">سنة التأسيس</td>
                      <td className="py-3 px-2 text-left font-bold text-emerald-400">1975 (51 سنة)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">مجاز عمار - قالمة</td>
                      <td className="py-3 px-2 text-center text-slate-400">المدينة والولاية</td>
                      <td className="py-3 px-2 text-left font-bold">الحجار - عنابة</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold text-red-400">الأحمر والأبيض</td>
                      <td className="py-3 px-2 text-center text-slate-400">ألوان النادي</td>
                      <td className="py-3 px-2 text-left font-bold text-emerald-400">الأخضر والأبيض</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">الصاعد ميمو • الأسد</td>
                      <td className="py-3 px-2 text-center text-slate-400">اللقب والشعار</td>
                      <td className="py-3 px-2 text-left font-bold">الاتحاد • مصنع الحديد</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">ملعب سويداني بوجمعة (15,000)</td>
                      <td className="py-3 px-2 text-center text-slate-400">الملعب الرئيسي</td>
                      <td className="py-3 px-2 text-left font-bold">ملعب دريدي مختار (8,000)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold text-red-300">هجومي ضاغط سريع</td>
                      <td className="py-3 px-2 text-center text-slate-400">أسلوب اللعب</td>
                      <td className="py-3 px-2 text-left font-bold text-emerald-300">منضبط وتكتيك جماعي</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. FAN PREDICTION POLL */}
          {activeTab === 'poll' && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-base md:text-xl font-black text-white">شارِك برأيك: من سيفوز في قمة الجولة الأولى؟</h4>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  صوّت الآن لتوقع نتيجة اللقاء بين جيل مجاز عمار واتحاد الحجار
                </p>
              </div>

              {/* Vote buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  id="vote-jsbma"
                  onClick={() => handleVote('jsbma')}
                  disabled={userVote !== null}
                  className={`p-4 rounded-2xl border transition text-center cursor-pointer ${
                    userVote === 'jsbma'
                      ? 'bg-red-600 border-white text-white shadow-lg'
                      : 'bg-slate-800/80 border-slate-700 hover:border-red-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-red-400 mb-1">فوز المستضيف</div>
                  <div className="text-sm md:text-base font-black">جيل مجاز عمار</div>
                  <div className="text-lg md:text-2xl font-black text-red-500 mt-2">{jsbmaPercent}%</div>
                  <div className="text-[11px] text-slate-400">{pollVotes.jsbma} صوت</div>
                </button>

                <button
                  id="vote-draw"
                  onClick={() => handleVote('draw')}
                  disabled={userVote !== null}
                  className={`p-4 rounded-2xl border transition text-center cursor-pointer ${
                    userVote === 'draw'
                      ? 'bg-amber-600 border-white text-white shadow-lg'
                      : 'bg-slate-800/80 border-slate-700 hover:border-amber-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-400 mb-1">اقتسام النقاط</div>
                  <div className="text-sm md:text-base font-black">تعادل الفريقين</div>
                  <div className="text-lg md:text-2xl font-black text-amber-400 mt-2">{drawPercent}%</div>
                  <div className="text-[11px] text-slate-400">{pollVotes.draw} صوت</div>
                </button>

                <button
                  id="vote-irbeh"
                  onClick={() => handleVote('irbeh')}
                  disabled={userVote !== null}
                  className={`p-4 rounded-2xl border transition text-center cursor-pointer ${
                    userVote === 'irbeh'
                      ? 'bg-emerald-600 border-white text-white shadow-lg'
                      : 'bg-slate-800/80 border-slate-700 hover:border-emerald-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-400 mb-1">فوز الضيف</div>
                  <div className="text-sm md:text-base font-black">اتحاد الحجار</div>
                  <div className="text-lg md:text-2xl font-black text-emerald-500 mt-2">{irbehPercent}%</div>
                  <div className="text-[11px] text-slate-400">{pollVotes.irbeh} صوت</div>
                </button>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                  <div style={{ width: `${jsbmaPercent}%` }} className="bg-red-600 h-full transition-all duration-500" title={`مجاز عمار: ${jsbmaPercent}%`} />
                  <div style={{ width: `${drawPercent}%` }} className="bg-amber-500 h-full transition-all duration-500" title={`تعادل: ${drawPercent}%`} />
                  <div style={{ width: `${irbehPercent}%` }} className="bg-emerald-600 h-full transition-all duration-500" title={`اتحاد الحجار: ${irbehPercent}%`} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span className="text-red-400 font-bold">مجاز عمار {jsbmaPercent}%</span>
                  <span className="text-amber-400 font-bold">تعادل {drawPercent}%</span>
                  <span className="text-emerald-400 font-bold">اتحاد الحجار {irbehPercent}%</span>
                </div>
              </div>

              {userVote && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>شكراً لتصويتك! تم تسجيل توقعك بنجاح في استطلاع الرابطة.</span>
                </div>
              )}
            </div>
          )}

          {/* 5. STADIUM & DIRECTIONS */}
          {activeTab === 'stadium' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" /> ملعب الشهيد سويداني بوجمعة – قالمة
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  يقع ملعب الشهيد سويداني بوجمعة في قلب مدينة قالمة، ويعد المعقل التاريخي الأبرز للمباريات الكبرى في الولاية.
                  يتسع لحوالي 15,000 متفرج ويتميز بمدرجاته القريبة من الميدان وعشبه الطبيعي المحافظ عليه.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block font-semibold">للقادمين من مجاز عمار:</span>
                    <span className="text-white mt-1 block">عبر الطريق الوطني رقم 20 (مسافة 12 دقيقة تقريباً باتجاه وسط قالمة).</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block font-semibold">للقادمين من الحجار وعنابة:</span>
                    <span className="text-white mt-1 block">عبر الطريق الوطني رقم 21 الرابط بين الحجار وقالمة (حوالي 45 دقيقة).</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs md:text-sm font-bold rounded-xl transition cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
