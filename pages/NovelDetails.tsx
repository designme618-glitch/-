
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNovels, getChapters } from '../services/stateManager';
import { Novel, Chapter } from '../types';
import { Book, Clock, User, ChevronLeft } from 'lucide-react';

const NovelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (id) {
      const novels = getNovels();
      const found = novels.find(n => n._id === id);
      if (found) {
        setNovel(found);
        setChapters(getChapters(id));
      }
    }
  }, [id]);

  if (!novel) {
    return (
      <div className="p-20 text-center">
        <div className="animate-pulse text-slate-400">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Banner */}
      <div className="bg-slate-900 text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 blur-3xl bg-[#d4af37]"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="w-full md:w-64 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border-4 border-slate-800 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img src={novel.coverImage} alt={novel.title} className="w-full object-cover aspect-[2/3]" />
          </div>
          <div className="flex-grow pt-4">
            <div className="inline-block bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-xs font-bold mb-4 border border-[#d4af37]/20">رواية حصرية</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{novel.title}</h1>
            <div className="flex flex-wrap gap-6 text-slate-300 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} className="text-[#d4af37]" />
                <span className="font-medium">{novel.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book size={18} className="text-[#d4af37]" />
                <span>{chapters.length} فصول</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#d4af37]" />
                <span>نشر في: {new Date(novel.createdAt).toLocaleDateString('ar-EG')}</span>
              </div>
            </div>
            <p className="text-slate-300 max-w-3xl text-lg leading-relaxed font-serif-ar border-r-4 border-[#d4af37]/30 pr-6">
              {novel.description}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-slate-100">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">فهرس الفصول</h2>
              <p className="text-slate-500 text-sm">اختر فصلاً لبدء القراءة</p>
            </div>
            {chapters.length > 0 && (
              <Link 
                to={`/read/${novel._id}/${chapters[0]._id}`}
                className="bg-[#d4af37] text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
              >
                بدء القراءة
              </Link>
            )}
          </div>
          <div className="divide-y divide-slate-100">
            {chapters.length > 0 ? (
              chapters.map((chapter) => (
                <Link 
                  key={chapter._id} 
                  to={`/read/${novel._id}/${chapter._id}`}
                  className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-slate-100 text-slate-500 w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-[#d4af37] group-hover:text-slate-900 transition-all font-bold">
                      {chapter.order}
                    </span>
                    <span className="text-lg font-medium text-slate-700 group-hover:text-slate-900 group-hover:translate-x-[-4px] transition-transform">
                      {chapter.title}
                    </span>
                  </div>
                  <ChevronLeft className="text-slate-300 group-hover:text-[#d4af37] transition-colors" />
                </Link>
              ))
            ) : (
              <div className="p-16 text-center text-slate-400 italic">
                لا توجد فصول منشورة لهذه الرواية بعد. ترقبونا قريباً!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelDetails;
