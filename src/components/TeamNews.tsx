import React, { useState } from 'react';
import { NEWS_ARTICLES, JSBMA_SQUAD } from '../data/newsData';
import { NewsArticle } from '../types';
import { Calendar, User, Eye, ArrowLeft, X, Share2, Sparkles, Shield, Trophy } from 'lucide-react';

export const TeamNews: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [squadFilter, setSquadFilter] = useState<string>('الكل');

  const categories = ['الكل', 'مباريات', 'أخبار النادي', 'تدريبات', 'طاقم فني'];

  const filteredArticles = NEWS_ARTICLES.filter((art) => {
    return selectedCategory === 'الكل' || art.category === selectedCategory;
  });

  const filteredSquad = JSBMA_SQUAD.filter((p) => {
    return squadFilter === 'الكل' || p.position === squadFilter;
  });

  return (
    <section id="team-news-section" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>أخبار النادي والتحضيرات</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-white">
          أخبار جيل بلدية مجاز عمار (JSBMA)
        </h2>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          متابعة مستمرة ليوميات تدريب الفريق، تقارير الطاقم الطبي والفني، وجاهزية اللاعبين
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    {article.author || 'إعلام النادي'}
                  </span>
                </div>

                <h3 className="font-black text-base md:text-lg text-white group-hover:text-red-400 transition leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedArticle(article)}
                className="w-full py-2.5 bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>قراءة الخبر كاملاً</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Squad Showcase Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              تعداد لاعبي جيل مجاز عمار لموسم 2026/2027
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              الأسماء المعنية بالمباراة الافتتاحية والمنافسة الرسمية في الجهوي الأول
            </p>
          </div>

          {/* Position filter */}
          <div className="flex gap-1.5 overflow-x-auto text-xs">
            {['الكل', 'حارس مرمى', 'مدافع', 'وسط ميدان', 'مهاجم'].map((pos) => (
              <button
                key={pos}
                onClick={() => setSquadFilter(pos)}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  squadFilter === pos
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {filteredSquad.map((player) => (
            <div
              key={player.number}
              className={`p-3 rounded-xl border text-center transition ${
                player.isKey
                  ? 'bg-red-950/20 border-red-500/40'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 font-black text-sm flex items-center justify-center mx-auto mb-2 border border-slate-700">
                {player.number}
              </span>
              <span className="font-bold text-xs md:text-sm text-white block">
                {player.name}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {player.position}
              </span>
              {player.role && (
                <span className="inline-block mt-1 text-[10px] text-red-400 font-semibold bg-red-950/50 px-2 py-0.5 rounded">
                  {player.role}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-white max-h-[85vh] flex flex-col">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 left-4 z-10 p-2 text-slate-300 hover:text-white bg-slate-950/80 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />
              <span className="absolute bottom-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {selectedArticle.category}
              </span>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>بواسطة: {selectedArticle.author || 'إعلام النادي'}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white leading-snug">
                {selectedArticle.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </p>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(selectedArticle.title + ' - نادي جيل مجاز عمار');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                مشاركة المقال
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
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
