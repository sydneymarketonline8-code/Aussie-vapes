import type { Product } from '@/types'

const IMG = (name: string, w = 600, h = 600) =>
  `https://placehold.co/${w}x${h}/1c1c1c/06b6d4?text=${encodeURIComponent(name)}`

export const PRODUCTS: Product[] = [
  // ─── Disposable Vapes ──────────────────────────────────────────
  {
    id: 'prod-001',
    slug: 'cloudburst-pro-10000',
    name: 'CloudBurst Pro 10000',
    brand: 'CloudBurst',
    sku: 'CB-PRO-10K',
    price: 39.95,
    comparePrice: 49.95,
    images: [IMG('CloudBurst Pro'), IMG('CloudBurst Side'), IMG('CloudBurst Box')],
    category: 'disposable-vapes',
    subcategory: 'high-puff',
    tags: ['disposable', 'high-puff', 'bestseller', 'mesh-coil'],
    description:
      'The CloudBurst Pro 10000 is engineered for Australian vapers who demand the absolute best. Featuring a dual mesh coil system, 10,000 puff capacity, and a 650mAh rechargeable battery via USB-C, this device delivers rich, consistent flavour from the first puff to the last. Available in 15 premium Australian-curated flavours.',
    shortDescription: '10,000 puff rechargeable disposable with dual mesh coil technology.',
    features: [
      '10,000 puff capacity',
      'Dual mesh coil for richer flavour',
      '650mAh rechargeable via USB-C',
      '20mg nicotine salt',
      'Adjustable airflow control',
      'LED battery indicator',
      'Child-resistant mouthpiece',
    ],
    specifications: {
      'Puff Count': '10,000',
      'Nicotine Strength': '20mg/mL (2%)',
      'E-liquid Capacity': '18mL',
      'Battery': '650mAh rechargeable',
      'Charging': 'USB-C',
      'Coil Type': 'Dual mesh',
      'Airflow': 'Adjustable',
    },
    inStock: true,
    stockCount: 148,
    rating: 4.8,
    reviewCount: 312,
    isNew: false,
    isBestSeller: true,
    isSale: true,
    relatedProductSlugs: ['arcblast-8000', 'zephyrflex-6000', 'strikepod-8500'],
    seoTitle: 'CloudBurst Pro 10000 Puff Disposable Vape | VapeVault AU',
    seoDescription:
      'Buy the CloudBurst Pro 10000 puff rechargeable disposable vape in Australia. Dual mesh coil, 15 flavours, fast AU shipping. From $39.95.',
    flavours: ['Watermelon Ice', 'Mango Peach', 'Blueberry Raspberry', 'Strawberry Kiwi', 'Lychee Ice', 'Grape Ice', 'Passion Fruit', 'Cool Mint', 'Mixed Berry', 'Peach Ice', 'Pineapple Coconut', 'Spearmint', 'Bubblegum', 'Pink Lemonade', 'Cherry Cola'],
    nicotineStrengths: ['20mg'],
  },
  {
    id: 'prod-002',
    slug: 'arcblast-8000',
    name: 'ArcBlast 8000',
    brand: 'ArcBlast',
    sku: 'AB-8000-AU',
    price: 29.95,
    images: [IMG('ArcBlast 8000'), IMG('ArcBlast Side')],
    category: 'disposable-vapes',
    subcategory: 'mid-range',
    tags: ['disposable', 'rechargeable', 'value'],
    description:
      'The ArcBlast 8000 strikes the perfect balance between performance and value. With 8,000 smooth puffs and a USB-C rechargeable battery, it is ideal for everyday Australian vapers seeking reliable flavour without the premium price tag.',
    shortDescription: '8,000 puff rechargeable disposable — premium performance, value price.',
    features: [
      '8,000 puff capacity',
      'Single mesh coil',
      '500mAh rechargeable via USB-C',
      '20mg nicotine salt',
      'Draw-activated firing',
      '12 available flavours',
    ],
    specifications: {
      'Puff Count': '8,000',
      'Nicotine Strength': '20mg/mL (2%)',
      'E-liquid Capacity': '14mL',
      'Battery': '500mAh rechargeable',
      'Charging': 'USB-C',
      'Coil Type': 'Mesh',
    },
    inStock: true,
    stockCount: 210,
    rating: 4.6,
    reviewCount: 189,
    isBestSeller: false,
    isSale: false,
    relatedProductSlugs: ['cloudburst-pro-10000', 'zephyrflex-6000'],
    seoTitle: 'ArcBlast 8000 Puff Disposable Vape Australia | VapeVault AU',
    seoDescription:
      'ArcBlast 8000 rechargeable disposable vape — 12 flavours, USB-C charging, Australian shipping. Buy online at VapeVault AU.',
    flavours: ['Watermelon Ice', 'Mango Ice', 'Strawberry Banana', 'Cool Mint', 'Grape Bubblegum', 'Peach Lychee', 'Blue Razz', 'Pineapple Ice', 'Lemon Lime', 'Mixed Berries', 'Passion Guava', 'Cherry Menthol'],
    nicotineStrengths: ['20mg'],
  },
  {
    id: 'prod-003',
    slug: 'zephyrflex-6000',
    name: 'ZephyrFlex 6000',
    brand: 'ZephyrFlex',
    sku: 'ZF-6000-AU',
    price: 24.95,
    images: [IMG('ZephyrFlex 6000')],
    category: 'disposable-vapes',
    subcategory: 'budget',
    tags: ['disposable', 'budget', 'starter'],
    description:
      'Perfect for those new to vaping or looking for a no-fuss option, the ZephyrFlex 6000 delivers 6,000 puffs of smooth, consistent vapour. Lightweight, pocket-friendly design with a wide range of popular Australian flavours.',
    shortDescription: 'Compact 6,000 puff disposable — ideal for new vapers.',
    features: [
      '6,000 puff capacity',
      'Draw-activated',
      '20mg nicotine salt',
      'Compact pocket-friendly design',
      '10 available flavours',
    ],
    specifications: {
      'Puff Count': '6,000',
      'Nicotine Strength': '20mg/mL (2%)',
      'E-liquid Capacity': '10mL',
      'Battery': '400mAh',
      'Coil Type': 'Mesh',
    },
    inStock: true,
    stockCount: 320,
    rating: 4.4,
    reviewCount: 97,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    relatedProductSlugs: ['arcblast-8000', 'cloudburst-pro-10000'],
    seoTitle: 'ZephyrFlex 6000 Puff Cheap Disposable Vape AU | VapeVault AU',
    seoDescription:
      'Buy ZephyrFlex 6000 puff disposable vape online in Australia. Great value, 10 flavours, fast shipping. Starting at $24.95.',
    flavours: ['Watermelon Ice', 'Mango', 'Strawberry', 'Cool Mint', 'Grape', 'Peach Ice', 'Blue Razz', 'Passionfruit', 'Lemon', 'Mixed Berry'],
    nicotineStrengths: ['20mg'],
  },
  {
    id: 'prod-004',
    slug: 'strikepod-8500',
    name: 'StrikePod 8500',
    brand: 'StrikePod',
    sku: 'SP-8500-AU',
    price: 34.95,
    images: [IMG('StrikePod 8500')],
    category: 'disposable-vapes',
    subcategory: 'high-puff',
    tags: ['disposable', 'rechargeable', 'new'],
    description:
      'The StrikePod 8500 brings a fresh approach to the Australian disposable market with its ergonomic design, vibrant LED indicator, and 8,500 puff count. USB-C rechargeable and available in 10 bold flavour profiles.',
    shortDescription: 'Ergonomic 8,500 puff rechargeable disposable with vibrant LED.',
    features: [
      '8,500 puff capacity',
      'Ergonomic grip design',
      'USB-C rechargeable',
      'LED battery indicator',
      '20mg nicotine salt',
    ],
    specifications: {
      'Puff Count': '8,500',
      'Nicotine Strength': '20mg/mL (2%)',
      'E-liquid Capacity': '15mL',
      'Battery': '550mAh',
      'Charging': 'USB-C',
    },
    inStock: true,
    stockCount: 75,
    rating: 4.5,
    reviewCount: 54,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    relatedProductSlugs: ['cloudburst-pro-10000', 'arcblast-8000'],
    seoTitle: 'StrikePod 8500 Rechargeable Disposable Vape AU | VapeVault AU',
    seoDescription:
      'New StrikePod 8500 puff disposable vape with ergonomic design. Australian stock, fast shipping. Buy online at VapeVault AU.',
    flavours: ['Mango Ice', 'Strawberry Cream', 'Watermelon Mint', 'Blue Razz Ice', 'Peach Mango', 'Lychee Berry', 'Pineapple', 'Cool Mint', 'Grape Soda', 'Cherry Ice'],
    nicotineStrengths: ['20mg'],
  },

  // ─── Pod Systems ───────────────────────────────────────────────
  {
    id: 'prod-005',
    slug: 'novapod-x4-kit',
    name: 'NovaPod X4 Kit',
    brand: 'NovaPod',
    sku: 'NP-X4-KIT',
    price: 79.95,
    comparePrice: 99.95,
    images: [IMG('NovaPod X4'), IMG('NovaPod X4 Open'), IMG('NovaPod X4 Coils')],
    category: 'pod-systems',
    subcategory: 'refillable',
    tags: ['pod-system', 'refillable', 'variable-wattage', 'bestseller'],
    description:
      'The NovaPod X4 is Australia\'s most popular refillable pod kit for good reason. With a 1500mAh battery, 5–40W variable wattage output, and a magnetic pod connection, it pairs seamlessly with both freebase and nicotine salt e-liquids. Includes two coil heads and a 4mL refillable pod.',
    shortDescription: 'Premium 1500mAh refillable pod kit with variable wattage — top Australian seller.',
    features: [
      '1500mAh built-in battery',
      '5–40W variable wattage',
      '4mL refillable pod (top-fill)',
      'Magnetic pod connection',
      'Compatible with 0.6Ω and 1.0Ω coils',
      'USB-C fast charge (75 min full charge)',
      'OLED display',
      'Adjustable airflow',
    ],
    specifications: {
      'Battery': '1500mAh',
      'Output': '5–40W',
      'Pod Capacity': '4mL',
      'Fill Type': 'Top-fill',
      'Coils Included': '0.6Ω mesh + 1.0Ω regular',
      'Charging': 'USB-C (2A)',
      'Display': 'OLED',
      'Dimensions': '108 × 28 × 18mm',
    },
    inStock: true,
    stockCount: 62,
    rating: 4.9,
    reviewCount: 445,
    isNew: false,
    isBestSeller: true,
    isSale: true,
    relatedProductSlugs: ['slimpulse-v3-kit', 'coredrive-pro-kit', 'saltsurge-30ml'],
    seoTitle: 'NovaPod X4 Refillable Pod Kit Australia | VapeVault AU',
    seoDescription:
      'Buy the NovaPod X4 pod kit in Australia — 1500mAh, 40W, top-fill pod, OLED display. On sale from $79.95 with fast AU shipping.',
  },
  {
    id: 'prod-006',
    slug: 'slimpulse-v3-kit',
    name: 'SlimPulse V3 Kit',
    brand: 'SlimPulse',
    sku: 'SP-V3-KIT',
    price: 59.95,
    images: [IMG('SlimPulse V3')],
    category: 'pod-systems',
    subcategory: 'draw-activated',
    tags: ['pod-system', 'draw-activated', 'beginner', 'slim'],
    description:
      'Ultra-slim and draw-activated, the SlimPulse V3 is the perfect gateway into refillable pod vaping. A 900mAh battery and 2mL pod deliver a tight, cigarette-like draw that beginners love. Simple, elegant, and built to last.',
    shortDescription: 'Ultra-slim draw-activated pod kit — perfect for beginners and ex-smokers.',
    features: [
      '900mAh battery',
      'Draw-activated firing',
      '2mL refillable pod (side-fill)',
      'Compatible with 1.2Ω and 1.6Ω coils',
      'USB-C charging',
      'LED battery indicator',
      'Lightweight at just 68g',
    ],
    specifications: {
      'Battery': '900mAh',
      'Pod Capacity': '2mL',
      'Coils Included': '1.2Ω MTL + 1.6Ω MTL',
      'Charging': 'USB-C',
      'Weight': '68g',
      'Dimensions': '112 × 22 × 13mm',
    },
    inStock: true,
    stockCount: 88,
    rating: 4.7,
    reviewCount: 201,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    relatedProductSlugs: ['novapod-x4-kit', 'coredrive-pro-kit'],
    seoTitle: 'SlimPulse V3 Pod Kit Australia — Beginner Vape Kit | VapeVault AU',
    seoDescription:
      'SlimPulse V3 draw-activated pod kit — ultra-slim, 900mAh, perfect for beginners. Shop now at VapeVault AU with fast Australian shipping.',
  },
  {
    id: 'prod-007',
    slug: 'coredrive-pro-kit',
    name: 'CoreDrive Pro Kit',
    brand: 'CoreDrive',
    sku: 'CD-PRO-KIT',
    price: 99.95,
    images: [IMG('CoreDrive Pro'), IMG('CoreDrive Pro Side')],
    category: 'pod-systems',
    subcategory: 'advanced',
    tags: ['pod-system', 'advanced', 'high-wattage', 'sub-ohm'],
    description:
      'Built for experienced vapers demanding more power, the CoreDrive Pro pumps out up to 80W from a 2000mAh battery. Sub-ohm capable with a 5mL pod and a full-colour TFT display, this is the most powerful pod kit available from VapeVault AU.',
    shortDescription: 'High-power 80W pod kit with 2000mAh battery and colour TFT display.',
    features: [
      '2000mAh built-in battery',
      '5–80W variable wattage',
      '5mL refillable pod',
      'Colour TFT display',
      'Sub-ohm capable (0.15Ω, 0.3Ω)',
      'USB-C fast charge (90 min)',
      'Smart coil detection',
    ],
    specifications: {
      'Battery': '2000mAh',
      'Output': '5–80W',
      'Pod Capacity': '5mL',
      'Coils Included': '0.15Ω mesh + 0.3Ω mesh',
      'Display': 'Colour TFT',
      'Charging': 'USB-C (2A)',
      'Dimensions': '118 × 32 × 22mm',
    },
    inStock: true,
    stockCount: 34,
    rating: 4.8,
    reviewCount: 127,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    relatedProductSlugs: ['novapod-x4-kit', 'saltsurge-30ml'],
    seoTitle: 'CoreDrive Pro 80W Pod Kit Australia | VapeVault AU',
    seoDescription:
      'CoreDrive Pro advanced 80W pod kit — 2000mAh, colour display, sub-ohm capable. Available now at VapeVault AU.',
  },

  // ─── Nicotine Salts ────────────────────────────────────────────
  {
    id: 'prod-008',
    slug: 'saltsurge-30ml',
    name: 'SaltSurge 30mL',
    brand: 'SaltSurge',
    sku: 'SS-30ML-AU',
    price: 24.95,
    images: [IMG('SaltSurge 30mL'), IMG('SaltSurge Range')],
    category: 'nicotine-salts',
    subcategory: 'standard',
    tags: ['nic-salt', 'e-liquid', 'bestseller', '30ml'],
    description:
      'SaltSurge delivers a premium Australian nicotine salt experience in a 30mL bottle. Available in 25mg and 50mg strengths across 12 popular flavour profiles, SaltSurge is formulated with pharmaceutical-grade nicotine salt for a smooth, satisfying throat hit at any strength.',
    shortDescription: 'Premium Australian-made nicotine salt e-liquid in 30mL — 12 flavours.',
    features: [
      '30mL bottle',
      'Available in 25mg and 50mg',
      'Pharmaceutical-grade nicotine salt',
      '70% PG / 30% VG blend',
      'Compatible with all pod systems',
      'Child-resistant cap',
      'Made in Australia',
    ],
    specifications: {
      'Volume': '30mL',
      'Nicotine Type': 'Salt nicotine (benzoic acid)',
      'PG/VG Ratio': '70/30',
      'Recommended Device': 'Pod systems (above 1.0Ω)',
    },
    inStock: true,
    stockCount: 500,
    rating: 4.9,
    reviewCount: 623,
    isBestSeller: true,
    isSale: false,
    relatedProductSlugs: ['icewave-salt-30ml', 'tropicrosh-salt-bundle', 'novapod-x4-kit'],
    seoTitle: 'SaltSurge 30mL Nicotine Salt E-Liquid Australia | VapeVault AU',
    seoDescription:
      'SaltSurge premium nicotine salt e-liquid — 30mL, 25mg & 50mg, 12 flavours. Australian-made, fast shipping. Buy at VapeVault AU.',
    flavours: ['Strawberry Watermelon', 'Mango Peach', 'Blueberry Mint', 'Cool Mint', 'Lychee Ice', 'Passionfruit Guava', 'Peach Iced Tea', 'Pineapple Coconut', 'Grape Ice', 'Pink Lemonade', 'Kiwi Strawberry', 'Cherry Blast'],
    nicotineStrengths: ['25mg', '50mg'],
  },
  {
    id: 'prod-009',
    slug: 'icewave-salt-30ml',
    name: 'IceWave Salt 30mL',
    brand: 'IceWave',
    sku: 'IW-SALT-30ML',
    price: 22.95,
    images: [IMG('IceWave Salt')],
    category: 'nicotine-salts',
    subcategory: 'menthol',
    tags: ['nic-salt', 'e-liquid', 'menthol', 'iced', '30ml'],
    description:
      'IceWave Salt is crafted for fans of cool, icy vapes. Every flavour in the range is boosted with a wave of menthol that amplifies the fruit notes without overpowering them. Available in 6 iced flavour profiles across 25mg and 50mg.',
    shortDescription: 'Menthol-boosted nicotine salt range — 6 iced flavours, 30mL.',
    features: [
      '30mL bottle',
      '25mg and 50mg options',
      'Menthol-boosted all flavours',
      '70% PG / 30% VG',
      'Smooth throat hit',
      'Child-resistant cap',
    ],
    specifications: {
      'Volume': '30mL',
      'Nicotine Type': 'Salt nicotine',
      'PG/VG Ratio': '70/30',
    },
    inStock: true,
    stockCount: 280,
    rating: 4.7,
    reviewCount: 234,
    isSale: false,
    relatedProductSlugs: ['saltsurge-30ml', 'tropicrosh-salt-bundle'],
    seoTitle: 'IceWave Menthol Nicotine Salt E-Liquid AU | VapeVault AU',
    seoDescription:
      'IceWave iced nicotine salt e-liquid — 6 menthol flavours, 30mL, 25mg & 50mg. Shop AU at VapeVault AU.',
    flavours: ['Watermelon Ice', 'Mango Ice', 'Lychee Ice', 'Strawberry Ice', 'Grape Ice', 'Peach Ice'],
    nicotineStrengths: ['25mg', '50mg'],
  },
  {
    id: 'prod-010',
    slug: 'tropicrosh-salt-bundle',
    name: 'TropicRush Salt Bundle',
    brand: 'TropicRush',
    sku: 'TR-BUNDLE-3PK',
    price: 59.95,
    comparePrice: 74.85,
    images: [IMG('TropicRush Bundle')],
    category: 'nicotine-salts',
    subcategory: 'bundles',
    tags: ['nic-salt', 'e-liquid', 'bundle', 'value', 'tropical'],
    description:
      'Get three 30mL bottles of TropicRush\'s most popular tropical nicotine salt flavours in one value bundle. Save $14.90 compared to buying individually. Ideal for vapers who love fruity, tropical profiles and want to stock up.',
    shortDescription: '3x 30mL tropical nicotine salt bundle — save $14.90.',
    features: [
      '3 × 30mL bottles',
      'Mix-and-match 3 flavours from 6 options',
      '50mg (only)',
      'Save $14.90 vs individual pricing',
      'Tropical flavour profiles',
    ],
    specifications: {
      'Volume': '3 × 30mL = 90mL total',
      'Nicotine Type': 'Salt nicotine',
      'PG/VG Ratio': '70/30',
    },
    inStock: true,
    stockCount: 90,
    rating: 4.8,
    reviewCount: 118,
    isSale: true,
    isBestSeller: false,
    relatedProductSlugs: ['saltsurge-30ml', 'icewave-salt-30ml'],
    seoTitle: 'TropicRush Nicotine Salt Bundle 3-Pack Australia | VapeVault AU',
    seoDescription:
      'TropicRush 3-pack nicotine salt bundle — 90mL total, 6 tropical flavours, save $14.90. Best value nic salt deal at VapeVault AU.',
    flavours: ['Passion Mango', 'Pineapple Guava', 'Coconut Lime', 'Tropical Storm', 'Papaya Lychee', 'Starfruit Punch'],
    nicotineStrengths: ['50mg'],
  },

  // ─── Accessories ───────────────────────────────────────────────
  {
    id: 'prod-011',
    slug: 'unifire-coil-pack',
    name: 'UniFire Coil Pack (5-pack)',
    brand: 'UniFire',
    sku: 'UF-COIL-5PK',
    price: 19.95,
    images: [IMG('UniFire Coils')],
    category: 'accessories',
    subcategory: 'coils',
    tags: ['accessory', 'coils', 'replacement', 'value'],
    description:
      'UniFire replacement coils are compatible with the NovaPod X4 and CoreDrive Pro systems. Available in 0.6Ω mesh (30–40W) and 1.0Ω regular (10–18W) variants. Five coils per pack for excellent value.',
    shortDescription: 'Replacement coil 5-pack compatible with NovaPod X4 and CoreDrive Pro.',
    features: [
      '5 coils per pack',
      'Compatible with NovaPod X4 and CoreDrive Pro',
      '0.6Ω mesh (30–40W) or 1.0Ω regular (10–18W)',
      'Long-lasting cotton wick',
    ],
    specifications: {
      'Quantity': '5 coils',
      'Resistance Options': '0.6Ω or 1.0Ω',
      'Compatibility': 'NovaPod X4, CoreDrive Pro',
    },
    inStock: true,
    stockCount: 400,
    rating: 4.6,
    reviewCount: 87,
    relatedProductSlugs: ['novapod-x4-kit', 'coredrive-pro-kit'],
    seoTitle: 'UniFire Replacement Coil 5-Pack AU | VapeVault AU',
    seoDescription:
      'UniFire 5-pack replacement coils for NovaPod X4 and CoreDrive Pro — 0.6Ω and 1.0Ω options. Buy online at VapeVault AU.',
  },
  {
    id: 'prod-012',
    slug: 'flavorvault-freebase-30ml',
    name: 'FlavourVault Freebase 30mL',
    brand: 'FlavourVault',
    sku: 'FV-FB-30ML',
    price: 19.95,
    images: [IMG('FlavourVault Freebase')],
    category: 'e-liquids',
    subcategory: 'freebase',
    tags: ['e-liquid', 'freebase', '30ml', 'sub-ohm'],
    description:
      'FlavourVault Freebase is designed for sub-ohm pod systems and higher-wattage devices. A 30% PG / 70% VG blend delivers thick, flavourful clouds. Available in 3mg and 6mg strengths across 8 dessert and fruit profiles.',
    shortDescription: '70VG freebase e-liquid for sub-ohm devices — 8 flavours, 30mL.',
    features: [
      '30mL bottle',
      '3mg and 6mg options',
      '30% PG / 70% VG',
      'Ideal for 0.6Ω or lower coils',
      '8 flavour profiles',
    ],
    specifications: {
      'Volume': '30mL',
      'Nicotine Type': 'Freebase nicotine',
      'PG/VG Ratio': '30/70',
      'Recommended Wattage': '25W+',
    },
    inStock: true,
    stockCount: 190,
    rating: 4.5,
    reviewCount: 64,
    relatedProductSlugs: ['saltsurge-30ml', 'novapod-x4-kit'],
    seoTitle: 'FlavourVault Freebase 30mL E-Liquid Australia | VapeVault AU',
    seoDescription:
      'FlavourVault 70VG freebase e-liquid for sub-ohm devices — 8 flavours, 30mL, 3mg & 6mg. Shop at VapeVault AU.',
    flavours: ['Vanilla Custard', 'Strawberry Cheesecake', 'Caramel Tobacco', 'Mango Tango', 'Blueberry Lemon', 'Watermelon Burst', 'Dragon Fruit', 'Hazelnut Coffee'],
    nicotineStrengths: ['3mg', '6mg'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categorySlug)
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return PRODUCTS.filter((p) => slugs.includes(p.slug))
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8)
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.isNew).slice(0, 4)
}

export function getSaleProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isSale)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.shortDescription.toLowerCase().includes(q)
  )
}
