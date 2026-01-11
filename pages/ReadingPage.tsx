
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNovels, getChapters } from '../services/stateManager';
import { Novel, Chapter } from '../types';
import { ArrowRight, ChevronRight, ChevronLeft, Coffee } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import PremiumLock from '../components/PremiumLock';

const ReadingPage: React.FC = () => {
  const { novelId, chapterId } = useParams<{ novelId: string, chapterId: string }>();
  const [fontSize, setFontSize] = useState(22);
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [novel, setNovel] = useState<Novel | null>(null);
  const [prevChapter, setPrevChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  
  // Mocking user status for demonstration
  const [isUserSubscribed] = useState(false);

  useEffect(() => {
    if (novelId && chapterId) {
      const novels = getNovels();
      const n = novels.find(x => x._id === novelId);
      if (n) {
        setNovel(n);
        const chapters = getChapters(novelId);
        const currentIndex = chapters.findIndex(c => c._id === chapterId);
        if (currentIndex !== -1) {
          setChapter(chapters[currentIndex]);
          setPrevChapter(chapters[currentIndex - 1] || null);
          setNextChapter(chapters[currentIndex + 1] || null);
          window.scrollTo(0, 0);
        }
      }
    }
  }, [novelId, chapterId]);

  if (!chapter || !novel) {
    return <div className="p-20 text-center text-slate-400">جاري التحميل...</div>;
  }

  const themeClasses = {
    light: 'bg-white text-slate-900',
    dark: 'bg-slate-900 text-slate-200',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]'
  };

  const isLocked = chapter.isPremium && !isUserSubscribed;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses[theme]}`}>
      {/* Top Ad */}
      {!isUserSubscribed && <div className="container mx-auto px-4"><AdBanner slot="top_reading" label="إعلان علوي" /></div>}

      <div className={`sticky top-[72px] z-40 border-b ${theme === 'light' ? 'bg-white/90 border-slate-100' : theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-[#f4ecd8]/90 border-[#e4dcc8]'} backdrop-blur-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to={`/novel/${novelId}`} className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
            <ArrowRight size={20} />
            <span className="font-bold hidden sm:inline">{novel.title}</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-black/5 p-1 rounded-full">
              <button onClick={() => setTheme('light')} className={`w-8 h-8 rounded-full bg-white border ${theme === 'light' ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' : 'border-slate-300'}`}></button>
              <button onClick={() => setTheme('sepia')} className={`w-8 h-8 rounded-full bg-[#f4ecd8] border ${theme === 'sepia' ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' : 'border-slate-300'}`}></button>
              <button onClick={() => setTheme('dark')} className={`w-8 h-8 rounded-full bg-slate-900 border ${theme === 'dark' ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' : 'border-slate-700'}`}></button>
            </div>
            <div className="flex items-center gap-3 ml-2">
              <button onClick={() => setFontSize(prev => Math.max(14, prev - 2))} className="w-8 h-8 flex items-center justify-center rounded bg-black/5">أ-</button>
              <button onClick={() => setFontSize(prev => Math.min(42, prev + 2))} className="w-8 h-8 flex items-center justify-center rounded bg-black/5 text-lg">أ+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-slate-500 mb-2 uppercase tracking-widest text-sm font-bold">{novel.title}</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">{chapter.title}</h1>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
        </div>

        {isLocked ? (
          <PremiumLock />
        ) : (
          <>
            <article 
              className="font-serif-ar leading-relaxed text-justify prose prose-slate lg:prose-xl max-w-none mb-12"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
            
            {!isUserSubscribed && <AdBanner slot="mid_content" label="إعلان مدمج" />}
          </>
        )}

        {/* Support Me Section */}
        <div className="my-16 p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center">
          <Coffee size={40} className="mx-auto text-[#d4af37] mb-4" />
          <h3 className="text-xl font-bold mb-2">هل استمتعت بالفصل؟</h3>
          <p className="text-slate-500 mb-6">دعمك لنا يساعدنا على تقديم المزيد من الروايات والقصص الرائعة.</p>
          <a 
            href="https://paypal.me/yourusername" 
            target="_blank" 
            className="bg-[#d4af37] text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all inline-block shadow-lg shadow-yellow-500/10"
          >
            ادعم الكاتب عبدالله
          </a>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 pt-12 border-t border-slate-200">
          {prevChapter ? (
            <Link to={`/read/${novelId}/${prevChapter._id}`} className="flex flex-col items-center p-6 rounded-2xl border border-slate-200 hover:border-[#d4af37] transition-all text-center">
              <span className="text-slate-400 text-sm mb-2">الفصل السابق</span>
              <div className="flex items-center gap-2 font-bold group-hover:text-[#d4af37]">
                <ChevronRight size={20} />
                <span className="line-clamp-1">{prevChapter.title}</span>
              </div>
            </Link>
          ) : <div className="p-6 rounded-2xl opacity-20 text-center">بداية الرواية</div>}
          
          {nextChapter ? (
            <Link to={`/read/${novelId}/${nextChapter._id}`} className="flex flex-col items-center p-6 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl transition-all text-center">
              <span className="text-slate-400 text-sm mb-2">الفصل التالي</span>
              <div className="flex items-center gap-2 font-bold">
                <span className="line-clamp-1">{nextChapter.title}</span>
                <ChevronLeft size={20} className="text-[#d4af37]" />
              </div>
            </Link>
          ) : <div className="p-6 rounded-2xl bg-slate-100 text-slate-400 text-center">ترقبوا الفصل القادم</div>}
        </div>
      </div>
      
      {!isUserSubscribed && <div className="container mx-auto px-4 pb-12"><AdBanner slot="footer_reading" label="إعلان سفلي" /></div>}
    </div>
  );
};

export default ReadingPage;
