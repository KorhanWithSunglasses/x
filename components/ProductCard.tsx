
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  variant?: 'compact' | 'featured' | 'error';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, variant = 'compact' }) => {
  if (variant === 'featured') {
    return (
      <div 
        onClick={() => onClick(product)}
        className="relative group rounded-2xl bg-surface-dark border border-surface-border hover:border-primary/50 overflow-hidden shadow-lg flex flex-col sm:flex-row h-full transition-all duration-300 cursor-pointer"
      >
        <div className="sm:w-2/5 h-64 sm:h-auto bg-white relative overflow-hidden p-6 flex items-center justify-center">
          <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" src={product.imageUrl} alt={product.name} />
          {product.discountPercentage && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discountPercentage}%
            </div>
          )}
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{product.category}</span>
              <div className="flex text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(product.rating) ? 'filled-icon' : ''}`}>star</span>
                ))}
              </div>
            </div>
            <h3 className="text-white text-2xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">Sektör lideri özellikler ve üstün performans ile şimdi en düşük fiyatta.</p>
          </div>
          <div className="flex items-end justify-between mt-2 pt-4 border-t border-surface-border/50">
            <div>
              {product.oldPrice && <p className="text-gray-500 text-sm line-through decoration-red-500/50">{product.oldPrice.toLocaleString('tr-TR')} TL</p>}
              <p className="text-white text-3xl font-black tracking-tight">{product.currentPrice.toLocaleString('tr-TR')} TL</p>
            </div>
            <button className="bg-primary hover:bg-primary-hover text-white font-bold h-10 px-5 rounded-lg transition-all">İncele</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(product)}
      className={`group bg-surface-dark border ${variant === 'error' ? 'border-red-500/30' : 'border-surface-border'} rounded-2xl p-4 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col gap-3 relative cursor-pointer`}
    >
      <div className="absolute top-4 right-4 z-10">
        <button className="bg-surface-dark/80 backdrop-blur rounded-full p-1.5 text-gray-400 hover:text-red-500 transition-colors shadow-sm" onClick={(e) => e.stopPropagation()}>
          <span className="material-symbols-outlined text-lg">favorite</span>
        </button>
      </div>
      <div className="aspect-square w-full bg-white rounded-xl overflow-hidden relative p-4 flex items-center justify-center">
        <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="flex flex-col gap-2 flex-1 pt-2">
        <h3 className="text-white text-sm font-semibold line-clamp-2 leading-snug min-h-[2.5em] group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            {product.discountPercentage && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{product.discountPercentage}%</span>}
            {product.oldPrice && <span className="text-gray-500 text-xs line-through">{product.oldPrice.toLocaleString('tr-TR')} TL</span>}
          </div>
          <div className="text-white font-black text-xl">{product.currentPrice.toLocaleString('tr-TR')} TL</div>
          {product.status && (
            <div className={`text-[11px] ${variant === 'error' ? 'text-red-400 border-red-500/10' : 'text-blue-400 border-blue-500/10'} flex items-center gap-1 mt-2 bg-slate-900/50 p-1 rounded border`}>
              <span className="material-symbols-outlined text-[14px]">{variant === 'error' ? 'warning' : 'trending_down'}</span>
              {product.status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
