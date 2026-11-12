import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Truck,
  Sparkles,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, VEXON_LOGO, WHEY_TUB_IMAGE } from '../../data/products';

const ANNOUNCEMENTS = [
  '⚡ FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE RS. 8,000 ACROSS PAKISTAN',
  '🔥 CASH ON DELIVERY (COD) & DIRECT BANK TRANSFER AVAILABLE NATIONWIDE',
  '📍 VISIT OUR FLAGSHIP STORE AT LIBERTY MARKET, LAHORE — 100% AUTHENTIC GUARANTEE',
  '💪 USE PROMO CODE "VEXON10" FOR 10% OFF YOUR FIRST ELITE STACK'
];

export const Header: React.FC = () => {
  const { 
    navigateTo, 
    cartCount, 
    wishlistCount, 
    setIsCartOpen, 
    currentUser, 
    route 
  } = useStore();

  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearchInput, setLocalSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState(PRODUCTS.slice(0, 4));
  const [isScrolled, setIsScrolled] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rotating announcement bar
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live search filtering
  useEffect(() => {
    if (!localSearchInput.trim()) {
      setSearchResults(PRODUCTS.slice(0, 4));
      return;
    }
    const query = localSearchInput.toLowerCase().trim();
    const matched = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.shortDescription.toLowerCase().includes(query)
    );
    setSearchResults(matched.slice(0, 5));
  }, [localSearchInput]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const executeSearch = (query: string) => {
    setSearchOpen(false);
    navigateTo('shop', { searchQuery: query });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090909] text-white">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#151515] border-b border-[#222222] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('contact')}>
              <MapPin className="w-3.5 h-3.5 text-[#ED101B]" />
              Liberty Market, Lahore
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('order-tracking')}>
              <Truck className="w-3.5 h-3.5 text-[#ED101B]" />
              Track Order
            </span>
          </div>

          <div className="flex-1 text-center font-medium tracking-wider text-zinc-200 overflow-hidden h-4.5">
            <div 
              key={announcementIndex} 
              className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-[11px] sm:text-xs truncate font-mono"
            >
              {ANNOUNCEMENTS[announcementIndex]}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-zinc-400">
            <button 
              onClick={() => navigateTo('shipping-policy')}
              className="hover:text-white transition-colors text-[11px] uppercase tracking-wider"
            >
              COD Policy
            </button>
            <span>·</span>
            <button 
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors text-[11px] uppercase tracking-wider"
            >
              Why Vexon
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className={`transition-all duration-300 border-b border-[#1E1E1E] ${isScrolled ? 'bg-[#090909]/95 backdrop-blur-md py-3 shadow-xl shadow-black/60' : 'bg-[#090909] py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Left: Hamburger (mobile) + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* VEXON LOGO - using official asset, maintaining exact aspect ratio */}
            <div 
              onClick={() => navigateTo('home')}
              className="cursor-pointer flex items-center group select-none"
            >
              <img 
                src={VEXON_LOGO} 
                alt="VEXON Supplements Logo - Fuel Your Potential" 
                className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
            </div>
          </div>

          {/* Center: Live Search Bar (Desktop) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <div className="w-full relative flex items-center">
              <input
                type="text"
                placeholder="Search Whey Isolate, Creapure, Pre-Workout, Shakers..."
                value={localSearchInput}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    executeSearch(localSearchInput);
                  }
                }}
                className="w-full bg-[#151515] border border-white/10 text-white text-sm pl-10 pr-10 py-2.5 rounded-[15px] focus:outline-none focus:border-[#ED101B]/70 focus:shadow-[0_0_15px_rgba(237,16,27,0.2)] placeholder:text-zinc-500 transition-all duration-300"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              {localSearchInput && (
                <button
                  onClick={() => setLocalSearchInput('')}
                  className="absolute right-3 text-zinc-500 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#151515] border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.7)] rounded-[14px] p-4 z-50 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/6 text-xs text-zinc-400 uppercase tracking-wider font-medium">
                  <span>{localSearchInput ? 'Search Results' : 'Trending Searches in Pakistan'}</span>
                  <button 
                    onClick={() => executeSearch(localSearchInput)} 
                    className="text-[#ED101B] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-1.5">
                  {searchResults.length > 0 ? (
                    searchResults.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setSearchOpen(false);
                          navigateTo('product-detail', { productId: prod.id });
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-[#1f1f1f] rounded-[10px] cursor-pointer transition-colors"
                      >
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-10 h-10 object-cover bg-black border border-white/10 rounded-[8px] shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-white truncate">{prod.name}</h5>
                          <p className="text-[11px] text-zinc-400">{prod.category} · {prod.variants[0]?.weight}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-[#ED101B]">Rs. {prod.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-xs text-zinc-400">
                      No matching products found for "{localSearchInput}".
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-white/6 flex flex-wrap gap-2 text-xs">
                  <span className="text-zinc-500">Popular:</span>
                  {['Nitro Isolate', 'Creapure', 'Volcanic Rage', 'Titan Mass', 'Multivitamin'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setLocalSearchInput(tag);
                        executeSearch(tag);
                      }}
                      className="text-zinc-300 hover:text-[#ED101B] hover:underline transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: User, Wishlist, Cart Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Mobile search toggle */}
            <button
              onClick={() => navigateTo('shop')}
              className="md:hidden p-2 text-zinc-300 hover:text-white rounded-[10px]"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              onClick={() => navigateTo(currentUser ? 'account' : 'account')}
              className="flex items-center gap-2 p-2 text-zinc-300 hover:text-white rounded-[10px] hover:bg-white/5 transition-colors"
              title={currentUser ? `Account: ${currentUser.fullName}` : 'Login / Register'}
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-medium uppercase tracking-wider">
                {currentUser ? currentUser.fullName.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-zinc-300 hover:text-white rounded-[10px] hover:bg-white/5 transition-colors"
              title="View Wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#ED101B] text-white text-[10px] font-mono font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(237,16,27,0.6)]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 vexon-btn-primary px-3.5 sm:px-4 py-2 select-none group"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-mono font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#ED101B]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-heading font-semibold tracking-wider uppercase">
                Cart
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category & Mega Menu Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-[#0E0E0E] border-b border-[#1A1A1A] text-xs font-medium uppercase tracking-wider relative">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-3 transition-colors ${route === 'home' ? 'text-[#ED101B] font-bold border-b-2 border-[#ED101B]' : 'text-zinc-300 hover:text-white'}`}
            >
              Home
            </button>

            {/* Shop with Mega-Menu */}
            <div 
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                onClick={() => navigateTo('shop')}
                className={`px-3 py-3 flex items-center gap-1 transition-colors ${route === 'shop' ? 'text-[#ED101B] font-bold border-b-2 border-[#ED101B]' : 'text-zinc-300 hover:text-white'}`}
              >
                <span>Shop All</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-[#ED101B]' : ''}`} />
              </button>

              {/* MEGA MENU CONTAINER */}
              {megaMenuOpen && (
                <div className="absolute top-full left-0 w-[920px] bg-[#141414] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.8)] rounded-[14px] p-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-4 gap-6 normal-case">
                    
                    {/* Col 1: Categories */}
                    <div>
                      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#ED101B] mb-3 pb-1 border-b border-white/6">
                        Core Categories
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {CATEGORIES.slice(0, 5).map(cat => (
                          <li key={cat.id}>
                            <button
                              onClick={() => {
                                setMegaMenuOpen(false);
                                navigateTo('shop', { category: cat.name });
                              }}
                              className="hover:text-white hover:translate-x-1 transition-transform flex items-center justify-between w-full text-left py-0.5 rounded-[6px]"
                            >
                              <span>{cat.name}</span>
                              <span className="text-[11px] font-mono text-zinc-600">{cat.itemCount}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 2: More Categories & Gear */}
                    <div>
                      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#ED101B] mb-3 pb-1 border-b border-white/6">
                        Endurance & Gear
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {CATEGORIES.slice(5).map(cat => (
                          <li key={cat.id}>
                            <button
                              onClick={() => {
                                setMegaMenuOpen(false);
                                navigateTo('shop', { category: cat.name });
                              }}
                              className="hover:text-white hover:translate-x-1 transition-transform flex items-center justify-between w-full text-left py-0.5 rounded-[6px]"
                            >
                              <span>{cat.name}</span>
                              <span className="text-[11px] font-mono text-zinc-600">{cat.itemCount}</span>
                            </button>
                          </li>
                        ))}
                        <li>
                          <button
                            onClick={() => {
                              setMegaMenuOpen(false);
                              navigateTo('shop');
                            }}
                            className="text-[#ED101B] hover:underline font-semibold flex items-center gap-1 mt-2 text-xs uppercase"
                          >
                            Explore All Catalog <ArrowRight className="w-3 h-3" />
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Popular Collections */}
                    <div>
                      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-zinc-300 mb-3 pb-1 border-b border-white/6">
                        Elite Goals
                      </h4>
                      <ul className="space-y-2.5 text-xs text-zinc-400">
                        <li>
                          <button 
                            onClick={() => { setMegaMenuOpen(false); navigateTo('shop', { category: 'Whey Protein' }); }}
                            className="hover:text-white text-left block"
                          >
                            <span className="text-white font-medium block">Lean Muscle & Definition</span>
                            <span className="text-[11px] text-zinc-500">Pure Whey Isolates & BCAAs</span>
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => { setMegaMenuOpen(false); navigateTo('shop', { category: 'Pre-Workout' }); }}
                            className="hover:text-white text-left block"
                          >
                            <span className="text-white font-medium block">Raw Explosive Power</span>
                            <span className="text-[11px] text-zinc-500">High-Stim pre-workouts & Creapure</span>
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => { setMegaMenuOpen(false); navigateTo('shop', { category: 'Mass Gainer' }); }}
                            className="hover:text-white text-left block"
                          >
                            <span className="text-white font-medium block">Massive Bulk & Size</span>
                            <span className="text-[11px] text-zinc-500">Clean caloric dense formulas</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 4: Featured Promo Card */}
                    <div className="bg-[#181818] border border-white/10 rounded-[14px] p-4 flex flex-col justify-between hover:border-[#ED101B]/50 transition-colors shadow-md">
                      <div>
                        <div className="flex items-center gap-1.5 text-[#ED101B] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                          <Flame className="w-3.5 h-3.5" /> Flagship Release
                        </div>
                        <h5 className="text-sm font-bold text-white mb-1">Nitro Isolate 5 lbs</h5>
                        <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                          Cold cross-flow micro-filtered whey isolate. Instant mixing in water.
                        </p>
                        <img 
                          src={WHEY_TUB_IMAGE} 
                          alt="Nitro Isolate" 
                          className="w-full h-24 object-cover border border-white/10 rounded-[10px] mb-3"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setMegaMenuOpen(false);
                          navigateTo('product-detail', { productId: 'vexon-nitro-isolate' });
                        }}
                        className="w-full vexon-btn-primary py-2 text-xs uppercase font-heading font-semibold tracking-wider text-center"
                      >
                        Buy Nitro Isolate
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Direct category quick links */}
            <button
              onClick={() => navigateTo('shop', { category: 'Whey Protein' })}
              className="px-3 py-3 text-zinc-300 hover:text-white transition-colors"
            >
              Whey Protein
            </button>
            <button
              onClick={() => navigateTo('shop', { category: 'Creatine' })}
              className="px-3 py-3 text-zinc-300 hover:text-white transition-colors"
            >
              Creatine
            </button>
            <button
              onClick={() => navigateTo('shop', { category: 'Mass Gainer' })}
              className="px-3 py-3 text-zinc-300 hover:text-white transition-colors"
            >
              Mass Gainer
            </button>
            <button
              onClick={() => navigateTo('shop', { category: 'Pre-Workout' })}
              className="px-3 py-3 text-zinc-300 hover:text-white transition-colors"
            >
              Pre-Workout
            </button>
            <button
              onClick={() => navigateTo('shop', { category: 'Vitamins & Minerals' })}
              className="px-3 py-3 text-zinc-300 hover:text-white transition-colors"
            >
              Vitamins
            </button>
            <button
              onClick={() => navigateTo('shop', { category: 'Gym Accessories' })}
              className="px-3 py-3 text-zinc-300 hover:text-white transition-colors"
            >
              Accessories
            </button>
          </div>

          {/* Right quick company links */}
          <div className="flex items-center space-x-1 text-zinc-400">
            <button
              onClick={() => navigateTo('about')}
              className={`px-3 py-3 hover:text-white transition-colors ${route === 'about' ? 'text-white' : ''}`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`px-3 py-3 hover:text-white transition-colors ${route === 'contact' ? 'text-white' : ''}`}
            >
              Contact
            </button>
            <button
              onClick={() => navigateTo('order-tracking')}
              className={`px-3 py-3 text-[#ED101B] hover:text-red-400 font-semibold transition-colors`}
            >
              Track Order
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#121212] border-r border-white/10 rounded-r-[20px] h-full overflow-y-auto flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-white/6">
                <img 
                  src={VEXON_LOGO} 
                  alt="VEXON Supplements" 
                  className="h-8 w-auto object-contain" 
                />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-[8px]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mt-4 mb-6">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search supplements..."
                    value={localSearchInput}
                    onChange={(e) => setLocalSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setMobileMenuOpen(false);
                        executeSearch(localSearchInput);
                      }
                    }}
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white text-xs pl-9 pr-3 py-2.5 rounded-[12px] focus:outline-none focus:border-[#ED101B]"
                  />
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-1 text-sm font-medium">
                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('home'); }}
                  className="flex items-center justify-between w-full py-2.5 text-zinc-200 hover:text-[#ED101B] border-b border-[#1E1E1E]"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('shop'); }}
                  className="flex items-center justify-between w-full py-2.5 text-zinc-200 hover:text-[#ED101B] border-b border-[#1E1E1E]"
                >
                  <span>Shop All Products</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>

                <div className="pt-2 pb-1 text-[11px] font-heading uppercase text-zinc-500 tracking-wider">
                  Browse by Category
                </div>

                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setMobileMenuOpen(false); navigateTo('shop', { category: cat.name }); }}
                    className="flex items-center justify-between w-full py-2 text-zinc-300 hover:text-white text-xs pl-2"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-zinc-600 font-mono">{cat.itemCount}</span>
                  </button>
                ))}

                <div className="pt-4 border-t border-[#1E1E1E] space-y-1 text-xs">
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigateTo('order-tracking'); }}
                    className="flex items-center gap-2 py-2 text-[#ED101B] font-semibold w-full text-left"
                  >
                    <Truck className="w-4 h-4" /> Track My Order
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigateTo('about'); }}
                    className="py-2 text-zinc-300 hover:text-white w-full text-left"
                  >
                    About VEXON
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigateTo('contact'); }}
                    className="py-2 text-zinc-300 hover:text-white w-full text-left"
                  >
                    Liberty Market Flagship & Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Bottom */}
            <div className="pt-4 border-t border-[#242424] text-xs text-zinc-400">
              <p className="font-heading text-white font-bold text-sm">VEXON SUPPLEMENTS</p>
              <p className="text-[11px] text-zinc-500 mt-1">Liberty Market, Lahore, Pakistan</p>
              <p className="text-[11px] text-[#ED101B] font-mono mt-0.5">Helpline: +92 42 3575 8899</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
