
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify JWT from backend
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 text-slate-900">
            <Lock size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">لوحة تحكم الإدارة</h1>
          <p className="text-slate-500">قم بتسجيل الدخول لإدارة محتوى المنصة</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">اسم المستخدم</label>
            <div className="relative">
              <User className="absolute right-3 top-3 text-slate-400" size={18} />
              <input 
                type="text" 
                className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-slate-400" size={18} />
              <input 
                type="password" 
                className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-[#d4af37] hover:text-slate-900 transition-all"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
