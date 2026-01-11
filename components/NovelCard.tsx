
import React from 'react';
import { Link } from 'react-router-dom';
import { Novel } from '../types';
import { BookOpen } from 'lucide-react';

interface NovelCardProps {
  novel: Novel;
}

const NovelCard: React.FC<NovelCardProps> = ({ novel }) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={novel.coverImage} 
          alt={novel.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <Link 
            to={`/novel/${novel._id}`} 
            className="bg-[#d4af37] text-slate-900 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors"
          >
            <BookOpen size={18} />
            <span>اقرأ الآن</span>
          </Link>
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 bg-white">
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-[#d4af37] transition-colors">
          {novel.title}
        </h3>
        <p className="text-slate-500 text-sm mt-1">{novel.author}</p>
      </div>
    </div>
  );
};

export default NovelCard;
