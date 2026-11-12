import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';
import { ProductVariant } from '../../types';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, navigateTo } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct && quickViewProduct.variants.length > 0) {
      setSelectedVariant(quickViewProduct.variants[0]);
      setQuantity(1);
      setAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedVariant) return null;

  const currentPrice = selectedVariant.price;
  const originalPrice = selectedVariant.originalPrice;
  const discountPercent = originalPrice > currentPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) 
    : 0;

  // Group unique weights and flavours
  const availableWeights = Array.from(new Set(quickViewProduct.variants.map(v => v.weight)));
  const availableFlavours = Array.from(new Set(quickViewProduct.variants.map(v => v.flavour)));

  const handleWeightChange = (weight: string) => {
    const match = quickViewProduct.variants.find(v => v.weight === weight && v.flavour === selectedVariant.flavour) 
      || quickViewProduct.variants.find(v => v.weight === weight);
    if (match) setSelectedVariant(match);
  };

  const handleFlavourChange = (flavour: string) => {
    const match = quickViewProduct.variants.find(v => v.flavour === flavour && v.weight === selectedVariant.weight)
      || quickViewProduct.variants.find(v => v.flavour === flavour);
    if (match) setSelectedVariant(match);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={closeQuickView} 
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#141414] border border-white/10 text-white w-full max-w-3xl rounded-[20px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9),0_22px_36px_-12px_rgba(237,16,27,0.25)] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 z-20 bg-black/60 hover:bg-black/90 border border-white/10 rounded-[10px] transition-colors"
          aria-label="Close Quick View"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left: Product Image */}
          <div className="relative aspect-square bg-[#0D0D0D] border border-white/10 rounded-[16px] overflow-hidden flex items-center justify-center">
            <img
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#ED101B] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-[8px] shadow-sm">
                SAVE {discountPercent}%
              </span>
            )}
          </div>

          {/* Right: Info & Selectors */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase font-mono tracking-wider">
                <span>{quickViewProduct.brand}</span>
                <span>·</span>
                <span>SKU: {selectedVariant.sku}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-heading font-bold text-white mt-1 leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#ED101B]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-[#ED101B]' : 'text-zinc-600'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-400 font-mono">
                  {quickViewProduct.rating} ({quickViewProduct.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-mono font-bold text-white tracking-tight">
                  Rs. {currentPrice.toLocaleString()}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-sm font-mono text-zinc-500 line-through">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-mono font-medium">
                  {selectedVariant.inStock ? `In Stock (${selectedVariant.stockCount} units)` : 'Out of Stock'}
                </span>
              </div>

              {/* Short description */}
              <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                {quickViewProduct.shortDescription}
              </p>

              {/* Weight Options */}
              {availableWeights.length > 1 && (
                <div className="mt-4">
                  <label className="text-xs uppercase font-mono tracking-wider text-zinc-400 block mb-1.5">
                    Select Size / Weight:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableWeights.map(w => (
                      <button
                        key={w}
                        onClick={() => handleWeightChange(w)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-[12px] transition-all ${
                          selectedVariant.weight === w
                            ? 'bg-[#ED101B] text-white font-bold shadow-[0_0_12px_rgba(237,16,27,0.35)]'
                            : 'bg-[#181818] border border-white/10 text-zinc-300 hover:text-white hover:border-zinc-500'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavour Options */}
              {availableFlavours.length > 1 && (
                <div className="mt-3">
                  <label className="text-xs uppercase font-mono tracking-wider text-zinc-400 block mb-1.5">
                    Select Flavour:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableFlavours.map(f => (
                      <button
                        key={f}
                        onClick={() => handleFlavourChange(f)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-[12px] transition-all ${
                          selectedVariant.flavour === f
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'bg-[#181818] border border-white/10 text-zinc-300 hover:text-white hover:border-zinc-500'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">
                  Quantity:
                </span>
                <div className="flex items-center border border-white/15 bg-[#181818] rounded-[12px] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-zinc-400 hover:text-white font-mono"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-white min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant.stockCount || 99, quantity + 1))}
                    className="px-3 py-1 text-zinc-400 hover:text-white font-mono"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions & Details link */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant.inStock}
                className={`w-full py-3.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-[12px] transition-all ${
                  added 
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'vexon-btn-primary'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (Rs. {(currentPrice * quantity).toLocaleString()})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  closeQuickView();
                  navigateTo('product-detail', { productId: quickViewProduct.id });
                }}
                className="w-full py-2.5 text-xs font-heading uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-[10px] vexon-btn-secondary"
              >
                <span>View Full Specifications & Nutrition Facts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
