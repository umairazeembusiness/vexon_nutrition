import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  VEXON_LOGO, 
  CATEGORIES 
} from '../../data/products';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    addToast('Subscribed!', 'Welcome to VEXON Elite VIP discounts and new drop alerts.', 'success');
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1C1C1C] text-zinc-300">
      {/* 1. Value Proposition Banner */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 bg-[#141414] border border-white/10 rounded-[16px] shadow-sm transition-all duration-300 hover:border-[#ED101B]/35 hover:shadow-[0_12px_18px_-5px_rgba(237,16,27,0.32),0_22px_30px_-12px_rgba(237,16,27,0.20)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_4px_10px_-2px_rgba(237,16,27,0.35)]">
              <ShieldCheck className="w-6 h-6 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold uppercase tracking-wide text-white">100% Authentic Quality</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Directly sourced, holographic scratch codes on every tub.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#141414] border border-white/10 rounded-[16px] shadow-sm transition-all duration-300 hover:border-[#ED101B]/35 hover:shadow-[0_12px_18px_-5px_rgba(237,16,27,0.32),0_22px_30px_-12px_rgba(237,16,27,0.20)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_4px_10px_-2px_rgba(237,16,27,0.35)]">
              <Truck className="w-6 h-6 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold uppercase tracking-wide text-white">Cash on Delivery</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Nationwide courier delivery across Pakistan in 2-4 days.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#141414] border border-white/10 rounded-[16px] shadow-sm transition-all duration-300 hover:border-[#ED101B]/35 hover:shadow-[0_12px_18px_-5px_rgba(237,16,27,0.32),0_22px_30px_-12px_rgba(237,16,27,0.20)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_4px_10px_-2px_rgba(237,16,27,0.35)]">
              <MapPin className="w-6 h-6 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold uppercase tracking-wide text-white">Liberty Market Flagship</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Visit our physical supplement store in Gulberg III, Lahore.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#141414] border border-white/10 rounded-[16px] shadow-sm transition-all duration-300 hover:border-[#ED101B]/35 hover:shadow-[0_12px_18px_-5px_rgba(237,16,27,0.32),0_22px_30px_-12px_rgba(237,16,27,0.20)] hover:-translate-y-1">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_4px_10px_-2px_rgba(237,16,27,0.35)]">
              <Phone className="w-6 h-6 text-[#ED101B]" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold uppercase tracking-wide text-white">Sports Nutrition Guidance</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Stack advice from certified fitness nutritionists.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Lockup & Store Info */}
          <div className="lg:col-span-2 space-y-5">
            <div 
              onClick={() => navigateTo('home')} 
              className="cursor-pointer inline-block"
            >
              <img 
                src={VEXON_LOGO} 
                alt="VEXON Supplements Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
              VEXON is Pakistan&apos;s premier destination for lab-tested sports nutrition, performance isolates, German Creapure®, and elite athletic supplements. Built for strength, driven by performance.
            </p>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                <span>Shop #14, Ground Floor, Liberty Market, Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ED101B] shrink-0" />
                <span className="font-mono text-zinc-300">+92 42 3575 8899 / +92 300 8489211</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ED101B] shrink-0" />
                <span className="text-zinc-300">support@vexon.pk</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#ED101B] shrink-0" />
                <span>Store Hours: Mon – Sat (11:00 AM – 11:00 PM PKT)</span>
              </div>
            </div>

            {/* Social links (10px rounded) */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 bg-[#161616] border border-white/10 rounded-[10px] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#ED101B] hover:shadow-[0_4px_10px_-2px_rgba(237,16,27,0.4)] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 bg-[#161616] border border-white/10 rounded-[10px] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#ED101B] hover:shadow-[0_4px_10px_-2px_rgba(237,16,27,0.4)] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 bg-[#161616] border border-white/10 rounded-[10px] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#ED101B] hover:shadow-[0_4px_10px_-2px_rgba(237,16,27,0.4)] transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Core Categories */}
          <div>
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-white/10">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('shop', { category: cat.name })}
                    className="hover:text-white hover:translate-x-1 transition-transform inline-block"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-[#ED101B] hover:underline font-semibold"
                >
                  View All Products →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policies */}
          <div>
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-white/10">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-white hover:translate-x-1 transition-transform inline-block">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-policy')} className="hover:text-white hover:translate-x-1 transition-transform inline-block">
                  Cash on Delivery & Shipping
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-policy')} className="hover:text-white hover:translate-x-1 transition-transform inline-block">
                  7-Day Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faqs')} className="hover:text-white hover:translate-x-1 transition-transform inline-block">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white hover:translate-x-1 transition-transform inline-block">
                  Flagship Store Directions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white hover:translate-x-1 transition-transform inline-block">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white hover:translate-x-1 transition-transform inline-block">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: VIP Newsletter */}
          <div>
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-white/10">
              Join VEXON VIP
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Subscribe for exclusive member drops, workout nutrition guides, and a 10% coupon code.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-[#161616] border border-white/10 rounded-[12px] text-xs text-zinc-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ED101B] shrink-0" />
                <span>You&apos;re subscribed! Check your inbox for code <strong>VEXON10</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#151515] border border-white/10 rounded-[12px] text-white text-xs px-3.5 py-2.5 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] placeholder:text-zinc-600 transition-all"
                />
                <button
                  type="submit"
                  className="w-full vexon-btn-primary text-white text-xs font-heading font-bold py-2.5 uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-[12px]"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider block mb-2 font-mono">Accepted Payment Options</span>
              <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400 font-mono">
                <span className="px-2.5 py-1 bg-[#141414] border border-white/10 rounded-[8px]">Cash on Delivery</span>
                <span className="px-2.5 py-1 bg-[#141414] border border-white/10 rounded-[8px]">Direct Bank Transfer</span>
                <span className="px-2.5 py-1 bg-[#141414] border border-white/10 rounded-[8px]">Meezan / HBL</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-[#161616] bg-[#070707] py-6 px-4 sm:px-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} VEXON SUPPLEMENTS. ALL RIGHTS RESERVED. LIBERTY MARKET, LAHORE, PAKISTAN.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="font-heading tracking-widest text-[#ED101B]">FUEL YOUR POTENTIAL.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
