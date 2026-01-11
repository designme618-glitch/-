
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 space-x-reverse">
          <BookOpen className="text-[#d4af37] w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight">
            روايات <span className="text-[#d4af37]">عبدالله عقدين</span>
          </span>
        </Link>

        <nav className="hidden md:flex space-x-8 space-x-reverse items-center">
          <Link to="/" className="hover:text-[#d4af37] transition-colors">الرئيسية</Link>
          <Link to="/" className="hover:text-[#d4af37] transition-colors">الأكثر قراءة</Link>
          <Link to="/" className="hover:text-[#d4af37] transition-colors">تصنيفات</Link>
          <Link to="/admin/login" className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:border-[#d4af37] transition-all">
            <User size={18} />
            <span>تسجيل الدخول</span>
          </Link>
        </nav>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
