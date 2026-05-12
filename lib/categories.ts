import type { Category } from '@/types'

export const CATEGORIES: Category[] = [
  {
    id: 'cat-001',
    slug: 'disposable-vapes',
    name: 'Disposable Vapes',
    description: 'Ready-to-use, no-maintenance disposable vapes — up to 10,000 puffs.',
    longDescription:
      'Browse Australia\'s widest range of disposable vapes — from entry-level 6,000 puff devices to high-capacity 10,000 puff rechargeable units. Every disposable in our range ships same-day from Australian stock and complies with current TGA nicotine regulations. Perfect for travellers, beginners, or anyone who wants a hassle-free vaping experience without coils or refills.',
    subcategories: [
      { id: 'sub-001', slug: 'high-puff', name: 'High Puff (8000+)', parentSlug: 'disposable-vapes' },
      { id: 'sub-002', slug: 'mid-range', name: 'Mid Range (5000–8000)', parentSlug: 'disposable-vapes' },
      { id: 'sub-003', slug: 'budget', name: 'Budget (Under 6000)', parentSlug: 'disposable-vapes' },
    ],
    productCount: 1719,
    image: 'https://placehold.co/800x450/1c1c1c/06b6d4?text=Disposable+Vapes',
    seoTitle: 'Disposable Vapes Australia — Buy Online | VapeVault AU',
    seoDescription:
      'Shop Australia\'s best disposable vapes — up to 10,000 puffs, rechargeable, fast AU shipping. Brands: CloudBurst, ArcBlast, ZephyrFlex and more.',
    keywords: [
      'disposable vapes australia',
      'buy disposable vape online australia',
      'best disposable vape australia',
      'cheap disposable vapes au',
      '10000 puff disposable vape australia',
      'rechargeable disposable vape australia',
    ],
  },
  {
    id: 'cat-002',
    slug: 'pod-systems',
    name: 'Pod Systems',
    description: 'Refillable pod kits for every vaper — from beginner to advanced.',
    longDescription:
      'Pod systems offer the best balance of performance, flavour, and value for Australian vapers. Our curated selection spans ultra-slim draw-activated pods for new vapers through to high-wattage sub-ohm pod mods for experienced enthusiasts. All devices in our range are covered by a 12-month Australian warranty and include the coils you need to get started.',
    subcategories: [
      { id: 'sub-004', slug: 'refillable', name: 'Refillable Pods', parentSlug: 'pod-systems' },
      { id: 'sub-005', slug: 'draw-activated', name: 'Draw-Activated', parentSlug: 'pod-systems' },
      { id: 'sub-006', slug: 'advanced', name: 'Advanced / High-Wattage', parentSlug: 'pod-systems' },
    ],
    productCount: 59,
    image: 'https://placehold.co/800x450/1c1c1c/06b6d4?text=Pod+Systems',
    seoTitle: 'Pod Systems Australia — Vape Kits & Starter Kits | VapeVault AU',
    seoDescription:
      'Buy pod systems and vape kits in Australia — beginner to advanced, 12-month AU warranty, fast shipping. NovaPod, SlimPulse, CoreDrive.',
    keywords: [
      'pod systems australia',
      'vape kits australia',
      'pod vape australia',
      'refillable vape pod australia',
      'starter vape kit australia',
      'best pod system australia 2025',
    ],
  },
  {
    id: 'cat-003',
    slug: 'nicotine-salts',
    name: 'Nicotine Salts',
    description: 'Smooth, fast-hitting nicotine salt e-liquids for pod systems.',
    longDescription:
      'Nicotine salts deliver a smoother, faster nicotine hit compared to freebase e-liquids, making them the preferred choice for Australian vapers using pod systems. Our nic salt range covers everything from refreshing iced fruit profiles to rich tropical blends, available in 25mg and 50mg strengths. All e-liquids are manufactured under strict quality controls and comply with Australian nicotine regulations.',
    subcategories: [
      { id: 'sub-007', slug: 'standard', name: 'Standard Range', parentSlug: 'nicotine-salts' },
      { id: 'sub-008', slug: 'menthol', name: 'Menthol & Iced', parentSlug: 'nicotine-salts' },
      { id: 'sub-009', slug: 'bundles', name: 'Bundles & Value Packs', parentSlug: 'nicotine-salts' },
    ],
    productCount: 89,
    image: 'https://placehold.co/800x450/1c1c1c/06b6d4?text=Nicotine+Salts',
    seoTitle: 'Nicotine Salts Australia — E-Liquid for Pod Vapes | VapeVault AU',
    seoDescription:
      'Buy nicotine salt e-liquid in Australia — 30mL, 25mg & 50mg, fast AU shipping. SaltSurge, IceWave, TropicRush and more.',
    keywords: [
      'nicotine salts australia',
      'nic salt e-liquid australia',
      'buy nicotine salt online australia',
      'best nic salts australia',
      'nicotine salt 50mg australia',
      'pod liquid australia',
    ],
  },
  {
    id: 'cat-004',
    slug: 'e-liquids',
    name: 'E-Liquids',
    description: 'Freebase e-liquids for sub-ohm devices — big flavour, big clouds.',
    longDescription:
      'Our freebase e-liquid range is formulated for sub-ohm pod systems and box mods operating above 25W. With a high-VG blend designed for dense cloud production and rich flavour, these liquids are available in 3mg and 6mg nicotine strengths across a wide range of dessert, fruit, and menthol profiles.',
    subcategories: [
      { id: 'sub-010', slug: 'freebase', name: 'Freebase', parentSlug: 'e-liquids' },
      { id: 'sub-011', slug: 'high-vg', name: 'High VG', parentSlug: 'e-liquids' },
    ],
    productCount: 84,
    image: 'https://placehold.co/800x450/1c1c1c/06b6d4?text=E-Liquids',
    seoTitle: 'E-Liquids Australia — Freebase Vape Juice Online | VapeVault AU',
    seoDescription:
      'Shop freebase e-liquids in Australia — 70VG, sub-ohm friendly, 3mg & 6mg. Fast AU shipping from VapeVault AU.',
    keywords: [
      'e-liquid australia',
      'vape juice australia',
      'freebase e-liquid australia',
      'buy e-liquid australia',
      'sub ohm e-liquid australia',
    ],
  },
  {
    id: 'cat-005',
    slug: 'accessories',
    name: 'Accessories',
    description: 'Coils, cables, cases and everything else your vape needs.',
    longDescription:
      'Keep your vape running at its best with our range of genuine replacement coils, USB-C charging cables, carrying cases, and cleaning supplies. All accessories are sourced from reputable suppliers and backed by VapeVault AU\'s satisfaction guarantee.',
    subcategories: [
      { id: 'sub-012', slug: 'coils', name: 'Replacement Coils', parentSlug: 'accessories' },
      { id: 'sub-013', slug: 'cables', name: 'Cables & Chargers', parentSlug: 'accessories' },
    ],
    productCount: 122,
    image: 'https://placehold.co/800x450/1c1c1c/06b6d4?text=Accessories',
    seoTitle: 'Vape Accessories Australia — Coils, Cables & More | VapeVault AU',
    seoDescription:
      'Buy vape accessories in Australia — replacement coils, USB-C cables, cases. Fast AU shipping at VapeVault AU.',
    keywords: [
      'vape accessories australia',
      'replacement coils australia',
      'vape coils australia',
      'vape cables australia',
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug)
}
