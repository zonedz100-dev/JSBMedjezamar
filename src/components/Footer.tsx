import React from 'react';
import { ClubBadge, LRFALogo } from './ClubBadge';
import { Shield, MapPin, Phone, Mail, Globe, Facebook, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenMatchCenter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenMatchCenter }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Club Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ClubBadge clubId="jsbma" size="md" />
              <div>
                <h4 className="text-white font-black text-base">جيل بلدية مجاز عمار</h4>
                <span className="text-xs text-red-400 font-bold block">الصاعد ميمو • تأسس 1986</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              الموقع الإعلامي لنادي جيل بلدية مجاز عمار ودليل بطولة القسم الجهوي الأول لرابطة عنابة لكرة القدم. فخر ولاية قالمة وطموح لا ينتهي نحو الأقسام العليا.
            </p>
            <div className="text-xs text-amber-400 font-bold">
              شعار البطولة: « معاً من أجل كرة أجمل »
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm border-r-2 border-red-500 pr-2">
              أقسام المنصة
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-red-400 transition cursor-pointer"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMatchCenter}
                  className="text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer"
                >
                  مركز قمة الجولة 1 (مجاز عمار ضد اتحاد الحجار)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('clubs')}
                  className="hover:text-red-400 transition cursor-pointer"
                >
                  أندية الرابطة الـ 16
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('standings')}
                  className="hover:text-red-400 transition cursor-pointer"
                >
                  رزنامة المباريات والترتيب
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-red-400 transition cursor-pointer"
                >
                  أخبار الفريق والتدريبات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-red-400 transition cursor-pointer"
                >
                  تاريخ النادي (من نحن)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ligue LRFA Info */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm border-r-2 border-emerald-500 pr-2">
              الرابطة الجهوية لكرة القدم
            </h5>
            <div className="flex items-center gap-2 mb-2">
              <LRFALogo size="w-8 h-8" />
              <span className="text-xs text-white font-bold">رابطة عنابة (LRFA)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              المنافسة تضم 16 فريقاً يمثلون ولايات عنابة، قالمة، الطارف، تبسة وسوق أهراس.
            </p>
            <a
              href="https://www.lrf-annaba.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>الموقع الرسمي لرابطة عنابة lrf-annaba.org</span>
            </a>
          </div>

          {/* Col 4: Contact & Venue */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm border-r-2 border-amber-500 pr-2">
              المقر والملعب
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>بلدية مجاز عمار – ولاية قالمة</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>ملعب الشهيد سويداني بوجمعة – قالمة</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span dir="ltr">+213 37 20 18 86</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>contact@jsbma-guelma.dz</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} • نادي جيل بلدية مجاز عمار (JSBMA)
          </div>
          <div className="flex items-center gap-1">
            <span>صُنع بشغف لعشاق كرة القدم الجزائرية والرابطة الجهوية لعنابة</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
