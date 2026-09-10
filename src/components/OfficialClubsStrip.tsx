import React, { useState } from 'react';
import { CLUBS_DATA } from '../data/clubsData';
import { Club } from '../types';
import { Shield, Sparkles, CheckCircle2, Eye, Download, Info, ExternalLink, ZoomIn, X } from 'lucide-react';
import { ClubBadge } from './ClubBadge';

interface OfficialClubsStripProps {
  onSelectClub?: (club: Club) => void;
}

export const OfficialClubsStrip: React.FC<OfficialClubsStripProps> = ({ onSelectClub }) => {
  const [activeTab, setActiveTab] = useState<'enhanced' | 'interactive' | 'comparison'>('enhanced');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeClubHover, setActiveClubHover] = useState<Club | null>(null);

  const jsbmaClub = CLUBS_DATA.find((c) => c.id === 'jsbma');

  return (
    <section id="r1-official-strip" className="relative my-8 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>الهوية البصرية الرسمية - الرابطة الجهوية عنابة (LRFA)</span>
          </div>
          <h3 className="text-xl md:text-3xl font-black text-white flex items-center gap-3">
            <span>شعارات أندية بطولة الجهوي الأول</span>
            <span className="text-xs md:text-sm font-normal px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              16 نادياً
            </span>
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            شريط الشعارات المعتمدة رسمياً لأندية رابطة عنابة للموسم الرياضي 2026/2027، مع ترقية دقة الصور واستكمال الشعارات الناقصة.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-xl self-stretch md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('enhanced')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'enhanced'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>الشريط المحسن (HD)</span>
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'interactive'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>تفاعلي (16 شعاراً)</span>
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>مقارنة التحسينات</span>
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="p-4 md:p-6">
        {/* Tab 1: Enhanced Composite Strip */}
        {activeTab === 'enhanced' && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 group shadow-inner">
              <div className="overflow-x-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-slate-700">
                <img
                  src="/images/r1_official_clubs_strip_dark.png"
                  alt="شريط شعارات أندية الجهوي الأول - رابطة عنابة"
                  className="w-full min-w-[900px] h-auto object-contain select-none cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                  onClick={() => setIsZoomOpen(true)}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Action Overlays */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>دقة عالية 1600×240 بكسل • خلفية متناسقة • 16 شعاراً معتمداً بالكامل</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-red-400" />
                    <span>تكبير الصورة</span>
                  </button>
                  <a
                    href="/images/r1_official_clubs_strip_dark.png"
                    download="LRFA_Regionale1_Clubs_Strip.png"
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-medium flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل الشريط</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Badges Mini Bar (Clickable) */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-300">تصفح الأندية بالترتيب الرسمي:</span>
                <span className="text-[11px] text-slate-500">انقر على أي شعار لعرض تفاصيله</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-2 items-center justify-items-center">
                {CLUBS_DATA.map((club) => {
                  const isMain = club.id === 'jsbma';
                  return (
                    <button
                      key={club.id}
                      onClick={() => onSelectClub?.(club)}
                      onMouseEnter={() => setActiveClubHover(club)}
                      className={`group relative p-1.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isMain
                          ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/40 scale-105'
                          : 'border-slate-800 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-850'
                      }`}
                      title={`${club.nameAr} (${club.acronym})`}
                    >
                      <ClubBadge clubId={club.id} size="sm" className="transition-transform group-hover:scale-110" />
                      {isMain && (
                        <span className="absolute -top-2 -right-1 px-1 py-0.2 text-[8px] font-black bg-amber-400 text-slate-950 rounded-full shadow">
                          فريقنا
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hover Details preview */}
              {activeClubHover && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <ClubBadge clubId={activeClubHover.id} size="sm" />
                    <div>
                      <span className="font-bold text-white ml-2">{activeClubHover.nameAr}</span>
                      <span className="text-slate-400 text-[11px]">({activeClubHover.nameFr})</span>
                      <span className="mr-2 text-red-400 font-medium text-[11px]">ولاية {activeClubHover.wilaya}</span>
                    </div>
                  </div>
                  <a
                    href={activeClubHover.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <span>صفحة النادي في LRFA</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Grid */}
        {activeTab === 'interactive' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {CLUBS_DATA.map((club, idx) => {
                const isMain = club.id === 'jsbma';
                return (
                  <div
                    key={club.id}
                    onClick={() => onSelectClub?.(club)}
                    className={`relative p-3 rounded-xl border flex flex-col items-center text-center transition-all duration-200 cursor-pointer group ${
                      isMain
                        ? 'border-amber-400/80 bg-gradient-to-b from-amber-950/20 to-slate-900 ring-1 ring-amber-400/30'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <span className="absolute top-1.5 left-2 text-[10px] font-mono text-slate-500">
                      #{idx + 1}
                    </span>
                    <div className="my-2 group-hover:scale-110 transition-transform duration-200">
                      <ClubBadge clubId={club.id} size="md" />
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-red-400 transition-colors">
                      {club.shortName}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{club.acronym}</span>
                    <span className="mt-1 px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300">
                      {club.wilaya}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Improvements Comparison */}
        {activeTab === 'comparison' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Original Screenshot */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                    الصورة الأصلية الملتقطة
                  </span>
                  <span className="text-xs text-slate-400">(موقع LRFA)</span>
                </div>
                <span className="text-xs text-slate-500">Capture d'écran</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 p-2">
                <img
                  src="/images/r1_original_screenshot.png"
                  alt="الصورة الأصلية لشعارات أندية الجهوي الأول"
                  className="w-full h-auto object-contain rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                الصورة الأصلية المأخوذة من موقع الرابطة الجهوية كانت تحتوي على شعارات ناقصة ومستبدلة بأيقونة فارغة (مثل نجم الشط واتحاد الحجار)، بالإضافة إلى انخفاض الجودة وحدوث تشويش في بعض الشعارات.
              </p>
            </div>

            {/* List of Improvements Applied */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  التعديلات والتحسينات المنجزة
                </span>
                <span className="text-xs text-emerald-400 font-semibold">✓ جاهزة ومعتمدة</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">1. استكمال الشعارات المفقودة</strong>
                    <span className="text-slate-400">
                      إعادة رسم وإنشاء الشعار الرسمي لكل من <strong>نجم بلدية الشط (ES Echatt)</strong> و<strong>اتحاد الحجار (IRB El Hadjar)</strong> بدلاً من الأيقونة الرمادية المفقودة.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">2. رفع الدقة وتوحيد الأبعاد (HD)</strong>
                    <span className="text-slate-400">
                      توليد شريط موحد بدقة 1600×240 بكسل مع تباعد متناسق وحواف ناعمة وإضاءة احترافية تناسب النمط الداكن والفاتح.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">3. إبراز ممثلنا نادي مجاز عمار (JSBMA)</strong>
                    <span className="text-slate-400">
                      إعطاء شعار الجيل الصاعد لبلدية مجاز عمار إطاراً ذهبياً مخصصاً ووسم تفاعلي لتمييزه مباشرة بين الفرق الـ 16.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">4. ربط تفاعلي مباشر مع الدليل والبطولة</strong>
                    <span className="text-slate-400">
                      كل شعار أصبح قابلاً للنقر للاطلاع على معلومات الملعب، الولاية، سنة التأسيس، والنتائج في جدول الترتيب.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Zoom */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" />
                <span>شريط شعارات أندية بطولة الجهوي الأول (رابطة عنابة 2026/2027)</span>
              </h4>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[70vh] p-2 bg-slate-950 rounded-xl border border-slate-800/80">
              <img
                src="/images/r1_official_clubs_strip_dark.png"
                alt="شريط شعارات أندية الجهوي الأول بدقة كاملة"
                className="w-full min-w-[800px] h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>جميع الحقوق محفوظة للأندية الـ 16 والرابطة الجهوية لكرة القدم عنابة (LRFA)</span>
              <a
                href="/images/r1_official_clubs_strip_dark.png"
                download="LRFA_Regionale1_Clubs_Strip_Full.png"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الصورة بدقة كاملة</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
