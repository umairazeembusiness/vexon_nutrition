import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  RotateCcw,
  Search,
  Check
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    selectedCategoryFilter, 
    searchQuery, 
    setSearchQuery, 
    navigateTo 
  } = useStore();

  // Filters State
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter || 'All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(36000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [selectedWeight, setSelectedWeight] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [localSearch, setLocalSearch] = useState<string>(searchQuery || '');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Synchronize when category clicked from nav
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  React.useEffect(() => {
    if (searchQuery) {
      setLocalSearch(searchQuery);
    }
  }, [searchQuery]);

  // Extract all unique weights and brands from catalog
  const allBrands = useMemo(() => {
    return ['All', ...Array.from(new Set(PRODUCTS.map(p => p.brand)))];
  }, []);

  const allWeights = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach(p => {
      p.variants.forEach(v => {
        if (v.weight) set.add(v.weight);
      });
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category filter
      if (activeCategory !== 'All' && prod.category !== activeCategory) {
        return false;
      }
      // Brand filter
      if (activeBrand !== 'All' && prod.brand !== activeBrand) {
        return false;
      }
      // Price filter
      if (prod.price > maxPrice) {
        return false;
      }
      // In stock
      if (onlyInStock && !prod.inStock) {
        return false;
      }
      // Weight filter
      if (selectedWeight !== 'All') {
        const hasWeight = prod.variants.some(v => v.weight.includes(selectedWeight));
        if (!hasWeight) return false;
      }
      // Local search
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase().trim();
        const matches = 
          prod.name.toLowerCase().includes(query) ||
          prod.shortDescription.toLowerCase().includes(query) ||
          prod.category.toLowerCase().includes(query) ||
          prod.brand.toLowerCase().includes(query) ||
          prod.ingredients.some(i => i.toLowerCase().includes(query));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'latest') return b.isNewArrival ? 1 : -1;
      return b.reviewCount - a.reviewCount; // 'featured' or 'popularity'
    });
  }, [activeCategory, activeBrand, maxPrice, onlyInStock, selectedWeight, localSearch, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const clearAllFilters = () => {
    setActiveCategory('All');
    setActiveBrand('All');
    setMaxPrice(36000);
    setOnlyInStock(false);
    setSelectedWeight('All');
    setLocalSearch('');
    setSearchQuery('');
  };

  const hasActiveFilters = 
    activeCategory !== 'All' || 
    activeBrand !== 'All' || 
    maxPrice < 36000 || 
    onlyInStock || 
    selectedWeight !== 'All' || 
    localSearch.trim() !== '';

  return (
    <div className="bg-[#090909] text-white min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumb & Title */}
      <div className="pb-6 border-b border-[#1E1E1E]">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
          <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-300">Shop</span>
          {activeCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-[#ED101B] font-semibold">{activeCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold uppercase tracking-tight text-white">
              {activeCategory === 'All' ? 'All Supplements & Gear' : activeCategory}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Showing {filteredProducts.length} premium products calibrated for strength and performance.
            </p>
          </div>

          {/* Quick search input (15px rounded) */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search in results..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-[15px] text-xs text-white pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#ED101B] focus:shadow-[0_0_12px_rgba(237,16,27,0.25)] placeholder:text-zinc-600 transition-all"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Top Controls & Active Filter Chips */}
      <div className="py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Mobile Filter Button + Filter Chips */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-[#161616] border border-white/10 rounded-[10px] text-xs font-heading font-semibold uppercase px-4 py-2 text-white hover:border-[#ED101B] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#ED101B]" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          {/* Filter chips (8px rounded) */}
          {activeCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-[#181818] border border-white/10 rounded-[8px] text-xs font-mono px-2.5 py-1 text-zinc-200">
              Category: {activeCategory}
              <button onClick={() => setActiveCategory('All')} className="text-zinc-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {activeBrand !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-[#181818] border border-white/10 rounded-[8px] text-xs font-mono px-2.5 py-1 text-zinc-200">
              Brand: {activeBrand}
              <button onClick={() => setActiveBrand('All')} className="text-zinc-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyInStock && (
            <span className="inline-flex items-center gap-1.5 bg-[#181818] border border-white/10 rounded-[8px] text-xs font-mono px-2.5 py-1 text-zinc-200">
              In Stock Only
              <button onClick={() => setOnlyInStock(false)} className="text-zinc-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedWeight !== 'All' && (
            <span className="inline-flex items-center gap-1.5 bg-[#181818] border border-white/10 rounded-[8px] text-xs font-mono px-2.5 py-1 text-zinc-200">
              Size: {selectedWeight}
              <button onClick={() => setSelectedWeight('All')} className="text-zinc-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#ED101B] hover:underline flex items-center gap-1 font-mono ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        {/* Right: Sort Dropdown (12px rounded) */}
        <div className="flex items-center gap-2 ml-auto text-xs">
          <span className="text-zinc-500 font-mono hidden sm:inline">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#141414] border border-white/10 rounded-[12px] text-white text-xs px-3.5 py-2 focus:outline-none focus:border-[#ED101B] font-mono transition-all"
          >
            <option value="featured">Featured / Popular</option>
            <option value="rating">Highest Customer Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="latest">Newest Releases</option>
          </select>
        </div>

      </div>

      {/* 3. Main Grid Layout (Sidebar Filters + Products Grid) */}
      <div className="py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters (20px rounded card with subtle shadow) */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-[#141414] border border-white/10 rounded-[20px] p-5 space-y-6 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ED101B]" />
                Filter Products
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-mono text-zinc-400 hover:text-[#ED101B]"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 mb-2.5">
                Category
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`flex items-center justify-between w-full text-left py-1 transition-colors ${
                    activeCategory === 'All' ? 'text-[#ED101B] font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="font-mono text-[11px] text-zinc-600">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center justify-between w-full text-left py-1 transition-colors ${
                      activeCategory === cat.name ? 'text-[#ED101B] font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="font-mono text-[11px] text-zinc-600">
                      {PRODUCTS.filter(p => p.category === cat.name).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                <span>Max Price</span>
                <span className="font-mono text-[#ED101B]">Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="36000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#ED101B] bg-zinc-700 h-1.5 cursor-pointer rounded-full"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>Rs. 2,000</span>
                <span>Rs. 36,000</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 mb-2.5">
                Brand Line
              </h4>
              <div className="space-y-1.5 text-xs">
                {allBrands.map(b => (
                  <button
                    key={b}
                    onClick={() => setActiveBrand(b)}
                    className={`flex items-center justify-between w-full text-left py-1 transition-colors ${
                      activeBrand === b ? 'text-[#ED101B] font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{b === 'All' ? 'All Brands' : b}</span>
                    <span className="font-mono text-[11px] text-zinc-600">
                      {b === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.brand === b).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-[#ED101B] w-4 h-4 bg-[#1A1A1A] border-white/15 rounded-[4px]"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Weights & Sizes */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300 mb-2.5">
                Popular Sizes
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['All', '5 lbs', '2 lbs', '10 lbs', '12 lbs', '500g', '750ml'].map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-[8px] transition-all ${
                      selectedWeight === w 
                        ? 'bg-[#ED101B] text-white font-bold shadow-[0_4px_8px_-2px_rgba(237,16,27,0.4)]' 
                        : 'bg-[#181818] border border-white/10 text-zinc-400 hover:text-white hover:border-zinc-500'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#141414] border border-white/10 rounded-[20px] p-12 text-center space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.22)]">
              <h3 className="text-lg font-heading font-bold uppercase text-white">No Matching Products Found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t find any supplements matching your selected filter criteria. Try clearing some filters or searching for another keyword.
              </p>
              <button
                onClick={clearAllFilters}
                className="vexon-btn-primary text-white text-xs font-heading font-bold uppercase px-6 py-2.5 rounded-[12px]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Button */}
              {displayedProducts.length < filteredProducts.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="vexon-btn-secondary text-white font-heading font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-[12px]"
                  >
                    Load More ({filteredProducts.length - displayedProducts.length} Remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* 4. Mobile Filter Drawer (rounded-r-[20px]) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#141414] border-r border-white/10 rounded-r-[20px] h-full overflow-y-auto p-6 z-10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-sm font-heading font-bold uppercase text-white">Filter Products</h3>
              <button 
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-[10px] text-zinc-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-heading font-semibold uppercase text-zinc-300 mb-2">Categories</h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => { setActiveCategory('All'); setMobileFilterOpen(false); }}
                  className={`block w-full text-left py-1.5 ${activeCategory === 'All' ? 'text-[#ED101B] font-bold' : 'text-zinc-400'}`}
                >
                  All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.name); setMobileFilterOpen(false); }}
                    className={`block w-full text-left py-1.5 ${activeCategory === cat.name ? 'text-[#ED101B] font-bold' : 'text-zinc-400'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs text-zinc-300 mb-2">
                <span>Max Price:</span>
                <span className="font-mono text-[#ED101B]">Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="36000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#ED101B] rounded-full"
              />
            </div>

            {/* Apply button */}
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full vexon-btn-primary text-white py-3 font-heading font-bold text-xs uppercase rounded-[12px]"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
