
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  onNavigate: (view: AppView) => void;
  onSearch: (query: string) => void;
  currentView: AppView;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSearch, currentView }) => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-surface-border bg-[#0f172a]/95 backdrop-blur-md shadow-lg">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={() => onNavigate(AppView.Home)} className="flex items-center gap-2 text-white group outline-none">
              <div className="text-primary group-hover:text-white transition-colors duration-300 material-symbols-outlined !text-[36px]">
                price_check
              </div>
              <h2 className="text-white text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                FiyatTakip
              </h2>
            </button>

            <nav className="hidden xl:flex items-center gap-1 bg-surface-dark/50 p-1.5 rounded-full border border-surface-border/50">
              {['Kategoriler', 'Fırsatlar', 'Günün Fırsatları', 'Fiyat Hatası'].map((item) => (
                <button
                  key={item}
                  onClick={() => item === 'Fiyat Hatası' ? onNavigate(AppView.Search) : onNavigate(AppView.Home)}
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-surface-border/80 transition-all text-sm font-medium"
                >
                  {item}
                </button>
              ))}
              <button className="px-4 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all text-sm font-bold flex items-center gap-1.5 border border-red-500/20">
                <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                Ekstrem İndirim
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-xl mx-8 hidden lg:flex">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[20px] group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                type="text"
                placeholder="Ürün, marka veya model ara..."
                className="w-full bg-surface-dark/60 border border-surface-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-2 pl-11 pr-4 text-white placeholder-gray-500 outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && onSearch(e.currentTarget.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate(AppView.Profile)} className="flex items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-primary-hover transition-all text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] text-sm font-bold tracking-wide">
              Giriş Yap
            </button>
            <div className="h-6 w-px bg-surface-border mx-1 hidden md:block"></div>
            <button onClick={() => onNavigate(AppView.Profile)} className="hidden md:flex items-center justify-center rounded-full h-10 w-10 bg-surface-dark text-gray-300 hover:bg-surface-border hover:text-primary transition-all border border-surface-border/50">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>
            <button className="hidden md:flex items-center justify-center rounded-full h-10 w-10 bg-surface-dark text-gray-300 hover:bg-surface-border hover:text-red-400 transition-all border border-surface-border/50">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
