export interface ProductVariant {
  id: string;
  weight: string;
  flavour: string;
  price: number;
  originalPrice: number;
  sku: string;
  inStock: boolean;
  stockCount: number;
  image?: string;
}

export interface NutritionFact {
  label: string;
  amount: string;
  dailyValue?: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 
    | 'Whey Protein'
    | 'Creatine'
    | 'Mass Gainer'
    | 'Pre-Workout'
    | 'Amino Acids / BCAA'
    | 'Fat Burners'
    | 'Vitamins & Minerals'
    | 'Gym Accessories';
  slug: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sku: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  nutritionFacts: NutritionFact[];
  servingSize: string;
  servingsPerContainer: number;
  howToUse: string;
  specifications: { label: string; value: string }[];
  variants: ProductVariant[];
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isSpecialOffer?: boolean;
  stockCount: number;
  inStock: boolean;
  faqs: ProductFaq[];
}

export interface CartItem {
  id: string; // unique combo of product id + variant
  product: Product;
  variant: ProductVariant;
  quantity: number;
  selectedWeight: string;
  selectedFlavour: string;
  unitPrice: number;
}

export interface CustomerAddress {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  area: string;
  address: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addresses: CustomerAddress[];
  savedForLaterIds: string[];
}

export interface OrderItem {
  productId: string;
  name: string;
  variantInfo: string;
  quantity: number;
  unitPrice: number;
  total: number;
  image: string;
}

export interface OrderTimelineStep {
  step: 'Order Placed' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  timestamp: string;
  done: boolean;
  current?: boolean;
  detail: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Order Placed' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  customerName: string;
  email: string;
  phone: string;
  address: {
    province: string;
    city: string;
    area: string;
    fullAddress: string;
    postalCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'Cash on Delivery (COD)' | 'Direct Bank Transfer';
  trackingNumber: string;
  courier: string;
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  productName?: string;
}

export type ViewRoute =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'wishlist'
  | 'checkout'
  | 'account'
  | 'orders'
  | 'order-tracking'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'privacy'
  | 'terms'
  | 'shipping-policy';
