import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    navigateTo, 
    openQuickView 
  } = useStore();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#090909] text-white min-h-[70vh] py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
          Home
        </button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">My Wishlist</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E] mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase tracking-tight text-white flex items-center gap-3">
            <Heart className="w-7 h-7 text-[#ED101B] fill-[#ED101B]" />
            Saved Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Keep track of your favorite supplements, restock favorites, and move them to cart with one click.
          </p>
        </div>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-[#141414] border border-white/10 rounded-[20px] p-12 text-center max-w-md mx-auto space-y-4 my-10 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
          <div className="w-16 h-16 bg-[#181818] border border-white/10 rounded-[12px] flex items-center justify-center mx-auto text-[#ED101B]">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-heading font-bold uppercase text-white">Your Wishlist is Empty</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Click the heart icon on any supplement or gear to save it to your personal wishlist.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="vexon-btn-primary text-white text-xs font-heading font-bold uppercase px-6 py-3 rounded-[12px] inline-flex items-center gap-2"
          >
            <span>Browse Supplements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => {
            const defaultVariant = product.variants[0];
            return (
              <div 
                key={product.id}
                className="vexon-card rounded-[20px] flex flex-col justify-between overflow-hidden"
              >
                <div className="p-3 pb-0">
                  <div className="relative aspect-4/3 bg-[#0D0D0D] rounded-[16px] overflow-hidden border border-white/5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => navigateTo('product-detail', { productId: product.id })}
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-black/80 hover:bg-black text-red-400 hover:text-white flex items-center justify-center border border-white/10 rounded-[10px] transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{product.category}</span>
                    <h4 
                      onClick={() => navigateTo('product-detail', { productId: product.id })}
                      className="text-sm font-semibold text-white hover:text-[#ED101B] cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {product.name}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex text-[#ED101B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#ED101B]' : 'text-zinc-600'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">({product.reviewCount})</span>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-base font-mono font-bold text-white">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs font-mono text-zinc-500 line-through">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        if (product.variants.length > 1) {
                          openQuickView(product);
                        } else {
                          addToCart(product, defaultVariant, 1);
                        }
                      }}
                      className="w-full vexon-btn-primary text-white text-xs font-heading font-bold uppercase py-2.5 rounded-[10px] flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{product.variants.length > 1 ? 'Choose Variant & Add' : 'Move to Cart'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
