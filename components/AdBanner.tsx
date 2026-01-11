
import React from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid';
  label?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, format = 'auto', label = 'إعلان مدعوم' }) => {
  return (
    <div className="my-8 w-full flex flex-col items-center">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">{label}</span>
      <div className="w-full min-h-[100px] bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-300 relative overflow-hidden">
        {/* Real AdSense code would go here */}
        <p className="text-sm italic">AdSense Slot: {slot}</p>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-4 gap-4 h-full w-full p-4">
             {[...Array(8)].map((_, i) => <div key={i} className="bg-slate-900 rounded"></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
