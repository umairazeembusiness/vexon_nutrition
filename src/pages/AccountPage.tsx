import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  KeyRound
} from 'lucide-react';
import { CustomerAddress } from '../types';

export const AccountPage: React.FC = () => {
  const { 
    currentUser, 
    login, 
    register, 
    logout, 
    orders, 
    wishlistCount, 
    navigateTo, 
    addToast,
    updateUserAddress 
  } = useStore();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('hamza.tariq@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');

  // New Address form modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Gym / Office');
  const [newAddrFull, setNewAddrFull] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Lahore');
  const [newAddrPhone, setNewAddrPhone] = useState(currentUser?.phone || '0300-4821945');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      addToast('Error', 'Please enter your email or phone.', 'error');
      return;
    }
    login(loginEmail);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setRegError('Please complete all required fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }
    register(regName.trim(), regEmail.trim(), regPhone.trim());
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrFull.trim()) return;
    const newAddr: CustomerAddress = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel,
      fullName: currentUser?.fullName || 'Valued Athlete',
      phone: newAddrPhone,
      province: 'Punjab',
      city: newAddrCity,
      area: 'Central',
      address: newAddrFull,
      postalCode: '54000',
      isDefault: false
    };
    updateUserAddress(newAddr);
    setShowAddressModal(false);
    setNewAddrFull('');
    addToast('Address Added', 'Saved new delivery address to your account.', 'success');
  };

  // If user is not logged in: display Login / Register screen
  if (!currentUser) {
    return (
      <div className="bg-[#090909] text-white min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#141414] border border-white/10 rounded-[20px] p-8 space-y-6 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9),0_20px_35px_-10px_rgba(237,16,27,0.25)]">
          
          <div className="text-center space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ED101B]">
              VEXON ATHLETE PORTAL
            </span>
            <h1 className="text-2xl font-heading font-bold uppercase text-white">
              {authMode === 'login' ? 'Customer Sign In' : 'Create VEXON Account'}
            </h1>
            <p className="text-xs text-zinc-400">
              {authMode === 'login'
                ? 'Sign in to track orders, manage saved addresses, and access VIP pricing.'
                : 'Join VEXON Elite to unlock express checkout across Pakistan.'}
            </p>
          </div>

          {/* Toggle Tab (12px rounded container) */}
          <div className="grid grid-cols-2 p-1 bg-[#181818] border border-white/10 rounded-[12px] overflow-hidden">
            <button
              onClick={() => setAuthMode('login')}
              className={`py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-[10px] transition-all ${
                authMode === 'login' ? 'bg-[#ED101B] text-white shadow-[0_0_12px_rgba(237,16,27,0.35)]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-[10px] transition-all ${
                authMode === 'register' ? 'bg-[#ED101B] text-white shadow-[0_0_12px_rgba(237,16,27,0.35)]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1 uppercase">Email or Phone Number</label>
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="hamza.tariq@gmail.com"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Password</label>
                  <button 
                    type="button" 
                    onClick={() => addToast('Reset Link Sent', 'Password reset instructions sent to your email.', 'info')}
                    className="text-[11px] text-[#ED101B] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full vexon-btn-primary text-white py-3.5 text-xs font-heading font-bold uppercase tracking-wider rounded-[12px]"
              >
                Sign In to Account
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {regError && <p className="text-xs text-red-400">{regError}</p>}
              
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1 uppercase">Full Name *</label>
                <input
                  type="text"
                  placeholder="Ali Khan"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1 uppercase">Email Address *</label>
                <input
                  type="email"
                  placeholder="ali.khan@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1 uppercase">Phone Number (Pakistan) *</label>
                <input
                  type="text"
                  placeholder="0300-1234567"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 font-mono focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1 uppercase">Password *</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1 uppercase">Confirm *</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-3 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full vexon-btn-primary text-white py-3.5 text-xs font-heading font-bold uppercase tracking-wider rounded-[12px]"
              >
                Create Account
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  // User logged in: CUSTOMER DASHBOARD
  return (
    <div className="bg-[#090909] text-white min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Header Profile Strip (20px rounded container) */}
      <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#1A1A1A] border-2 border-[#ED101B] rounded-[16px] flex items-center justify-center text-xl font-heading font-bold text-white uppercase shadow-[0_0_15px_rgba(237,16,27,0.35)]">
            {currentUser.fullName[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-bold uppercase text-white">
                {currentUser.fullName}
              </h1>
              <span className="bg-[#ED101B]/20 text-[#ED101B] text-[10px] font-mono px-2.5 py-0.5 rounded-[8px] border border-[#ED101B]/40 font-bold">
                VIP ATHLETE
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">{currentUser.email} · {currentUser.phone}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 border border-white/10 hover:border-zinc-500 rounded-[10px] text-zinc-400 hover:text-white px-4 py-2 text-xs font-mono uppercase transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar (3 Cols - 20px card) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-[#141414] border border-white/10 rounded-[20px] p-2 space-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-between rounded-[12px] transition-colors ${
                activeTab === 'orders' ? 'bg-[#ED101B] text-white shadow-[0_0_14px_rgba(237,16,27,0.35)]' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
              <span className="font-mono text-[11px]">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-between rounded-[12px] transition-colors ${
                activeTab === 'addresses' ? 'bg-[#ED101B] text-white shadow-[0_0_14px_rgba(237,16,27,0.35)]' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </div>
              <span className="font-mono text-[11px]">{currentUser.addresses.length}</span>
            </button>

            <button
              onClick={() => navigateTo('wishlist')}
              className="w-full text-left px-4 py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-between rounded-[12px] text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Wishlist Items</span>
              </div>
              <span className="font-mono text-[11px]">{wishlistCount}</span>
            </button>

            <button
              onClick={() => navigateTo('order-tracking')}
              className="w-full text-left px-4 py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-between rounded-[12px] text-[#ED101B] hover:text-red-400 hover:bg-[#ED101B]/5 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4" />
                <span>Live Order Tracking</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Content (9 Cols) */}
        <div className="lg:col-span-9">
          
          {/* Orders History Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-bold uppercase text-white pb-2 border-b border-white/10">
                Order History ({orders.length})
              </h3>

              {orders.length === 0 ? (
                <div className="p-8 bg-[#141414] border border-white/10 rounded-[18px] text-center text-xs text-zinc-400">
                  No previous orders placed yet.
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="review-card p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                      <div>
                        <span className="text-xs font-mono text-zinc-500 uppercase">ORDER #{order.id} · {order.date}</span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-heading font-bold uppercase text-white">
                            Status: <span className="text-[#ED101B]">{order.status}</span>
                          </span>
                          <span className="text-xs text-zinc-500 font-mono">({order.paymentMethod})</span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-zinc-400 font-mono block">Order Total:</span>
                        <span className="text-base font-mono font-bold text-white">
                          Rs. {order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-2">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1">
                          <div className="flex items-center gap-3">
                            <img src={it.image} alt={it.name} className="w-10 h-10 object-cover bg-black rounded-[8px] border border-white/10" />
                            <div>
                              <span className="text-white font-medium">{it.name}</span>
                              <span className="text-[10px] text-zinc-500 block font-mono">{it.variantInfo} × {it.quantity}</span>
                            </div>
                          </div>
                          <span className="font-mono text-zinc-300">Rs. {it.total.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap justify-between items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400">
                        Courier: <strong>{order.courier}</strong> (Tracking: <strong>{order.trackingNumber}</strong>)
                      </span>
                      <button
                        onClick={() => navigateTo('order-tracking')}
                        className="text-xs font-heading font-semibold uppercase text-[#ED101B] hover:underline flex items-center gap-1"
                      >
                        <span>View Courier Stepper</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-lg font-heading font-bold uppercase text-white">
                  Delivery Addresses ({currentUser.addresses.length})
                </h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="vexon-btn-primary text-white text-xs font-heading font-bold uppercase px-4 py-2 rounded-[10px] flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentUser.addresses.map(addr => (
                  <div key={addr.id} className="review-card p-5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-heading font-bold uppercase text-white">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-[#1E1E1E] text-emerald-400 px-2 py-0.5 rounded-[6px] font-mono">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                      {addr.fullName}<br />
                      {addr.address}<br />
                      {addr.area}, {addr.city}, {addr.province} {addr.postalCode}<br />
                      Phone: {addr.phone}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Address Modal Dialog (20px rounded) */}
              {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
                  <div className="bg-[#141414] border border-white/10 rounded-[20px] p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <h3 className="text-sm font-heading font-bold uppercase text-white">
                      Add New Delivery Address
                    </h3>
                    <form onSubmit={handleAddAddress} className="space-y-3">
                      <div>
                        <label className="text-xs text-zinc-400 font-mono uppercase block mb-1">Address Label</label>
                        <input
                          type="text"
                          value={newAddrLabel}
                          onChange={(e) => setNewAddrLabel(e.target.value)}
                          placeholder="e.g. Gym Locker, Office, Home"
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-2.5 focus:outline-none focus:border-[#ED101B]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 font-mono uppercase block mb-1">City</label>
                        <input
                          type="text"
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-2.5 focus:outline-none focus:border-[#ED101B]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 font-mono uppercase block mb-1">Full Street Address</label>
                        <textarea
                          rows={2}
                          value={newAddrFull}
                          onChange={(e) => setNewAddrFull(e.target.value)}
                          placeholder="Street, Block, House/Shop #"
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-[12px] text-xs text-white p-2.5 focus:outline-none focus:border-[#ED101B]"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddressModal(false)}
                          className="px-4 py-2 text-xs border border-white/10 rounded-[10px] text-zinc-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs vexon-btn-primary text-white font-heading font-bold uppercase rounded-[10px]"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
