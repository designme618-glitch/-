
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">روايات عبدالله عقدين</h3>
            <p className="text-sm leading-relaxed">
              منصة متخصصة في نشر الروايات الأدبية بأسلوب عصري وتجربة قراءة فريدة. نحن نسعى لتقديم المحتوى بجودة تليق بذائقة القارئ العربي.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">اشترك في النشرة</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="bg-slate-800 border-none rounded-r-lg px-4 py-2 focus:ring-1 focus:ring-[#d4af37] outline-none w-full"
              />
              <button className="bg-[#d4af37] text-slate-900 font-bold px-4 py-2 rounded-l-lg hover:bg-yellow-500 transition-colors">
                اشتراك
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لـ روايات عبدالله عقدين.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
