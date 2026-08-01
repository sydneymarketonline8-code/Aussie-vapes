import type { Category } from '@/types'

export const CATEGORIES: Category[] = [
  {
    id: 'cat-001',
    slug: 'disposable-vapes',
    name: 'Disposable Vapes',
    description: 'Ready-to-use, no-maintenance disposable vapes — from compact 600 puff devices up to 25,000 puff long-life models.',
    intro:
      "Aussie Vape Hub is Australia's largest stockist of disposable vapes, with over 1,700 authentic devices across 30+ brands all in stock and ready for same-day Sydney dispatch.",
    longDescription:
      "Disposable vapes are the most popular vaping format in Australia for one simple reason — they just work. No coil changes, no e-liquid refills, no setup, no maintenance. You unbox it, you vape it, and when it's done you safely dispose of it. Aussie Vape Hub carries the deepest disposable vape range in Australia, spanning every puff tier and price point. At the entry level, the IGET Shion 600, X-Qlusive 2500 and Gunnpod 2000 are the go-to recommendations for ex-smokers transitioning to vaping. In the mid-range, the IGET Bar 3500, HQD Cuvie Plus 1200 and Mr Fog Max Air 3600 strike the best balance of cost, capacity and flavour. The 5000-8000 puff tier — IGET Goat 5000, IGET Hot 5500, HQD Slick 6000, Gunnpod Moss 8000, Alfakher Crown Bar 8000 — is where most Australian vapers settle in, offering 5-10 days of moderate use per device with USB-C rechargeable batteries. At the top end, the IGET One 12,000, Alfakher Crown Bar 15,000, HQD Cuvie Slick 20,000 and Kuz Flow 25,000 deliver weeks of vaping per device. All disposables sold at Aussie Vape Hub are authentic, age-verified at checkout, and dispatched same-day from our Sydney warehouse on weekday orders placed before 2pm AEST.",
    highlights: [
      '1,700+ authentic disposable vapes in stock',
      '30+ brands including IGET, Alfakher, HQD, Gunnpod, Lost Mary, Vozol, RELX',
      'Same-day Sydney dispatch on orders before 2pm AEST',
      'Free shipping on AU orders over $300',
      'Authenticity codes on every device',
      '30-day return policy on unopened products',
    ],
    subcategories: [
      { id: 'sub-001', slug: 'high-puff', name: 'High Puff (8000+)', parentSlug: 'disposable-vapes' },
      { id: 'sub-002', slug: 'mid-range', name: 'Mid Range (5000–8000)', parentSlug: 'disposable-vapes' },
      { id: 'sub-003', slug: 'budget', name: 'Budget (Under 5000)', parentSlug: 'disposable-vapes' },
    ],
    productCount: 1719,
    image: 'https://placehold.co/800x450/f1f1f1/3b3b3b?text=Disposable+Vapes',
    seoTitle: 'Disposable Aussie Vape Hub — 1,700+ In Stock | Aussie Vape Hub',
    seoDescription:
      'Aussie Vape Hub stocks 1,700+ disposable vapes online in Australia. IGET, Alfakher, HQD, Gunnpod, Lost Mary & 35+ brands. Same-day Sydney shipping, free over $300.',
    keywords: [
      'aussie vape hub disposable',
      'aussie disposable vapes',
      'aussie vape hub online',
      'aussie vape hub australia',
      'disposable vapes australia',
      'buy disposable vape online australia',
      'best disposable vape australia',
      'cheap disposable vapes au',
      '10000 puff disposable vape australia',
      'rechargeable disposable vape australia',
      'iget bar australia',
      'alfakher crown bar australia',
      'hqd disposable australia',
      'gunnpod australia',
      'lost mary australia',
    ],
    buyerGuide: [
      {
        title: 'Choosing the right puff count',
        body: "A typical moderate Australian vaper uses about 500-700 puffs per day. Light vapers might use 200-400. Heavy vapers can use 1,000+. To work out how long a disposable will last you, divide its puff count by your daily usage. A 5,000 puff device will last a light vaper around 12-25 days, a moderate vaper 7-10 days, and a heavy vaper 4-5 days. If you're new to vaping, start with a 3,000-5,000 puff device — it's enough to know whether you like the brand and flavour without a big commitment.",
      },
      {
        title: 'Rechargeable vs non-rechargeable',
        body: 'Below the 5,000 puff mark, many devices are non-rechargeable — the battery dies before the e-liquid does, and the device is discarded. Above 5,000 puffs, devices are almost always USB-C rechargeable, which means the e-liquid (not the battery) is the limit. If you want to vape a device down to its last drop, choose rechargeable. If you want the cheapest possible per-puff cost on shorter sessions, non-rechargeable works fine.',
      },
      {
        title: 'Salt nicotine vs freebase',
        body: "Every disposable vape sold legally in Australia uses 20mg/mL (2%) salt nicotine — the TGA-compliant strength. Salt nicotine is smoother on the throat than freebase, hits the bloodstream faster, and is the format preferred by ex-smokers because it more closely mimics the feel of a cigarette. You don't need to choose — the format is mandated.",
      },
      {
        title: 'Mesh coil vs ceramic atomiser',
        body: "Most disposables use cotton-wicked mesh coils — affordable, reliable, and produces consistent flavour for the first 80% of the device's life. Premium brands like RELX use ceramic atomisers instead, which deliver cleaner flavour reproduction and don't produce a burnt taste at the end. Ceramic is better; mesh is more affordable.",
      },
    ],
    faqs: [
      {
        question: 'Are disposable vapes legal in Australia?',
        answer:
          'Disposable vapes containing nicotine are legal in Australia under the TGA prescription model — you must hold a valid Australian prescription to legally possess them. Aussie Vape Hub operates within this framework and includes prescription confirmation at checkout. Non-nicotine disposable vapes are also available and require no prescription.',
      },
      {
        question: 'What is the best disposable vape in Australia?',
        answer:
          "There's no single best — it depends on your vaping style. For ex-smokers transitioning, the IGET Bar 3500 and Gunnpod 2000 are the most-recommended starters. For mid-range value, the IGET Bar Plus 6000 and Alfakher Crown Bar 8000 dominate. For maximum capacity, the HQD Cuvie Slick 20,000 and Kuz Flow 25,000 lead the AU market.",
      },
      {
        question: 'How long does a disposable vape last?',
        answer:
          'It depends on the puff count and how often you vape. A 3,500-puff IGET Bar typically lasts 3-5 days for a moderate vaper. A 6,000-puff IGET Bar Plus lasts 5-8 days. A 15,000-puff Alfakher Crown Bar lasts 12-18 days. A 25,000-puff Kuz Flow can last 3-4 weeks.',
      },
      {
        question: 'How much do disposable vapes cost in Australia?',
        answer:
          'Entry-level disposables (600-2,500 puffs) typically cost $14.95-$22.95 at Aussie Vape Hub. Mid-range (3,500-6,000 puffs) range from $24.95-$32.95. High-capacity (8,000-15,000 puffs) sit between $35-$47. Ultra-high capacity (20,000+ puffs) reach $55-$60. Bulk packs (3-pack, 5-pack, 10-pack) discount per-unit prices by 10-20%.',
      },
      {
        question: 'Do you ship disposable vapes Australia-wide?',
        answer:
          'Yes. Aussie Vape Hub ships to every Australian state and territory using discreet plain-packaging couriers. Free shipping on orders over $300. Express options available at checkout. Same-day Sydney dispatch on weekday orders placed before 2pm AEST.',
      },
      {
        question: "What's the difference between 20mg and 50mg disposables?",
        answer:
          'In Australia, all legally-sold nicotine disposables are capped at 20mg/mL (2%) under TGA regulations. 50mg devices that some overseas sites sell are not compliant with Australian law. Aussie Vape Hub only sells TGA-compliant 20mg disposables, which is more than enough nicotine for any vaper.',
      },
      {
        question: 'Are disposable vapes safe?',
        answer:
          'No nicotine product is risk-free. Disposable vapes are widely considered substantially less harmful than smoking cigarettes (Royal College of Physicians UK estimates ~95% less harmful), which is why the TGA permits them as a prescription smoking-cessation tool. But they are still addictive and should only be used by adults 18+ seeking to quit smoking.',
      },
    ],
  },
  {
    id: 'cat-002',
    slug: 'pod-systems',
    name: 'Pod Systems',
    description: 'Refillable pod kits for every vaper — from ultra-slim beginner kits to advanced sub-ohm pod mods.',
    intro:
      'Pod systems are the most cost-effective long-term vaping solution. Refill the same pod with nic salt or freebase e-liquid — no daily-disposable waste, no per-device cost.',
    longDescription:
      "Pod systems are the smartest long-term economic choice for Australian vapers. Where a disposable costs $25-$45 per device and lasts a week or two, a refillable pod system pays for itself in 4-6 weeks of regular use — and after that, the only ongoing cost is e-liquid (around $20-25 per 30mL bottle) and the occasional coil head. Aussie Vape Hub carries refillable pod kits across three tiers: ultra-slim draw-activated pods for new vapers and ex-smokers wanting a cigarette-like draw; mid-range refillable pods with variable wattage and bigger batteries; and advanced sub-ohm pod mods for experienced vapers chasing flavour and cloud production. All pod kits include the coil heads needed to get started, USB-C charging cables, and a 12-month Australian warranty on hardware.",
    highlights: [
      'Ultra-slim, mid-range and sub-ohm tiers',
      '12-month Australian warranty on all kits',
      'Compatible with nic salt AND freebase e-liquids',
      'Replacement coils & pods in stock',
      'Save 70%+ vs disposable vape costs long-term',
    ],
    subcategories: [
      { id: 'sub-004', slug: 'refillable', name: 'Refillable Pods', parentSlug: 'pod-systems' },
      { id: 'sub-005', slug: 'draw-activated', name: 'Draw-Activated', parentSlug: 'pod-systems' },
      { id: 'sub-006', slug: 'advanced', name: 'Advanced / High-Wattage', parentSlug: 'pod-systems' },
    ],
    productCount: 59,
    image: 'https://placehold.co/800x450/f1f1f1/3b3b3b?text=Pod+Systems',
    seoTitle: 'Pod Systems Australia — Refillable Vape Kits | Aussie Vape Hub',
    seoDescription:
      'Aussie Vape Hub stocks the best refillable pod systems & vape kits in Australia. Beginner to advanced, 12-month AU warranty, save 70% vs disposables long-term.',
    keywords: [
      'aussie vape hub pod systems',
      'aussie pod systems',
      'aussie vape hub vape kits',
      'aussie vape hub refillable',
      'pod systems australia',
      'vape kits australia',
      'pod vape australia',
      'refillable vape pod australia',
      'starter vape kit australia',
      'best pod system australia 2025',
      'sub ohm pod kit australia',
      'mtl pod system australia',
    ],
    buyerGuide: [
      {
        title: 'Beginners: start with draw-activated',
        body: "If you're new to vaping or transitioning from cigarettes, choose a draw-activated pod system with a tight MTL (mouth-to-lung) draw. These work just like a cigarette — no buttons, no settings, you just inhale. Pair with 25mg or 50mg nic salt e-liquid for the closest cigarette-like throat hit.",
      },
      {
        title: 'Mid-range: refillable pods with variable wattage',
        body: "Once you've been vaping a few months and know what flavours you prefer, step up to a refillable pod kit with variable wattage (typically 5W-40W). These let you tune the warmth and vapour output to your preference, accept both MTL and DTL coils, and work with the wider range of e-liquids on the market.",
      },
      {
        title: 'Advanced: sub-ohm pod mods',
        body: 'For experienced vapers chasing big clouds and bold flavour, sub-ohm pod mods (40-80W) take you into traditional box-mod territory while keeping the pod-system convenience. Use with 70VG or 80VG freebase e-liquid at 3mg-6mg nicotine — high-nic salt liquids will be too harsh at these wattages.',
      },
    ],
    faqs: [
      {
        question: 'Are pod systems cheaper than disposables long-term?',
        answer:
          'Yes — significantly. A typical Australian vaper spends $25-$45 per week on disposables. A refillable pod system has an upfront cost of $60-$120, then $20-$25 per 30mL e-liquid (which lasts roughly 1-2 weeks) and $15-$20 for a 5-pack of replacement coils (lasts 4-8 weeks). Total ongoing cost is ~$10-$15 per week — about 50-70% less than disposables.',
      },
      {
        question: 'Can pod systems use nic salt e-liquid?',
        answer:
          'Yes — most pod systems are specifically designed for nic salt e-liquid because the higher resistance MTL coils (1.0Ω+) work best with salt liquids. Some advanced pod mods also accept sub-ohm coils for use with freebase liquids.',
      },
      {
        question: 'How often do you need to change pod coils?',
        answer:
          "A typical mesh coil in a pod system lasts 1-2 weeks of regular use. You'll know it's time to change when flavour starts to taste burnt, vapour production drops, or the e-liquid darkens quickly after filling.",
      },
      {
        question: 'What is MTL vs DTL?',
        answer:
          'MTL stands for "Mouth-To-Lung" — a tight, restricted draw similar to a cigarette. DTL stands for "Direct-To-Lung" — an open, airy draw where you inhale vapour straight into your lungs. MTL is preferred by ex-smokers and uses high-nic salt liquids. DTL produces bigger clouds and uses low-nic freebase liquids.',
      },
    ],
  },
  {
    id: 'cat-003',
    slug: 'nicotine-salts',
    name: 'Nicotine Salts',
    description: 'Smooth, fast-hitting nicotine salt e-liquids for pod systems and refillable disposables.',
    intro:
      'Nicotine salts deliver a smoother throat hit and faster nicotine absorption than freebase liquids — the format of choice for pod systems and ex-smokers.',
    longDescription:
      "Nicotine salt e-liquids are the gold standard for pod systems. By combining freebase nicotine with benzoic acid (or another suitable acid), the nicotine becomes more bioavailable at lower wattages — the kind of low wattages pod systems and disposable vapes run at. The practical result: salt liquids deliver a smoother, faster nicotine hit at higher concentrations (20mg+) without the harsh throat hit that high-strength freebase causes. Aussie Vape Hub carries a curated selection of Australian-made and imported nicotine salt e-liquids in 30mL bottles, with strengths from 25mg to 50mg and a flavour range covering fruit, menthol, dessert and tobacco profiles.",
    highlights: [
      'Smoother than freebase at 20mg+ strengths',
      'Faster nicotine absorption',
      'Designed for pod systems and refillable disposables',
      'AU-made and imported options',
      '25mg and 50mg strength variants',
    ],
    subcategories: [
      { id: 'sub-007', slug: 'standard', name: 'Standard Range', parentSlug: 'nicotine-salts' },
      { id: 'sub-008', slug: 'menthol', name: 'Menthol & Iced', parentSlug: 'nicotine-salts' },
      { id: 'sub-009', slug: 'bundles', name: 'Bundles & Value Packs', parentSlug: 'nicotine-salts' },
    ],
    productCount: 89,
    image: 'https://placehold.co/800x450/f1f1f1/3b3b3b?text=Nicotine+Salts',
    seoTitle: 'Nicotine Salts Australia — Nic Salt E-Liquid | Aussie Vape Hub',
    seoDescription:
      'Aussie Vape Hub stocks premium nicotine salt e-liquid in Australia. 30mL bottles, 25mg & 50mg, fruit/menthol/dessert flavours. Same-day Sydney shipping.',
    keywords: [
      'aussie vape hub nicotine salts',
      'aussie nicotine salts',
      'aussie vape hub nic salt',
      'aussie vape hub e-liquid',
      'nicotine salts australia',
      'nic salt e-liquid australia',
      'buy nicotine salt online australia',
      'best nic salts australia',
      'nicotine salt 50mg australia',
      'nicotine salt 25mg australia',
      'pod liquid australia',
      'salt nic vape juice australia',
    ],
    buyerGuide: [
      {
        title: 'Choosing your nicotine strength',
        body: 'For ex-smokers of <10 cigarettes/day: 25mg salt nic is usually enough. For 10-20 cigarettes/day: 35-50mg. For >20 cigarettes/day: 50mg. Start with the higher strength if unsure — you can always taper down.',
      },
      {
        title: 'PG/VG ratio',
        body: 'Most nic salt liquids run a 70PG/30VG ratio — heavy on propylene glycol for fast nicotine absorption and a stronger throat hit. Some pod-friendly liquids are 50/50 for a smoother experience.',
      },
      {
        title: 'Flavour categories',
        body: 'Fruit profiles (mango, watermelon, berries) are the AU best-sellers. Menthol/iced profiles add cooling mint or icy notes. Dessert profiles (custard, vanilla, cake) provide sweeter, richer experiences. Tobacco profiles target ex-smokers who want a familiar taste.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between nic salts and freebase nicotine?',
        answer:
          'Freebase nicotine is the "pure" form, used in cigarettes and most older e-liquids. It hits the bloodstream slower and feels harsher on the throat at high strengths. Nicotine salts are freebase nic combined with benzoic acid, which lowers the pH — the result is faster absorption, smoother throat hit, and the ability to use much higher concentrations without harshness.',
      },
      {
        question: 'Are 50mg nic salts legal in Australia?',
        answer:
          'Yes — 50mg/mL is the maximum legal nicotine concentration permitted in Australia under the TGA prescription model. You must hold a valid Australian prescription to legally possess nicotine-containing e-liquids.',
      },
      {
        question: 'How long does a 30mL bottle of nic salt last?',
        answer:
          'For a typical pod-system user, one 30mL bottle of nic salt lasts roughly 1-2 weeks. Heavy vapers may go through one in 5-7 days. Light vapers can stretch one out to 3-4 weeks.',
      },
      {
        question: 'Can you use nic salts in sub-ohm devices?',
        answer:
          'No — nic salts at 20mg+ strengths should NOT be used in sub-ohm devices (coils below 1.0Ω). The high wattage produces too much nicotine vapour and creates a harsh, unpleasant hit that can also be unsafe.',
      },
    ],
  },
  {
    id: 'cat-004',
    slug: 'e-liquids',
    name: 'E-Liquids',
    description: 'Freebase e-liquids for sub-ohm devices and box mods — big flavour, big clouds.',
    intro:
      'Freebase e-liquids are formulated for sub-ohm pod systems and traditional box mods. Higher VG ratio, lower nicotine, big vapour production.',
    longDescription:
      'Freebase e-liquids are the original e-cigarette format and remain the choice for sub-ohm vapers and cloud chasers. With a higher VG (vegetable glycerin) ratio — typically 70VG/30PG or 80VG/20PG — these liquids produce dense, voluminous vapour clouds at lower nicotine concentrations (typically 3mg or 6mg). Aussie Vape Hub carries a curated freebase e-liquid range in 30mL and 60mL bottles, covering dessert, fruit, menthol and tobacco profiles.',
    highlights: [
      '70VG/80VG high-cloud formulations',
      'Sub-ohm device compatible',
      '3mg and 6mg strengths',
      '30mL and 60mL bottles',
      'Dessert, fruit, menthol & tobacco flavours',
    ],
    subcategories: [
      { id: 'sub-010', slug: 'freebase', name: 'Freebase', parentSlug: 'e-liquids' },
      { id: 'sub-011', slug: 'high-vg', name: 'High VG', parentSlug: 'e-liquids' },
    ],
    productCount: 84,
    image: 'https://placehold.co/800x450/f1f1f1/3b3b3b?text=E-Liquids',
    seoTitle: 'E-Liquids Australia — Freebase Vape Juice | Aussie Vape Hub',
    seoDescription:
      'Aussie Vape Hub stocks premium freebase e-liquids in Australia. 70VG sub-ohm friendly vape juice, 3mg & 6mg, 30mL & 60mL bottles. Same-day Sydney shipping.',
    keywords: [
      'aussie vape hub e-liquid',
      'aussie vape hub vape juice',
      'aussie e-liquid',
      'vape juice',
      'e-liquid australia',
      'vape juice australia',
      'freebase e-liquid australia',
      'buy e-liquid australia',
      'sub ohm e-liquid australia',
      '70vg e-liquid australia',
    ],
    buyerGuide: [
      {
        title: 'When to use freebase vs nic salts',
        body: 'Freebase is for sub-ohm devices and high-wattage vaping. Nic salts are for pod systems and low-wattage MTL. If your device runs 40W+ with coils below 1.0Ω, you want freebase. If your device runs 5-30W with coils above 1.0Ω, you want nic salts.',
      },
      {
        title: 'Understanding VG/PG ratios',
        body: 'VG is thick, sweet and produces big clouds. PG is thin, carries flavour better, and provides a stronger throat hit. 70VG/30PG is the sub-ohm standard. 80VG/20PG produces even bigger clouds. 50/50 is for MTL devices.',
      },
    ],
    faqs: [
      {
        question: 'Are 3mg and 6mg e-liquids strong enough?',
        answer:
          'For sub-ohm vaping — yes. At 40-80W, your lungs absorb nicotine extremely efficiently. 3mg in a sub-ohm device delivers roughly the same nicotine intake as 20mg in a pod system.',
      },
      {
        question: 'Can I use freebase e-liquid in a pod system?',
        answer:
          'Only if your pod system is designed for sub-ohm coils. Standard MTL pod systems with 1.0Ω+ coils will struggle to vaporise high-VG freebase and produce weak vapour.',
      },
      {
        question: 'How long does a 30mL bottle of freebase last?',
        answer:
          'Sub-ohm devices consume e-liquid faster than pod systems. A 30mL bottle typically lasts a heavy sub-ohm vaper 3-5 days, a moderate vaper 5-7 days, and a light vaper 7-10 days.',
      },
    ],
  },
  {
    id: 'cat-005',
    slug: 'accessories',
    name: 'Accessories',
    description: 'Coils, cables, cases and everything else your vape needs to keep running.',
    intro:
      'Replacement coils, USB-C cables, carrying cases, nicotine pouches and cleaning supplies for every device in our range.',
    longDescription:
      "Whether you need replacement coils for your pod system, a new USB-C charging cable, a travel case, or cleaning supplies — Aussie Vape Hub carries the accessories range you need. All replacement coils are genuine OEM parts compatible with the original devices, not aftermarket knock-offs. We also stock nicotine pouches (Velo, Zyn, AMMO, Dope, GOAT and more), cream chargers, and a curated lifestyle range. All accessories ship from our Sydney warehouse.",
    highlights: [
      'Genuine OEM replacement coils',
      'USB-C cables for all major devices',
      'Carrying cases and storage',
      'Nicotine pouches (Velo, Zyn, AMMO, Dope, GOAT and more)',
      'Lifestyle accessories',
    ],
    subcategories: [
      { id: 'sub-012', slug: 'nicotine-pouches', name: 'Nicotine Pouches', parentSlug: 'accessories' },
      { id: 'sub-013', slug: 'caffeine-pouches', name: 'Caffeine Pouches', parentSlug: 'accessories' },
      { id: 'sub-014', slug: 'cigarettes', name: 'Cigarettes', parentSlug: 'accessories' },
      { id: 'sub-015', slug: 'cream-chargers', name: 'Cream Chargers', parentSlug: 'accessories' },
      { id: 'sub-016', slug: 'coils', name: 'Replacement Coils', parentSlug: 'accessories' },
      { id: 'sub-017', slug: 'cables', name: 'Cables & Chargers', parentSlug: 'accessories' },
      { id: 'sub-018', slug: 'lifestyle', name: 'Lifestyle & Apparel', parentSlug: 'accessories' },
    ],
    productCount: 122,
    image: 'https://placehold.co/800x450/f1f1f1/3b3b3b?text=Accessories',
    seoTitle: 'Vape Accessories Australia — Coils, Cables, Pouches | Aussie Vape Hub',
    seoDescription:
      'Aussie Vape Hub stocks genuine vape accessories in Australia — replacement coils, USB-C cables, carrying cases and nicotine pouches. Same-day Sydney shipping.',
    keywords: [
      'aussie vape hub accessories',
      'vape accessories',
      'aussie vape hub coils',
      'aussie vape hub pouches',
      'vape accessories australia',
      'replacement coils australia',
      'vape coils australia',
      'vape cables australia',
      'nicotine pouches australia',
      'velo pouches australia',
      'zyn australia',
    ],
    faqs: [
      {
        question: 'How often should I replace my vape coils?',
        answer:
          'A typical mesh coil lasts 1-2 weeks of regular use. Replace when flavour tastes burnt, vapour drops, or e-liquid darkens fast.',
      },
      {
        question: 'Do you stock genuine OEM coils?',
        answer:
          'Yes — all replacement coils sold at Aussie Vape Hub are genuine OEM parts from the original device manufacturer, never aftermarket knock-offs.',
      },
      {
        question: 'Are nicotine pouches legal in Australia?',
        answer:
          'Nicotine pouches containing tobacco-derived nicotine are regulated similarly to vapes in Australia. Non-nicotine caffeine pouches are unrestricted. Check the product page for specific compliance details.',
      },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug)
}

/**
 * Resolve a product's *effective* subcategory slug. For accessories the raw
 * product.subcategory is unreliable (most got auto-imported as 'coils'), so we
 * pattern-match on the product name. For everything else we trust the field.
 */
export function resolveSubcategory(product: { name: string; subcategory?: string; tags?: string[]; category: string }): string | undefined {
  if (product.category !== 'accessories') return product.subcategory

  const name = (product.name || '').toLowerCase()
  const tags = (product.tags || []).map((t) => t.toLowerCase())

  if (
    tags.includes('cigarettes') ||
    /\b(marlboro|manchester|esse|euro|double happiness|camel|winfield|peter jackson|benson|rothmans|kent)\b/i.test(
      name
    )
  ) {
    return 'cigarettes'
  }

  if (/cream\s*charger|whip\s*charger|n2o|mosa|supremewhip/i.test(name)) {
    return 'cream-chargers'
  }

  if (/berserker|caffeine pouch|mojo pouch/i.test(name)) {
    return 'caffeine-pouches'
  }

  if (
    /\b(velo|zyn|ammo|dope|goat|snatch|xtrime|zimo|juice\s*head|sesh|killa)\b/i.test(name) ||
    /\bnicotine\s*pouch/i.test(name) ||
    /\bpouch(es)?\b/i.test(name)
  ) {
    return 'nicotine-pouches'
  }

  if (/coil|atomiser|atomizer/i.test(name)) return 'coils'
  if (/cable|charger\b|usb-?c/i.test(name)) return 'cables'

  if (/cap\b|hat|watch|sunglasses|t-?shirt|hoodie|jacket|beanie|cup|mug|sticker/i.test(name)) {
    return 'lifestyle'
  }

  return product.subcategory ?? 'lifestyle'
}
