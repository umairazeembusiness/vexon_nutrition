import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { PRODUCTS } from '../data/products';
import { ProductVariant } from '../types';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart, 
  ShoppingBag, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Check, 
  AlertCircle,
  HelpCircle,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    addToast 
  } = useStore();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'benefits' | 'ingredients' | 'nutrition' | 'usage' | 'specs' | 'reviews' | 'faqs'>('desc');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Sync selected variant when product changes
  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  const isWishlisted = isInWishlist(product.id);

  // Variant helpers
  const availableWeights = Array.from(new Set(product.variants.map(v => v.weight)));
  const availableFlavours = Array.from(new Set(product.variants.map(v => v.flavour)));

  const handleWeightSelect = (weight: string) => {
    const match = product.variants.find(v => v.weight === weight && v.flavour === selectedVariant.flavour)
      || product.variants.find(v => v.weight === weight);
    if (match) setSelectedVariant(match);
  };

  const handleFlavourSelect = (flavour: string) => {
    const match = product.variants.find(v => v.flavour === flavour && v.weight === selectedVariant.weight)
      || product.variants.find(v => v.flavour === flavour);
    if (match) setSelectedVariant(match);
  };

  const currentPrice = selectedVariant.price;
  const originalPrice = selectedVariant.originalPrice;
  const discountPercent = originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigateTo('checkout');
  };

  // Image zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const complementaryProduct = PRODUCTS.find(p => p.id === (product.category === 'Whey Protein' ? 'vexon-creatine-creapure' : 'vexon-nitro-isolate')) || PRODUCTS[1];

  return (
    <div className="bg-[#090909] text-white min-h-screen pb-20">
      
      {/* 1. Breadcrumbs */}
      <div className="border-b border-[#1C1C1C] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono text-zinc-500 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
            Shop
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', { category: product.category })} className="hover:text-white transition-colors">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#ED101B] font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* 2. Main Product Section (Desktop Split View) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ================= LEFT: GALLERY & ZOOM (7 Cols) ================= */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image with Zoom lens (25px rounded container, 16px image) */}
            <div 
              className="relative aspect-4/3 sm:aspect-square bg-[#141414] border border-white/10 rounded-[25px] p-2.5 overflow-hidden flex items-center justify-center cursor-crosshair select-none shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="w-full h-full rounded-[16px] overflow-hidden relative">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZoomed ? 'scale-150 origin-center' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : undefined
                  }
                />
              </div>

              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-col gap-2 z-10 pointer-events-none">
                {discountPercent > 0 && (
                  <span className="bg-[#ED101B] text-white text-xs font-mono font-bold px-2.5 py-1 uppercase tracking-wider rounded-[8px] shadow-md shadow-red-950/50">
                    SAVE {discountPercent}%
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-black/80 backdrop-blur-xs border border-white/15 text-zinc-200 text-xs font-mono px-2.5 py-1 uppercase tracking-wider rounded-[8px]">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Wishlist toggle top right */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-5 right-5 w-10 h-10 rounded-[12px] flex items-center justify-center z-10 transition-all duration-300 ${
                  isWishlisted
                    ? 'bg-[#ED101B] text-white shadow-[0_4px_12px_-2px_rgba(237,16,27,0.5)]'
                    : 'bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-white/10 hover:border-[#ED101B]/50 hover:shadow-[0_4px_10px_-2px_rgba(237,16,27,0.4)]'
                }`}
                title={isWishlisted ? 'Saved in wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>

              <span className="absolute bottom-4 right-4 bg-black/70 text-zinc-400 text-[10px] font-mono px-2.5 py-1 pointer-events-none border border-white/10 rounded-[8px]">
                Hover to Zoom Lens
              </span>
            </div>

            {/* Thumbnail Gallery Switcher */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 bg-[#141414] border-2 shrink-0 rounded-[12px] overflow-hidden transition-all duration-300 ${
                    activeImageIndex === idx 
                      ? 'border-[#ED101B] shadow-[0_0_15px_rgba(237,16,27,0.4)]' 
                      : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-[10px]" />
                </button>
              ))}
            </div>

            {/* Authentication & Quality Guarantee Callout */}
            <div className="p-4 bg-[#141414] border border-white/8 rounded-[16px] flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-[10px] bg-black border border-white/10 flex items-center justify-center text-[#ED101B] shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <h5 className="font-heading font-bold uppercase text-white tracking-wider">
                  Scratch & Verify Holographic Security
                </h5>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">
                  Every VEXON container has a unique scratch code under the seal to verify 100% genuine formulation on our verification portal or at our Liberty Market flagship store.
                </p>
              </div>
            </div>

          </div>

          {/* ================= RIGHT: CONTIGUOUS PURCHASE MODULE (5 Cols) ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Brand, Title & SKU */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest">
                <span>{product.brand}</span>
                <span>SKU: {selectedVariant.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight text-white mt-1.5 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex text-[#ED101B]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#ED101B]' : 'text-zinc-600'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-zinc-300">
                  {product.rating} / 5.0
                </span>
                <span className="text-zinc-500">·</span>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs font-mono text-[#ED101B] hover:underline"
                >
                  {product.reviewCount} Verified Athlete Reviews
                </button>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 bg-[#141414] border border-white/8 rounded-[16px] flex items-baseline justify-between shadow-sm">
              <div>
                <span className="text-3xl font-mono font-bold text-white tracking-tight">
                  Rs. {currentPrice.toLocaleString()}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-sm font-mono text-zinc-500 line-through ml-3">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] text-zinc-500 block font-mono mt-0.5">
                  Tax included. Free shipping on orders over Rs. 8,000.
                </span>
              </div>

              <div className="text-right">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-[8px] ${
                  selectedVariant.inStock ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                }`}>
                  {selectedVariant.inStock ? `IN STOCK (${selectedVariant.stockCount} LEFT)` : 'OUT OF STOCK'}
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs text-zinc-300 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* ================= VARIANTS SELECTOR ================= */}
            <div className="space-y-4 pt-2 border-t border-white/8">
              
              {/* Weight Selector (12px rounded controls) */}
              {availableWeights.length > 0 && (
                <div>
                  <div className="flex justify-between text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    <span>Select Size / Weight:</span>
                    <span className="text-[#ED101B] font-mono">{selectedVariant.weight}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableWeights.map(w => {
                      const isSelected = selectedVariant.weight === w;
                      return (
                        <button
                          key={w}
                          onClick={() => handleWeightSelect(w)}
                          className={`p-2.5 text-xs font-mono text-left border rounded-[12px] transition-all duration-300 ${
                            isSelected
                              ? 'border-[#ED101B] bg-[#ED101B]/15 text-white font-bold shadow-[0_0_14px_rgba(237,16,27,0.3)]'
                              : 'border-white/10 bg-[#161616] text-zinc-300 hover:border-zinc-500 hover:bg-[#1C1C1C]'
                          }`}
                        >
                          <span className="block truncate">{w}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Flavour Selector (12px rounded controls) */}
              {availableFlavours.length > 0 && (
                <div>
                  <div className="flex justify-between text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    <span>Select Flavour:</span>
                    <span className="text-[#ED101B] font-mono">{selectedVariant.flavour}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {availableFlavours.map(f => {
                      const isSelected = selectedVariant.flavour === f;
                      return (
                        <button
                          key={f}
                          onClick={() => handleFlavourSelect(f)}
                          className={`p-2.5 text-xs font-mono text-left border rounded-[12px] flex items-center justify-between transition-all duration-300 ${
                            isSelected
                              ? 'border-[#ED101B] bg-[#ED101B]/15 text-white font-bold shadow-[0_0_14px_rgba(237,16,27,0.3)]'
                              : 'border-white/10 bg-[#161616] text-zinc-300 hover:border-zinc-500 hover:bg-[#1C1C1C]'
                          }`}
                        >
                          <span className="truncate">{f}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#ED101B] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper (12px rounded) */}
              <div>
                <label className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/15 bg-[#161616] rounded-[12px] overflow-hidden shadow-inner">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white font-mono text-base transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-mono font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(selectedVariant.stockCount || 99, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white font-mono text-base transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    Max: {selectedVariant.stockCount} tubs per order
                  </span>
                </div>
              </div>

            </div>

            {/* ================= PURCHASE ACTION BUTTONS ================= */}
            <div className="space-y-3 pt-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant.inStock}
                  className={`flex-1 py-4 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-[12px] transition-all duration-300 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                      : selectedVariant.inStock
                      ? 'vexon-btn-primary'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (Rs. {(currentPrice * quantity).toLocaleString()})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant.inStock}
                  className="sm:w-44 py-4 bg-white hover:bg-zinc-200 text-black text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-[12px] transition-all hover:shadow-[0_8px_16px_-4px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* COD Trust badge */}
              <div className="p-3 bg-[#131313] border border-white/8 rounded-[12px] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Truck className="w-4 h-4 text-[#ED101B]" />
                  Cash on Delivery in 2-4 Days
                </span>
                <span className="text-zinc-500">·</span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <RotateCcw className="w-4 h-4 text-[#ED101B]" />
                  7-Day Seal Return
                </span>
              </div>
            </div>

            {/* Pakistan Delivery & Store Pickup Details */}
            <div className="pt-4 border-t border-[#1C1C1C] space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Nationwide Express Delivery:</strong>
                  <span> Fast dispatch from Lahore to Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and all cities via TCS / Leopard Courier.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Flagship Store Collection:</strong>
                  <span> Available immediately at Liberty Market, Gulberg III, Lahore with free body composition and stack advice.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          3. TABBED PRODUCT SPECIFICATIONS & NUTRITION INFORMATION
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-[#141414] border border-white/10 rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
          
          {/* Tab Header Strip */}
          <div className="flex overflow-x-auto border-b border-white/10 scrollbar-none bg-[#101010]">
            {[
              { id: 'desc', label: 'Description' },
              { id: 'benefits', label: 'Key Benefits' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'nutrition', label: 'Nutrition Facts' },
              { id: 'usage', label: 'How to Use' },
              { id: 'specs', label: 'Specifications' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              { id: 'faqs', label: 'FAQs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-4 text-xs font-heading font-semibold uppercase tracking-wider shrink-0 transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#ED101B] text-[#ED101B] bg-[#161616]'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-10">
            
            {/* Description Tab */}
            {activeTab === 'desc' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-heading font-bold uppercase text-white">
                  About {product.name}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-heading font-bold uppercase text-white">
                  Engineered For High-Performance Output
                </h3>
                <div className="space-y-3">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="p-3.5 bg-[#171717] border border-white/10 rounded-[12px] flex items-start gap-3">
                      <Flame className="w-5 h-5 text-[#ED101B] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-200 leading-relaxed font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients Tab */}
            {activeTab === 'ingredients' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-heading font-bold uppercase text-white">
                  Clean Formula Ingredients
                </h3>
                <p className="text-xs text-zinc-400">
                  Every batch is formulated without artificial hormones, unauthorized fillers, or heavy metals.
                </p>
                <ul className="divide-y divide-white/10 border border-white/10 rounded-[14px] overflow-hidden bg-[#161616]">
                  {product.ingredients.map((ing, i) => (
                    <li key={i} className="p-3 text-xs text-zinc-200 flex items-center justify-between">
                      <span>{ing}</span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Grade A</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition Facts Table */}
            {activeTab === 'nutrition' && (
              <div className="max-w-2xl">
                <div className="border-2 border-white p-5 bg-black text-white font-mono rounded-[14px]">
                  <h4 className="text-2xl font-bold uppercase tracking-tight border-b-8 border-white pb-1">
                    Nutrition Facts
                  </h4>
                  <div className="text-xs border-b border-zinc-700 py-1.5 flex justify-between">
                    <span>Serving Size:</span>
                    <span className="font-bold">{product.servingSize}</span>
                  </div>
                  <div className="text-xs border-b-4 border-white py-1.5 flex justify-between">
                    <span>Servings Per Tub:</span>
                    <span className="font-bold">Approx. {product.servingsPerContainer}</span>
                  </div>

                  <div className="text-[10px] text-right font-bold py-1 border-b border-zinc-700">
                    % Daily Value*
                  </div>

                  {product.nutritionFacts.length > 0 ? (
                    product.nutritionFacts.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1.5 border-b border-zinc-800 text-xs">
                        <div>
                          <strong className="text-white">{item.label}</strong>
                          <span className="text-zinc-400 ml-2">{item.amount}</span>
                        </div>
                        {item.dailyValue && (
                          <span className="font-bold text-white">{item.dailyValue}</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-xs text-zinc-400">
                      Standard workout accessory specifications apply. Zero caloric content.
                    </div>
                  )}

                  <p className="text-[10px] text-zinc-500 mt-3 pt-2 border-t border-zinc-800 leading-normal">
                    * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                  </p>
                </div>
              </div>
            )}

            {/* Usage Tab */}
            {activeTab === 'usage' && (
              <div className="max-w-2xl space-y-4">
                <h3 className="text-lg font-heading font-bold uppercase text-white">
                  Recommended Usage & Stacking
                </h3>
                <div className="p-5 bg-[#171717] border border-white/10 rounded-[14px] space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#ED101B] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold uppercase text-white">Optimal Timing</h5>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{product.howToUse}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-heading font-bold uppercase text-white mb-4">
                  Product Specifications
                </h3>
                <div className="border border-white/10 rounded-[14px] overflow-hidden divide-y divide-white/10 bg-[#161616]">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between p-3.5 text-xs">
                      <span className="text-zinc-400 font-mono">{spec.label}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-3.5 text-xs">
                    <span className="text-zinc-400 font-mono">Brand</span>
                    <span className="text-[#ED101B] font-semibold">{product.brand}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab (18px Review Cards) */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                  <div>
                    <h3 className="text-lg font-heading font-bold uppercase text-white">
                      Verified Athlete Reviews
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Based on {product.reviewCount} reviews from verified customers in Pakistan.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-mono font-bold text-white">{product.rating}</div>
                    <div className="text-xs text-zinc-400 font-mono">
                      <div className="flex text-[#ED101B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#ED101B]" />
                        ))}
                      </div>
                      <span>100% Recommended</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="review-card p-5 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Saad Abbasi</span>
                      <span className="text-zinc-500 font-mono">Lahore · Verified</span>
                    </div>
                    <div className="flex text-[#ED101B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#ED101B]" />
                      ))}
                    </div>
                    <h5 className="text-xs font-semibold text-white">Top tier mixability</h5>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      I have tried multiple international brands in Pakistan, but VEXON Nitro Isolate has the cleanest post-workout profile. Zero digestion issues.
                    </p>
                  </div>

                  <div className="review-card p-5 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Zeeshan Khan</span>
                      <span className="text-zinc-500 font-mono">Karachi · Verified</span>
                    </div>
                    <div className="flex text-[#ED101B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#ED101B]" />
                      ))}
                    </div>
                    <h5 className="text-xs font-semibold text-white">Genuine batch with verified code</h5>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Dispatched to Clifton Karachi in 48 hours. Scratched the security code and it validated immediately. Excellent packaging.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === 'faqs' && (
              <div className="max-w-2xl space-y-4">
                <h3 className="text-lg font-heading font-bold uppercase text-white mb-4">
                  Frequently Asked Questions
                </h3>
                {product.faqs.map((faq, i) => (
                  <div key={i} className="p-4 bg-[#161616] border border-white/10 rounded-[14px] space-y-2">
                    <h5 className="text-xs font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#ED101B] shrink-0" />
                      <span>{faq.question}</span>
                    </h5>
                    <p className="text-xs text-zinc-400 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* =========================================================================
          4. FREQUENTLY BOUGHT TOGETHER BUNDLE (25px rounded)
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="bg-[#151515] border border-white/10 rounded-[25px] p-6 sm:p-8 vexon-card-highlight">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ED101B] uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4" /> PERFORMANCE STACK
          </div>
          <h3 className="text-xl font-heading font-bold uppercase text-white mb-6">
            Frequently Bought Together
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Product 1 */}
              <div className="flex items-center gap-3 p-3 bg-[#1B1B1B] border border-white/10 rounded-[14px] max-w-xs transition-all hover:border-[#ED101B]/50">
                <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover shrink-0 rounded-[10px]" />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-white truncate">{product.name}</h5>
                  <p className="text-xs font-mono text-[#ED101B] mt-0.5">Rs. {currentPrice.toLocaleString()}</p>
                </div>
              </div>

              <span className="text-xl font-bold text-[#ED101B]">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-3 p-3 bg-[#1B1B1B] border border-white/10 rounded-[14px] max-w-xs transition-all hover:border-[#ED101B]/50">
                <img src={complementaryProduct.images[0]} alt={complementaryProduct.name} className="w-14 h-14 object-cover shrink-0 rounded-[10px]" />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-white truncate">{complementaryProduct.name}</h5>
                  <p className="text-xs font-mono text-[#ED101B] mt-0.5">Rs. {complementaryProduct.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Bundle Buy CTA */}
            <div className="text-right w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="text-xs text-zinc-400">Combined Stack Price:</div>
              <div className="text-2xl font-mono font-bold text-white">
                Rs. {(currentPrice + complementaryProduct.price).toLocaleString()}
              </div>
              <button
                onClick={() => {
                  addToCart(product, selectedVariant, 1);
                  addToCart(complementaryProduct, complementaryProduct.variants[0], 1);
                  addToast('Stack Added!', `${product.name} + ${complementaryProduct.name} added to cart`, 'success');
                }}
                className="mt-2 vexon-btn-primary text-white text-xs font-heading font-bold uppercase tracking-wider px-6 py-2.5 rounded-[12px]"
              >
                Add Both to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. RELATED PRODUCTS
         ========================================================================= */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#1E1E1E]">
            <h3 className="text-xl font-heading font-bold uppercase text-white">
              Related {product.category}
            </h3>
            <button
              onClick={() => navigateTo('shop', { category: product.category })}
              className="text-xs font-heading font-semibold uppercase text-[#ED101B] hover:underline"
            >
              View Category →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          6. MOBILE STICKY BOTTOM BUY BAR
         ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0F0F0F] border-t border-white/10 p-3 z-30 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-zinc-400 block line-clamp-1">{selectedVariant.weight}</span>
          <span className="text-base font-mono font-bold text-white">Rs. {currentPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant.inStock}
          className="flex-1 vexon-btn-primary text-white py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-[12px]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
};
