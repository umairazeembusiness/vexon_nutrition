import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ProductVariant, 
  CartItem, 
  CustomerUser, 
  Order, 
  ViewRoute,
  OrderTimelineStep 
} from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  route: ViewRoute;
  selectedProductId: string | null;
  selectedCategoryFilter: string | null;
  navigateTo: (route: ViewRoute, params?: { productId?: string; category?: string; searchQuery?: string }) => void;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  cartGrandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: { code: string; discountPercent: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Auth & Account
  currentUser: CustomerUser | null;
  login: (email: string) => boolean;
  register: (fullName: string, email: string, phone: string) => boolean;
  logout: () => void;
  updateUserAddress: (address: CustomerUser['addresses'][0]) => void;

  // Orders
  orders: Order[];
  placeOrder: (data: Omit<Order, 'id' | 'date' | 'timeline' | 'trackingNumber' | 'courier' | 'estimatedDelivery' | 'status'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Toasts
  toasts: Array<{ id: string; title: string; message?: string; type: 'success' | 'info' | 'error' }>;
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'VEX-9482',
    date: '2026-11-10',
    status: 'Shipped',
    customerName: 'Hamza Tariq',
    email: 'hamza.tariq@gmail.com',
    phone: '0300-4821945',
    address: {
      province: 'Punjab',
      city: 'Lahore',
      area: 'DHA Phase 5, Sector C',
      fullAddress: 'House 42, Street 8, DHA Phase 5',
      postalCode: '54792'
    },
    items: [
      {
        productId: 'vexon-nitro-isolate',
        name: 'VEXON Nitro Isolate 100% Pure Whey',
        variantInfo: '5 lbs (2.27 kg) / Double Rich Chocolate',
        quantity: 1,
        unitPrice: 18500,
        total: 18500,
        image: '/src/assets/images/product_whey_tub_1794474631251.jpg'
      },
      {
        productId: 'vexon-pro-steel-shaker',
        name: 'VEXON Pro-Grade Insulated Matte Black Shaker 750ml',
        variantInfo: '750ml / Stealth Matte Black',
        quantity: 1,
        unitPrice: 2499,
        total: 2499,
        image: '/src/assets/images/category_preworkout_energy_1794474632363.jpg'
      }
    ],
    subtotal: 20999,
    shippingFee: 0,
    discount: 0,
    total: 20999,
    paymentMethod: 'Cash on Delivery (COD)',
    trackingNumber: 'TCS-99182410',
    courier: 'TCS Express Pakistan',
    estimatedDelivery: 'Tomorrow, by 4:00 PM',
    timeline: [
      { step: 'Order Placed', timestamp: '10 Nov 2026, 11:20 AM', done: true, detail: 'Received and verified at VEXON HQ Lahore' },
      { step: 'Confirmed', timestamp: '10 Nov 2026, 11:45 AM', done: true, detail: 'Payment verification: Cash on Delivery confirmed via SMS' },
      { step: 'Processing', timestamp: '10 Nov 2026, 02:30 PM', done: true, detail: 'Packed with tamper-evident seal and batch hologram' },
      { step: 'Shipped', timestamp: '11 Nov 2026, 09:15 AM', done: true, current: true, detail: 'In transit from Lahore Hub to DHA Delivery Center via TCS Express' },
      { step: 'Out for Delivery', timestamp: 'Expected 13 Nov', done: false, detail: 'Rider will call before arrival' },
      { step: 'Delivered', timestamp: 'Pending', done: false, detail: 'Cash collection upon parcel inspection' }
    ]
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Route
  const [route, setRoute] = useState<ViewRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('vexon-nitro-isolate');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vexon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vexon_wishlist');
      return saved ? JSON.parse(saved) : ['vexon-nitro-isolate', 'vexon-volcanic-rage'];
    } catch {
      return ['vexon-nitro-isolate', 'vexon-volcanic-rage'];
    }
  });

  // Quick View
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // User
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('vexon_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-1',
        fullName: 'Hamza Tariq',
        email: 'hamza.tariq@gmail.com',
        phone: '0300-4821945',
        addresses: [
          {
            id: 'addr-1',
            label: 'Home (Lahore)',
            fullName: 'Hamza Tariq',
            phone: '0300-4821945',
            province: 'Punjab',
            city: 'Lahore',
            area: 'DHA Phase 5, Sector C',
            address: 'House 42, Street 8, DHA Phase 5',
            postalCode: '54792',
            isDefault: true
          }
        ],
        savedForLaterIds: []
      };
    } catch {
      return null;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('vexon_orders');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; message?: string; type: 'success' | 'info' | 'error' }>>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('vexon_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('vexon_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('vexon_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders', e);
    }
  }, [orders]);

  // Persist user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('vexon_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('vexon_user');
      }
    } catch (e) {
      console.warn('Failed to save user', e);
    }
  }, [currentUser]);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (
    newRoute: ViewRoute, 
    params?: { productId?: string; category?: string; searchQuery?: string }
  ) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.category) {
      setSelectedCategoryFilter(params.category);
    } else if (newRoute !== 'shop') {
      // keep if on shop, otherwise don't wipe
    }
    if (params?.searchQuery !== undefined) {
      setSearchQuery(params.searchQuery);
    }
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const cartItemId = `${product.id}-${variant.id}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: Math.min(item.quantity + quantity, variant.stockCount || 99) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          variant,
          quantity,
          selectedWeight: variant.weight,
          selectedFlavour: variant.flavour,
          unitPrice: variant.price
        }
      ];
    });
    addToast('Added to Cart', `${product.name} (${variant.weight} - ${variant.flavour})`, 'success');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const maxStock = item.variant.stockCount || 99;
        return { ...item, quantity: Math.min(quantity, maxStock) };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    addToast('Item Removed', 'Product removed from your shopping cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'VEXON10') {
      setAppliedCoupon({ code: 'VEXON10', discountPercent: 10 });
      addToast('Coupon Applied!', '10% discount applied to your order subtotal.', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (trimmed === 'POWER15') {
      setAppliedCoupon({ code: 'POWER15', discountPercent: 15 });
      addToast('Coupon Applied!', '15% Power Lifter discount applied!', 'success');
      return { success: true, message: '15% discount applied!' };
    }
    if (trimmed === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', discountPercent: 0 });
      addToast('Free Shipping Applied!', 'Free shipping enabled nationwide.', 'success');
      return { success: true, message: 'Free shipping promo code unlocked!' };
    }
    addToast('Invalid Coupon', 'Code not recognized. Try VEXON10 or POWER15', 'error');
    return { success: false, message: 'Invalid or expired coupon code. Try VEXON10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'Discount removed.', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  
  // Free delivery across Pakistan above Rs. 8,000, or with FREESHIP coupon, otherwise Rs. 350
  const isFreeShipping = cartSubtotal >= 8000 || appliedCoupon?.code === 'FREESHIP' || cartCount === 0;
  const shippingFee = isFreeShipping ? 0 : 350;

  const discountAmount = appliedCoupon 
    ? Math.round(cartSubtotal * (appliedCoupon.discountPercent / 100))
    : 0;

  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + (cartCount > 0 ? shippingFee : 0));

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', product ? product.name : '', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to Wishlist', product ? product.name : '', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Quick View
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Auth
  const login = (email: string) => {
    const existing = currentUser || {
      id: 'usr-1',
      fullName: 'Hamza Tariq',
      email: email.trim(),
      phone: '0300-4821945',
      addresses: [],
      savedForLaterIds: []
    };
    setCurrentUser(existing);
    addToast('Logged In Successfully', `Welcome back, ${existing.fullName}!`, 'success');
    return true;
  };

  const register = (fullName: string, email: string, phone: string) => {
    const newUser: CustomerUser = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      phone,
      addresses: [],
      savedForLaterIds: []
    };
    setCurrentUser(newUser);
    addToast('Account Created', `Welcome to VEXON Elite, ${fullName}!`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Signed Out', 'You have been signed out safely.', 'info');
  };

  const updateUserAddress = (address: CustomerUser['addresses'][0]) => {
    if (!currentUser) return;
    setCurrentUser(prev => {
      if (!prev) return null;
      const filtered = prev.addresses.filter(a => a.id !== address.id);
      return {
        ...prev,
        addresses: [...filtered, address]
      };
    });
  };

  const placeOrder = (data: Omit<Order, 'id' | 'date' | 'timeline' | 'trackingNumber' | 'courier' | 'estimatedDelivery' | 'status'>): Order => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `VEX-${orderNumber}`;
    const today = new Date().toISOString().split('T')[0];
    const initialTimeline: OrderTimelineStep[] = [
      { step: 'Order Placed', timestamp: 'Just now', done: true, current: true, detail: 'Received and awaiting warehouse verification' },
      { step: 'Confirmed', timestamp: 'Within 30 mins', done: false, detail: 'Verification call / SMS confirmation for Pakistan dispatch' },
      { step: 'Processing', timestamp: 'Pending', done: false, detail: 'Tamper-evident holographic packaging and QC check' },
      { step: 'Shipped', timestamp: 'Pending', done: false, detail: 'Handover to TCS / Leopard Express Courier' },
      { step: 'Out for Delivery', timestamp: 'Expected 2-4 business days', done: false, detail: 'Rider dispatch in your city' },
      { step: 'Delivered', timestamp: 'Pending', done: false, detail: 'Cash collection or final receipt' }
    ];

    const newOrder: Order = {
      id: orderId,
      date: today,
      status: 'Order Placed',
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      items: data.items,
      subtotal: data.subtotal,
      shippingFee: data.shippingFee,
      discount: data.discount,
      total: data.total,
      paymentMethod: data.paymentMethod,
      trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courier: 'TCS Express Pakistan',
      estimatedDelivery: '2 to 4 Business Days',
      timeline: initialTimeline
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    addToast('Order Placed!', `Your order #${orderId} is confirmed. Cash payable: Rs. ${data.total.toLocaleString()}`, 'success');
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    const normalized = orderId.trim().toUpperCase();
    return orders.find(o => o.id.toUpperCase() === normalized || o.trackingNumber.toUpperCase() === normalized);
  };

  return (
    <StoreContext.Provider
      value={{
        route,
        selectedProductId,
        selectedCategoryFilter,
        navigateTo,
        cart,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        cartGrandTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        searchQuery,
        setSearchQuery,
        currentUser,
        login,
        register,
        logout,
        updateUserAddress,
        orders,
        placeOrder,
        getOrderById,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
