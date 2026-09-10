import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/newsData';
import { NewsArticle } from '../types';
import {
  Newspaper,
  Calendar,
  Flame,
  Globe,
  FileText,
  ChevronLeft,
  Share2,
  Clock,
  Download,
  Eye,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';

interface SportsMagazineHeroProps {
  onSelectArticle?: (article: NewsArticle) => void;
}

export const SportsMagazineHero: React.FC<SportsMagazineHeroProps> = ({ onSelectArticle }) => {
  const [activeModalArticle, setActiveModalArticle] = useState<NewsArticle | null>(null);

  // Select top articles for the magazine layout
  const heroArticle = NEWS_ARTICLES[0]; // Top marquee story
  const secondaryArticles = NEWS_ARTICLES.slice(1, 4); // 3 sub-stories

  const handleOpenArticle = (article: NewsArticle) => {
    if (onSelectArticle) {
      onSelectArticle(article);
    } else {
      setActiveModalArticle(article);
    }
  };

  return (
    <div className="w-full space-y-6 select-none">
      
      {/* 1. Category Title Bar (The Navy Banner from merr1.png) */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800/80 rounded-2xl px-5 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-950/50">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>أخبار جيل مجاز عمار والجهوي الأول</span>
              <span className="text-[10px] font-bold bg-red-600/30 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                تغطية حصرية
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              المستجدات الرسمية، كواليس التحضيرات، وتقارير الرابطة الجهوية لعنابة
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            تحديث فوري
          </span>
        </div>
      </div>

      {/* 2. Main Magazine Grid (Inspired directly by merr1.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BIG HERO STORY CARD (60% width on Desktop) */}
        <div
          onClick={() => handleOpenArticle(heroArticle)}
          className="lg:col-span-7 group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-red-500/60 transition-all duration-300 shadow-2xl cursor-pointer flex flex-col justify-end min-h-[380px] md:min-h-[440px]"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={heroArticle.image}
              alt={heroArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
            />
            {/* Multi-layered sports magazine gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />
          </div>

          {/* Top Metadata Badges */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>الخبر الأبرز</span>
            </span>
            <span className="bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {heroArticle.category}
            </span>
          </div>

          {/* SKEWED / ANGLED VIBRANT RIBBON BANNER (Direct Signature from merr1.png) */}
          <div className="relative z-10 p-4 sm:p-5 md:p-7">
            {/* The Angled Trapezoidal Ribbon */}
            <div className="relative mb-2 max-w-full overflow-hidden">
              <div className="inline-block max-w-full bg-gradient-to-l from-emerald-600 via-emerald-500 to-teal-600 text-white py-2 sm:py-2.5 px-4 sm:px-6 rounded-2xl sm:rounded-r-2xl sm:rounded-tl-xl shadow-xl transform sm:-skew-x-6 sm:hover:skew-x-0 transition-transform duration-300">
                <h4 className="text-sm sm:text-base md:text-xl font-black tracking-tight transform sm:skew-x-6 sm:hover:skew-x-0 transition-transform drop-shadow-md break-words">
                  {heroArticle.title}
                </h4>
              </div>
            </div>

            {/* Sub-Headline Ticker Strip */}
            <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3 sm:p-3.5 shadow-lg flex items-center justify-between gap-3">
              <p className="text-xs md:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {heroArticle.summary}
              </p>
              <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-red-400 group-hover:text-red-300 min-h-[36px]">
                <span className="hidden sm:inline">اقرأ التفاصيل</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Publication Date & Views */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400 mt-2.5 px-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                {heroArticle.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {heroArticle.views || 3200} قراءة
              </span>
              {heroArticle.isOfficialDocument && (
                <>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    وثيقة رسمية مرفقة
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SECONDARY STORIES TILES (40% width on Desktop, Stacked 3 items) */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          {secondaryArticles.map((article, idx) => {
            const ribbonColors = [
              'from-red-600 via-rose-600 to-red-700',
              'from-emerald-600 via-teal-600 to-emerald-700',
              'from-blue-600 via-indigo-600 to-blue-700',
            ];
            const colorClass = ribbonColors[idx % ribbonColors.length];

            return (
              <div
                key={article.id}
                onClick={() => handleOpenArticle(article)}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div className="flex gap-4 p-3.5">
                  {/* Thumbnail Image */}
                  <div className="relative w-28 h-24 md:w-32 md:h-28 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 right-1.5">
                      <span className="text-[9px] font-bold bg-slate-950/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-slate-800">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                        <Calendar className="w-3 h-3 text-red-500" />
                        <span>{article.date}</span>
                      </div>
                      <h5 className="font-extrabold text-xs md:text-sm text-white group-hover:text-red-400 transition leading-snug line-clamp-2">
                        {article.title}
                      </h5>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* SKEWED RIBBON AT BOTTOM (The merr1.png design aesthetic) */}
                <div className="relative">
                  <div className={`bg-gradient-to-l ${colorClass} px-4 py-1.5 flex items-center justify-between text-white`}>
                    <span className="text-[11px] font-black truncate max-w-[85%]">
                      {article.title}
                    </span>
                    <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Article Detail Modal (if clicked) */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-auto text-white">
            
            {/* Modal Header */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={activeModalArticle.image}
                alt={activeModalArticle.title}
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <button
                onClick={() => setActiveModalArticle(null)}
                className="absolute top-4 left-4 p-2 bg-slate-950/80 hover:bg-slate-800 text-white rounded-full transition cursor-pointer border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 right-6 left-6">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  {activeModalArticle.category}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                  {activeModalArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-red-500" />
                    {activeModalArticle.date}
                  </span>
                  <span>•</span>
                  <span>المصدر: {activeModalArticle.author || 'إعلام النادي الرسمي'}</span>
                </div>

                {activeModalArticle.fileUrl && (
                  <a
                    href={activeModalArticle.fileUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل الوثيقة</span>
                  </a>
                )}
              </div>

              {/* Text content */}
              <div className="text-sm md:text-base text-slate-200 leading-relaxed whitespace-pre-line space-y-4">
                {activeModalArticle.content}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
