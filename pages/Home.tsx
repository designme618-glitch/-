
import React, { useEffect, useState } from 'react';
import NovelCard from '../components/NovelCard';
import { getNovels } from '../services/stateManager';
import { Novel } from '../types';
import { ChevronLeft } from 'lucide-react';

const Home: React.FC = () => {
  const [novels, setNovels] = useState<Novel[]>([]);

  useEffect(() => {
    setNovels(getNovels());
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center luxury-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Hero background" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-right">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            عالم <span className="text-[#d4af37]">الخيال</span> بين يديك
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
            استمتع بأجمل الروايات والحكايات من تأليف عبدالله عقدين. انطلق في رحلات عبر الزمن والمكان من خلال كلماتنا التي تنبض بالحياة.
          </p>
          <div className="flex gap-4 justify-start">
            <button className="bg-[#d4af37] text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20">
              <span>ابدأ القراءة</span>
              <ChevronLeft size={20} />
            </button>
            <button className="border border-white/30 text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
              اكتشف الروايات
            </button>
          </div>
        </div>
      </section>

      {/* Novels Grid */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">إصداراتنا الحصرية</h2>
            <div className="w-20 h-1 bg-[#d4af37] mt-2 rounded-full"></div>
          </div>
          <button className="text-[#d4af37] hover:underline font-bold flex items-center gap-1">
            عرض الكل
            <ChevronLeft size={16} />
          </button>
        </div>

        {novels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {novels.map((novel) => (
              <NovelCard key={novel._id} novel={novel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-400 text-lg">لا توجد روايات منشورة حالياً.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
