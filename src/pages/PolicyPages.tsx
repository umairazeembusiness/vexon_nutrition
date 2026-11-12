import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  HelpCircle, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { navigateTo } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can I verify the authenticity of my VEXON supplement?',
      a: 'Every genuine VEXON tub is sealed with a holographic security label featuring an interactive scratch-off QR and alphanumeric verification code. You can verify it directly on our verification portal or bring it to our flagship store at Liberty Market, Lahore.'
    },
    {
      q: 'What are your delivery timelines and courier charges across Pakistan?',
      a: 'We deliver nationwide across Pakistan within 2 to 4 business days using reputable courier partners including TCS Express, Leopard Courier, and Call Courier. Shipping is completely FREE on all orders of Rs. 8,000 or above. For orders under Rs. 8,000, a flat courier fee of Rs. 350 applies.'
    },
    {
      q: 'Does VEXON support Cash on Delivery (COD)?',
      a: 'Yes! Cash on Delivery is available across all major cities and towns in Punjab, Sindh, KPK, Balochistan, Islamabad, and AJK. You simply pay cash to the courier rider upon delivery.'
    },
    {
      q: 'Can I inspect the parcel before paying the courier rider?',
      a: 'Yes. You are fully entitled to inspect the outer flyer and verify that the VEXON security tape and box are undamaged before handing over the cash payment.'
    },
    {
      q: 'Can I pick up my order in person from the Lahore store?',
      a: 'Absolutely. You can visit our retail store at Shop #14, Ground Floor, Liberty Market, Gulberg III, Lahore to purchase products directly and receive complimentary stack recommendations from our nutritionists.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a 7-day hassle-free return and exchange policy for any unopened products with intact manufacturer seals. If a parcel arrives damaged or with a broken seal, refuse delivery or contact us immediately for an instant free replacement.'
    }
  ];

  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">Frequently Asked Questions</span>
      </div>

      <div className="pb-4 border-b border-[#202020]">
        <h1 className="text-3xl font-heading font-bold uppercase text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Everything you need to know about VEXON sports nutrition, Pakistan shipping, and COD policies.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-[#141414] border border-white/10 rounded-[14px] overflow-hidden transition-all hover:border-[#ED101B]/40 shadow-sm">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4"
              >
                <span className="text-sm font-heading font-bold uppercase text-white tracking-wide">
                  {item.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#ED101B] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-white/10 bg-[#111111]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ShippingPolicyPage: React.FC = () => {
  const { navigateTo } = useStore();
  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">Shipping & Return Policy</span>
      </div>

      <div className="pb-4 border-b border-[#202020]">
        <h1 className="text-3xl font-heading font-bold uppercase text-white">
          Shipping, COD & Returns Policy
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Last updated: November 2026 · Official VEXON Supplements Pakistan Standards
        </p>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 sm:p-8 space-y-6 text-xs text-zinc-300 leading-relaxed shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
        <section className="space-y-2">
          <h2 className="text-base font-heading font-bold uppercase text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#ED101B]" /> Nationwide Shipping Across Pakistan
          </h2>
          <p>
            VEXON maintains a central logistics hub in Liberty Market, Lahore. All orders placed before 3:00 PM PKT (Monday through Saturday) are packed with tamper-evident security tape and handed over to TCS Express or Leopard Courier on the same day.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 font-mono">
            <li><strong>Lahore:</strong> Next day delivery (24 hours).</li>
            <li><strong>Karachi & Islamabad / Rawalpindi:</strong> 2 business days.</li>
            <li><strong>Other cities & remote districts:</strong> 3 to 4 business days.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-white/10">
          <h2 className="text-base font-heading font-bold uppercase text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#ED101B]" /> Free Delivery Qualification
          </h2>
          <p>
            Orders with a cart value of <strong>Rs. 8,000 or more</strong> qualify automatically for 100% free courier shipping. For orders below Rs. 8,000, a standardized shipping contribution of <strong>Rs. 350</strong> is calculated at checkout.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-white/10">
          <h2 className="text-base font-heading font-bold uppercase text-white flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#ED101B]" /> 7-Day Return & Replacement Guarantee
          </h2>
          <p>
            Customer satisfaction and supplement safety are our highest priorities. You may request a return or replacement within 7 calendar days of receipt under the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 font-mono">
            <li>The container remains strictly unopened with the factory seal and holographic scratch strip 100% intact.</li>
            <li>The item was purchased directly through our website or our Liberty Market flagship store.</li>
            <li>Damaged in transit: If the outer tub is cracked upon delivery, notify us within 24 hours with photos for an immediate free dispatch.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export const TermsPrivacyPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { navigateTo } = useStore();
  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">{type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</span>
      </div>

      <div className="pb-4 border-b border-[#202020]">
        <h1 className="text-3xl font-heading font-bold uppercase text-white">
          {type === 'privacy' ? 'Privacy & Data Protection' : 'Terms & Conditions of Service'}
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          VEXON Supplements Pakistan · Liberty Market, Lahore
        </p>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 sm:p-8 space-y-4 text-xs text-zinc-300 leading-relaxed shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
        {type === 'privacy' ? (
          <>
            <p>
              At VEXON SUPPLEMENTS, we take customer confidentiality seriously. Your phone number, residential address, and email are utilized strictly for fulfillment of courier dispatches across Pakistan and order tracking SMS alerts.
            </p>
            <p>
              We never sell, rent, or share personal contact data with third-party advertising brokers. All order details stored in local browser state remain private to your session.
            </p>
          </>
        ) : (
          <>
            <p>
              By accessing VEXON SUPPLEMENTS or purchasing from our storefront, you acknowledge and agree to comply with all Pakistani consumer commerce laws and the guidelines set forth herein.
            </p>
            <p>
              All product formulations, Creapure® German raw materials, and Nitro Isolate trademarks are property of VEXON. Products sold are dietary fitness supplements intended for healthy adults engaging in resistance training.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
