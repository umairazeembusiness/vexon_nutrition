import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  HERO_IMAGE, 
  PROMO_WORKOUT_IMAGE, 
  WHEY_TUB_IMAGE, 
  VEXON_LOGO 
} from '../data/products';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Dumbbell, 
  Flame, 
  ArrowRight,
  Truck,
  Users
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">About VEXON</span>
      </div>

      {/* Hero Header (25px rounded container) */}
      <div className="relative border border-white/10 bg-[#141414] rounded-[25px] overflow-hidden p-8 sm:p-14 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
            BUILT FOR STRENGTH · DRIVEN BY PERFORMANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold uppercase text-white leading-tight">
            The VEXON Story
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Founded with one uncompromising goal: to provide Pakistani fitness athletes with 100% authentic, scientifically-calibrated sports nutrition that matches the highest international standards.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="vexon-btn-primary text-white text-xs font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-[12px] inline-flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block">
          <img src={HERO_IMAGE} alt="Athletic training" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] to-transparent" />
        </div>
      </div>

      {/* Core Philosophy & Mission (20px rounded cards with red hover glow) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="vexon-card rounded-[20px] p-6 space-y-3">
          <div className="w-12 h-12 bg-black border border-white/10 rounded-[10px] flex items-center justify-center text-[#ED101B] shadow-[0_0_12px_rgba(237,16,27,0.3)]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-heading font-bold uppercase text-white">Our Mission</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            To eliminate counterfeit supplements from Pakistan by importing raw bioactive ingredients directly from verified global producers in Germany, the USA, and the UK.
          </p>
        </div>

        <div className="vexon-card rounded-[20px] p-6 space-y-3">
          <div className="w-12 h-12 bg-black border border-white/10 rounded-[10px] flex items-center justify-center text-[#ED101B] shadow-[0_0_12px_rgba(237,16,27,0.3)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-heading font-bold uppercase text-white">Full Label Disclosure</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Zero proprietary blends. We declare the exact milligram content of every active compound, from clinical L-Citrulline doses to Creapure® micronized purity.
          </p>
        </div>

        <div className="vexon-card rounded-[20px] p-6 space-y-3">
          <div className="w-12 h-12 bg-black border border-white/10 rounded-[10px] flex items-center justify-center text-[#ED101B] shadow-[0_0_12px_rgba(237,16,27,0.3)]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-base font-heading font-bold uppercase text-white">Liberty Market Flagship</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Our physical presence in Liberty Market, Gulberg III, Lahore gives athletes a real, accountable place to inspect products and receive personalized nutrition stacks.
          </p>
        </div>
      </div>

      {/* Flagship Store Spotlight (25px rounded) */}
      <div className="bg-[#141414] border border-white/10 rounded-[25px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
            PHYSICAL RETAIL EXPERIENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold uppercase text-white">
            Visit Our Store in Liberty Market, Lahore
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Located in the bustling commercial heart of Lahore, our flagship storefront allows you to experience the VEXON standard in person. Meet certified sports nutritionists, run InBody body composition scans, and sample new product flavours before purchasing.
          </p>
          <div className="space-y-2 text-xs font-mono text-zinc-400 pt-2">
            <div>📍 <strong>Address:</strong> Shop #14, Ground Floor, Liberty Market, Gulberg III, Lahore</div>
            <div>⏰ <strong>Hours:</strong> Monday – Saturday: 11:00 AM – 11:00 PM PKT</div>
            <div>📞 <strong>Phone:</strong> +92 42 3575 8899 / WhatsApp: +92 300 8489211</div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('contact')}
              className="vexon-btn-primary text-white text-xs font-heading font-bold uppercase px-6 py-3 rounded-[12px]"
            >
              Get Directions & Store Details
            </button>
          </div>
        </div>

        <div className="relative aspect-16/9 bg-black border border-white/10 rounded-[16px] overflow-hidden shadow-lg">
          <img src={PROMO_WORKOUT_IMAGE} alt="VEXON Athletes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
            Certified Sports Nutritionists on site at Liberty Market, Lahore
          </div>
        </div>
      </div>

    </div>
  );
};
