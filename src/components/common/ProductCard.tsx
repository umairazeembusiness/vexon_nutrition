import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  badge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, badge }) => {
  const { 
    navigateTo, 
    toggleWishlist, 
    isInWishlist, 
    openQuickView, 
    addToCart 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const defaultVariant = product.variants[0] || {
    id: 'default',
    weight: 'Standard',
    flavour: 'Original',
    price: product.price,
    originalPrice: product.originalPrice,
    sku: product.sku,
    inStock: product.inStock,
    stockCount: product.stockCount
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.variants.length > 1) {
      // Open quick view so user selects their preferred weight/flavour accurately
      openQuickView(product);
    } else {
      addToCart(product, defaultVariant, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  return (
    <div 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative product-card vexon-card flex flex-col justify-between cursor-pointer select-none overflow-hidden"
    >
      {/* 1. Top Badges & Image Section */}
      <div className="p-2 pb-0">
        <div className="relative aspect-4/3 overflow-hidden rounded-[16px] bg-black/40">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Subtle dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/90 via-transparent to-transparent opacity-60" />

          {/* Badges Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {product.discountPercent && (
              <span className="bg-[#ED101B] text-white text-[10px] font-mono font-bold px-2 py-0.5 tracking-wider rounded-[8px] shadow-sm shadow-red-950/40">
                SAVE {product.discountPercent}%
              </span>
            )}
            {badge && (
              <span className="bg-black/80 backdrop-blur-xs border border-zinc-700/80 text-zinc-200 text-[10px] font-mono uppercase px-2 py-0.5 rounded-[8px]">
                {badge}
              </span>
            )}
            {!product.inStock && (
              <span className="bg-zinc-800 text-zinc-400 text-[10px] font-mono px-2 py-0.5 uppercase rounded-[8px]">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist Button Right */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-[10px] flex items-center justify-center transition-all duration-300 z-10 ${
              isWishlisted 
                ? 'bg-[#ED101B] text-white shadow-[0_4px_10px_-2px_rgba(237,16,27,0.5)]' 
                : 'bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 hover:border-[#ED101B]/50 hover:shadow-[0_4px_10px_-2px_rgba(237,16,27,0.4)]'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Quick View Button Hover Layer */}
          <div 
            className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                openQuickView(product);
              }}
              className="flex-1 bg-black/90 hover:bg-[#1E1E1E] text-white text-[11px] font-heading font-medium uppercase tracking-wider py-2 px-3 border border-white/10 hover:border-[#ED101B]/50 rounded-[10px] flex items-center justify-center gap-1.5 transition-all shadow-lg hover:shadow-[0_6px_14px_-3px_rgba(237,16,27,0.35)]"
            >
              <Eye className="w-3.5 h-3.5 text-[#ED101B]" />
              <span>Quick View</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Product Meta & Details */}
      <div className="p-4 pt-3 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-white group-hover:text-[#ED101B] transition-colors mt-1 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-[#ED101B]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#ED101B]' : 'text-zinc-600'}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-zinc-400 font-mono">
              ({product.reviewCount})
            </span>
          </div>

          {/* Variant Preview */}
          <div className="mt-2 text-[11px] text-zinc-400">
            <span>{product.variants.length} option{product.variants.length > 1 ? 's' : ''} available</span>
            {product.variants[0]?.weight && (
              <span className="text-zinc-500 font-mono"> · {product.variants[0].weight}</span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-white/6 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-mono font-bold text-white tracking-tight">
              Rs. {product.price.toLocaleString()}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-[11px] font-mono text-zinc-500 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`px-3 py-2 text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-1.5 rounded-[10px] transition-all duration-300 ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : product.inStock
                ? 'bg-[#1E1E1E] hover:bg-[#ED101B] text-zinc-200 hover:text-white border border-white/10 hover:border-[#ED101B] hover:shadow-[0_6px_14px_-3px_rgba(237,16,27,0.35)]'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
            title="Add to Shopping Cart"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{product.variants.length > 1 ? 'Select' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
