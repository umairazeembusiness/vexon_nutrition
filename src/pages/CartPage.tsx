import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Heart,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    shippingFee, 
    discountAmount, 
    cartGrandTotal, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    navigateTo,
    toggleWishlist
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({ text: res.message, error: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleSaveForLater = (productId: string, cartItemId: string) => {
    toggleWishlist(productId);
    removeFromCart(cartItemId);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#090909] text-white min-h-[65vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#121212] border border-[#242424] p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-[#181818] border border-[#2E2E2E] flex items-center justify-center mx-auto text-[#ED101B]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-heading font-bold uppercase tracking-wider text-white">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Looks like you haven&apos;t added any sports nutrition supplements or accessories to your cart yet.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#ED101B] hover:bg-[#D00E17] text-white text-xs font-heading font-bold uppercase tracking-wider px-7 py-3.5 transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
          Shop
        </button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">Shopping Cart</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E] mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase tracking-tight text-white">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review your supplement order and calculate Pakistani courier delivery rates.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-mono text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Cart Items List (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#141414] border border-white/10 rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.22)] divide-y divide-white/10">
            
            {/* Table Header (Desktop) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-500 border-b border-white/10 bg-[#101010]">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {/* Items */}
            {cart.map(item => (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center transition-colors hover:bg-white/[0.02]">
                
                {/* Product Col */}
                <div className="col-span-6 flex items-center gap-4 w-full">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-black border border-white/10 rounded-[12px] shrink-0 cursor-pointer hover:border-[#ED101B]/50 transition-colors"
                    onClick={() => navigateTo('product-detail', { productId: item.product.id })}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.product.brand}</span>
                    <h3 
                      onClick={() => navigateTo('product-detail', { productId: item.product.id })}
                      className="text-sm font-semibold text-white hover:text-[#ED101B] cursor-pointer transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mt-1">
                      <span>{item.selectedWeight}</span>
                      {item.selectedFlavour && item.selectedFlavour !== 'Original' && (
                        <span> · {item.selectedFlavour}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-[11px]">
                      <button
                        onClick={() => handleSaveForLater(item.product.id, item.id)}
                        className="text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3 h-3" /> Save for later
                      </button>
                      <span className="text-zinc-700">|</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quantity Col */}
                <div className="col-span-2 flex justify-center w-full sm:w-auto">
                  <div className="flex items-center border border-white/15 bg-[#161616] rounded-[10px] overflow-hidden">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white font-mono"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-white min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white font-mono"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="col-span-2 text-right hidden sm:block">
                  <span className="text-xs font-mono text-zinc-300">
                    Rs. {item.unitPrice.toLocaleString()}
                  </span>
                </div>

                {/* Total */}
                <div className="col-span-2 text-right w-full sm:w-auto flex sm:block justify-between items-center pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1E1E1E]">
                  <span className="text-xs text-zinc-500 sm:hidden">Total:</span>
                  <span className="text-sm font-mono font-bold text-[#ED101B]">
                    Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>

              </div>
            ))}

          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>← Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right: Order Summary Card (4 Cols - 20px rounded card with bottom-only red hover shadow) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="vexon-card p-6 space-y-5">
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10">
              Order Summary
            </h3>

            {/* Coupon Code Section */}
            <div>
              <span className="text-xs font-mono text-zinc-400 block mb-2 uppercase">Promo Code:</span>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#171717] border border-white/10 rounded-[12px] text-xs">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Tag className="w-4 h-4" />
                    <span><strong>{appliedCoupon.code}</strong> ({appliedCoupon.discountPercent}% OFF)</span>
                  </div>
                  <button 
                    onClick={removeCoupon} 
                    className="text-zinc-500 hover:text-white text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter VEXON10 or POWER15"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white px-3.5 py-2.5 uppercase placeholder:normal-case focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-[#242424] hover:bg-[#303030] text-white text-xs font-heading font-semibold px-4 py-2.5 uppercase rounded-[12px] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponFeedback && (
                <p className={`text-[11px] mt-1.5 font-mono ${couponFeedback.error ? 'text-red-400' : 'text-emerald-400'}`}>
                  {couponFeedback.text}
                </p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-mono text-white">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-mono">
                  <span>Coupon Discount</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Courier Shipping (Pakistan)</span>
                <span className="font-mono text-white">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE (Order &gt; Rs. 8,000)</span>
                  ) : (
                    `Rs. ${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline text-white">
                <span className="text-sm font-heading font-bold uppercase tracking-wider">Estimated Total</span>
                <span className="text-xl font-mono font-bold text-[#ED101B]">
                  Rs. {cartGrandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full vexon-btn-primary text-white py-4 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-[12px]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Payment security info */}
            <div className="space-y-2 pt-2 text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ED101B]" />
                <span>Cash on Delivery (COD) across Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ED101B]" />
                <span>Dispatched via TCS / Leopard Courier (2-4 Days)</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
