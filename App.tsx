
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import PriceHistoryChart from './components/PriceHistoryChart';
import { Product, AppView, Category } from './types';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { analyzePrice } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Home);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    if (view === AppView.Home) {
        setSearchQuery('');
        setSelectedProduct(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(AppView.Detail);
    setAiAnalysis(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAiAnalysis = async () => {
    if (!selectedProduct) return;
    setIsAnalyzing(true);
    const analysis = await analyzePrice(selectedProduct.name, selectedProduct.currentPrice, selectedProduct.priceHistory);
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  const renderHome = () => (
    <div className="flex flex-col gap-12 w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="w-full relative rounded-3xl overflow-hidden min-h-[480px] flex items-center justify-center text-center p-8 bg-cover bg-center shadow-2xl border border-surface-border/30" 
        style={{ backgroundImage: `radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%), url('https://picsum.photos/1600/900?grayscale')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/80 to-[#0f172a]"></div>
        <div className="relative z-10 flex flex-col items-center max-w-4xl gap-8">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center self-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-orange-200 text-sm font-medium mb-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Akıllı Fiyat Takip Sistemi
            </span>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-primary to-red-400 drop-shadow-sm">En iyi fiyatı</span> bulun,<br/> anında tasarruf edin.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Yapay zeka destekli fiyat analizi ile milyonlarca ürünün geçmişini inceleyin ve gerçek indirimleri yakalayın.
            </p>
          </div>
          <div className="w-full max-w-2xl mt-2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex w-full items-center rounded-xl bg-surface-dark border border-surface-border/50 shadow-2xl h-16 md:h-20 px-2">
              <div className="pl-4 md:pl-6 text-gray-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">search</span>
              </div>
              <input 
                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 text-lg md:text-xl px-4 h-full" 
                placeholder="Ürün, marka veya model ara..." 
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setCurrentView(AppView.Search)}
              />
              <div className="pr-2">
                <button onClick={() => setCurrentView(AppView.Search)} className="h-12 md:h-16 px-8 rounded-lg bg-primary text-white font-bold text-base md:text-lg hover:bg-primary-hover transition-all">
                  Ara
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-surface-border bg-surface-dark/50 backdrop-blur-sm hover:border-primary hover:bg-surface-dark transition-all cursor-pointer gap-4">
              <div className="w-14 h-14 rounded-full bg-surface-border/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">{cat.icon}</span>
              </div>
              <span className="text-gray-300 group-hover:text-white font-medium text-sm transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Deals */}
      <section className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined text-2xl">bolt</span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Günün Fırsatları</h2>
          </div>
          <button className="text-sm text-primary hover:text-primary-hover font-semibold transition-colors flex items-center gap-1">
            Tümünü Gör <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductCard product={MOCK_PRODUCTS[0]} onClick={handleProductClick} variant="featured" />
          <ProductCard product={MOCK_PRODUCTS[1]} onClick={handleProductClick} variant="featured" />
        </div>
      </section>

      {/* Price Errors */}
      <section className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-surface-border pb-4">
          <div className="p-2 bg-red-500/10 rounded-lg text-red-500 animate-pulse">
            <span className="material-symbols-outlined text-2xl">warning</span>
          </div>
          <h2 className="text-white text-2xl font-bold">Olası Fiyat Hataları</h2>
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Çok Hızlı Tükeniyor!</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {MOCK_PRODUCTS.slice(2).concat(MOCK_PRODUCTS.slice(0, 3)).map((p, idx) => (
             <ProductCard key={`${p.id}-${idx}`} product={p} onClick={handleProductClick} variant="error" />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
              <span className="material-symbols-outlined text-2xl">trending_up</span>
            </div>
            <h2 className="text-white text-2xl font-bold">Popüler Ürünler</h2>
          </div>
          <button className="text-sm text-primary hover:text-primary-hover font-semibold transition-colors">Tümünü Gör</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {MOCK_PRODUCTS.concat(MOCK_PRODUCTS).slice(0, 5).map((p, idx) => (
            <div key={`${p.id}-pop-${idx}`} onClick={() => handleProductClick(p)} className="group bg-surface-dark border border-surface-border rounded-2xl p-4 hover:border-secondary/50 transition-all hover:shadow-lg flex flex-col gap-3 cursor-pointer">
              <div className="aspect-[4/3] w-full bg-white rounded-xl overflow-hidden p-4 flex items-center justify-center">
                <img className="w-full h-full object-contain group-hover:scale-105 transition-transform" src={p.imageUrl} alt={p.name} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1 line-clamp-1 group-hover:text-secondary transition-colors">{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-bold text-lg">{p.currentPrice.toLocaleString('tr-TR')} TL</span>
                  {p.oldPrice && <span className="text-gray-500 text-xs line-through">{p.oldPrice.toLocaleString('tr-TR')} TL</span>}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <span className="material-symbols-outlined text-sm text-yellow-400 filled-icon">star</span>
                  <span>{p.rating} ({p.reviewsCount})</span>
                  <span className="mx-1">•</span>
                  <span>{p.store}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderSearch = () => (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-surface-dark p-6 rounded-xl border border-surface-border">
            <h3 className="text-white font-bold text-lg mb-4">Kategoriler</h3>
            <div className="space-y-3">
              {CATEGORIES.map(cat => (
                <label key={cat.id} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-gray-300 group-hover:text-white text-sm">{cat.name}</span>
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold">124</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-surface-dark p-6 rounded-xl border border-surface-border">
            <h3 className="text-white font-bold text-lg mb-4">Fiyat Aralığı</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input type="text" placeholder="Min" className="w-full bg-slate-900 border border-surface-border rounded-lg px-2 py-1 text-xs outline-none focus:border-primary" />
                <input type="text" placeholder="Max" className="w-full bg-slate-900 border border-surface-border rounded-lg px-2 py-1 text-xs outline-none focus:border-primary" />
              </div>
              <button className="w-full bg-primary/10 text-primary border border-primary/20 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all">Uygula</button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold">"{searchQuery || 'Tüm Ürünler'}" Sonuçları</h1>
            <p className="text-gray-400 mt-2">{filteredProducts.length} ürün bulundu</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onClick={handleProductClick} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="flex flex-col gap-10 w-full max-w-[1200px] mx-auto px-4 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="w-full aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-8 border border-surface-border relative group">
              <img src={selectedProduct.imageUrl} className="max-h-full object-contain group-hover:scale-105 duration-300" alt={selectedProduct.name} />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <button key={i} className={`aspect-square rounded-lg border-2 ${i === 0 ? 'border-primary' : 'border-surface-border'} overflow-hidden bg-white p-2`}>
                   <img src={selectedProduct.imageUrl} className="h-full object-contain mx-auto" alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-slate-800 text-primary text-xs font-bold px-2 py-1 rounded">{selectedProduct.category}</span>
                <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-1 rounded">Stokta Var</span>
              </div>
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-slate-400 text-lg">{selectedProduct.brand} - {selectedProduct.status || 'En Uygun Fiyat'}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-white">{selectedProduct.rating}</span>
                <div className="flex text-yellow-500">
                  <span className="material-symbols-outlined filled-icon text-lg">star</span>
                  <span className="material-symbols-outlined filled-icon text-lg">star</span>
                  <span className="material-symbols-outlined filled-icon text-lg">star</span>
                  <span className="material-symbols-outlined filled-icon text-lg">star</span>
                  <span className="material-symbols-outlined text-lg">star_half</span>
                </div>
              </div>
              <span className="text-slate-400 text-sm underline">{selectedProduct.reviewsCount} değerlendirme</span>
            </div>

            <div className="p-6 rounded-2xl bg-surface-dark border border-slate-700 mt-2 relative overflow-hidden">
              <p className="text-slate-400 text-sm font-medium mb-1 relative z-10">En İyi Fiyat</p>
              <div className="flex flex-wrap items-end gap-4 mb-4 relative z-10">
                <span className="text-5xl font-black text-white tracking-tight">{selectedProduct.currentPrice.toLocaleString('tr-TR')} TL</span>
                {selectedProduct.discountPercentage && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="flex items-center justify-center size-5 bg-red-500/20 rounded-full">
                      <span className="material-symbols-outlined text-red-500 text-xs font-bold">arrow_downward</span>
                    </span>
                    <span className="text-red-400 text-sm font-bold">%{selectedProduct.discountPercentage} İndirim</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                <button className="flex-1 h-12 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  <span className="material-symbols-outlined filled-icon">notifications_active</span>
                  Ürünü Takip Et
                </button>
                <button 
                  onClick={handleAiAnalysis}
                  disabled={isAnalyzing}
                  className="flex-1 h-12 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">{isAnalyzing ? 'sync' : 'psychology'}</span>
                  {isAnalyzing ? 'Analiz Ediliyor...' : 'Yapay Zeka Analizi'}
                </button>
              </div>
              {aiAnalysis && (
                <div className="mt-4 p-4 bg-slate-900/80 rounded-xl border border-secondary/20 animate-fade-in relative z-10">
                  <p className="text-sm text-gray-200 leading-relaxed italic">"{aiAnalysis}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <section className="flex flex-col gap-4">
              <h3 className="text-white text-xl font-bold">Fiyat Geçmişi</h3>
              <PriceHistoryChart data={selectedProduct.priceHistory} />
            </section>
            
            <section className="flex flex-col gap-4">
                <h3 className="text-white text-xl font-bold">Mağaza Fiyatları</h3>
                <div className="flex flex-col gap-3">
                    {selectedProduct.sellers.map((seller, i) => (
                        <div key={i} className={`bg-slate-900 p-4 rounded-xl border ${i === 0 ? 'border-primary/40' : 'border-surface-border'} flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary transition-all`}>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2">
                                    <span className="material-symbols-outlined text-black">store</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{seller.name}</h4>
                                    <p className="text-xs text-slate-500">{seller.shipping}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-black text-white">{seller.price.toLocaleString('tr-TR')} TL</span>
                                <button className="bg-surface-dark border border-surface-border group-hover:bg-primary group-hover:text-white group-hover:border-primary px-4 py-2 rounded-lg text-sm font-bold transition-all">Mağazaya Git</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-dark border border-slate-700 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                    <span className="material-symbols-outlined">trending_down</span>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Fiyat Alarmı Kur</h4>
                <p className="text-slate-400 text-sm mb-4">Ürün istediğiniz fiyata düştüğünde size anında haber verelim.</p>
                <div className="space-y-3">
                    <input type="number" placeholder="Hedef Fiyat" className="w-full bg-slate-950 border border-surface-border rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                    <button className="w-full h-10 bg-primary text-white font-bold rounded-lg transition-colors text-sm">Alarm Oluştur</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-72 flex-shrink-0">
        <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border flex flex-col gap-6 sticky top-24">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">person</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Ahmet Yılmaz</h2>
              <p className="text-primary text-xs font-bold uppercase tracking-wide">Premium Üye</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {['Genel Bakış', 'Favorilerim', 'Takip Listesi', 'Geçmiş Siparişler', 'Hesap Ayarları'].map((item) => (
                <button key={item} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${item === 'Takip Listesi' ? 'bg-primary/20 text-primary border border-primary/20' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}>
                    {item}
                </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 space-y-8">
        <div className="flex items-center justify-between border-b border-surface-border pb-6">
          <h2 className="text-white text-3xl font-black">Profil Yönetimi</h2>
          <span className="text-xs text-gray-500 font-mono">Son giriş: 24 Ekim, 14:30</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border space-y-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">badge</span> Kişisel Bilgiler
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium">Ad</label>
                <p className="text-white text-sm font-bold bg-slate-900/50 p-2 rounded-lg border border-surface-border">Ahmet</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium">Soyad</label>
                <p className="text-white text-sm font-bold bg-slate-900/50 p-2 rounded-lg border border-surface-border">Yılmaz</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-medium">E-posta</label>
              <p className="text-white text-sm font-bold bg-slate-900/50 p-2 rounded-lg border border-surface-border">ahmet.yilmaz@fiyattakip.com</p>
            </div>
            <button className="text-primary text-sm font-bold hover:underline">Bilgileri Güncelle</button>
          </div>

          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] rounded-2xl p-6 border border-primary/20 flex flex-col justify-center">
            <p className="text-gray-400 text-sm font-medium">Toplam Tasarruf</p>
            <h2 className="text-4xl font-black text-white mt-1">1.250 TL</h2>
            <div className="flex gap-2 mt-4">
              <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold">+15% Bu Ay</span>
              <button className="text-primary text-xs font-bold hover:underline ml-auto">Raporu Gör</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <h3 className="text-white text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bookmark</span> Takip Listeniz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PRODUCTS.slice(0, 3).map(p => (
                    <ProductCard key={`${p.id}-track`} product={p} onClick={handleProductClick} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} onSearch={setSearchQuery} currentView={currentView} />
      
      <div className="flex-1">
        {currentView === AppView.Home && renderHome()}
        {currentView === AppView.Search && renderSearch()}
        {currentView === AppView.Detail && renderDetail()}
        {currentView === AppView.Profile && renderProfile()}
      </div>

      <footer className="w-full bg-[#020617] border-t border-surface-border mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 py-12 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 text-white">
              <div className="text-primary material-symbols-outlined !text-[28px]">price_check</div>
              <h2 className="text-white text-xl font-black tracking-tight">FiyatTakip</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-400">
              {['Hakkımızda', 'Kullanım Koşulları', 'Gizlilik Politikası', 'Yardım', 'İletişim'].map(link => (
                <button key={link} className="hover:text-primary transition-colors">{link}</button>
              ))}
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 FiyatTakip. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
