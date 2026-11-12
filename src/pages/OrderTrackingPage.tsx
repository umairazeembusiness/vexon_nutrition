import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  AlertCircle,
  Phone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, getOrderById, navigateTo } = useStore();
  const [orderQuery, setOrderQuery] = useState('VEX-9482'); // prefill demo order for quick testing
  const [phoneQuery, setPhoneQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) {
      setErrorMsg('Please enter a valid Order ID (e.g. VEX-9482)');
      return;
    }

    const found = getOrderById(orderQuery.trim());
    if (found) {
      setSearchedOrder(found);
      setErrorMsg('');
      setHasSearched(true);
    } else {
      setSearchedOrder(null);
      setErrorMsg(`No active order found with ID or tracking number "${orderQuery}". Try demo order "VEX-9482".`);
      setHasSearched(true);
    }
  };

  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <span>/</span>
        <span className="text-[#ED101B] font-semibold">Track Your Order</span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
          LIVE DISPATCH TRACKING
        </span>
        <h1 className="text-3xl font-heading font-bold uppercase text-white">
          Pakistan Courier Tracker
        </h1>
        <p className="text-xs text-zinc-400">
          Enter your VEXON Order ID or Courier Tracking number to view live transit milestones from our Lahore hub.
        </p>
      </div>

      {/* Search Bar Form (20px rounded card, 15px search field) */}
      <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 max-w-2xl mx-auto mb-10 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. VEX-9482)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-[15px] text-xs text-white pl-10 pr-4 py-3 font-mono focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] uppercase transition-all"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            className="vexon-btn-primary text-white text-xs font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-[12px] shrink-0"
          >
            Track Parcel
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs text-red-400 mt-3 font-mono flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </p>
        )}

        <div className="mt-3 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
          <span>Demo Tracking ID: <strong className="text-zinc-300">VEX-9482</strong></span>
          <span>Courier partners: TCS, Leopard, Call Courier</span>
        </div>
      </div>

      {/* TRACKING PROGRESS DETAILS */}
      {searchedOrder && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Status Header Box (20px rounded card) */}
          <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase">ORDER ID: {searchedOrder.id}</span>
                <h3 className="text-xl font-heading font-bold uppercase text-white mt-0.5">
                  Status: <span className="text-[#ED101B]">{searchedOrder.status}</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Estimated Delivery: <strong className="text-white">{searchedOrder.estimatedDelivery}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-zinc-400">
                <div>Courier: <strong className="text-white">{searchedOrder.courier}</strong></div>
                <div>Tracking #: <strong className="text-[#ED101B]">{searchedOrder.trackingNumber}</strong></div>
                <div>Payment: <strong className="text-white">{searchedOrder.paymentMethod}</strong></div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="pt-8 pb-4">
              <div className="relative">
                {/* Horizontal line for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#252525] -translate-y-1/2 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
                  {searchedOrder.timeline.map((step, idx) => (
                    <div key={idx} className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                      {/* Step node */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                        step.done
                          ? 'bg-[#ED101B] text-white border-2 border-[#ED101B] shadow-[0_0_12px_rgba(237,16,27,0.4)]'
                          : step.current
                          ? 'bg-black text-[#ED101B] border-2 border-[#ED101B] animate-pulse shadow-[0_0_14px_rgba(237,16,27,0.5)]'
                          : 'bg-[#181818] text-zinc-600 border border-white/10'
                      }`}>
                        {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      {/* Step Labels */}
                      <div className="min-w-0">
                        <span className={`text-xs font-heading font-bold uppercase block tracking-wider ${
                          step.done ? 'text-white' : step.current ? 'text-[#ED101B]' : 'text-zinc-600'
                        }`}>
                          {step.step}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                          {step.timestamp}
                        </span>
                        <p className="text-[11px] text-zinc-500 mt-1 md:max-w-[130px] mx-auto leading-tight">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination & Items Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div>
                <span className="text-zinc-500 uppercase block mb-1">Destination Address</span>
                <p className="text-zinc-300">
                  {searchedOrder.customerName}<br />
                  {searchedOrder.address.fullAddress}<br />
                  {searchedOrder.address.area}, {searchedOrder.address.city}, {searchedOrder.address.province}
                </p>
              </div>

              <div>
                <span className="text-zinc-500 uppercase block mb-1">Parcel Contents</span>
                <div className="space-y-1">
                  {searchedOrder.items.map((it, i) => (
                    <div key={i} className="text-zinc-300 flex justify-between">
                      <span className="truncate max-w-[200px]">{it.name} ({it.variantInfo})</span>
                      <span className="text-white">Qty: {it.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/10 text-right font-bold text-white">
                    Payable: Rs. {searchedOrder.total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Need help footer */}
          <div className="p-4 bg-[#141414] border border-white/10 rounded-[14px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Phone className="w-4 h-4 text-[#ED101B]" />
              <span>Need help with this courier shipment? Call Lahore Flagship at <strong>+92 42 3575 8899</strong></span>
            </div>
            <button
              onClick={() => navigateTo('contact')}
              className="text-[#ED101B] hover:underline font-semibold"
            >
              Contact Support →
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
