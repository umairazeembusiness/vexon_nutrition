import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../data/products';
import { Order } from '../types';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Printer
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    shippingFee, 
    discountAmount, 
    cartGrandTotal, 
    placeOrder, 
    currentUser, 
    navigateTo 
  } = useStore();

  // Form State
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [province, setProvince] = useState(currentUser?.addresses[0]?.province || 'Punjab');
  const [city, setCity] = useState(currentUser?.addresses[0]?.city || 'Lahore');
  const [area, setArea] = useState(currentUser?.addresses[0]?.area || 'Gulberg / DHA');
  const [fullAddress, setFullAddress] = useState(currentUser?.addresses[0]?.address || '');
  const [postalCode, setPostalCode] = useState(currentUser?.addresses[0]?.postalCode || '54000');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery (COD)' | 'Direct Bank Transfer'>('Cash on Delivery (COD)');
  const [orderNotes, setOrderNotes] = useState('');

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (cart.length === 0 && !confirmedOrder) {
    return (
      <div className="bg-[#090909] text-white min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#121212] border border-[#262626] p-8 text-center space-y-4">
          <h2 className="text-xl font-heading font-bold uppercase text-white">Your Cart is Empty</h2>
          <p className="text-xs text-zinc-400">Add products before proceeding to checkout.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#ED101B] text-white text-xs font-heading font-bold uppercase px-6 py-3"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  // 1. ORDER CONFIRMATION SCREEN
  if (confirmedOrder) {
    return (
      <div className="bg-[#090909] text-white min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-[#141414] border border-white/10 rounded-[25px] p-6 sm:p-10 space-y-8 animate-in fade-in duration-300 shadow-[0_14px_22px_-6px_rgba(237,16,27,0.32),0_26px_36px_-14px_rgba(237,16,27,0.20)]">
          
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-white/10">
            <div className="w-16 h-16 bg-[#ED101B]/15 border border-[#ED101B] rounded-[16px] flex items-center justify-center mx-auto text-[#ED101B] shadow-[0_6px_14px_-3px_rgba(237,16,27,0.35)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
              ORDER CONFIRMED
            </span>
            <h1 className="text-2xl sm:text-4xl font-heading font-bold uppercase text-white">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Your order <strong className="text-white font-mono">{confirmedOrder.id}</strong> has been logged into our Lahore warehouse queue. An SMS and email verification have been sent to <strong className="text-white font-mono">{confirmedOrder.phone}</strong>.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#181818] border border-white/10 rounded-[14px] text-xs font-mono">
            <div>
              <span className="text-zinc-500 block">ORDER ID</span>
              <strong className="text-white text-sm">{confirmedOrder.id}</strong>
            </div>
            <div>
              <span className="text-zinc-500 block">TRACKING #</span>
              <strong className="text-[#ED101B] text-sm">{confirmedOrder.trackingNumber}</strong>
            </div>
            <div>
              <span className="text-zinc-500 block">PAYMENT</span>
              <strong className="text-white">{confirmedOrder.paymentMethod === 'Cash on Delivery (COD)' ? 'COD' : 'Bank Transfer'}</strong>
            </div>
            <div>
              <span className="text-zinc-500 block">TOTAL PAYABLE</span>
              <strong className="text-white text-sm">Rs. {confirmedOrder.total.toLocaleString()}</strong>
            </div>
          </div>

          {/* Direct Bank Transfer Instructions if chosen */}
          {confirmedOrder.paymentMethod === 'Direct Bank Transfer' && (
            <div className="p-5 bg-[#171410] border border-amber-900/50 rounded-[14px] space-y-2 text-xs">
              <h4 className="font-heading font-bold uppercase text-amber-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Bank Transfer Account Details:
              </h4>
              <p className="text-zinc-300">
                Please transfer <strong>Rs. {confirmedOrder.total.toLocaleString()}</strong> to the following Meezan Bank account and WhatsApp your screenshot with Order ID <strong>{confirmedOrder.id}</strong> to <strong>+92 300 8489211</strong>:
              </p>
              <div className="p-3 bg-black/60 font-mono text-zinc-300 space-y-1 mt-2 rounded-[10px]">
                <div>Bank: <strong className="text-white">Meezan Bank Limited</strong></div>
                <div>Account Title: <strong className="text-white">VEXON SUPPLEMENTS (PVT) LTD</strong></div>
                <div>Account Number: <strong className="text-white">0109-0104829104</strong></div>
                <div>IBAN: <strong className="text-white">PK64MEZN0001090104829104</strong></div>
                <div>Branch: <strong className="text-white">Liberty Market Branch, Lahore</strong></div>
              </div>
            </div>
          )}

          {/* Delivery & Items Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <h4 className="text-xs font-heading font-bold uppercase text-white mb-2">
                Delivery Address
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                {confirmedOrder.customerName}<br />
                {confirmedOrder.address.fullAddress}<br />
                {confirmedOrder.address.area}, {confirmedOrder.address.city}, {confirmedOrder.address.province} {confirmedOrder.address.postalCode}<br />
                Phone: {confirmedOrder.phone}
              </p>
              <div className="mt-3 p-3 bg-[#181818] border border-white/10 rounded-[12px] text-xs text-zinc-400 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ED101B]" />
                <span>Courier: {confirmedOrder.courier} (Estimated: 2-4 days)</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-heading font-bold uppercase text-white mb-2">
                Items in This Order
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-[#181818] border border-white/10 rounded-[12px] text-xs">
                    <img src={it.image} alt={it.name} className="w-10 h-10 object-cover bg-black rounded-[8px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{it.name}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{it.variantInfo} × {it.quantity}</p>
                    </div>
                    <span className="font-mono text-zinc-300">Rs. {it.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center">
            <button
              onClick={() => navigateTo('order-tracking')}
              className="vexon-btn-primary text-white text-xs font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-[12px] flex items-center gap-2"
            >
              <span>Track Live Delivery Progress</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="vexon-btn-secondary text-zinc-300 hover:text-white text-xs font-heading font-semibold uppercase tracking-wider px-6 py-3.5 rounded-[10px]"
            >
              Return to Storefront
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 2. CHECKOUT FORM
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required for courier delivery';
    } else if (phone.length < 10) {
      errs.phone = 'Please enter a valid Pakistani phone number (e.g. 0300-1234567)';
    }
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required for tracking updates';
    if (!fullAddress.trim()) errs.fullAddress = 'Complete street / house address is required';
    if (!area.trim()) errs.area = 'Area / Sector is required';
    if (!city.trim()) errs.city = 'City is required';
    return errs;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      const orderItems = cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        variantInfo: `${item.selectedWeight}${item.selectedFlavour ? ` / ${item.selectedFlavour}` : ''}`,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.unitPrice * item.quantity,
        image: item.product.images[0]
      }));

      const newOrder = placeOrder({
        customerName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: {
          province,
          city,
          area: area.trim(),
          fullAddress: fullAddress.trim(),
          postalCode: postalCode.trim() || '54000'
        },
        items: orderItems,
        subtotal: cartSubtotal,
        shippingFee,
        discount: discountAmount,
        total: cartGrandTotal,
        paymentMethod
      });

      setIsSubmitting(false);
      setConfirmedOrder(newOrder);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('cart')} className="hover:text-white">Cart</button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">Secure Checkout</span>
      </div>

      <div className="pb-4 border-b border-[#1E1E1E] mb-8">
        <h1 className="text-3xl font-heading font-bold uppercase text-white">
          Complete Your Order
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Fast shipping across Pakistan. Cash on Delivery and Direct Bank Transfer supported.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Customer & Address Information (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact (20px container, 12px inputs) */}
            <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#ED101B] text-white rounded-[6px] flex items-center justify-center text-xs font-mono">1</span>
                <span>Customer Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hamza Tariq"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Phone Number (for Courier & SMS) *
                  </label>
                  <input
                    type="text"
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 font-mono focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#ED101B] text-white rounded-[6px] flex items-center justify-center text-xs font-mono">2</span>
                <span>Delivery Address in Pakistan</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Province *
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  >
                    {PAKISTAN_PROVINCES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Area / Sector / Phase *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Phase 5, Gulberg III, Bahria Town, F-7"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                  {errors.area && <p className="text-[11px] text-red-400 mt-1">{errors.area}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Complete Street Address (House/Shop #, Street #, Landmark) *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House # 12, Street 4, Sector B, Near Central Mosque"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                  {errors.fullAddress && <p className="text-[11px] text-red-400 mt-1">{errors.fullAddress}</p>}
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="54000"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 font-mono focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                    Delivery Instructions / Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="Call before arrival, gate code"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#ED101B] text-white rounded-[6px] flex items-center justify-center text-xs font-mono">3</span>
                <span>Payment Method</span>
              </h3>

              <div className="space-y-3">
                {/* Option 1: Cash on Delivery */}
                <label 
                  className={`p-4 border rounded-[14px] flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'border-[#ED101B]/50 bg-[#1A1414] shadow-[0_10px_16px_-4px_rgba(237,16,27,0.25)]'
                      : 'border-white/10 bg-[#161616] hover:border-zinc-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery (COD)'}
                    onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                    className="accent-[#ED101B] mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#ED101B]" />
                      <span className="text-sm font-heading font-bold uppercase text-white">
                        Cash on Delivery (COD) — Recommended
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Pay cash directly to the courier rider upon delivery at your doorstep. Inspect the tamper-evident packaging before payment.
                    </p>
                  </div>
                </label>

                {/* Option 2: Direct Bank Transfer */}
                <label 
                  className={`p-4 border rounded-[14px] flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'Direct Bank Transfer'
                      ? 'border-[#ED101B]/50 bg-[#1A1414] shadow-[0_10px_16px_-4px_rgba(237,16,27,0.25)]'
                      : 'border-white/10 bg-[#161616] hover:border-zinc-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Direct Bank Transfer'}
                    onChange={() => setPaymentMethod('Direct Bank Transfer')}
                    className="accent-[#ED101B] mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#ED101B]" />
                      <span className="text-sm font-heading font-bold uppercase text-white">
                        Direct Bank Transfer (Meezan Bank / HBL)
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Transfer directly to our corporate bank account via mobile banking app (Meezan / HBL / Raast) and send proof via WhatsApp.
                    </p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right: Order Summary Sidebar (5 Cols - 20px card) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 space-y-5 sticky top-28 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10">
                Items in Order ({cart.length})
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-white/5">
                {cart.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-12 h-12 object-cover bg-black border border-white/10 rounded-[10px] shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.product.name}</p>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        {item.selectedWeight} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-white shrink-0">
                      Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation Breakdown */}
              <div className="space-y-2 text-xs text-zinc-400 pt-3 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-mono">
                    <span>Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Courier Shipping (Pakistan)</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-medium">FREE</span>
                    ) : (
                      `Rs. ${shippingFee.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-white">
                  <span className="text-sm font-heading font-bold uppercase tracking-wider">Total Payable</span>
                  <span className="text-2xl font-mono font-bold text-[#ED101B]">
                    Rs. {cartGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-[12px] transition-all shadow-xl shadow-red-950/40 ${
                  isSubmitting ? 'bg-zinc-700 text-zinc-400 cursor-wait' : 'vexon-btn-primary text-white'
                }`}
              >
                {isSubmitting ? (
                  <span>Processing Your Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-zinc-500 font-mono space-y-1.5 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ED101B]" />
                  <span>100% Guaranteed Genuine Supplementation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ED101B]" />
                  <span>Dispatched from Liberty Market, Lahore</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
