
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNovels, saveNovel, deleteNovel, saveChapter, getChapters } from '../services/stateManager';
import { Novel, Chapter } from '../types';
import { Plus, Edit, Trash2, BookOpen, Layers, LogOut, Send, Image as ImageIcon, FileText, X, Crown } from 'lucide-react';
import ReactQuill from 'react-quill';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'novels' | 'chapters'>('novels');
  const [novels, setNovels] = useState<Novel[]>([]);
  const [showNovelForm, setShowNovelForm] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);
  
  const [newNovel, setNewNovel] = useState({ title: '', author: 'عبدالله عقدين', description: '', coverImage: '' });
  const [selectedNovelId, setSelectedNovelId] = useState('');
  const [newChapter, setNewChapter] = useState({ title: '', content: '', order: 1, isPremium: false });

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
    setNovels(getNovels());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const handleCreateNovel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNovel.title || !newNovel.coverImage) return;
    saveNovel(newNovel);
    setNovels(getNovels());
    setShowNovelForm(false);
    setNewNovel({ title: '', author: 'عبدالله عقدين', description: '', coverImage: '' });
    alert('تم النشر بنجاح!');
  };

  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNovelId || !newChapter.title || !newChapter.content) return;
    saveChapter({ ...newChapter, novelId: selectedNovelId });
    setShowChapterForm(false);
    setNewChapter({ title: '', content: '', order: (getChapters(selectedNovelId).length + 1), isPremium: false });
    alert('تم إضافة الفصل بنجاح!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Same as before but with Income focus */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37] flex items-center justify-center text-slate-900"><BookOpen size={24} /></div>
            <div>
              <h2 className="font-bold text-lg leading-none">إدارة الأعمال</h2>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 block">Live Portfolio</span>
            </div>
          </div>
        </div>
        <nav className="p-4 flex-grow space-y-2 mt-4">
          <button onClick={() => setActiveTab('novels')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'novels' ? 'bg-[#d4af37] text-slate-900 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <BookOpen size={20} /><span>الروايات</span>
          </button>
          <button onClick={() => setActiveTab('chapters')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'chapters' ? 'bg-[#d4af37] text-slate-900 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Layers size={20} /><span>الفصول</span>
          </button>
        </nav>
        <div className="p-6 border-t border-slate-800 bg-slate-950/50">
           <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-tighter">إيرادات الشهر الحالي</p>
           <p className="text-xl font-bold text-[#d4af37]">$1,240.50</p>
        </div>
      </aside>

      <main className="flex-grow p-4 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800">إدارة المحتوى</h1>
            <div className="flex gap-3">
              <button onClick={() => setShowNovelForm(true)} className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-all font-bold">
                <Plus size={20} className="text-[#d4af37]" /><span>رواية جديدة</span>
              </button>
              <button onClick={() => setShowChapterForm(true)} className="bg-[#d4af37] text-slate-900 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-all font-bold">
                <Plus size={20} /><span>فصل جديد</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-slate-400 text-xs">
                    <th className="px-8 py-5">الرواية</th>
                    <th className="px-8 py-5">المؤلف</th>
                    <th className="px-8 py-5 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {novels.map((novel) => (
                    <tr key={novel._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-5"><div className="flex items-center gap-4"><img src={novel.coverImage} className="w-10 h-14 object-cover rounded shadow-sm" alt="" /><p className="font-bold text-slate-800">{novel.title}</p></div></td>
                      <td className="px-8 py-5 text-slate-600 font-medium">{novel.author}</td>
                      <td className="px-8 py-5"><div className="flex justify-center gap-2"><button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button><button onClick={() => {deleteNovel(novel._id); setNovels(getNovels());}} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal: Add Chapter (Updated with Premium Toggle) */}
        {showChapterForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold">إضافة فصل جديد</h3>
                <button onClick={() => setShowChapterForm(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
              </div>
              <form onSubmit={handleCreateChapter} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1"><label className="text-xs font-bold text-slate-400 mb-1 block">الرواية</label><select className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]" value={selectedNovelId} onChange={(e) => setSelectedNovelId(e.target.value)} required><option value="">اختر...</option>{novels.map(n => <option key={n._id} value={n._id}>{n.title}</option>)}</select></div>
                  <div className="md:col-span-1"><label className="text-xs font-bold text-slate-400 mb-1 block">العنوان</label><input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]" placeholder="عنوان الفصل" value={newChapter.title} onChange={(e) => setNewChapter({...newChapter, title: e.target.value})} required /></div>
                  <div className="md:col-span-1 flex items-end">
                    <button type="button" onClick={() => setNewChapter({...newChapter, isPremium: !newChapter.isPremium})} className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${newChapter.isPremium ? 'bg-slate-900 text-[#d4af37]' : 'bg-slate-100 text-slate-400'}`}>
                       <Crown size={18} />
                       <span>{newChapter.isPremium ? 'فصل مدفوع' : 'فصل مجاني'}</span>
                    </button>
                  </div>
                </div>
                <div className="h-[300px] mb-12"><ReactQuill theme="snow" value={newChapter.content} onChange={(val) => setNewChapter({...newChapter, content: val})} className="h-full" /></div>
                <div className="pt-8"><button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">نشر الفصل فوراً</button></div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Novel (Same as before) */}
        {showNovelForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50"><h3 className="text-xl font-bold">رواية جديدة</h3><button onClick={() => setShowNovelForm(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button></div>
               <form onSubmit={handleCreateNovel} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="عنوان الرواية" value={newNovel.title} onChange={(e) => setNewNovel({...newNovel, title: e.target.value})} required />
                    <input type="url" className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="رابط الغلاف" value={newNovel.coverImage} onChange={(e) => setNewNovel({...newNovel, coverImage: e.target.value})} required />
                  </div>
                  <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none" placeholder="الوصف" value={newNovel.description} onChange={(e) => setNewNovel({...newNovel, description: e.target.value})} required />
                  <button type="submit" className="w-full bg-[#d4af37] text-slate-900 font-bold py-4 rounded-xl shadow-lg">نشر العمل</button>
               </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
