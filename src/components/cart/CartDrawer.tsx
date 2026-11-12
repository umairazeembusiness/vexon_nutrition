import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    shippingFee, 
    discountAmount, 
    cartGrandTotal, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    navigateTo 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const freeShippingThreshold = 8000;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111111] border-l border-white/10 rounded-l-[20px] text-white flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250 overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#ED101B]" />
              <h2 className="text-base font-heading font-bold uppercase tracking-wider text-white">
                Your Shopping Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-zinc-400 hover:text-white p-1.5 rounded-[10px] hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping meter */}
          <div className="px-5 py-3.5 bg-[#161616] border-b border-white/10 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-zinc-300 font-mono">
                  Add <strong className="text-[#ED101B]">Rs. {remainingForFreeShipping.toLocaleString()}</strong> more for <strong>FREE NATIONWIDE DELIVERY</strong>
                </p>
                <div className="w-full h-2 bg-[#282828] mt-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#ED101B] rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-mono">
                <Check className="w-4 h-4" />
                <span>You unlocked FREE nationwide delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/10">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-[#161616] border border-white/10 rounded-[12px] flex items-center justify-center mx-auto text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-heading font-bold uppercase text-white">Your Cart is Empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Explore our premium sports isolates, high-stim pre-workouts, and workout essentials.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="inline-flex items-center gap-2 vexon-btn-primary text-white text-xs font-heading font-bold uppercase tracking-wider px-5 py-2.5 rounded-[12px]"
                >
                  <span>Explore Supplements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover bg-black border border-white/10 rounded-[12px] shrink-0 cursor-pointer hover:border-[#ED101B]/50 transition-colors"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product-detail', { productId: item.product.id });
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('product-detail', { productId: item.product.id });
                      }}
                      className="text-xs font-semibold text-white hover:text-[#ED101B] cursor-pointer line-clamp-1 transition-colors"
                    >
                      {item.product.name}
                    </h4>

                    <div className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                      <span>{item.selectedWeight}</span>
                      {item.selectedFlavour && item.selectedFlavour !== 'Original' && (
                        <span> · {item.selectedFlavour}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/15 bg-[#161616] rounded-[10px] overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-mono font-bold text-white min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white">
                          Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] font-mono text-zinc-500">
                            Rs. {item.unitPrice.toLocaleString()} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-red-400 p-1 self-start transition-colors rounded-[8px]"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#141414] space-y-4">
              
              {/* Promo Code Input (12px rounded input & button) */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#1C1C1C] border border-white/10 rounded-[12px] text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-zinc-500 hover:text-white text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. VEXON10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-[12px] text-white text-xs px-3.5 py-2.5 uppercase placeholder:normal-case focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-[#242424] hover:bg-[#303030] text-zinc-200 text-xs font-heading font-medium px-4 py-2.5 uppercase rounded-[12px] border border-white/10 hover:border-white/20 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p className={`text-[11px] mt-1.5 ${couponMessage.error ? 'text-red-400' : 'text-emerald-400'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-mono">
                    <span>Coupon Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Courier Shipping (Pakistan)</span>
                  <span className="font-mono text-zinc-200">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-medium">FREE</span>
                    ) : (
                      `Rs. ${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm text-white">
                  <span className="font-heading font-bold uppercase tracking-wider">Estimated Total</span>
                  <span className="text-lg font-mono font-bold text-[#ED101B]">
                    Rs. {cartGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full vexon-btn-primary text-white py-3.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-[12px]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ED101B]" />
                    Cash on Delivery Available
                  </span>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('cart');
                    }}
                    className="hover:text-zinc-300 underline"
                  >
                    View Cart Page
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
