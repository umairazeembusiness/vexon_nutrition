import { Product, CustomerReview } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_athlete_powerlift_1794474630931.jpg';
export const WHEY_TUB_IMAGE = '/src/assets/images/product_whey_tub_1794474631251.jpg';
export const PREWORKOUT_IMAGE = '/src/assets/images/category_preworkout_energy_1794474632363.jpg';
export const PROMO_WORKOUT_IMAGE = '/src/assets/images/promo_lifestyle_workout_1794474632034.jpg';
export const VEXON_LOGO = '/assets/vexon-logo.png';

export const PRODUCTS: Product[] = [
  {
    id: 'vexon-nitro-isolate',
    name: 'VEXON Nitro Isolate 100% Pure Whey',
    brand: 'VEXON LABS',
    category: 'Whey Protein',
    slug: 'vexon-nitro-isolate-100-pure-whey',
    price: 18500,
    originalPrice: 21999,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 148,
    images: [
      WHEY_TUB_IMAGE,
      PREWORKOUT_IMAGE,
      WHEY_TUB_IMAGE,
    ],
    sku: 'VX-ISO-01',
    shortDescription: 'Ultra-pure cross-flow micro-filtered whey protein isolate with 27g protein and 6.2g BCAAs per scoop. Zero added sugar and rapid absorption for elite muscle synthesis.',
    description: 'VEXON Nitro Isolate sets the gold standard in sports nutrition. Formulated through cold-temperature microfiltration to eliminate excess fats, lactose, and impurities, every serving delivers 27g of pure bioactive whey isolate. Engineered specifically for athletes demanding lean muscle development, swift cellular recovery, and maximum digestive comfort.',
    benefits: [
      '27g Pure Whey Isolate per serving with 90%+ protein ratio',
      '6.2g Branched-Chain Amino Acids (BCAAs) for anti-catabolic protection',
      'Less than 1g carbs and 0g trans fats',
      'Infused with DigeZyme® multi-enzyme complex for rapid assimilation',
      'Cold micro-filtered to preserve delicate immunoglobulins'
    ],
    ingredients: [
      'Cold-Filtered Whey Protein Isolate',
      'Natural & Dutch Cocoa Flavoring',
      'Sunflower Lecithin (emulsifier)',
      'DigeZyme® Enzyme Complex (Amylase, Protease, Lactase, Lipase, Cellulase)',
      'Sucralose',
      'Himalayan Pink Salt'
    ],
    nutritionFacts: [
      { label: 'Calories', amount: '120 kcal' },
      { label: 'Protein', amount: '27g', dailyValue: '54%' },
      { label: 'Total Carbohydrates', amount: '0.8g', dailyValue: '<1%' },
      { label: 'Total Fat', amount: '0.5g', dailyValue: '1%' },
      { label: 'BCAAs', amount: '6.2g' },
      { label: 'Glutamine & Precursors', amount: '4.8g' },
      { label: 'Sodium', amount: '140mg', dailyValue: '6%' }
    ],
    servingSize: '1 Heaping Scoop (30g)',
    servingsPerContainer: 75,
    howToUse: 'Mix 1 scoop (30g) with 200-250ml of cold water, skimmed milk, or your favorite beverage in a VEXON shaker. Consume within 30 minutes post-workout or first thing in the morning.',
    specifications: [
      { label: 'Form', value: 'Instantized Powder' },
      { label: 'Dietary', value: 'Gluten Free, Low Lactose' },
      { label: 'Country of Formulation', value: 'USA & Germany Tech' },
      { label: 'Shelf Life', value: '24 Months' }
    ],
    variants: [
      { id: 'v1', weight: '5 lbs (2.27 kg)', flavour: 'Double Rich Chocolate', price: 18500, originalPrice: 21999, sku: 'VX-ISO-5LB-CHOC', inStock: true, stockCount: 24 },
      { id: 'v2', weight: '5 lbs (2.27 kg)', flavour: 'Gourmet Vanilla', price: 18500, originalPrice: 21999, sku: 'VX-ISO-5LB-VAN', inStock: true, stockCount: 18 },
      { id: 'v3', weight: '5 lbs (2.27 kg)', flavour: 'Strawberry Velvet', price: 18500, originalPrice: 21999, sku: 'VX-ISO-5LB-STR', inStock: true, stockCount: 9 },
      { id: 'v4', weight: '2 lbs (907 g)', flavour: 'Double Rich Chocolate', price: 8900, originalPrice: 9999, sku: 'VX-ISO-2LB-CHOC', inStock: true, stockCount: 31 },
      { id: 'v5', weight: '2 lbs (907 g)', flavour: 'Gourmet Vanilla', price: 8900, originalPrice: 9999, sku: 'VX-ISO-2LB-VAN', inStock: true, stockCount: 14 },
      { id: 'v6', weight: '10 lbs (4.54 kg)', flavour: 'Double Rich Chocolate', price: 34500, originalPrice: 38999, sku: 'VX-ISO-10LB-CHOC', inStock: true, stockCount: 6 }
    ],
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    isSpecialOffer: true,
    stockCount: 42,
    inStock: true,
    faqs: [
      {
        question: 'Is VEXON Nitro Isolate suitable for lactose-intolerant athletes?',
        answer: 'Yes. Thanks to cold cross-flow micro-filtration and the addition of lactase enzyme in our DigeZyme® blend, lactose content is under 0.2g per serving, making it exceptionally gentle on the stomach.'
      },
      {
        question: 'How do I authenticate my VEXON supplement tub?',
        answer: 'Every authentic VEXON tub features a holographic scratch-code seal on the lid that can be verified directly on our verification portal or at our flagship store in Liberty Market, Lahore.'
      }
    ]
  },
  {
    id: 'vexon-volcanic-rage',
    name: 'VEXON Volcanic Rage High-Stim Pre-Workout',
    brand: 'VEXON ELITE',
    category: 'Pre-Workout',
    slug: 'vexon-volcanic-rage-high-stim-pre-workout',
    price: 8999,
    originalPrice: 10500,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 96,
    images: [
      PREWORKOUT_IMAGE,
      WHEY_TUB_IMAGE,
      PREWORKOUT_IMAGE,
    ],
    sku: 'VX-VOL-02',
    shortDescription: 'Clinically-dosed high-stimulant pre-workout with 8g L-Citrulline, 3.2g Beta-Alanine, and 350mg Dual-Stage Caffeine for skin-splitting pumps and laser focus.',
    description: 'Volcanic Rage is engineered for lifters who refuse to settle for mediocre sessions. Powered by pure Fermented L-Citrulline Malate, patented Nitrosigine®, Alpha-GPC for cognitive drive, and anhydrous caffeine paired with Infinergy™ di-caffeine malate to eliminate the dreaded mid-workout crash.',
    benefits: [
      '8,000mg L-Citrulline for extreme vasodilation and muscle pumps',
      '3,200mg Beta-Alanine for intramuscular carnosine buffering',
      '350mg Precision Caffeine Matrix for relentless, clean drive',
      '600mg Alpha-GPC for intense mind-muscle connection',
      'Zero sugar, zero fillers, zero crash'
    ],
    ingredients: [
      'L-Citrulline Malate 2:1',
      'Beta-Alanine (Carnosyn®)',
      'Betaine Anhydrous',
      'L-Tyrosine',
      'Alpha-Glycerylphosphorylcholine (Alpha-GPC)',
      'Caffeine Anhydrous',
      'Infinergy™ (Di-Caffeine Malate)',
      'AstraGin® (Panax notoginseng & Astragalus)',
      'Natural Flavors, Malic Acid, Sucralose'
    ],
    nutritionFacts: [
      { label: 'L-Citrulline (Pure)', amount: '8,000mg' },
      { label: 'Beta-Alanine', amount: '3,200mg' },
      { label: 'Betaine Anhydrous', amount: '2,500mg' },
      { label: 'Total Caffeine Yield', amount: '350mg' },
      { label: 'Alpha-GPC (50%)', amount: '600mg' },
      { label: 'AstraGin®', amount: '50mg' }
    ],
    servingSize: '1 Level Scoop (18.5g)',
    servingsPerContainer: 40,
    howToUse: 'Assess tolerance by taking 1/2 scoop with 250ml cold water 20 minutes before training. Advanced users take 1 full scoop 20-30 minutes before intense workouts. Do not consume within 5 hours of sleep.',
    specifications: [
      { label: 'Format', value: 'High-Solubility Powder' },
      { label: 'Stimulant Level', value: 'High (350mg)' },
      { label: 'Formulation', value: 'Fully Disclosed Label' },
      { label: 'Servings', value: '40 Full Servings' }
    ],
    variants: [
      { id: 'vr1', weight: '740g (40 Servings)', flavour: 'Volcanic Fire Punch', price: 8999, originalPrice: 10500, sku: 'VX-VOL-40-FP', inStock: true, stockCount: 19 },
      { id: 'vr2', weight: '740g (40 Servings)', flavour: 'Sour Blue Raspberry', price: 8999, originalPrice: 10500, sku: 'VX-VOL-40-BR', inStock: true, stockCount: 22 },
      { id: 'vr3', weight: '740g (40 Servings)', flavour: 'Midnight Watermelon', price: 8999, originalPrice: 10500, sku: 'VX-VOL-40-WM', inStock: true, stockCount: 15 }
    ],
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    isSpecialOffer: false,
    stockCount: 56,
    inStock: true,
    faqs: [
      {
        question: 'Why do I feel tingles after drinking Volcanic Rage?',
        answer: 'The harmless tingling sensation (paresthesia) is caused by clinical Beta-Alanine, which helps buffer lactic acid in muscle fibers so you can push through intense sets.'
      }
    ]
  },
  {
    id: 'vexon-creatine-creapure',
    name: 'VEXON Creapure® Micronized Creatine 200 Mesh',
    brand: 'VEXON LABS',
    category: 'Creatine',
    slug: 'vexon-creapure-micronized-creatine-200-mesh',
    price: 7499,
    originalPrice: 8800,
    discountPercent: 15,
    rating: 5.0,
    reviewCount: 215,
    images: [
      WHEY_TUB_IMAGE,
      PREWORKOUT_IMAGE,
    ],
    sku: 'VX-CREA-03',
    shortDescription: 'The purest German Creapure® creatine monohydrate milled to 200 mesh for effortless solubility, ATP cellular regeneration, and raw power output.',
    description: 'VEXON Creapure® delivers pharmaceutical-grade 99.99% pure German-manufactured creatine monohydrate. Micronized at ultra-fine 200 mesh to dissolve instantly in any beverage without gritty residue. Backed by hundreds of clinical trials to accelerate explosive strength, increase muscle intracellular hydration, and boost power output.',
    benefits: [
      'Genuine Creapure® raw material sourced directly from Alzchem, Germany',
      'Ultra-fine 200 mesh particle size for complete suspension without settling',
      'Boosts ATP energy synthesis during heavy resistance sets',
      'Unflavored formulation mixes invisibly with protein shakes or juices',
      'Batch-tested for zero heavy metals, DCD, and DHT impurities'
    ],
    ingredients: [
      '100% Creapure® Micronized Creatine Monohydrate (200 Mesh)'
    ],
    nutritionFacts: [
      { label: 'Creapure® Creatine Monohydrate', amount: '5,000mg', dailyValue: '**' }
    ],
    servingSize: '1 Scoop (5g)',
    servingsPerContainer: 100,
    howToUse: 'Take 1 scoop (5g) daily mixed with 250ml water or protein shake. Timing is versatile: post-workout or with a carbohydrate-rich meal yields peak absorption.',
    specifications: [
      { label: 'Purity Level', value: '99.99% German Creapure' },
      { label: 'Mesh Count', value: '200 Mesh Micronized' },
      { label: 'Origin', value: 'Alzchem Trostberg, Germany' },
      { label: 'Taste', value: '100% Neutral / Unflavored' }
    ],
    variants: [
      { id: 'cr1', weight: '500g (100 Servings)', flavour: 'Unflavored Pure', price: 7499, originalPrice: 8800, sku: 'VX-CREA-500G', inStock: true, stockCount: 45 },
      { id: 'cr2', weight: '250g (50 Servings)', flavour: 'Unflavored Pure', price: 4200, originalPrice: 4999, sku: 'VX-CREA-250G', inStock: true, stockCount: 30 }
    ],
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    isSpecialOffer: false,
    stockCount: 75,
    inStock: true,
    faqs: [
      {
        question: 'Do I need a loading phase for VEXON Creatine?',
        answer: 'A loading phase is optional. Taking 5g consistently once daily will fully saturate muscle creatine phosphagen stores within 3 to 4 weeks.'
      }
    ]
  },
  {
    id: 'vexon-anabolic-mass-titan',
    name: 'VEXON Anabolic Titan Heavyweight Mass Gainer',
    brand: 'VEXON ELITE',
    category: 'Mass Gainer',
    slug: 'vexon-anabolic-titan-heavyweight-mass-gainer',
    price: 16999,
    originalPrice: 19500,
    discountPercent: 13,
    rating: 4.7,
    reviewCount: 84,
    images: [
      WHEY_TUB_IMAGE,
      PROMO_WORKOUT_IMAGE,
    ],
    sku: 'VX-MASS-04',
    shortDescription: '1,280 nutrient-dense clean calories, 60g multi-phase sustained protein, and complex complex carbs from oat and sweet potato to break hardgainer plateaus.',
    description: 'Designed specifically for hardgainers and high-metabolism strength athletes. Anabolic Titan steers clear of cheap maltodextrin spikes by utilizing an advanced clean carb blend from whole oat flour and organic sweet potato along with whey isolate, micellar casein, and egg albumin for sustained 8-hour anabolic nitrogen retention.',
    benefits: [
      '1,280 clean calories per full serving',
      '60g multi-stage protein (Whey Isolate, Concentrate, Micellar Casein)',
      'Complex carb source: Whole Oat Flour & Sweet Potato',
      'Enriched with 5g Creatine Monohydrate and MCT healthy fats',
      'Rich milkshake texture without bloating'
    ],
    ingredients: [
      'VEXON Sustained Carb Matrix (Oat Powder, Sweet Potato, Organic Waxy Maize)',
      'Multi-Phase Protein Blend (Whey Isolate, Whey Concentrate, Micellar Casein)',
      'Medium Chain Triglycerides (MCT Oil Powder)',
      'Creatine Monohydrate',
      'Dutch Cocoa',
      'Enzyme Blend'
    ],
    nutritionFacts: [
      { label: 'Calories', amount: '1,280 kcal' },
      { label: 'Protein', amount: '60g', dailyValue: '120%' },
      { label: 'Total Carbohydrates', amount: '235g', dailyValue: '85%' },
      { label: 'Dietary Fiber', amount: '8g', dailyValue: '28%' },
      { label: 'Total Fats', amount: '12g', dailyValue: '15%' },
      { label: 'Creatine Monohydrate', amount: '5,000mg' }
    ],
    servingSize: '2 Scoops (340g)',
    servingsPerContainer: 16,
    howToUse: 'Mix 2 scoops with 500-600ml of cold whole milk or water in a blender. Split into two half-servings daily between meals and post-workout.',
    specifications: [
      { label: 'Target', value: 'Hardgainers & Bulk Cycles' },
      { label: 'Carb-to-Protein Ratio', value: '4:1 Clean Matrix' },
      { label: 'Net Weight', value: '12 lbs (5.44 kg)' }
    ],
    variants: [
      { id: 'mg1', weight: '12 lbs (5.44 kg)', flavour: 'Chocolate Fudge Brownie', price: 16999, originalPrice: 19500, sku: 'VX-MASS-12LB-CHOC', inStock: true, stockCount: 16 },
      { id: 'mg2', weight: '12 lbs (5.44 kg)', flavour: 'Creamy Peanut Butter', price: 16999, originalPrice: 19500, sku: 'VX-MASS-12LB-PB', inStock: true, stockCount: 11 },
      { id: 'mg3', weight: '6 lbs (2.72 kg)', flavour: 'Chocolate Fudge Brownie', price: 9800, originalPrice: 11200, sku: 'VX-MASS-6LB-CHOC', inStock: true, stockCount: 20 }
    ],
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    isSpecialOffer: false,
    stockCount: 47,
    inStock: true,
    faqs: [
      {
        question: 'Will this cause stomach discomfort or heavy bloating?',
        answer: 'No. Unlike gainers packed with dextrose and cheap corn syrup, Titan uses low-GI whole oats and digestive enzymes to ensure clean absorption and zero bloat.'
      }
    ]
  },
  {
    id: 'vexon-bcaa-ea-matrix',
    name: 'VEXON Amino Surge 9 EAA + BCAA Matrix',
    brand: 'VEXON LABS',
    category: 'Amino Acids / BCAA',
    slug: 'vexon-amino-surge-9-eaa-bcaa-matrix',
    price: 6800,
    originalPrice: 7999,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 67,
    images: [
      PREWORKOUT_IMAGE,
      WHEY_TUB_IMAGE,
    ],
    sku: 'VX-EAA-05',
    shortDescription: 'Complete spectrum of all 9 Essential Amino Acids with 7g fermented vegan BCAAs in 2:1:1 ratio plus real coconut water electrolytes for cellular hydration.',
    description: 'Fuel muscle recovery intra-workout with Amino Surge. Providing all 9 essential amino acids that your body cannot synthesize internally, fermented from plant sources. Combined with raw freeze-dried coconut water crystals and pink Himalayan salt to maintain electrolyte balance during grueling heat.',
    benefits: [
      '7,000mg Fermented InstAminos® BCAAs (Leucine, Isoleucine, Valine)',
      '2,500mg Essential Amino Acids (EAAs) for full muscle protein synthesis',
      'Raw freeze-dried coconut water powder for intra-workout hydration',
      'Zero sugar, crisp mouthfeel, zero artificial color dyes',
      'Prevents muscle breakdown during fasted cardio and calorie deficits'
    ],
    ingredients: [
      'Vegan Fermented L-Leucine',
      'L-Isoleucine',
      'L-Valine',
      'L-Lysine, L-Threonine, L-Phenylalanine, L-Histidine, L-Methionine, L-Tryptophan',
      'Freeze-Dried Coconut Water Powder',
      'Electrolyte Mineral Blend (Potassium Citrate, Magnesium Malate, Himalayan Salt)',
      'Citric Acid, Stevia, Natural Flavor'
    ],
    nutritionFacts: [
      { label: '2:1:1 BCAAs', amount: '7,000mg' },
      { label: 'EAA Complex', amount: '2,500mg' },
      { label: 'Coconut Water Powder', amount: '500mg' },
      { label: 'Electrolyte Mineral Complex', amount: '380mg' }
    ],
    servingSize: '1 Scoop (14g)',
    servingsPerContainer: 30,
    howToUse: 'Sip 1 scoop mixed into 400-500ml ice-cold water during training or between meals to boost recovery.',
    specifications: [
      { label: 'Source', value: '100% Plant Fermented' },
      { label: 'Dyes', value: 'Zero Artificial Dyes' },
      { label: 'Electrolytes', value: 'Infused with Coconut Water' }
    ],
    variants: [
      { id: 'ea1', weight: '420g (30 Servings)', flavour: 'Crisp Green Apple', price: 6800, originalPrice: 7999, sku: 'VX-EAA-GA', inStock: true, stockCount: 28 },
      { id: 'ea2', weight: '420g (30 Servings)', flavour: 'Blood Orange Splash', price: 6800, originalPrice: 7999, sku: 'VX-EAA-BO', inStock: true, stockCount: 19 }
    ],
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    isSpecialOffer: false,
    stockCount: 47,
    inStock: true,
    faqs: [
      {
        question: 'Can I take this while intermittent fasting?',
        answer: 'Yes. With zero sugar and minimal caloric footprint, it provides muscular protection without breaking insulin-sensitive fasting states.'
      }
    ]
  },
  {
    id: 'vexon-thermo-shred-elite',
    name: 'VEXON ThermoShred Black Extreme Thermogenic',
    brand: 'VEXON ELITE',
    category: 'Fat Burners',
    slug: 'vexon-thermoshred-black-extreme-thermogenic',
    price: 6499,
    originalPrice: 7500,
    discountPercent: 13,
    rating: 4.6,
    reviewCount: 52,
    images: [
      PREWORKOUT_IMAGE,
      WHEY_TUB_IMAGE,
    ],
    sku: 'VX-THRM-06',
    shortDescription: 'Multi-pathway metabolic booster featuring CapsiMax® cayenne extract, Grains of Paradise, L-Carnitine L-Tartrate, and Green Tea EGCG for targeted caloric expenditure.',
    description: 'ThermoShred Black is precision-calibrated to torch stubborn fat while preserving hard-earned lean muscle mass. Using clinically validated natural thermogenics to elevate resting metabolic rate, suppress cravings, and deliver smooth mental clarity without jitters.',
    benefits: [
      'Elevates basal metabolic rate via CapsiMax® beadlets',
      'Targeted fatty acid oxidation with 1,500mg L-Carnitine L-Tartrate',
      'Suppresses appetite and controls afternoon carbohydrate cravings',
      'Clean all-day sustained energy without nervous tremors'
    ],
    ingredients: [
      'L-Carnitine L-Tartrate',
      'Green Tea Leaf Extract (50% EGCG)',
      'CapsiMax® (Capsicum Fruit Extract)',
      'Paradoxine® (Grains of Paradise Extract)',
      'Natural Caffeine from Arabica Bean',
      'BioPerine® (Black Pepper Fruit Extract)',
      'Vegetable Capsule (HPMC)'
    ],
    nutritionFacts: [
      { label: 'L-Carnitine L-Tartrate', amount: '1,500mg' },
      { label: 'Green Tea Extract (EGCG)', amount: '400mg' },
      { label: 'CapsiMax® Cayenne', amount: '100mg' },
      { label: 'Paradoxine®', amount: '50mg' },
      { label: 'BioPerine®', amount: '5mg' }
    ],
    servingSize: '2 Capsules',
    servingsPerContainer: 60,
    howToUse: 'Take 2 capsules with a glass of water first thing in the morning with breakfast. Advanced users may take an additional 1 capsule before afternoon cardio.',
    specifications: [
      { label: 'Capsules', value: '120 Veggie Capsules' },
      { label: 'Formula', value: 'Thermogenic & Lipolytic' },
      { label: 'Purity', value: 'Third-Party Verified' }
    ],
    variants: [
      { id: 'ts1', weight: '120 Capsules (60 Servings)', flavour: 'Standard Capsules', price: 6499, originalPrice: 7500, sku: 'VX-THRM-120CAP', inStock: true, stockCount: 35 }
    ],
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    isSpecialOffer: false,
    stockCount: 35,
    inStock: true,
    faqs: [
      {
        question: 'Should I take ThermoShred with food?',
        answer: 'Yes, taking it with breakfast or a light meal minimizes potential warmth or stomach sensitivity from the high-potency cayenne pepper extract.'
      }
    ]
  },
  {
    id: 'vexon-multivitamin-iron-forge',
    name: 'VEXON Iron Forge Athletic Daily Multivitamin & Minerals',
    brand: 'VEXON LABS',
    category: 'Vitamins & Minerals',
    slug: 'vexon-iron-forge-athletic-daily-multivitamin',
    price: 4500,
    originalPrice: 5200,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 112,
    images: [
      WHEY_TUB_IMAGE,
      PREWORKOUT_IMAGE,
    ],
    sku: 'VX-VITA-07',
    shortDescription: 'Comprehensive high-potency micronutrient formula with 32 active vitamins, chelated minerals, bioflavonoids, and antioxidant greens tailored for athletes.',
    description: 'Athletes deplete vital micronutrients at triple the rate of sedentary individuals. Iron Forge supplies full RDA spectrums of bioavailable chelated zinc, magnesium glycinate, methylated B-complex, high-potency Vitamin D3/K2, and antioxidant berry extracts for peak immune resistance and hormone synthesis.',
    benefits: [
      '32 Active micronutrients calibrated for high-performance training',
      'Chelated Albion® minerals for superior gastrointestinal absorption',
      'High-potency Vitamin D3 (5,000 IU) + K2 (MK-7) for bone and heart health',
      'Zinc Bisglycinate & Magnesium Glycinate to support natural testosterone'
    ],
    ingredients: [
      'Vitamin A, C, D3, E, K2',
      'Active Methylated B-Complex (B1, B2, B3, B6, Methylfolate, B12 Methylcobalamin)',
      'TRAACS® Zinc Bisglycinate Chelate',
      'Magnesium Bisglycinate Chelate',
      'Selenium, Copper, Chromium, Boron',
      'Organic Greens & Superberry Blend'
    ],
    nutritionFacts: [
      { label: 'Vitamin D3 (as Cholecalciferol)', amount: '5,000 IU', dailyValue: '625%' },
      { label: 'Vitamin C (Ascorbic Acid)', amount: '500mg', dailyValue: '556%' },
      { label: 'Zinc (Bisglycinate)', amount: '30mg', dailyValue: '273%' },
      { label: 'Magnesium (Chelate)', amount: '200mg', dailyValue: '48%' },
      { label: 'Vitamin B12 (Methylcobalamin)', amount: '250mcg', dailyValue: '10,417%' }
    ],
    servingSize: '2 Tablets',
    servingsPerContainer: 60,
    howToUse: 'Take 2 tablets daily with your largest whole-food meal, preferably breakfast or lunch.',
    specifications: [
      { label: 'Quantity', value: '120 Tablets' },
      { label: 'Coating', value: 'Easy-Swallow Plant Cellulose' },
      { label: 'Allergens', value: 'None' }
    ],
    variants: [
      { id: 'vta1', weight: '120 Tablets (60 Days)', flavour: 'Standard Unflavored', price: 4500, originalPrice: 5200, sku: 'VX-VITA-120TAB', inStock: true, stockCount: 60 }
    ],
    isBestSeller: false,
    isTrending: false,
    isNewArrival: false,
    isSpecialOffer: false,
    stockCount: 60,
    inStock: true,
    faqs: [
      {
        question: 'Why does urine turn neon yellow after taking Iron Forge?',
        answer: 'This is completely normal and harmless. It is simply the body passing excess Riboflavin (Vitamin B2), which has a natural fluorescent yellow-green tint.'
      }
    ]
  },
  {
    id: 'vexon-pro-steel-shaker',
    name: 'VEXON Pro-Grade Insulated Matte Black Shaker 750ml',
    brand: 'VEXON ACCESSORIES',
    category: 'Gym Accessories',
    slug: 'vexon-pro-grade-insulated-matte-black-shaker-750ml',
    price: 2499,
    originalPrice: 2999,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 78,
    images: [
      PREWORKOUT_IMAGE,
      WHEY_TUB_IMAGE,
    ],
    sku: 'VX-ACC-08',
    shortDescription: 'Double-wall vacuum insulated 18/8 kitchen-grade stainless steel bottle. Keeps pre-workouts ice cold for 24 hours with leak-proof screw cap and silent blending grate.',
    description: 'Upgrade from plastic shakers that absorb foul odor. The VEXON Pro-Grade Shaker features food-grade 304 stainless steel with durable laser-engraved VEXON branding, a heavy-duty silicone seal that guarantees zero leaks in gym bags, and a built-in silent agitator for smooth clump-free shakes.',
    benefits: [
      'Double-wall vacuum insulation keeps liquids cold for 24 hours',
      'Food-grade 18/8 stainless steel prevents odors and staining',
      '100% Leak-proof lock-tight flip cap',
      'Internal volume markings up to 750ml (25 oz)',
      'BPA-free and top-rack dishwasher safe'
    ],
    ingredients: [
      '304 Kitchen-Grade Stainless Steel',
      'BPA-Free Polypropylene Lid',
      'Food-Grade Silicone Gasket'
    ],
    nutritionFacts: [],
    servingSize: 'N/A',
    servingsPerContainer: 0,
    howToUse: 'Hand wash before first use. Perfect for cold protein shakes, pre-workout, or ice water.',
    specifications: [
      { label: 'Capacity', value: '750 ml (25 oz)' },
      { label: 'Material', value: '304 Stainless Steel' },
      { label: 'Thermal Retention', value: '24 Hours Cold' },
      { label: 'Finish', value: 'Powder-Coated Matte Black' }
    ],
    variants: [
      { id: 'sh1', weight: '750ml', flavour: 'Stealth Matte Black', price: 2499, originalPrice: 2999, sku: 'VX-SHK-750-BLK', inStock: true, stockCount: 40 },
      { id: 'sh2', weight: '750ml', flavour: 'Crimson Red Edition', price: 2499, originalPrice: 2999, sku: 'VX-SHK-750-RED', inStock: true, stockCount: 25 }
    ],
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    isSpecialOffer: false,
    stockCount: 65,
    inStock: true,
    faqs: [
      {
        question: 'Does this bottle sweat with ice inside?',
        answer: 'No. The double-wall vacuum insulation prevents condensation on the outer powder-coated shell entirely.'
      }
    ]
  },
  {
    id: 'vexon-figure-8-lifting-straps',
    name: 'VEXON Heavy-Duty Figure 8 Lifting Straps (Pair)',
    brand: 'VEXON ACCESSORIES',
    category: 'Gym Accessories',
    slug: 'vexon-heavy-duty-figure-8-lifting-straps',
    price: 2199,
    originalPrice: 2600,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 43,
    images: [
      PROMO_WORKOUT_IMAGE,
      WHEY_TUB_IMAGE,
    ],
    sku: 'VX-ACC-09',
    shortDescription: 'Reinforced dual-loop heavy cotton webbing rated for 1,000+ lbs deadlifts. Padded neoprene wrist cushion to lock your grip onto any barbell.',
    description: 'Tired of grip fatigue limiting your deadlifts, rack pulls, and heavy shrugs? VEXON Figure 8 straps lock your wrists securely onto the bar so your posterior chain works to true muscular failure without grip slippage.',
    benefits: [
      'Rated for loads exceeding 500kg (1,100 lbs)',
      'High-density cotton canvas with heavy cross-stitched nylon thread',
      'Plush neoprene padding protects wrists from friction and pinching',
      'Easy slip-on double loop system for instant barbell lock'
    ],
    ingredients: ['Heavy Cotton Canvas', 'Neoprene Foam', 'Industrial Nylon Thread'],
    nutritionFacts: [],
    servingSize: 'N/A',
    servingsPerContainer: 0,
    howToUse: 'Slide wrist through one loop, wrap strap under the barbell, and pass wrist through the remaining loop. Clench fist over the strap and lift.',
    specifications: [
      { label: 'Load Rating', value: '1,100+ lbs (500kg)' },
      { label: 'Wrist Padding', value: '5mm High-Density Neoprene' },
      { label: 'Pair', value: 'Includes 2 Straps (Left & Right)' }
    ],
    variants: [
      { id: 'st1', weight: 'Standard Bar (Medium)', flavour: 'Black & VEXON Red', price: 2199, originalPrice: 2600, sku: 'VX-STRAP-M', inStock: true, stockCount: 38 },
      { id: 'st2', weight: 'Axle Bar / Large Wrist', flavour: 'Black & VEXON Red', price: 2199, originalPrice: 2600, sku: 'VX-STRAP-L', inStock: true, stockCount: 22 }
    ],
    isBestSeller: false,
    isTrending: false,
    isNewArrival: false,
    isSpecialOffer: false,
    stockCount: 60,
    inStock: true,
    faqs: [
      {
        question: 'Are these approved for powerlifting or strongman training?',
        answer: 'They are widely used in strongman and heavy gym deadlift sessions. Check your specific powerlifting federation rules for competition gear guidelines.'
      }
    ]
  }
];

export const CATEGORIES = [
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    slug: 'whey-protein',
    image: WHEY_TUB_IMAGE,
    description: 'Ultra-pure isolate and micro-filtered concentrate for elite muscle protein synthesis.',
    itemCount: 24
  },
  {
    id: 'creatine',
    name: 'Creatine',
    slug: 'creatine',
    image: WHEY_TUB_IMAGE,
    description: 'Pure Creapure® German micronized powder for explosive ATP strength and cell volume.',
    itemCount: 8
  },
  {
    id: 'mass-gainer',
    name: 'Mass Gainer',
    slug: 'mass-gainer',
    image: PROMO_WORKOUT_IMAGE,
    description: 'Clean high-calorie mass formulas with whole oats and multi-stage anabolic proteins.',
    itemCount: 12
  },
  {
    id: 'pre-workout',
    name: 'Pre-Workout',
    slug: 'pre-workout',
    image: PREWORKOUT_IMAGE,
    description: 'High-stim pump and cognitive formulas with clinical L-citrulline and beta-alanine.',
    itemCount: 16
  },
  {
    id: 'amino-acids-bcaa',
    name: 'Amino Acids / BCAA',
    slug: 'amino-acids-bcaa',
    image: PREWORKOUT_IMAGE,
    description: 'Fermented plant EAAs and BCAAs with hydration electrolytes to halt muscle catabolism.',
    itemCount: 10
  },
  {
    id: 'fat-burners',
    name: 'Fat Burners',
    slug: 'fat-burners',
    image: PREWORKOUT_IMAGE,
    description: 'Thermogenic metabolic catalysts for accelerated lipid oxidation and clean energy.',
    itemCount: 7
  },
  {
    id: 'vitamins-minerals',
    name: 'Vitamins & Minerals',
    slug: 'vitamins-minerals',
    image: WHEY_TUB_IMAGE,
    description: 'High-potency chelated athletic multivitamins, zinc, magnesium and Vitamin D3/K2.',
    itemCount: 9
  },
  {
    id: 'gym-accessories',
    name: 'Gym Accessories',
    slug: 'gym-accessories',
    image: HERO_IMAGE,
    description: 'Pro-grade stainless steel shakers, heavy-duty lifting straps, gym apparel and wraps.',
    itemCount: 14
  }
];

export const VERIFIED_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Hamza Malik',
    city: 'Lahore (DHA Phase 5)',
    rating: 5,
    date: '3 days ago',
    title: 'Authentic quality, delivered in 24 hours to Lahore',
    comment: 'Ordered VEXON Nitro Isolate Double Rich Chocolate. Verification code on the lid checked out 100% authentic. The mixability is world-class, zero clumps in cold water, and no bloating at all. Best supplement store in Pakistan!',
    verifiedPurchase: true,
    productName: 'VEXON Nitro Isolate 100% Pure Whey'
  },
  {
    id: 'rev-2',
    author: 'Dr. Bilal Qureshi',
    city: 'Islamabad (F-7)',
    rating: 5,
    date: '1 week ago',
    title: 'German Creapure is the real deal',
    comment: 'Hard to find genuine Alzchem Creapure in Pakistan without worrying about counterfeits. VEXON delivered to Islamabad via Leopard courier in 2 days. The 200 mesh powder dissolves completely clear. Incredible pump and strength boost.',
    verifiedPurchase: true,
    productName: 'VEXON Creapure® Micronized Creatine 200 Mesh'
  },
  {
    id: 'rev-3',
    author: 'Farhan Tariq',
    city: 'Karachi (Clifton)',
    rating: 5,
    date: '2 weeks ago',
    title: 'Volcanic Rage is unmatched',
    comment: 'The 8g Citrulline pump is insane. No crash 2 hours later like cheap high-caffeine preworkouts. Paid Cash on Delivery at my doorstep in Karachi. Customer support on WhatsApp answered my stack questions immediately.',
    verifiedPurchase: true,
    productName: 'VEXON Volcanic Rage High-Stim Pre-Workout'
  },
  {
    id: 'rev-4',
    author: 'Usman Javed',
    city: 'Faisalabad',
    rating: 5,
    date: '3 weeks ago',
    title: 'Clean calories that actually work',
    comment: 'Gained 3.5kg of solid weight on the Anabolic Titan mass gainer over 6 weeks. Real oats and sweet potato instead of pure sugar. Taste in whole milk is like a rich bakery milkshake.',
    verifiedPurchase: true,
    productName: 'VEXON Anabolic Titan Heavyweight Mass Gainer'
  }
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Mirpur (AJK)',
  'Sukkur',
  'Wah Cantt',
  'Sheikhupura'
];

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa (KPK)',
  'Islamabad Capital Territory',
  'Balochistan',
  'Azad Jammu & Kashmir (AJK)',
  'Gilgit-Baltistan'
];
