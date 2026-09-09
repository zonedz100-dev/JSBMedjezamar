import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', phoneOrEmail: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold mb-3">
          <MessageSquare className="w-3.5 h-3.5 text-red-500" />
          <span>التواصل وإدارة النادي</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-white">
          تواصل مع إدارة جيل مجاز عمار
        </h2>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          نرحب باستفسارات الأنصار، اقتراحات المحبين، وطلبات التنسيق الإعلامي والرعايات
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Information Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <h3 className="text-xl font-black text-white border-b border-slate-800 pb-3">
            بيانات الاتصال الرسمية
          </h3>

          <div className="space-y-4 text-xs md:text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white mb-0.5">المقر الرئيسي:</strong>
                <span className="text-slate-300">
                  مقر النادي، الحي الإداري، بلدية مجاز عمار، ولاية قالمة (24000)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white mb-0.5">أرقام الأمانة العامة:</strong>
                <span className="text-slate-300 font-mono" dir="ltr">+213 (0) 37 20 18 86</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white mb-0.5">البريد الإلكتروني:</strong>
                <span className="text-slate-300 font-mono">contact@jsbma-guelma.dz</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-white mb-0.5">ساعات استقبال الإدارة:</strong>
                <span className="text-slate-300">
                  من الأحد إلى الخميس: 09:00 صباحاً – 16:30 مساءً
                </span>
              </div>
            </div>
          </div>

          {/* Stadium Guide Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mt-6">
            <span className="text-xs text-amber-400 font-bold block mb-1">
              🏟️ مباريات الاستضافة الرسمية:
            </span>
            <p className="text-xs text-slate-300">
              ملعب الشهيد سويداني بوجمعة بولاية قالمة لاحتضان مباريات الأكابر في الجهوي الأول لرابطة عنابة.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <h3 className="text-xl font-black text-white mb-4">
            أرسل رسالة أو استفسار
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: يوسف براهمي"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  رقم الهاتف أو البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.phoneOrEmail}
                  onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                  placeholder="06... أو email@example.com"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                موضوع الرسالة
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="استفسار عن تذاكر مباراة الحجار / انضمام للفئات الشبانية"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                نص الرسالة <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب رسالتك لإدارة النادي هنا..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الرسالة الآن</span>
            </button>

            {isSubmitted && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تم إرسال رسالتك بنجاح إلى إدارة النادي! سنقوم بالتواصل معك في أقرب وقت.</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};
