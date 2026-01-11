
import React from 'react';
import { Lock, Crown, CheckCircle2 } from 'lucide-react';

const PremiumLock: React.FC = () => {
  return (
    <div className="relative my-12 p-8 md:p-12 rounded-3xl overflow-hidden border-2 border-[#d4af37]/30 bg-white shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent"></div>
      
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 text-slate-900 shadow-lg shadow-yellow-500/20">
          <Lock size={32} />
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-4">هذا الفصل مخصص للمشتركين</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
          استمتع بالوصول الكامل لجميع الفصول الحصرية، القراءة بدون إعلانات، ودعم الكاتب للاستمرار في الإبداع.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 text-right">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <CheckCircle2 className="text-[#d4af37]" size={20} />
            <span className="text-sm font-medium">قراءة حصرية قبل الجميع</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <CheckCircle2 className="text-[#d4af37]" size={20} />
            <span className="text-sm font-medium">تجربة بدون إعلانات مزعجة</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-slate-900 text-white font-bold px-10 py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
            <Crown size={20} className="text-[#d4af37]" />
            <span>اشترك الآن - 5$ شهرياً</span>
          </button>
          <button className="bg-white text-slate-900 border-2 border-slate-200 font-bold px-10 py-4 rounded-xl hover:bg-slate-50 transition-all">
            تسجيل الدخول
          </button>
        </div>
        
        <p className="mt-6 text-xs text-slate-400">نقبل الدفع عبر PayPal والبطاقات الائتمانية</p>
      </div>
    </div>
  );
};

export default PremiumLock;
