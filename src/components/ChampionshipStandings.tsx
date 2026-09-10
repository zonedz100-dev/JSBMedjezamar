import React, { useState } from 'react';
import { INITIAL_LEAGUE_STANDINGS, ROUND_1_FIXTURES, ROUND_2_FIXTURES, LEAGUE_INFO } from '../data/leagueData';
import { CLUBS_DATA } from '../data/clubsData';
import { ClubBadge } from './ClubBadge';
import { Trophy, Calendar, MapPin, Clock, Star, Info, ShieldCheck, FileText, Download, ExternalLink } from 'lucide-react';

interface ChampionshipStandingsProps {
  onOpenMarqueeMatch?: () => void;
}

export const ChampionshipStandings: React.FC<ChampionshipStandingsProps> = ({ onOpenMarqueeMatch }) => {
  const [subTab, setSubTab] = useState<'fixtures' | 'table' | 'info'>('fixtures');
  const [selectedRound, setSelectedRound] = useState<number>(1);

  const getClub = (id: string) => CLUBS_DATA.find((c) => c.id === id) || CLUBS_DATA[0];

  const currentFixtures = selectedRound === 1 ? ROUND_1_FIXTURES : ROUND_2_FIXTURES;

  return (
    <section id="championship-section" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>الموسم الرياضي 2026/2027</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-white">
          بطولة القسم الجهوي الأول - رابطة عنابة
        </h2>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          جدول مباريات الجولات وترتيب الأندية الـ 16 في سباق تحقيق الصعود
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setSubTab('fixtures')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
              subTab === 'fixtures'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            رزنامة الجولات (الجولة {selectedRound})
          </button>
          <button
            onClick={() => setSubTab('table')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
              subTab === 'table'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            جدول الترتيب العام
          </button>
          <button
            onClick={() => setSubTab('info')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer ${
              subTab === 'info'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            نظام المنافسة
          </button>
        </div>
      </div>

      {/* 1. FIXTURES CALENDAR */}
      {subTab === 'fixtures' && (
        <div className="space-y-6">
          {/* Round Selector */}
          <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-base md:text-lg font-black text-white">
                مباريات {selectedRound === 1 ? 'الجولة الأولى (الافتتاحية)' : 'الجولة الثانية'}
              </h3>
              <span className="text-xs text-slate-400">
                {selectedRound === 1 ? 'المبرمجة يومي الجمعة 18 والسبت 19 سبتمبر 2026' : 'المبرمجة أواخر شهر سبتمبر 2026'}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedRound(1)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedRound === 1
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                الجولة 1
              </button>
              <button
                onClick={() => setSelectedRound(2)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedRound === 2
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                الجولة 2
              </button>
            </div>
          </div>

          {/* Fixtures List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFixtures.map((match) => {
              const home = getClub(match.homeClubId);
              const away = getClub(match.awayClubId);
              const isMarquee = match.isFeatured;

              return (
                <div
                  key={match.id}
                  className={`p-4 md:p-5 rounded-2xl border transition shadow-lg ${
                    isMarquee
                      ? 'bg-gradient-to-r from-red-950/50 via-slate-900 to-emerald-950/50 border-red-500/60 ring-1 ring-red-500/40'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Match Status & Header */}
                  <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-300">{match.dateStr}</span>
                      <span className="text-slate-500">•</span>
                      <span className="font-semibold text-amber-400">{match.timeStr}</span>
                    </div>

                    {isMarquee ? (
                      <span className="flex items-center gap-1 bg-red-600/30 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full font-black text-[11px]">
                        <Star className="w-3 h-3 fill-red-400" /> قمة الجولة
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">
                        {match.city}
                      </span>
                    )}
                  </div>

                  {/* Teams Faceoff */}
                  <div className="grid grid-cols-7 items-center gap-2 my-2">
                    {/* Home Club */}
                    <div className="col-span-3 flex items-center gap-2 justify-end text-right">
                      <span className="font-bold text-xs md:text-sm text-white">
                        {home.shortName}
                      </span>
                      <ClubBadge clubId={home.id} size="sm" />
                    </div>

                    {/* VS Box */}
                    <div className="col-span-1 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-black text-slate-300">
                        VS
                      </span>
                    </div>

                    {/* Away Club */}
                    <div className="col-span-3 flex items-center gap-2 justify-start text-left">
                      <ClubBadge clubId={away.id} size="sm" />
                      <span className="font-bold text-xs md:text-sm text-white">
                        {away.shortName}
                      </span>
                    </div>
                  </div>

                  {/* Venue & Action Footer */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 truncate max-w-[220px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{match.stadium}</span>
                    </div>

                    {isMarquee && onOpenMarqueeMatch && (
                      <button
                        onClick={onOpenMarqueeMatch}
                        className="text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer"
                      >
                        مركز اللقاء ←
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. LEAGUE STANDINGS TABLE */}
      {subTab === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-bold text-white text-sm">
              الترتيب الرسمي للقسم الجهوي الأول (16 نادياً)
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> بطاقة الصعود لقسم ما بين الرابطات
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> منطقة الخطر
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                  <th className="py-3 px-3 text-right">#</th>
                  <th className="py-3 px-4 text-right">النادي</th>
                  <th className="py-3 px-2">الولاية</th>
                  <th className="py-3 px-2">لعب</th>
                  <th className="py-3 px-2">فاز</th>
                  <th className="py-3 px-2">تعادل</th>
                  <th className="py-3 px-2">خسر</th>
                  <th className="py-3 px-2">له</th>
                  <th className="py-3 px-2">عليه</th>
                  <th className="py-3 px-2">الفارق</th>
                  <th className="py-3 px-3 font-black text-amber-400">النقاط</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {INITIAL_LEAGUE_STANDINGS.map((row) => {
                  const club = getClub(row.clubId);
                  const isPromotion = row.rank === 1;
                  const isRelegation = row.rank >= 15;
                  const isJsbma = club.id === 'jsbma';

                  return (
                    <tr
                      key={row.clubId}
                      className={`hover:bg-slate-800/60 transition ${
                        isJsbma ? 'bg-red-950/20 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 text-right font-black">
                        <span
                          className={`w-6 h-6 inline-flex items-center justify-center rounded-lg text-xs ${
                            isPromotion
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : isRelegation
                              ? 'bg-rose-900/60 text-rose-300'
                              : 'text-slate-400'
                          }`}
                        >
                          {row.rank}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center gap-2.5">
                          <ClubBadge clubId={club.id} size="sm" />
                          <div>
                            <span className="font-bold text-white block leading-snug">
                              {club.nameAr}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {club.acronym}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-2 text-slate-300">
                        {club.wilaya}
                      </td>

                      <td className="py-3.5 px-2 text-slate-400">{row.played}</td>
                      <td className="py-3.5 px-2 text-emerald-400 font-semibold">{row.won}</td>
                      <td className="py-3.5 px-2 text-amber-400 font-semibold">{row.drawn}</td>
                      <td className="py-3.5 px-2 text-rose-400 font-semibold">{row.lost}</td>
                      <td className="py-3.5 px-2 text-slate-300">{row.goalsFor}</td>
                      <td className="py-3.5 px-2 text-slate-300">{row.goalsAgainst}</td>
                      <td className="py-3.5 px-2 text-slate-400 font-mono">
                        {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                      </td>
                      <td className="py-3.5 px-3 font-black text-base text-amber-400">
                        {row.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. COMPETITION INFO */}
      {subTab === 'info' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-lg font-black">آليات الصعود والنزول في بطولة رابطة عنابة (موسم 2026 / 2027)</h3>
                <p className="text-xs text-slate-400">
                  تنفيذاً للمنشور الفيدرالي رقم 83 المؤرخ في 08 سبتمبر 2026 الصادر عن الاتحاد الجزائري لكرة القدم (FAF)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/documents/lrfa_promotion_relegation_2026_2027.pdf"
                download="lrfa_promotion_relegation_2026_2027.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل وثيقة الرابطة (PDF)</span>
              </a>
              <a
                href="https://www.lrf-annaba.org/2016/4023-2026-2027-8/file"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                title="فتح الرابط الرسمي في موقع الرابطة الجهوية"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>رابط الموقع</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 block text-sm">🏆 شروط الصعود إلى قسم ما بين الجهات:</span>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <li><strong className="text-white">الصعود الآلي:</strong> يصعد صاحب المرتبة الأولى (بطل بطولة الجهوي الأول) مباشرة لقسم ما بين الجهات.</li>
                <li><strong className="text-white">أفضل أصحاب المركز الثاني:</strong> إمكانية صعود أصحاب أفضل المراتب الثانية بين الرابطات الجهوية السبع لشمال الوطن حسب الحصة المتاحة.</li>
                <li><strong className="text-white">تركيبة 2027/2028:</strong> الحفاظ على بطولة الجهوي الأول بفوج واحد من 16 فريقاً.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 block text-sm">⚠️ معادلات السقوط إلى الجهوي الثاني:</span>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <li><strong className="text-white">السقوط الأساسي:</strong> سقوط 3 أندية على الأقل من الجهوي الأول (المراكز 14 و 15 و 16).</li>
                <li><strong className="text-white">إفرازات ما بين الجهات:</strong> في حال نزول 3 أندية تابعة لإقليم عنابة من ما بين الجهات، يرتفع السقوط إلى 4 أندية (المراكز 13 و 14 و 15 و 16).</li>
                <li><strong className="text-white">الجهوي الثاني:</strong> اعتماد 32 فريقاً موزعين على فوجين (16 نادياً لكل فوج) لموسم 2027/2028.</li>
              </ul>
            </div>
          </div>

          {/* Detailed summary of the official 4 cases */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <FileText className="w-4 h-4" />
              <span>الحالات الأربع الرسمية المعتمدة في وثيقة رابطة عنابة:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 text-[11px] text-slate-400">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1">الحالة الأولى:</strong>
                عدم سقوط أي نادٍ تابع لرابطة عنابة من قسم ما بين الجهات (صعود بطل الجهوي 1، ونزول 3 فرق).
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1">الحالة الثانية:</strong>
                سقوط فريق واحد من ما بين الجهات (نزول 3 فرق وصعود بطلي الجهوي 2 وأفضل وصيف).
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1">الحالة الثالثة:</strong>
                سقوط فريقين من ما بين الجهات (نزول 3 فرق من الجهوي الأول، وصعود بطلي الجهوي 2).
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1">الحالة الرابعة:</strong>
                سقوط 3 فرق من ما بين الجهات (سقوط 4 فرق أصحاب المراتب 13، 14، 15، 16 من الجهوي 1).
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
