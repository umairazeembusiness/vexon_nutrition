import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  Instagram,
  Facebook,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast, navigateTo } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry & Stack Advice');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast('Missing Fields', 'Please complete all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Message Sent!', 'Our Lahore flagship team will reply within 24 hours.', 'success');
  };

  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">Contact & Flagship Store</span>
      </div>

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
          GET IN TOUCH
        </span>
        <h1 className="text-3xl font-heading font-bold uppercase text-white">
          Contact VEXON Supplements
        </h1>
        <p className="text-xs text-zinc-400">
          Have questions about your supplement stack, verification codes, or order status? Visit our Liberty Market store in Lahore or reach our team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Form (7 Cols - 20px rounded container) */}
        <div className="lg:col-span-7 bg-[#141414] border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
          <h2 className="text-lg font-heading font-bold uppercase text-white pb-3 border-b border-white/10 mb-6">
            Send an Inquiry to Our Nutritionists
          </h2>

          {submitted ? (
            <div className="p-8 bg-[#161616] border border-white/10 rounded-[16px] text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#ED101B] mx-auto" />
              <h3 className="text-base font-heading font-bold uppercase text-white">Thank You, {name}!</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Your message regarding "{subject}" has been received. Our sports nutrition specialist will get back to you via email or WhatsApp shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs text-[#ED101B] hover:underline uppercase font-mono"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-zinc-400 uppercase block mb-1">Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Asad Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-zinc-400 uppercase block mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="asad@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-zinc-400 uppercase block mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="text"
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-white p-3 font-mono focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-zinc-400 uppercase block mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  >
                    <option value="Product Inquiry & Stack Advice">Product Inquiry & Stack Advice</option>
                    <option value="Order Tracking / Delivery Status">Order Tracking / Delivery Status</option>
                    <option value="Hologram & Authenticity Verification">Hologram & Authenticity Verification</option>
                    <option value="Wholesale / Gym Gym Partnership">Wholesale / Gym Partnership</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-zinc-400 uppercase block mb-1">Message *</label>
                <textarea
                  rows={5}
                  placeholder="How can we assist your athletic training goals?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full vexon-btn-primary text-white py-3.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-[12px]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Flagship Store Info & Simulated Map (5 Cols - 20px card) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 space-y-5 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
            <h3 className="text-sm font-heading font-bold uppercase text-white pb-3 border-b border-white/10">
              Liberty Market Flagship Store
            </h3>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Physical Store Location:</strong>
                  <span>Shop #14, Ground Floor, Liberty Market, Gulberg III, Lahore, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Direct Phone & WhatsApp:</strong>
                  <span className="font-mono">+92 42 3575 8899 / +92 300 8489211</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Official Support Email:</strong>
                  <span>support@vexon.pk / info@vexon.pk</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#ED101B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Store Opening Hours:</strong>
                  <span>Monday to Saturday: 11:00 AM – 11:00 PM (PKT)<br />Sunday: 2:00 PM – 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual (16px rounded frame) */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-2">
                Lahore Store Locator
              </span>
              <div className="relative aspect-16/9 bg-[#171717] border border-white/10 rounded-[16px] overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-[#ED101B]/20 border border-[#ED101B] flex items-center justify-center text-[#ED101B] mb-2 animate-bounce shadow-[0_0_15px_rgba(237,16,27,0.35)]">
                  <MapPin className="w-5 h-5 fill-[#ED101B]" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase">VEXON Flagship Store</h4>
                <p className="text-[11px] text-zinc-400 font-mono">Liberty Roundabout, Gulberg III, Lahore</p>
                <div className="mt-3 flex gap-2">
                  <a
                    href="https://maps.google.com/?q=Liberty+Market+Lahore"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#242424] hover:bg-[#303030] text-zinc-200 text-[11px] font-mono px-3.5 py-1.5 flex items-center gap-1.5 border border-white/10 rounded-[10px] transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#ED101B]" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
