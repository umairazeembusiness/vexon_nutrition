import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { 
  PRODUCTS, 
  CATEGORIES, 
  VERIFIED_REVIEWS, 
  HERO_IMAGE, 
  PROMO_WORKOUT_IMAGE, 
  WHEY_TUB_IMAGE,
  PREWORKOUT_IMAGE,
  VEXON_LOGO 
} from '../data/products';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Star,
  MapPin,
  ChevronRight,
  Zap,
  Activity,
  Dumbbell
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useStore();

  // Special Offers Countdown Timer (configurable 48h flash drop)
  const [timeLeft, setTimeLeft] = useState({
    hours: 28,
    minutes: 44,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const trendingProducts = PRODUCTS.filter(p => p.isTrending).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival);
  const specialOffers = PRODUCTS.filter(p => p.isSpecialOffer || (p.discountPercent && p.discountPercent >= 15));

  return (
    <div className="bg-[#090909] text-white">
      
      {/* =========================================================================
          SECTION A — CINEMATIC HERO BANNER
         ========================================================================= */}
      <section className="relative min-h-[640px] lg:min-h-[760px] flex items-center overflow-hidden border-b border-[#1E1E1E]">
        {/* Background photo with cinematic lighting and scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="VEXON Fitness Athlete Heavy Lift"
            className="w-full h-full object-cover object-center lg:object-[center_25%]"
          />
          {/* Deep black + red gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/60" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ED101B]/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Athletic Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ED101B] border-b border-[#ED101B]/40 pb-1">
              <Flame className="w-4 h-4" />
              <span>ELITE SPORTS NUTRITION · PAKISTAN</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold uppercase tracking-tight text-white leading-[1.05]">
              FUEL YOUR <span className="text-[#ED101B]">POTENTIAL.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
              Engineered for strength. Driven by performance. Discover ultra-pure cold-filtered whey isolates, German Creapure®, and clinically-dosed pre-workouts.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="vexon-btn-primary font-heading font-bold text-sm uppercase tracking-wider px-8 py-4 flex items-center gap-2.5 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigateTo('shop', { category: 'Whey Protein' })}
                className="vexon-btn-secondary font-heading font-semibold text-sm uppercase tracking-wider px-8 py-4"
              >
                EXPLORE ISOLATES
              </button>
            </div>

            {/* Trust highlights below CTA */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
              <div>
                <span className="text-base sm:text-lg font-bold text-white block">100%</span>
                <span>Authentic Verified</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-white block">2-4 Days</span>
                <span>Nationwide COD</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-white block">Liberty Mkt</span>
                <span>Lahore Flagship</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B — TRUST & BENEFITS BAR
         ========================================================================= */}
      <section className="bg-[#121212] border-b border-[#1E1E1E] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-[16px] bg-[#161616]/70 border border-white/5 hover:border-[#ED101B]/35 hover:shadow-[0_10px_16px_-4px_rgba(237,16,27,0.25)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">Quality-Focused Products</h4>
              <p className="text-[11px] text-zinc-400">Holographic scratch verify on every tub</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-[16px] bg-[#161616]/70 border border-white/5 hover:border-[#ED101B]/35 hover:shadow-[0_10px_16px_-4px_rgba(237,16,27,0.25)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
              <Truck className="w-5 h-5 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">Convenient Delivery</h4>
              <p className="text-[11px] text-zinc-400">Cash on Delivery across Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-[16px] bg-[#161616]/70 border border-white/5 hover:border-[#ED101B]/35 hover:shadow-[0_10px_16px_-4px_rgba(237,16,27,0.25)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-5 h-5 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">Secure Shopping</h4>
              <p className="text-[11px] text-zinc-400">COD & Bank Transfer (Meezan/HBL)</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-[16px] bg-[#161616]/70 border border-white/5 hover:border-[#ED101B]/35 hover:shadow-[0_10px_16px_-4px_rgba(237,16,27,0.25)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
              <Activity className="w-5 h-5 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">Customer Support</h4>
              <p className="text-[11px] text-zinc-400">Lahore team & WhatsApp stack guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C — SHOP BY CATEGORY
         ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1E1E1E] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">TRAIN WITH PURPOSE</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-wide text-white mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-4 h-4 text-[#ED101B]" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', { category: cat.name })}
              className="group relative category-card vexon-card overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div className="p-2 pb-0">
                <div className="relative aspect-4/3 overflow-hidden rounded-[16px] bg-black/60">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                  <span className="absolute top-2.5 right-2.5 bg-black/80 font-mono text-[10px] text-zinc-200 px-2 py-0.5 rounded-[8px] border border-white/10">
                    {cat.itemCount} Items
                  </span>
                </div>
              </div>

              <div className="p-4 pt-3">
                <h3 className="text-base font-heading font-bold uppercase text-white group-hover:text-[#ED101B] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-heading font-semibold text-[#ED101B] uppercase tracking-wider">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION D — BEST SELLERS
         ========================================================================= */}
      <section className="bg-[#0E0E0E] py-16 sm:py-20 border-y border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#202020] gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">PROVEN PERFORMANCE</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-wide text-white mt-1">
                Best Sellers in Pakistan
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Top requested formulas chosen by elite bodybuilders, strength coaches, and fitness athletes across Lahore, Karachi, and Islamabad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} badge="Best Seller" />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E — PROMOTIONAL ATHLETIC BANNER (25px rounded)
         ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative promo-card overflow-hidden p-8 sm:p-16 lg:p-20 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 z-0">
            <img
              src={PROMO_WORKOUT_IMAGE}
              alt="VEXON High Intensity Training"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#090909]/85 backdrop-brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-6">
            <span className="bg-[#ED101B] text-white text-xs font-mono font-bold px-3 py-1 uppercase tracking-wider inline-block rounded-[8px] shadow-sm shadow-red-950/40">
              VEXON CAMPAIGN
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold uppercase text-white leading-tight">
              YOUR FITNESS JOURNEY. <br />
              <span className="text-[#ED101B]">YOUR NEXT LEVEL.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              No shortcuts. No proprietary deceptive blends. Every single gram on our labels is clinically verified. Build lean muscle, elevate training endurance, and recover faster with VEXON supplements.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('shop', { category: 'Pre-Workout' })}
                className="vexon-btn-primary font-heading font-bold text-xs uppercase tracking-wider px-7 py-3.5"
              >
                Shop High-Stim Pre-Workouts
              </button>
              <button
                onClick={() => navigateTo('about')}
                className="vexon-btn-secondary font-heading font-semibold text-xs uppercase tracking-wider px-7 py-3.5"
              >
                Our Quality Standards
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F — TRENDING SUPPLEMENTS
         ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#1E1E1E]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">POPULAR DEMAND</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-wide text-white mt-1">
              Trending Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-heading font-semibold uppercase text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 text-[#ED101B]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} badge="Trending" />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION G & H — SPECIAL OFFERS WITH LIVE COUNTDOWN TIMER (25px rounded)
         ========================================================================= */}
      <section className="bg-[#101010] py-16 sm:py-20 border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="vexon-card-highlight rounded-[25px] p-6 sm:p-10 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#ED101B] text-xs font-mono font-bold uppercase tracking-widest mb-1">
                <Flame className="w-4 h-4" /> LIMITED TIME FLASH SALE
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase text-white">
                Special Offers & Bundles
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-md">
                Get up to 17% off select flagship formulas. Genuine stock dispatched with holographic seals.
              </p>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-3">
              <div className="bg-black border border-white/10 rounded-[12px] px-4 py-3 text-center min-w-[70px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#ED101B] block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Hours</span>
              </div>
              <span className="text-xl font-bold text-zinc-600">:</span>
              <div className="bg-black border border-white/10 rounded-[12px] px-4 py-3 text-center min-w-[70px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#ED101B] block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Mins</span>
              </div>
              <span className="text-xl font-bold text-zinc-600">:</span>
              <div className="bg-black border border-white/10 rounded-[12px] px-4 py-3 text-center min-w-[70px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#ED101B] block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Secs</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOffers.map(product => (
              <ProductCard key={product.id} product={product} badge="Flash Deal" />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION I — WHY CHOOSE VEXON (BRAND EDITORIAL)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
              THE VEXON COMMITMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold uppercase text-white leading-tight">
              Why Pakistani Athletes Choose <br />
              <span className="text-[#ED101B]">VEXON Supplements</span>
            </h2>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              In a market plagued by unauthorized parallel imports and counterfeit powder blends, VEXON was established to provide complete peace of mind. Every product in our catalog meets international production standards, strict cold-filtration parameters, and comes with tamper-evident security.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full Label Transparency</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    No hidden proprietary blends. We declare the exact active milligrams of every ingredient.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">German Creapure® & USA Raw Isolates</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    We source genuine Alzchem German creatine and cross-flow micro-filtered whey protein.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Flagship Store in Liberty Market, Lahore</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Visit us in person to inspect the inventory, consult certified nutritionists, and pick up in store.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="vexon-btn-primary text-xs font-heading font-bold uppercase tracking-wider px-6 py-3.5"
              >
                Learn Our Story
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="vexon-btn-secondary text-xs font-heading font-semibold uppercase tracking-wider px-6 py-3.5"
              >
                Visit Lahore Store
              </button>
            </div>
          </div>

          {/* Visual Showcase Box (25px rounded) */}
          <div className="vexon-card-highlight rounded-[25px] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ED101B]/10 rounded-full blur-2xl pointer-events-none" />
            
            <img 
              src={VEXON_LOGO} 
              alt="VEXON Supplements Logo" 
              className="h-16 w-auto object-contain mb-6"
            />

            <div className="border-t border-white/10 pt-6 space-y-4 text-xs font-mono text-zinc-300">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-500">HEADQUARTERS</span>
                <span className="text-white font-semibold">Liberty Market, Lahore, PK</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-500">AUTHENTICITY VERIFICATION</span>
                <span className="text-emerald-400 font-semibold">100% Guaranteed</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-500">COURIER TRANSIT</span>
                <span className="text-white font-semibold">2-4 Business Days Nationwide</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-zinc-500">PAYMENT OPTIONS</span>
                <span className="text-white font-semibold">Cash on Delivery & Bank Transfer</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-black/60 border border-white/10 rounded-[14px]">
              <p className="text-xs text-zinc-400 italic">
                &ldquo;VEXON was born from our personal frustration with bootleg supplements in Pakistan. We ensure every athlete gets the exact unadulterated sports nutrition they paid for.&rdquo;
              </p>
              <span className="text-[11px] font-heading uppercase text-[#ED101B] font-bold block mt-2">
                — VEXON Research & Quality Council
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION J — VERIFIED CUSTOMER REVIEWS (18px rounded with red hover glow)
         ========================================================================= */}
      <section className="bg-[#0C0C0C] py-20 border-y border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
              VERIFIED EXPERIENCES
            </span>
            <h2 className="text-3xl font-heading font-bold uppercase text-white mt-1">
              Customer Reviews
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Read real feedback from athletes across Pakistan who fuel their training with VEXON.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_REVIEWS.map(review => (
              <div
                key={review.id}
                className="review-card p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                    <span className="font-mono">{review.city}</span>
                    <span>{review.date}</span>
                  </div>

                  <div className="flex text-[#ED101B] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#ED101B]" />
                    ))}
                  </div>

                  <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                    {review.title}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-[10px] bg-[#202020] border border-white/10 flex items-center justify-center text-xs font-heading font-bold text-white uppercase shadow-sm">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{review.author}</p>
                      {review.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                  {review.productName && (
                    <p className="text-[10px] text-zinc-500 font-mono mt-2 truncate">
                      {review.productName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION K — INSTAGRAM / COMMUNITY SHOWCASE (16px rounded images)
         ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#1E1E1E] gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">#TEAMVEXON</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase text-white mt-1">
              Follow Us on Instagram
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-heading font-semibold uppercase text-zinc-400 hover:text-[#ED101B] transition-colors"
          >
            @vexon.pk
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[HERO_IMAGE, WHEY_TUB_IMAGE, PREWORKOUT_IMAGE, PROMO_WORKOUT_IMAGE].map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-square bg-[#151515] overflow-hidden rounded-[16px] border border-white/10 transition-all duration-350 hover:-translate-y-1.5 hover:border-[#ED101B]/35 hover:shadow-[0_12px_18px_-5px_rgba(237,16,27,0.32),0_22px_30px_-12px_rgba(237,16,27,0.20)] shadow-[0_4px_16px_rgba(0,0,0,0.22)]"
            >
              <img
                src={imgSrc}
                alt={`VEXON Community Feed ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider bg-[#ED101B] px-3.5 py-1.5 rounded-[8px] shadow-md shadow-red-950/50">
                  View Post
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
