import { PRODUCTS } from './products'
import type { Product } from '@/types'

export interface FaqItem {
  question: string
  answer: string
}

export interface Brand {
  slug: string
  name: string
  displayName: string
  origin: string
  tagline: string
  shortDescription: string
  longDescription: string
  highlights: string[]
  bestKnownFor: string
  faqs: FaqItem[]
  keywords: string[]
  seoTitle: string
  seoDescription: string
  aliases: string[]
  accentColor: string
}

const make = (b: Brand): Brand => b

export const BRANDS: Brand[] = [
  make({
    slug: 'iget',
    name: 'iget',
    displayName: 'IGET',
    origin: 'China',
    tagline: 'Australia\'s Most Popular Disposable Vape Brand',
    shortDescription: 'IGET is the undisputed leader in Australian disposable vapes. From the original IGET Legend to the IGET Bar Plus and IGET Goat, IGET has set the benchmark for flavour, reliability and puff count in the AU market.',
    longDescription:
      "IGET (Innokin) is Australia's most recognisable disposable vape brand — chances are if you've seen a vape in Sydney, Melbourne, Brisbane or Perth in the past three years, it was an IGET. The brand built its reputation on the legendary IGET Legend 4000 puff device and has since released a comprehensive line-up covering every puff range from the compact IGET Shion 600 right up to the mighty IGET One 12,000 puffs. IGET devices are known for their stable mesh coil hardware, true-to-flavour profile reproduction, and consistent draw activation that just works the first time, every time. Whether you're looking for the famous IGET Bar Plus 6000 puff rechargeable, the screen-equipped IGET Bar Pro, or the pod-and-mod IGET Dual system, Vapes Australia carries the largest in-stock IGET range in Australia. All IGET products are sourced through authorised AU channels, age-verified at checkout, and dispatched same-day from our Sydney warehouse on orders before 2pm AEST.",
    highlights: [
      'Largest IGET selection in Australia — Bar, Bar Plus, Bar Pro, Goat, Hot, King, Legend, Max, Moon, One, Shion, XXL',
      'Authentic AU stock with scratch-and-check authenticity codes',
      'Same-day dispatch from Sydney before 2pm AEST',
      '20mg salt nicotine, TGA-compliant prescription model',
      'Free shipping on IGET orders over $300',
    ],
    bestKnownFor: 'The IGET Bar Plus 6000 — the perfect balance of flavour, battery life and value',
    faqs: [
      {
        question: 'Is IGET the best disposable vape in Australia?',
        answer:
          'IGET consistently ranks as the most popular disposable vape brand in Australia thanks to its huge range, reliable hardware and consistent flavour. The IGET Bar Plus 6000 in particular is widely regarded as the best all-round disposable for AU vapers because of its rechargeable USB-C battery, mesh coil and 6,000-puff capacity at a mid-range price.',
      },
      {
        question: 'How can I tell if my IGET is genuine?',
        answer:
          'Every authentic IGET sold by Vapes Australia carries a scratch-off authenticity code on the back of the packaging. Scratch the panel and enter the code at the official IGET verification page. Counterfeit IGETs typically have blurry print, missing batch codes, or fail authentication — if you ever receive one from us, contact our team for an immediate replacement.',
      },
      {
        question: 'What is the difference between IGET Bar and IGET Bar Plus?',
        answer:
          'The IGET Bar 3500 is the original non-rechargeable model with a single airflow setting. The IGET Bar Plus 6000 is the rechargeable evolution — bigger battery, USB-C charging, larger e-liquid reservoir, adjustable airflow on most flavours, and roughly 1.7x the puff count for less than 1.5x the price.',
      },
      {
        question: 'Do you ship IGET vapes Australia-wide?',
        answer:
          'Yes. Vapes Australia ships IGET disposables to every Australian state and territory via discreet, plain-packaging courier. Free standard shipping on orders over $300, express options at checkout, and same-day dispatch from Sydney on weekday orders placed before 2pm AEST.',
      },
      {
        question: 'How long does an IGET disposable actually last?',
        answer:
          'A real-world IGET Bar 3500 typically lasts 3–5 days for a moderate vaper. The IGET Bar Plus 6000 lasts 5–8 days. The IGET One 12,000 puff lasts 1.5–2.5 weeks. Times vary based on inhale length, draw frequency and ambient temperature — heavy chain-vaping will significantly shorten device life.',
      },
    ],
    keywords: [
      'iget australia',
      'iget bar australia',
      'iget bar plus 6000',
      'iget legend australia',
      'iget goat',
      'iget hot 5500',
      'iget moon',
      'iget king australia',
      'iget vape australia',
      'buy iget online australia',
      'iget bar plus pods',
    ],
    seoTitle: 'IGET Australia — Bar, Bar Plus, Goat & More | Vapes Australia',
    seoDescription: 'Buy authentic IGET disposable vapes in Australia. Bar 3500, Bar Plus 6000, Goat 5000, Hot 5500, King, Legend, Max, Moon, One 12000 & more. Same-day AU shipping.',
    aliases: ['iget'],
    accentColor: '#ff0000',
  }),
  make({
    slug: 'alfakher',
    name: 'alfakher',
    displayName: 'Alfakher Crown Bar',
    origin: 'UAE',
    tagline: 'Premium Big-Puff Disposables From The Middle East',
    shortDescription: 'Alfakher Crown Bar disposables bring the Middle East\'s most celebrated shisha brand into the Australian vape market with 8,000 and 15,000 puff models packed with rich, deep flavours.',
    longDescription:
      "Alfakher is one of the most respected names in shisha tobacco worldwide — and the Crown Bar disposable vape line brings that same fanatical attention to flavour blending into the modern disposable format. Available in 8,000 puff and 15,000 puff models, the Crown Bar is engineered for long sessions with a dual mesh coil, adjustable airflow, USB-C fast charging and a 650mAh battery. Flavour profiles lean richer and more layered than typical disposables — think Two Apple (the iconic Alfakher shisha blend in vape form), Lemon Mint, Lush Ice, Magic Love and Sweet Passionfruit. Vapes Australia is one of Australia's largest authorised Alfakher Crown Bar stockists, with 3-pack, 5-pack, 10-pack and 20-pack bulk options for those who want to save. All Crown Bar inventory is genuine and ships from our Sydney warehouse same-day.",
    highlights: [
      'Crown Bar 15,000 puff and 8,000 puff range — full flavour line-up',
      'Bulk pack discounts (3-pack, 5-pack, 10-pack, 20-pack)',
      'Adjustable airflow + USB-C rechargeable',
      'Made by Alfakher — Middle East\'s premier shisha brand',
      'Authentic AU stock, scratch-and-verify codes',
    ],
    bestKnownFor: 'Crown Bar 15,000 puffs — Two Apple flavour',
    faqs: [
      {
        question: 'Is Alfakher Crown Bar a good disposable vape?',
        answer:
          'Yes — Alfakher Crown Bar is widely regarded as one of the best premium disposables on the Australian market. It uses dual mesh coil technology and rich flavour formulations developed by Alfakher (better known globally for premium shisha tobacco), giving it a noticeably deeper, more aromatic flavour than mid-tier disposables.',
      },
      {
        question: 'What is the most popular Crown Bar flavour?',
        answer:
          'Two Apple — the vape adaptation of Alfakher\'s legendary "Double Apple" shisha — is by far the most popular Crown Bar flavour in Australia. Other top sellers include Lush Ice, Lemon Mint, Strawberry Punch, and the seasonal Lucid Dreams blend.',
      },
      {
        question: 'How many puffs does Crown Bar 15000 last?',
        answer:
          'In real-world Australian use, the Crown Bar 15,000 puff model typically lasts 12–18 days for a moderate vaper, or 8–12 days for a heavy vaper. The 8,000 puff model lasts roughly 6–9 days. The battery is rechargeable via USB-C, so the limit is e-liquid, not battery.',
      },
      {
        question: 'Is Crown Bar 3-pack or 5-pack cheaper per device?',
        answer:
          'Yes — bulk packs save real money. A Crown Bar 3-pack discounts the per-unit price by ~10%, the 5-pack by ~15%, and the 10-pack by ~20% compared to single-unit pricing. The 20-pack offers the deepest savings for shops, events or sharing with friends.',
      },
      {
        question: 'Do Crown Bars work straight out of the packaging?',
        answer:
          'Yes. All Alfakher Crown Bars are factory pre-charged and ready to vape out of the box. We still recommend a quick 15-minute top-up charge before first use to ensure full battery life from day one, but there\'s no setup required — just unbox, pull the activation tab, and inhale.',
      },
    ],
    keywords: [
      'alfakher australia',
      'crown bar australia',
      'alfakher crown bar 15000',
      'alfakher crown bar 8000',
      'alfakher two apple',
      'crown bar 3 pack',
      'crown bar bulk australia',
      'alfakher vape australia',
    ],
    seoTitle: 'Alfakher Crown Bar Australia — 15000 & 8000 Puffs | Vapes Australia',
    seoDescription: 'Shop authentic Alfakher Crown Bar disposables in Australia. 15,000 puff & 8,000 puff models, all flavours, 3-pack & 10-pack bundles. Same-day Sydney dispatch.',
    aliases: ['alfakher'],
    accentColor: '#8b0000',
  }),
  make({
    slug: 'hqd',
    name: 'hqd',
    displayName: 'HQD',
    origin: 'China',
    tagline: 'Sleek, Reliable, Pocket-Friendly Disposables',
    shortDescription: 'HQD is the disposable vape brand that put style on the menu — slim, well-built devices with a clean flavour palette across the Cuvie, Maxx, Box and Slick ranges.',
    longDescription:
      "HQD is one of the global big-three in disposable vapes alongside IGET and Lost Mary, and is particularly popular with Australian vapers who value design and pocket-friendly form factors. The Cuvie line built HQD's reputation for reliable starter disposables. The HQD Cuvie Slick 20,000 and Slick Plus 12,000 are the brand's current flagship long-puff models, while the HQD Maxx 2500 remains a perennial best-seller for the entry-level segment. HQD's flavour styling tends to be cleaner and less candy-forward than other brands, which makes it a favourite among ex-smokers looking for a more authentic profile. Vapes Australia stocks the full HQD range with genuine AU inventory shipped from Sydney.",
    highlights: [
      'Full HQD range — Cuvie, Cuvie Plus, Cuvie Slick, Cuvie Slick Plus, Maxx, Slick, Box',
      'Premium build quality + design-focused form factor',
      'Cleaner, less sweet flavour profiles ideal for ex-smokers',
      'Authentic AU stock, scratch-verify codes',
      'Free shipping on AU orders over $300',
    ],
    bestKnownFor: 'HQD Cuvie Slick 20,000 — the sleekest long-puff disposable on the market',
    faqs: [
      {
        question: 'Is HQD a good disposable vape brand?',
        answer:
          'Yes — HQD is one of the three biggest global disposable vape brands, with a strong reputation for build quality and clean flavour formulation. The Cuvie and Maxx lines have been Australian best-sellers for years, and the newer Slick range is widely praised for its design.',
      },
      {
        question: 'What HQD model has the most puffs?',
        answer:
          'The HQD Cuvie Slick 20,000 currently holds the title in our Australian range, followed by the Cuvie Slick Plus 12,000 puffs. Both are USB-C rechargeable, so the puff number is the e-liquid limit — not the battery limit.',
      },
      {
        question: 'Is the HQD Maxx 2500 rechargeable?',
        answer:
          'No — the original HQD Maxx 2500 is a non-rechargeable single-use disposable, which is part of why it\'s so affordable and pocket-friendly. If you want a rechargeable equivalent, the HQD Cuvie Plus 1200 or the much larger HQD Slick 6000 are the closest options in the HQD line.',
      },
      {
        question: 'How does HQD compare to IGET?',
        answer:
          'IGET tends to have more candy/dessert-forward flavours and a larger overall range. HQD typically has cleaner, less sweet flavour profiles, slightly slimmer industrial design, and pocket-friendlier form factors. Both brands produce reliable, well-built disposables — it largely comes down to flavour preference and the specific model.',
      },
      {
        question: 'Where are HQD vapes made?',
        answer:
          'HQD devices are manufactured in Shenzhen, China by HQD Tech, one of the largest e-cigarette OEMs in the world. Vapes Australia only stocks authentic HQD inventory imported through authorised channels.',
      },
    ],
    keywords: [
      'hqd australia',
      'hqd cuvie',
      'hqd cuvie slick australia',
      'hqd cuvie plus',
      'hqd maxx 2500',
      'hqd slick 6000',
      'hqd box 4000',
      'hqd disposable vape',
    ],
    seoTitle: 'HQD Australia — Cuvie, Maxx, Slick & Box Range | Vapes Australia',
    seoDescription: 'Buy authentic HQD disposable vapes in Australia. Cuvie Slick 20000, Cuvie Plus 1200, Maxx 2500, Box 4000 and the full HQD range. Same-day Sydney shipping.',
    aliases: ['hqd'],
    accentColor: '#2fb5d2',
  }),
  make({
    slug: 'gunnpod',
    name: 'gunnpod',
    displayName: 'Gunnpod',
    origin: 'China',
    tagline: 'The Original Australian Favourite',
    shortDescription: 'Gunnpod has been a household name in Australian vaping for years. The 2000-puff original is the device that introduced millions of Aussies to disposable vapes.',
    longDescription:
      "Few disposable vape brands have shaped the Australian market like Gunnpod. The original Gunnpod 2000 was, for many years, the single best-selling disposable vape in Australia — its simple design, reliable mesh coil and well-balanced flavour line-up made it a go-to recommendation for ex-smokers transitioning to vaping. The brand has since expanded into the Gunnpod Plus 4500, Wave 3500, Lite 1400, Meta 4000, Lume 5000 and the high-capacity Moss 8000, covering every puff tier the AU market wants. Vapes Australia carries the complete Gunnpod range with authentic AU stock and same-day Sydney dispatch.",
    highlights: [
      'Full Gunnpod range — 2000, Lite 1400, Plus 4500, Wave 3500, Meta 4000, Lume 5000, Moss 8000',
      'The classic Australian disposable since 2020',
      'Beginner-friendly draw and balanced flavours',
      'Authentic stock with verification codes',
      'Same-day Sydney dispatch',
    ],
    bestKnownFor: 'The Gunnpod 2000 — the OG Australian disposable',
    faqs: [
      {
        question: 'Why is Gunnpod so popular in Australia?',
        answer:
          'Gunnpod arrived early in the AU disposable vape boom (2020-2021) with a reliable, affordable device and a flavour range tailored to Australian taste preferences. The mouth-to-lung draw, sensible nicotine strength, and consistent quality won over ex-smokers in particular — it became the most recommended "first vape" in Australia for years.',
      },
      {
        question: 'Is the new Gunnpod as good as the original?',
        answer:
          'The original Gunnpod 2000 remains a benchmark for entry-level disposables. The newer Plus, Wave, Meta, and Moss models add features (rechargeable batteries, higher puff counts, larger e-liquid reservoirs) while keeping the signature Gunnpod flavour balance. Most loyal users say the experience scales naturally — bigger device, same DNA.',
      },
      {
        question: 'What is the difference between Gunnpod Lume and Gunnpod Plus?',
        answer:
          'The Gunnpod Lume 5000 is the rechargeable upgrade with a transparent shell that shows the e-liquid level. The Gunnpod Plus 4500 is also rechargeable but uses a solid-colour shell. Both share the same mesh coil and battery platform; choice mostly comes down to aesthetic preference and a 500-puff capacity difference.',
      },
      {
        question: 'Is the Gunnpod 2000 still in stock?',
        answer:
          'Yes — despite being one of the older models, the original Gunnpod 2000 remains in active production and consistently in stock at Vapes Australia. It\'s still one of our top sellers, especially among customers who tried it first and prefer to stick with what works.',
      },
      {
        question: 'Can you recharge a Gunnpod 2000?',
        answer:
          'No — the original Gunnpod 2000 is non-rechargeable. For rechargeable Gunnpods, look at the Plus 4500, Wave 3500, Lume 5000, Meta 4000 or Moss 8000 — all of which charge via USB-C.',
      },
    ],
    keywords: [
      'gunnpod australia',
      'gunnpod 2000',
      'gunnpod plus 4500',
      'gunnpod wave 3500',
      'gunnpod lume 5000',
      'gunnpod meta',
      'gunnpod moss 8000',
      'gunnpod lite 1400',
    ],
    seoTitle: 'Gunnpod Australia — 2000, Plus, Wave, Lume & Moss | Vapes Australia',
    seoDescription: 'Shop the full Gunnpod range in Australia. Original 2000, Plus 4500, Wave 3500, Lume 5000, Meta 4000 & Moss 8000 in stock. Same-day Sydney shipping.',
    aliases: ['gunnpod'],
    accentColor: '#4cbb6c',
  }),
  make({
    slug: 'lost-mary',
    name: 'lost-mary',
    displayName: 'Lost Mary',
    origin: 'China (by Elf Bar)',
    tagline: 'Stylish Disposables From The Makers Of Elf Bar',
    shortDescription: 'Lost Mary is the design-led disposable vape line from Elf Bar — instantly recognisable by its egg-shape silhouette and screen-equipped premium models.',
    longDescription:
      "Lost Mary launched in 2022 as the more design-forward sibling brand of Elf Bar, and quickly became one of the most fashionable disposable vapes globally — including a huge following in Australia. The distinctive curved \"egg\" silhouette of the original BM600 (and later AU-market models) made it instantly Instagrammable, while the newer screen-equipped models added battery and e-liquid percentage indicators. Lost Mary's flavour engineering is known for being fruit-forward, refreshing and well-balanced — Blueberry Sour Raspberry, Watermelon Ice and Triple Mango are universal favourites. Vapes Australia stocks the AU-compliant Lost Mary range.",
    highlights: [
      'Iconic curved "egg" design',
      'Screen-equipped premium models with battery/liquid % display',
      'Fruit-forward flavour formulations',
      'By Elf Bar — globally proven hardware',
      'Authentic AU stock, same-day Sydney dispatch',
    ],
    bestKnownFor: 'Lost Mary BM600 and the screen-equipped 5000-puff range',
    faqs: [
      {
        question: 'Is Lost Mary made by Elf Bar?',
        answer:
          'Yes — Lost Mary is a sub-brand of Elf Bar (manufactured by iMiracle Shenzhen). It shares the same underlying coil and flavour platform as Elf Bar but uses a different industrial design and slightly different flavour line-up tailored to the global market.',
      },
      {
        question: 'What is the best Lost Mary flavour?',
        answer:
          'Blueberry Sour Raspberry (BB Sour Razz) is universally the best-selling Lost Mary flavour worldwide. Other consistent top performers in Australia include Triple Mango, Watermelon Ice, Cola, and Strawberry Ice.',
      },
      {
        question: 'Do Lost Mary vapes have a screen?',
        answer:
          'Premium Lost Mary models have an integrated LCD screen showing battery percentage and remaining e-liquid level. The classic BM600 and budget models do not. If a display matters to you, look for the Lost Mary 5000-puff or higher with "screen" in the description.',
      },
      {
        question: 'Are Lost Mary vapes rechargeable?',
        answer:
          'The original Lost Mary BM600 is non-rechargeable. Most newer Lost Mary models with 3000+ puffs are rechargeable via USB-C. Check the specific product page on Vapes Australia — rechargeability is always listed in the specifications.',
      },
      {
        question: 'How long does a Lost Mary disposable last?',
        answer:
          'A Lost Mary BM600 lasts 1-3 days for most vapers. A Lost Mary 5000-puff rechargeable lasts 5-9 days. A high-capacity 10,000-puff Lost Mary can last 2-3 weeks, depending on draw frequency.',
      },
    ],
    keywords: [
      'lost mary australia',
      'lost mary bm600',
      'lost mary 5000',
      'lost mary disposable vape',
      'lost mary blueberry',
      'elf bar lost mary',
    ],
    seoTitle: 'Lost Mary Australia — BM600 & Screen Disposables | Vapes Australia',
    seoDescription: 'Shop authentic Lost Mary disposables in Australia. BM600, 3000, 5000 & screen-equipped models. By Elf Bar. Same-day Sydney shipping.',
    aliases: ['lost mary', 'lost-mary'],
    accentColor: '#9c27b0',
  }),
  make({
    slug: 'vozol',
    name: 'vozol',
    displayName: 'Vozol',
    origin: 'China',
    tagline: 'High-Capacity Disposables Built For Marathon Sessions',
    shortDescription: 'Vozol specialises in massive-puff disposables — the Vozol Gear 10,000 and Star series are among the longest-lasting devices in the AU market.',
    longDescription:
      "Vozol is one of the rising stars in the global disposable vape market, particularly favoured by heavy vapers who want the longest possible device life between buys. The Vozol Star series and Gear line consistently top the puff-count charts, with rechargeable USB-C batteries, dual mesh coils and large e-liquid reservoirs. Vozol's flavour engineering is more bold and concentrated than competitors — flavours hit harder out of the gate and maintain consistency right through to the last puff. Vapes Australia is one of the first Australian retailers to stock the latest Vozol releases.",
    highlights: [
      'High-capacity disposables (9,000+ puffs standard)',
      'Dual mesh coil for richer, more consistent flavour',
      'USB-C rechargeable',
      'Bold, concentrated flavour profiles',
      'Authentic AU stock',
    ],
    bestKnownFor: 'Vozol Gear 10,000 puffs',
    faqs: [
      {
        question: 'How long does a Vozol disposable last?',
        answer:
          'A Vozol 9,000-puff disposable typically lasts 8-14 days for a moderate vaper. The Vozol Gear 10,000 lasts roughly 10-16 days. Times depend on inhale duration and frequency.',
      },
      {
        question: 'Are Vozol vapes rechargeable?',
        answer:
          'Yes — all current Vozol disposables in the Vapes Australia range are USB-C rechargeable. Most ship with a charging cable in the box.',
      },
      {
        question: 'Where is Vozol manufactured?',
        answer:
          'Vozol devices are manufactured in Shenzhen, China by Vozol Tech, an established e-cigarette manufacturer that has been operating since 2019.',
      },
      {
        question: 'What is the most popular Vozol flavour?',
        answer:
          'Triple Berry Ice and Cool Mint are consistently the top two Vozol flavours in Australia. Watermelon Ice, Lush Ice and Strawberry Banana also sell strongly.',
      },
    ],
    keywords: [
      'vozol australia',
      'vozol 9000',
      'vozol gear 10000',
      'vozol star',
      'vozol disposable',
    ],
    seoTitle: 'Vozol Australia — Gear 10000 & 9000-Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Vozol disposables in Australia. Vozol Gear 10000, Vozol Star and the 9000-puff range in stock with same-day Sydney shipping.',
    aliases: ['vozol'],
    accentColor: '#1976d2',
  }),
  make({
    slug: 'relx',
    name: 'relx',
    displayName: 'RELX',
    origin: 'China',
    tagline: 'Premium Pod Systems & MagicGo Disposables',
    shortDescription: 'RELX is the world\'s second-largest e-cigarette brand and the benchmark for premium pod systems. The MagicGo disposable line brings RELX engineering to the no-fuss format.',
    longDescription:
      "RELX is the closed-pod and premium-disposable brand of choice for vapers who prioritise build quality, flavour consistency and refined hardware. Globally, RELX is the second-largest vape company after Juul, with a particularly strong presence in Asia, the Middle East and now Australia. The RELX MagicGo disposable line uses the same ceramic atomiser technology as the premium RELX pod systems — meaning cleaner, more accurate flavour reproduction and zero burnt-coil taste even at the end of life. Vapes Australia carries the AU-compliant MagicGo range.",
    highlights: [
      'Ceramic atomiser technology (cleaner flavour)',
      'Premium pod system pedigree',
      'MagicGo 8000 disposable range',
      'Refined hardware engineering',
      'Authentic AU stock',
    ],
    bestKnownFor: 'RELX MagicGo 8000',
    faqs: [
      {
        question: 'What is the difference between RELX MagicGo and other disposables?',
        answer:
          'The key difference is the ceramic atomiser instead of cotton-wicked mesh coils. Ceramic atomisers deliver more consistent flavour throughout the device\'s life, don\'t produce burnt taste when nearly empty, and generally taste cleaner. The tradeoff is they\'re typically a fraction more expensive per device.',
      },
      {
        question: 'Is RELX a good brand?',
        answer:
          'Yes — RELX is widely considered one of the highest-quality vape brands globally. It\'s the second-largest e-cigarette company in the world by market share and is particularly respected for hardware design and flavour engineering.',
      },
      {
        question: 'Are RELX disposables rechargeable?',
        answer:
          'Yes — the RELX MagicGo 8000 is USB-C rechargeable. Battery is no longer the limiting factor; you can vape it down to the last drop of e-liquid.',
      },
    ],
    keywords: [
      'relx australia',
      'relx magicgo',
      'relx magicgo 8000',
      'relx disposable',
      'relx pod system australia',
    ],
    seoTitle: 'RELX Australia — MagicGo 8000 Disposables | Vapes Australia',
    seoDescription: 'Buy authentic RELX MagicGo disposables in Australia. Premium ceramic atomiser technology, 8000 puffs, USB-C rechargeable. Same-day Sydney shipping.',
    aliases: ['relx'],
    accentColor: '#000000',
  }),
  make({
    slug: 'elux',
    name: 'elux',
    displayName: 'Elux',
    origin: 'United Kingdom',
    tagline: 'UK Disposables With A Loyal AU Following',
    shortDescription: 'Elux Legend was one of the disposables that started the UK vape boom — the brand has since brought its 15,000-puff long-life models to Australia.',
    longDescription:
      "Elux made its name in the UK with the Elux Legend, a 3500-puff disposable that became one of the country's best-selling vapes during 2021-2023. The brand has since pivoted to higher-capacity models, with the Elux 15,000 puff series now widely available in Australia. Elux flavours lean fruity and refreshing, with strong Australian-tuned profiles like Cherry Berry, Pineapple Ice and Watermelon Ice. Vapes Australia carries genuine Elux stock direct from authorised distributors.",
    highlights: [
      'UK heritage — proven on the European market first',
      '15,000 puff long-life models',
      'Fruity, refreshing flavour formulations',
      'Authentic AU stock',
    ],
    bestKnownFor: 'Elux 15000 puff range',
    faqs: [
      {
        question: 'Is Elux a UK brand?',
        answer:
          'Yes — Elux is a UK-headquartered disposable vape brand that rose to prominence with the Elux Legend during the UK\'s disposable vape boom in 2021-2023. Like most disposables, manufacturing is done in China to UK specifications.',
      },
      {
        question: 'How long does Elux 15000 last?',
        answer:
          'Around 12-18 days for a moderate vaper. The Elux 15,000 puff models are rechargeable via USB-C, so the e-liquid reservoir is the limit.',
      },
    ],
    keywords: ['elux australia', 'elux 15000', 'elux legend', 'elux disposable'],
    seoTitle: 'Elux Australia — 15000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Elux disposables in Australia. Elux 15000 long-life models with same-day Sydney shipping from Vapes Australia.',
    aliases: ['elux'],
    accentColor: '#e91e63',
  }),
  make({
    slug: 'mr-fog',
    name: 'mr-fog',
    displayName: 'Mr Fog',
    origin: 'Canada',
    tagline: 'North American Disposable Brand Now In Australia',
    shortDescription: 'Mr Fog is the best-selling disposable brand in Canada, known for its no-nonsense, reliable hardware and the Mr Fog Max Air 3600 puff workhorse.',
    longDescription:
      "Mr Fog is the dominant disposable vape brand in Canada and a strong seller across North America. Its Australian range centres on the Mr Fog 3600 — a rechargeable USB-C disposable with a balanced flavour line-up engineered for North American taste profiles. Mr Fog has built its reputation on no-marketing, no-hype, just-work hardware that doesn't surprise you. Vapes Australia stocks Mr Fog through authorised channels.",
    highlights: [
      'Mr Fog Max Air 3600 puff workhorse',
      'North American #1 disposable brand',
      'Rechargeable USB-C',
      'Balanced North American flavour profiles',
      'Authentic AU stock',
    ],
    bestKnownFor: 'Mr Fog Max Air 3600',
    faqs: [
      {
        question: 'Is Mr Fog Canadian?',
        answer:
          'Yes — Mr Fog is owned by a Canadian distribution company and is the leading disposable vape brand in the Canadian market. The hardware is manufactured in China to Mr Fog specifications.',
      },
      {
        question: 'How long does a Mr Fog Max Air 3600 last?',
        answer:
          'Roughly 3-6 days for a moderate vaper. The Max Air 3600 is USB-C rechargeable.',
      },
    ],
    keywords: ['mr fog australia', 'mr fog max air 3600', 'mr fog disposable', 'mr fog vape'],
    seoTitle: 'Mr Fog Australia — Max Air 3600 Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Mr Fog disposables in Australia. Mr Fog Max Air 3600 puff range with same-day Sydney shipping. Canada\'s #1 disposable brand.',
    aliases: ['mr fog', 'mr-fog'],
    accentColor: '#37474f',
  }),
  make({
    slug: 'serein',
    name: 'serein',
    displayName: 'Serein',
    origin: 'China',
    tagline: 'Performance Disposables For Enthusiast Vapers',
    shortDescription: 'Serein\'s Hunter and Mech-Pro lines are engineered for vapers who want the maximum flavour and cloud production a disposable can deliver.',
    longDescription:
      "Serein sits in the enthusiast-tier of the disposable vape market. The Serein Hunter 6000 and Serein Mech-Pro 10,000 use dual mesh coil systems, higher-output batteries (800mAh+), and adjustable airflow rings to deliver cloud production and flavour intensity that's closer to a refillable pod system than a standard disposable. The brand has a small but loyal AU following among experienced vapers. Vapes Australia stocks the full Serein range.",
    highlights: [
      'Dual mesh coil performance',
      'Adjustable airflow rings',
      '800mAh+ batteries',
      'Cloud-tier disposable category',
      'Authentic AU stock',
    ],
    bestKnownFor: 'Serein Mech-Pro 10,000',
    faqs: [
      {
        question: 'Are Serein disposables worth the extra money?',
        answer:
          'For experienced vapers who care about flavour intensity and cloud production — yes. Serein devices use better coil systems and bigger batteries than standard mid-range disposables. For ex-smokers or casual users, a standard mid-range disposable will likely serve just as well.',
      },
      {
        question: 'Is Serein Mech-Pro really a "mech" device?',
        answer:
          'No — the "Mech-Pro" branding refers to the mechanical-mod aesthetic and the bold draw, not actual unregulated mech-mod electronics. Internally it\'s a regulated battery with proper safety circuits.',
      },
    ],
    keywords: ['serein australia', 'serein hunter 6000', 'serein mech-pro 10000', 'serein disposable'],
    seoTitle: 'Serein Australia — Hunter 6000 & Mech-Pro 10000 | Vapes Australia',
    seoDescription: 'Buy authentic Serein performance disposables in Australia. Hunter 6000 and Mech-Pro 10000. Dual mesh coil. Same-day Sydney shipping.',
    aliases: ['serein'],
    accentColor: '#f57c00',
  }),
  make({
    slug: 'fisco',
    name: 'fisco',
    displayName: 'Fisco',
    origin: 'China',
    tagline: 'Pod-Mod Hybrids And Mix Bars',
    shortDescription: 'Fisco focuses on the pod-mod hybrid format — devices like the Fisco XPod and Mix Bar bridge the gap between disposables and refillable pod systems.',
    longDescription:
      "Fisco is a smaller specialist brand with an interesting niche: pod-mod hybrid disposables. The Fisco XPod features a replaceable pod (more like a refillable pod system) while keeping the all-in-one simplicity of a disposable. The Fisco Mix Bar 12,000 takes a different approach with swappable flavour cartridges. Vapes Australia stocks the AU-compliant Fisco range.",
    highlights: [
      'Pod-mod hybrid format',
      'Replaceable / swappable pods',
      'Fisco XPod and Mix Bar lines',
      'Authentic AU stock',
    ],
    bestKnownFor: 'Fisco Mix Bar 12,000',
    faqs: [
      {
        question: 'How is Fisco different from regular disposables?',
        answer:
          'Fisco devices use a pod-mod hybrid design — the battery body is reusable and the e-liquid+coil sits in a replaceable pod. This sits halfway between a true disposable (where you throw the whole device away) and a refillable pod system (where you top up the same pod).',
      },
      {
        question: 'Are Fisco pods refillable?',
        answer:
          'No — the Fisco pods are pre-filled and disposable, but the battery body is reusable. You swap the pod when the e-liquid is finished.',
      },
    ],
    keywords: ['fisco australia', 'fisco xpod', 'fisco mix bar 12000', 'fisco vape'],
    seoTitle: 'Fisco Australia — XPod & Mix Bar Hybrids | Vapes Australia',
    seoDescription: 'Buy authentic Fisco pod-mod hybrid disposables in Australia. Fisco XPod and Mix Bar 12000 with same-day Sydney shipping.',
    aliases: ['fisco'],
    accentColor: '#388e3c',
  }),
  make({
    slug: 'alibarbar',
    name: 'alibarbar',
    displayName: 'AliBarBar',
    origin: 'China',
    tagline: 'High-Capacity Disposables With Bold Flavour Profiles',
    shortDescription: 'AliBarBar specialises in 9,000 puff disposables with rich, layered flavour formulations and the distinctive Ingot industrial design.',
    longDescription:
      "AliBarBar (or Ali Bar Bar) is a Chinese disposable brand that has built a loyal Australian following on the back of two strong product lines: the AliBarBar 9000 and the AliBarBar Ingot 9000. Both use dual mesh coil systems and large 18mL e-liquid reservoirs. Flavour development leans richer and more layered than typical mid-tier disposables. Vapes Australia stocks the full AliBarBar AU range.",
    highlights: [
      '9,000 puff capacity standard',
      'Dual mesh coil',
      '18mL e-liquid reservoir',
      'AliBarBar Ingot industrial design line',
      'Authentic AU stock',
    ],
    bestKnownFor: 'AliBarBar Ingot 9000',
    faqs: [
      {
        question: 'What is the difference between AliBarBar 9000 and AliBarBar Ingot 9000?',
        answer:
          'The internal hardware is largely the same. The Ingot 9000 uses an aluminium-bodied industrial design that feels more premium in the hand and runs slightly cooler. The standard 9000 uses a lighter plastic shell.',
      },
      {
        question: 'Are AliBarBar disposables rechargeable?',
        answer: 'Yes — both AliBarBar 9000 models are USB-C rechargeable.',
      },
    ],
    keywords: ['alibarbar australia', 'alibarbar 9000', 'alibarbar ingot 9000', 'alibarbar vape'],
    seoTitle: 'AliBarBar Australia — 9000 Puff & Ingot Disposables | Vapes Australia',
    seoDescription: 'Buy authentic AliBarBar disposables in Australia. AliBarBar 9000 and AliBarBar Ingot 9000 puff range. Same-day Sydney shipping.',
    aliases: ['alibarbar', 'ali bar bar'],
    accentColor: '#7b1fa2',
  }),
  make({
    slug: 'jnr',
    name: 'jnr',
    displayName: 'JNR',
    origin: 'China',
    tagline: 'Innovative Form Factors And Wild Designs',
    shortDescription: 'JNR pushes the boundaries of disposable vape design with the PhoneVape, FalconX, Shisha Hookah and Cruiser ranges.',
    longDescription:
      "JNR is one of the more creative brands in the disposable vape space — instead of yet another rectangular slab, JNR has built a reputation for distinctive industrial design. The JNR PhoneVape is shaped (and roughly the size of) a smartphone. The JNR Shisha Hookah is styled after a portable shisha. The JNR Falcon X has aggressive gaming-aesthetic styling, and the JNR Tank 10,000 is a high-capacity rechargeable tube. Vapes Australia stocks the unusual and the practical.",
    highlights: [
      'Wild form factors — PhoneVape, Shisha Hookah, Falcon X, Cruiser, Tank',
      'High-capacity 10,000-12,000 puff models',
      'Standout industrial design',
      'Authentic AU stock',
    ],
    bestKnownFor: 'JNR PhoneVape',
    faqs: [
      {
        question: 'Is the JNR PhoneVape actually shaped like a phone?',
        answer:
          'Yes — it\'s a flat slab almost identical in dimensions to a small smartphone. It\'s a conversation starter and surprisingly comfortable to hold compared to thicker disposables.',
      },
      {
        question: 'Does the JNR Shisha Hookah actually feel like shisha?',
        answer:
          'The draw is tuned to be looser and cooler than a typical disposable, which does mimic a shisha mouthpiece feel. The flavours also lean shisha-inspired (mint, double apple, grape).',
      },
    ],
    keywords: ['jnr australia', 'jnr phonevape', 'jnr falcon x', 'jnr cruiser 12000', 'jnr tank 10000', 'jnr shisha hookah'],
    seoTitle: 'JNR Australia — PhoneVape, FalconX, Shisha Hookah | Vapes Australia',
    seoDescription: 'Buy authentic JNR creative disposables in Australia. JNR PhoneVape, FalconX, Shisha Hookah, Cruiser 12000 and Tank 10000. Same-day Sydney shipping.',
    aliases: ['jnr'],
    accentColor: '#d32f2f',
  }),
  make({
    slug: 'kuz',
    name: 'kuz',
    displayName: 'Kuz',
    origin: 'China',
    tagline: 'Ultra-High Puff Specialists',
    shortDescription: 'Kuz competes at the top end of the puff-count market with the Kuz Flow 25,000 — currently one of the highest-capacity disposables on the AU market.',
    longDescription:
      "Kuz is a relatively new brand that has made a name for itself with the Kuz Flow 25,000 — one of the highest-puff disposables available in Australia. The brand also offers the Kuz Lux 9000 and Kuz 6000 for mid-tier shoppers. All Kuz devices use USB-C charging, dual mesh coils, and large e-liquid reservoirs. Vapes Australia is an authorised AU stockist.",
    highlights: [
      'Kuz Flow 25,000 — highest-puff in the AU range',
      'Dual mesh coil',
      'USB-C rechargeable',
      'Authentic AU stock',
    ],
    bestKnownFor: 'Kuz Flow 25,000',
    faqs: [
      {
        question: 'Does the Kuz Flow really do 25,000 puffs?',
        answer:
          'In testing, real-world puff counts on the Kuz Flow 25,000 typically land in the 19,000-23,000 range — short of the marketing number but still industry-leading. Time-wise, this is roughly 18-26 days of daily use.',
      },
    ],
    keywords: ['kuz australia', 'kuz flow 25000', 'kuz lux 9000', 'kuz 6000', 'kuz disposable'],
    seoTitle: 'Kuz Australia — Flow 25000 & Lux 9000 | Vapes Australia',
    seoDescription: 'Buy authentic Kuz ultra-high-puff disposables in Australia. Kuz Flow 25000, Lux 9000 and Kuz 6000. Same-day Sydney shipping.',
    aliases: ['kuz'],
    accentColor: '#5d4037',
  }),
  make({
    slug: 'x-qlusive',
    name: 'x-qlusive',
    displayName: 'X-Qlusive',
    origin: 'China',
    tagline: 'Diverse Range From Entry-Level To Pro',
    shortDescription: 'X-Qlusive offers one of the broadest puff-count ranges in the AU market — from the entry 2500 right up to the X-PRO 5500 and X-POD 3800.',
    longDescription:
      "X-Qlusive (X-Q) caters to vapers who want a single brand with broad coverage. The X-Qlusive 2500 is an entry-level non-rechargeable option, the Mega 3500 sits in the sweet spot for new vapers, the X-POD 3800 introduces refillable pod versatility, and the X-PRO 5500 is the brand's flagship rechargeable disposable. Vapes Australia stocks all four ranges.",
    highlights: [
      'Full range from 2500 to 5500 puffs',
      'Includes X-POD refillable pod system',
      'Affordable entry-level pricing',
      'Authentic AU stock',
    ],
    bestKnownFor: 'X-Qlusive X-PRO 5500',
    faqs: [
      {
        question: 'Is X-Qlusive a good entry-level brand?',
        answer:
          'Yes — the X-Qlusive 2500 in particular is a popular first-vape recommendation for ex-smokers because it\'s affordable, simple to use, and has a tight mouth-to-lung draw similar to a cigarette.',
      },
    ],
    keywords: ['x-qlusive australia', 'x-qlusive 2500', 'x-qlusive mega 3500', 'x-qlusive x-pod 3800', 'x-qlusive x-pro 5500'],
    seoTitle: 'X-Qlusive Australia — 2500 to X-PRO 5500 | Vapes Australia',
    seoDescription: 'Buy authentic X-Qlusive disposables in Australia. 2500, Mega 3500, X-POD 3800 and X-PRO 5500 range. Same-day Sydney shipping.',
    aliases: ['x-qlusive', 'xqlusive', 'x qlusive'],
    accentColor: '#0277bd',
  }),
  make({
    slug: 'groo',
    name: 'groo',
    displayName: 'Groo',
    origin: 'China',
    tagline: 'Slim, Modern Disposables For Everyday Vapers',
    shortDescription:
      "Groo's Max and Slim 9000 series have built a loyal Australian following thanks to their pocket-friendly profile, USB-C charging, and clean flavour engineering.",
    longDescription:
      "Groo focuses on slim, modern industrial design without compromising puff count. The Groo Slim 9000 in particular packs 9,000 puffs into a profile barely thicker than a smartphone, while the Groo Max takes the format to higher capacities. All current Groo devices are USB-C rechargeable with dual mesh coil systems and a curated AU-tuned flavour line-up. Vapes Australia stocks the full Groo range with authentic AU inventory shipped from Sydney.",
    highlights: [
      'Groo Slim 9000 — slimmest 9000-puff disposable',
      'Groo Max higher-capacity series',
      'Dual mesh coil + USB-C',
      'Pocket-friendly modern design',
      'Authentic AU stock',
    ],
    bestKnownFor: 'Groo Slim 9000',
    faqs: [
      { question: 'Is Groo a new brand?', answer: 'Groo is a newer entrant to the AU disposable vape market (2023+), but has quickly built a reputation for reliable hardware and clean flavour formulation.' },
      { question: 'How slim is the Groo Slim 9000?', answer: 'The Groo Slim 9000 is roughly 12mm thick — about the thickness of a thick smartphone case, and noticeably slimmer than competing 9000-puff disposables.' },
    ],
    keywords: ['groo australia', 'groo slim 9000', 'groo max', 'groo disposable vape'],
    seoTitle: 'Groo Australia — Slim 9000 & Max Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Groo disposables in Australia. Groo Slim 9000 and Groo Max in stock with same-day Sydney shipping.',
    aliases: ['groo'],
    accentColor: '#00897b',
  }),
  make({
    slug: 'vapehub',
    name: 'vapehub',
    displayName: 'VapeHub',
    origin: 'China',
    tagline: 'Versatile Multi-Format Disposable Range',
    shortDescription:
      'VapeHub offers one of the widest product matrices in the Australian disposable market, spanning entry-level pocket disposables through to high-capacity rechargeable workhorses.',
    longDescription:
      "VapeHub is a Chinese manufacturer that has carved out a strong AU position by offering broad coverage across the disposable vape format. The VapeHub product line includes compact 2000-3000 puff pocket disposables, mid-range 5000-7000 puff USB-C rechargeable models, and high-capacity 10,000+ puff long-life devices. The brand emphasises consistent flavour engineering across the entire range so customers who try one model usually trust the next. Vapes Australia is an authorised AU stockist.",
    highlights: [
      'Broad puff-count coverage (2000-10000+)',
      'Consistent flavour formulations across models',
      'USB-C rechargeable mid- and high-tier',
      'Authentic AU stock',
    ],
    bestKnownFor: 'VapeHub high-capacity range',
    faqs: [
      { question: 'Is VapeHub a good brand?', answer: 'VapeHub is a solid mid-tier disposable brand. Quality is consistent across the range and the flavour engineering is dependable, though it lacks the marketing presence of IGET or HQD.' },
      { question: 'Are VapeHub flavours strong?', answer: 'VapeHub leans toward balanced, true-to-fruit flavours rather than the very sweet candy profiles some other brands target. Many AU vapers find this more enjoyable for all-day use.' },
    ],
    keywords: ['vapehub australia', 'vapehub disposable vape', 'vapehub vape'],
    seoTitle: 'VapeHub Australia — Disposable Vape Range | Vapes Australia',
    seoDescription: 'Buy authentic VapeHub disposables in Australia. Full range from entry-level to high-capacity. Same-day Sydney shipping.',
    aliases: ['vapehub', 'vape hub'],
    accentColor: '#455a64',
  }),
  make({
    slug: 'brisk-bar',
    name: 'brisk-bar',
    displayName: 'Brisk Bar',
    origin: 'China',
    tagline: 'Affordable 5000-Puff Mid-Range Disposables',
    shortDescription:
      'Brisk Bar specialises in the mid-range 5000-puff sweet spot — affordable, rechargeable, and well-flavoured devices for everyday vaping.',
    longDescription:
      "Brisk Bar focuses almost entirely on the 5000-puff mid-range segment that suits most Australian vapers. The brand has avoided the temptation to chase ever-higher puff counts and instead invested in flavour development and consistent build quality at a price point that beats most competitors. The Brisk Bar 5000 is USB-C rechargeable with mesh coil engineering. Vapes Australia stocks the full Brisk Bar range.",
    highlights: ['5000-puff mid-range specialist', 'USB-C rechargeable', 'Mesh coil flavour', 'Competitive pricing', 'Authentic AU stock'],
    bestKnownFor: 'Brisk Bar 5000',
    faqs: [
      { question: 'How does Brisk Bar compare to IGET Hot 5500?', answer: 'Brisk Bar 5000 is a notably cheaper alternative to IGET Hot 5500 at a similar puff count. Flavour engineering is slightly less polished, but build quality is comparable.' },
      { question: 'Is Brisk Bar rechargeable?', answer: 'Yes — all current Brisk Bar 5000 models are USB-C rechargeable.' },
    ],
    keywords: ['brisk bar australia', 'brisk bar 5000', 'brisk bar disposable', 'cheap 5000 puff vape australia'],
    seoTitle: 'Brisk Bar Australia — 5000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Brisk Bar 5000 puff disposables in Australia at competitive prices. Same-day Sydney shipping.',
    aliases: ['brisk bar', 'briskbar'],
    accentColor: '#0288d1',
  }),
  make({
    slug: 'rabbeats',
    name: 'rabbeats',
    displayName: 'Rabbeats',
    origin: 'China',
    tagline: 'High-Capacity Disposables With Music-Themed Design',
    shortDescription:
      'Rabbeats Bar disposables stand out with their distinctive music-themed industrial design and reliable high-capacity hardware.',
    longDescription:
      "Rabbeats brings a music-inspired aesthetic to the disposable vape market — devices feature LED light effects and an audio-cue design language. Beyond the styling, the underlying hardware is solid: USB-C rechargeable batteries, dual mesh coil systems, and large e-liquid reservoirs delivering reliable performance. Vapes Australia carries the AU-compliant Rabbeats range.",
    highlights: ['Music-themed industrial design', 'High-capacity rechargeable', 'Dual mesh coil', 'LED accents', 'Authentic AU stock'],
    bestKnownFor: 'Rabbeats Bar high-capacity series',
    faqs: [
      { question: 'Does Rabbeats actually play sound?', answer: 'No — the music theme is purely visual. The devices have no speakers or audio output. The branding refers to the design aesthetic.' },
      { question: 'Are the LED effects always on?', answer: 'LED effects activate when you take a puff and fade out shortly after. They\'re not constantly illuminated, which preserves battery life.' },
    ],
    keywords: ['rabbeats australia', 'rabbeats bar', 'rabbeats disposable vape'],
    seoTitle: 'Rabbeats Australia — Bar Disposable Vapes | Vapes Australia',
    seoDescription: 'Buy authentic Rabbeats Bar disposables in Australia. Music-themed design, high-capacity rechargeable. Same-day Sydney shipping.',
    aliases: ['rabbeats', 'rabbeats bar'],
    accentColor: '#e91e63',
  }),
  make({
    slug: 'picco',
    name: 'picco',
    displayName: 'Picco',
    origin: 'China',
    tagline: 'Compact, Pocket-Friendly 7000-Puff Disposables',
    shortDescription:
      'Picco 7000 puff disposables hit the sweet spot of capacity, size and price — ideal for vapers who want a rechargeable mid-capacity device without bulk.',
    longDescription:
      "Picco is a focused brand that builds primarily one thing extremely well — the Picco 7000 puff disposable. The device packs 7,000 puffs of e-liquid into a compact form factor that fits comfortably in a pocket or small bag. USB-C rechargeable with a mesh coil and adjustable airflow on select flavours. Vapes Australia stocks the full Picco AU flavour range.",
    highlights: ['Picco 7000 puff specialist', 'Compact pocket-friendly form factor', 'USB-C rechargeable', 'Mesh coil + adjustable airflow', 'Authentic AU stock'],
    bestKnownFor: 'Picco 7000',
    faqs: [
      { question: 'How small is the Picco 7000?', answer: 'The Picco 7000 is one of the smaller 7000-puff devices on the AU market — roughly the size of a thick lipstick tube, much more pocket-friendly than competing devices at the same puff count.' },
      { question: 'Is Picco a new brand?', answer: 'Picco arrived in Australia in 2024 and has rapidly built a customer base among vapers who prioritise compact device size.' },
    ],
    keywords: ['picco australia', 'picco 7000', 'picco disposable vape', 'compact disposable vape australia'],
    seoTitle: 'Picco Australia — 7000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Picco 7000 puff disposables in Australia. Compact pocket-friendly design, USB-C rechargeable. Same-day Sydney shipping.',
    aliases: ['picco'],
    accentColor: '#7cb342',
  }),
  make({
    slug: 'ibuff',
    name: 'ibuff',
    displayName: 'iBuff',
    origin: 'China',
    tagline: 'Premium Quality At Mid-Range Pricing',
    shortDescription:
      'iBuff delivers premium build quality and refined flavour engineering at price points that beat most competitors in the mid-range disposable segment.',
    longDescription:
      "iBuff is a quietly competent disposable brand that prioritises substance over marketing. The hardware uses higher-grade materials than typical mid-tier disposables — better mouthpieces, more uniform coil winding, and tighter manufacturing tolerances — but the brand passes those savings on through lower pricing. Vapes Australia stocks the iBuff range.",
    highlights: ['Premium build at mid-range pricing', 'Refined flavour engineering', 'Higher-grade materials', 'USB-C rechargeable', 'Authentic AU stock'],
    bestKnownFor: 'iBuff full range',
    faqs: [
      { question: 'Is iBuff worth the price?', answer: 'iBuff is one of the best value propositions in the AU disposable market — you get build quality comparable to premium brands at mid-range prices.' },
      { question: 'How does iBuff compare to HQD?', answer: 'iBuff is slightly cheaper than HQD with comparable build quality. HQD has a stronger flavour range and more design variety, but iBuff offers better value-for-money.' },
    ],
    keywords: ['ibuff australia', 'ibuff vape', 'ibuff disposable'],
    seoTitle: 'iBuff Australia — Premium Mid-Range Disposables | Vapes Australia',
    seoDescription: 'Buy authentic iBuff disposables in Australia. Premium build at mid-range pricing. Same-day Sydney shipping.',
    aliases: ['ibuff', 'i-buff', 'i buff'],
    accentColor: '#fbc02d',
  }),
  make({
    slug: 'pyro',
    name: 'pyro',
    displayName: 'Pyro',
    origin: 'China',
    tagline: 'Bold Flavours In Mid-Tier 6000-Puff Disposables',
    shortDescription:
      "Pyro 6000 disposables are engineered for vapers who want concentrated, bold flavour profiles rather than subtle ones.",
    longDescription:
      "Pyro takes a deliberately bold approach to flavour formulation — flavours are more intense, more concentrated, and hit harder than typical mid-range disposables. The Pyro 6000 is USB-C rechargeable with a mesh coil. The brand is particularly popular with vapers who find typical disposable flavours too mild. Vapes Australia stocks the Pyro AU range.",
    highlights: ['Bold, concentrated flavour profiles', 'USB-C rechargeable', 'Mesh coil', '6000-puff capacity', 'Authentic AU stock'],
    bestKnownFor: 'Pyro 6000',
    faqs: [
      { question: 'Why are Pyro flavours so strong?', answer: 'Pyro uses higher concentrations of flavour compounds in its e-liquid formulations, producing more intense flavour without changing nicotine levels (still 20mg/mL AU-compliant).' },
      { question: 'Is Pyro 6000 rechargeable?', answer: 'Yes — USB-C rechargeable. The battery doesn\'t outlast the e-liquid.' },
    ],
    keywords: ['pyro australia', 'pyro 6000', 'pyro vape', 'bold flavour disposable australia'],
    seoTitle: 'Pyro Australia — 6000 Puff Bold Flavour Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Pyro 6000 puff disposables in Australia. Bold, concentrated flavour profiles. Same-day Sydney shipping.',
    aliases: ['pyro'],
    accentColor: '#d84315',
  }),
  make({
    slug: 'olit',
    name: 'olit',
    displayName: 'Olit',
    origin: 'China',
    tagline: 'High-Capacity 10000-Puff Workhorses',
    shortDescription:
      'Olit 10000 puff disposables deliver weeks of vaping per device at a price point that undercuts most competitors in the 10k-puff tier.',
    longDescription:
      "Olit focuses on the 10,000 puff long-life segment with disciplined attention to per-device pricing. The Olit 10000 uses dual mesh coil engineering and an 800mAh USB-C rechargeable battery in a robust industrial-design shell. Vapes Australia stocks the full Olit AU flavour range.",
    highlights: ['10000-puff long-life specialist', 'Dual mesh coil', 'USB-C rechargeable', 'Competitive pricing', 'Authentic AU stock'],
    bestKnownFor: 'Olit 10000',
    faqs: [
      { question: 'How long does Olit 10000 last?', answer: 'For a moderate vaper, around 10-15 days. For a heavy vaper, 7-10 days. The battery is rechargeable so e-liquid is the limit.' },
      { question: 'Is Olit cheaper than other 10000-puff devices?', answer: 'Yes — Olit typically prices 10-15% below comparable 10000-puff disposables from larger brands, making it one of the best value options in the long-life tier.' },
    ],
    keywords: ['olit australia', 'olit 10000', 'olit disposable vape', 'cheap 10000 puff vape australia'],
    seoTitle: 'Olit Australia — 10000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Olit 10000 puff long-life disposables in Australia. Best value 10k-puff range. Same-day Sydney shipping.',
    aliases: ['olit'],
    accentColor: '#3949ab',
  }),
  make({
    slug: 'puffmi',
    name: 'puffmi',
    displayName: 'Puffmi',
    origin: 'China',
    tagline: 'Reliable 5000-Puff Mid-Tier Disposables',
    shortDescription:
      'Puffmi 5000 puff disposables sit in the dependable mid-range — USB-C rechargeable, mesh coil, and a sensible flavour line-up.',
    longDescription:
      "Puffmi has built its reputation in Australia on the Puffmi 5000 — a straightforward, reliable 5000-puff USB-C rechargeable disposable that does what it says on the tin. No gimmicks, no marketing hype, just a dependable mid-range device. Vapes Australia stocks the Puffmi range.",
    highlights: ['5000 puff workhorse', 'USB-C rechargeable', 'Mesh coil', 'No-gimmicks reliability', 'Authentic AU stock'],
    bestKnownFor: 'Puffmi 5000',
    faqs: [
      { question: 'Is Puffmi 5000 a good choice for everyday vaping?', answer: 'Yes — Puffmi 5000 is one of the most consistent and reliable mid-range disposables on the AU market. It\'s the kind of device that "just works" without surprises.' },
    ],
    keywords: ['puffmi australia', 'puffmi 5000', 'puffmi disposable vape'],
    seoTitle: 'Puffmi Australia — 5000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Puffmi 5000 puff disposables in Australia. Reliable everyday mid-range vaping. Same-day Sydney shipping.',
    aliases: ['puffmi', 'puffmi 5000'],
    accentColor: '#26a69a',
  }),
  make({
    slug: 'vapsolo',
    name: 'vapsolo',
    displayName: 'VapSolo',
    origin: 'China',
    tagline: 'The VapSolo Viking 12,000 Long-Life Champion',
    shortDescription:
      'VapSolo focuses on the high-capacity 12,000-puff tier with the Viking series — robust, long-lasting, USB-C rechargeable disposables.',
    longDescription:
      "VapSolo's Viking 12000 disposable is built for endurance — 12,000 puffs of e-liquid, an 850mAh USB-C rechargeable battery, dual mesh coil engineering, and an aluminium-bodied industrial design shell that feels substantial in the hand. Vapes Australia stocks the full VapSolo Viking AU range.",
    highlights: ['VapSolo Viking 12000 long-life', 'Dual mesh coil', 'USB-C rechargeable 850mAh', 'Aluminium-bodied design', 'Authentic AU stock'],
    bestKnownFor: 'VapSolo Viking 12000',
    faqs: [
      { question: 'How long does VapSolo Viking 12000 last?', answer: 'Around 11-16 days for moderate vapers. Heavy vapers will get 8-12 days.' },
      { question: 'Is the Viking 12000 actually 12000 puffs?', answer: 'Real-world testing puts it at approximately 10,500-11,500 puffs — slightly short of marketing but consistent with industry norms for this tier.' },
    ],
    keywords: ['vapsolo australia', 'vapsolo viking 12000', 'vapsolo disposable vape'],
    seoTitle: 'VapSolo Australia — Viking 12000 Disposables | Vapes Australia',
    seoDescription: 'Buy authentic VapSolo Viking 12000 puff disposables in Australia. Premium high-capacity rechargeable. Same-day Sydney shipping.',
    aliases: ['vapsolo', 'vap solo'],
    accentColor: '#5e35b1',
  }),
  make({
    slug: 'zoovoo',
    name: 'zoovoo',
    displayName: 'Zoovoo',
    origin: 'China',
    tagline: 'The Dragbar 6000 Mid-Tier Specialist',
    shortDescription:
      'Zoovoo Dragbar 6000 disposables are well-regarded for their tight MTL draw and balanced flavour profiles — particularly popular with ex-smokers.',
    longDescription:
      "Zoovoo Dragbar 6000 has a loyal niche following in Australia, particularly among ex-smokers who prefer a tighter mouth-to-lung draw that more closely mimics a cigarette. The 6000-puff capacity is USB-C rechargeable. Flavours lean classic and balanced rather than dessert-heavy. Vapes Australia stocks the Zoovoo range.",
    highlights: ['Tight MTL cigarette-like draw', '6000-puff capacity', 'USB-C rechargeable', 'Classic balanced flavours', 'Authentic AU stock'],
    bestKnownFor: 'Zoovoo Dragbar 6000',
    faqs: [
      { question: 'Is the Zoovoo Dragbar good for ex-smokers?', answer: 'Yes — the tight MTL draw is one of the closest cigarette-mimicking experiences in the AU disposable market, making it a popular recommendation for transitioning smokers.' },
    ],
    keywords: ['zoovoo australia', 'zoovoo dragbar 6000', 'dragbar disposable vape australia'],
    seoTitle: 'Zoovoo Australia — Dragbar 6000 Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Zoovoo Dragbar 6000 puff disposables in Australia. Tight MTL draw, ex-smoker favourite. Same-day Sydney shipping.',
    aliases: ['zoovoo', 'zoovoo dragbar', 'dragbar'],
    accentColor: '#6a1b9a',
  }),
  make({
    slug: 'higo',
    name: 'higo',
    displayName: 'Higo',
    origin: 'China',
    tagline: 'Pro Mix Disposables With Adjustable Flavour Profiles',
    shortDescription:
      "Higo's Pro Mix range introduces an innovative twist — adjustable airflow rings that meaningfully alter the flavour intensity and throat hit.",
    longDescription:
      "Higo Pro Mix devices feature a usable airflow adjustment ring that allows vapers to fine-tune their experience between tight MTL and looser RDL draws. This is unusual in the disposable space and gives Pro Mix users genuine flexibility from a single device. Vapes Australia stocks the Higo Pro Mix AU range.",
    highlights: ['Adjustable airflow ring', 'Pro Mix flavour profiles', 'USB-C rechargeable', 'Mesh coil', 'Authentic AU stock'],
    bestKnownFor: 'Higo Pro Mix',
    faqs: [
      { question: 'Does the Higo airflow ring really make a difference?', answer: 'Yes — unlike some disposables that include cosmetic airflow rings, the Higo Pro Mix ring meaningfully shifts the draw resistance between cigarette-tight and looser, more open inhales.' },
    ],
    keywords: ['higo australia', 'higo pro mix', 'higo disposable vape', 'adjustable airflow disposable australia'],
    seoTitle: 'Higo Pro Mix Australia — Adjustable Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Higo Pro Mix disposables in Australia. Adjustable airflow ring for tunable draw. Same-day Sydney shipping.',
    aliases: ['higo', 'higo pro mix'],
    accentColor: '#00838f',
  }),
  make({
    slug: 'tess',
    name: 'tess',
    displayName: 'Tess',
    origin: 'China',
    tagline: 'The LV 12000 Premium Long-Life Disposable',
    shortDescription:
      "Tess focuses on a single hero product — the Tess LV 12,000 — engineered for premium long-life vaping with refined hardware.",
    longDescription:
      "Tess takes a focused approach: one product, done well. The Tess LV 12,000 is a 12,000-puff USB-C rechargeable disposable with dual mesh coil engineering, 850mAh battery, and an industrial-design shell that feels closer to a premium pod system than a typical disposable. Vapes Australia stocks the Tess LV 12000 in its full AU flavour range.",
    highlights: ['Tess LV 12000 hero product', 'Premium build quality', 'Dual mesh coil', 'USB-C rechargeable 850mAh', 'Authentic AU stock'],
    bestKnownFor: 'Tess LV 12000',
    faqs: [
      { question: 'Why only one Tess model?', answer: 'Tess focuses development resources on perfecting a single device rather than diluting effort across a wide range. The LV 12,000 has been refined over several hardware revisions.' },
    ],
    keywords: ['tess australia', 'tess lv 12000', 'tess disposable vape'],
    seoTitle: 'Tess Australia — LV 12000 Premium Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Tess LV 12000 puff disposables in Australia. Premium long-life single-product specialist. Same-day Sydney shipping.',
    aliases: ['tess', 'tess lv', 'tess - lv'],
    accentColor: '#311b92',
  }),
  make({
    slug: 'wotofo',
    name: 'wotofo',
    displayName: 'Wotofo',
    origin: 'China',
    tagline: 'Veteran Vape Hardware Brand With The nexBar Disposable',
    shortDescription:
      'Wotofo is a veteran in vape hardware (mods, tanks, RTAs) and brings that engineering pedigree to the disposable space with the Wotofo nexBar.',
    longDescription:
      "Wotofo has been one of the most respected vape hardware brands globally for over a decade, primarily known for rebuildable atomisers, advanced tanks and box mods. The Wotofo nexBar is the company's well-engineered entry into the disposable market — bringing the same coil-design expertise that made Wotofo famous in the enthusiast space. Vapes Australia stocks the Wotofo nexBar AU range.",
    highlights: ['Wotofo engineering heritage', 'Decade of vape hardware expertise', 'nexBar disposable', 'USB-C rechargeable', 'Authentic AU stock'],
    bestKnownFor: 'Wotofo nexBar',
    faqs: [
      { question: 'Is Wotofo only known for disposables?', answer: 'No — Wotofo is much better known globally for advanced vape hardware like the Profile RTA series and Recurve mods. The nexBar is a recent disposable-market entry leveraging Wotofo\'s engineering heritage.' },
    ],
    keywords: ['wotofo australia', 'wotofo nexbar', 'wotofo disposable vape'],
    seoTitle: 'Wotofo Australia — nexBar Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Wotofo nexBar disposables in Australia. Vape hardware veteran enters disposable space. Same-day Sydney shipping.',
    aliases: ['wotofo', 'wotofo nexbar', 'nexbar'],
    accentColor: '#bf360c',
  }),
  make({
    slug: 'calibarn',
    name: 'calibarn',
    displayName: 'Calibarn',
    origin: 'China',
    tagline: '6000 Puff Mid-Range Specialist',
    shortDescription:
      'Calibarn 6000 disposables hit the mid-range sweet spot — affordable rechargeable devices with solid flavour engineering.',
    longDescription:
      "Calibarn is a focused brand offering one well-built product: the Calibarn 6000. USB-C rechargeable, mesh coil, and a balanced flavour line-up at a price point that competes aggressively with bigger-name brands. Vapes Australia stocks the Calibarn 6000 AU range.",
    highlights: ['Calibarn 6000 single-product focus', 'USB-C rechargeable', 'Mesh coil flavour', 'Aggressive pricing', 'Authentic AU stock'],
    bestKnownFor: 'Calibarn 6000',
    faqs: [
      { question: 'Is Calibarn 6000 worth trying?', answer: 'Yes — at the price point, Calibarn 6000 is a strong value option in the 6000-puff tier. Flavour engineering won\'t blow you away, but build quality and reliability are dependable.' },
    ],
    keywords: ['calibarn australia', 'calibarn 6000', 'calibarn disposable vape'],
    seoTitle: 'Calibarn Australia — 6000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Calibarn 6000 puff disposables in Australia. Affordable mid-range rechargeable. Same-day Sydney shipping.',
    aliases: ['calibarn', 'calibarn 6000'],
    accentColor: '#558b2f',
  }),
  make({
    slug: 'lucky-wolf',
    name: 'lucky-wolf',
    displayName: 'Lucky Wolf',
    origin: 'China',
    tagline: 'Aggressive Styling, Strong Flavour Profiles',
    shortDescription:
      'Lucky Wolf disposables stand out with bold, aggressive industrial design and concentrated flavour formulations targeting experienced vapers.',
    longDescription:
      "Lucky Wolf is one of the more visually distinctive brands in the AU disposable market, with industrial design that leans toward the aggressive end of the spectrum — sharp lines, bold colours, and a brand identity that targets enthusiast vapers rather than mass-market. Flavours are concentrated and forward, not subtle. Vapes Australia stocks the Lucky Wolf AU range.",
    highlights: ['Distinctive aggressive industrial design', 'Concentrated flavour profiles', 'USB-C rechargeable', 'Targeting experienced vapers', 'Authentic AU stock'],
    bestKnownFor: 'Lucky Wolf disposable range',
    faqs: [
      { question: 'Is Lucky Wolf only for experienced vapers?', answer: 'Lucky Wolf is approachable for anyone, but the brand positioning and concentrated flavours tend to appeal more to vapers who\'ve tried the mainstream brands and want something stronger.' },
    ],
    keywords: ['lucky wolf australia', 'lucky wolf vape', 'lucky wolf disposable'],
    seoTitle: 'Lucky Wolf Australia — Aggressive Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Lucky Wolf disposables in Australia. Bold design, concentrated flavours. Same-day Sydney shipping.',
    aliases: ['lucky wolf'],
    accentColor: '#212121',
  }),
  make({
    slug: 'rival-bar',
    name: 'rival-bar',
    displayName: 'Rival Bar',
    origin: 'China',
    tagline: '7000 Puff Disposables With Distinctive Flavour Range',
    shortDescription:
      'Rival Bar 7000 disposables differentiate on flavour — the line-up includes some of the more inventive combinations on the AU market.',
    longDescription:
      "Rival Bar competes in the 7000-puff tier against bigger-name brands by leaning into unusual flavour combinations that the mainstream brands don't attempt. The hardware is solid (USB-C rechargeable, mesh coil) but the brand's identity is really about the flavour menu. Vapes Australia stocks the full Rival Bar AU range.",
    highlights: ['Inventive flavour combinations', '7000-puff capacity', 'USB-C rechargeable', 'Mesh coil', 'Authentic AU stock'],
    bestKnownFor: 'Rival Bar 7000',
    faqs: [
      { question: 'What unusual flavours does Rival Bar offer?', answer: 'Rival Bar has historically experimented with combinations like cucumber lemon, tropical chili, and various lesser-seen fruit hybrids that mainstream brands don\'t carry.' },
    ],
    keywords: ['rival bar australia', 'rival bar 7000', 'rival bar disposable vape', 'unusual flavour disposable australia'],
    seoTitle: 'Rival Bar Australia — 7000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Rival Bar 7000 puff disposables in Australia. Inventive flavour combinations. Same-day Sydney shipping.',
    aliases: ['rival bar', 'rivalbar'],
    accentColor: '#c62828',
  }),
  make({
    slug: 'veiik',
    name: 'veiik',
    displayName: 'VEIIK',
    origin: 'China',
    tagline: 'Established Pod & Disposable Brand',
    shortDescription:
      'VEIIK is one of the older established vape brands in the AU market with a reliable 7000 puff disposable line-up.',
    longDescription:
      "VEIIK has been in the Australian vape market since the early disposable boom and has earned a reputation for reliable, no-nonsense hardware. The VEIIK 7000 disposable is USB-C rechargeable with dual mesh coil engineering. The brand also produces pod systems and starter kits. Vapes Australia stocks the VEIIK AU range.",
    highlights: ['Established AU brand presence', 'VEIIK 7000 puff range', 'Dual mesh coil', 'USB-C rechargeable', 'Authentic AU stock'],
    bestKnownFor: 'VEIIK 7000',
    faqs: [
      { question: 'How long has VEIIK been around?', answer: 'VEIIK has been active in the AU vape market since around 2019 — one of the older surviving disposable brands in Australia.' },
    ],
    keywords: ['veiik australia', 'veiik 7000', 'veiik disposable vape'],
    seoTitle: 'VEIIK Australia — 7000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic VEIIK 7000 puff disposables in Australia. Established AU brand, reliable hardware. Same-day Sydney shipping.',
    aliases: ['veiik'],
    accentColor: '#1565c0',
  }),
  make({
    slug: 'panda',
    name: 'panda',
    displayName: 'Panda',
    origin: 'China',
    tagline: 'Cute Branding, Reliable 2500-Puff Entry Disposables',
    shortDescription:
      "Panda 2500 puff disposables target the entry-level segment with cute branding and a simple, dependable user experience.",
    longDescription:
      "Panda 2500 brings approachable, friendly branding to the entry-level disposable segment. The 2500-puff capacity is non-rechargeable but well-priced, making it a popular first-vape choice for ex-smokers or casual vapers who don't want to commit to a higher-capacity device. Vapes Australia stocks the Panda 2500 AU range.",
    highlights: ['Entry-level 2500-puff specialist', 'Approachable cute branding', 'Affordable pricing', 'Non-rechargeable simplicity', 'Authentic AU stock'],
    bestKnownFor: 'Panda 2500',
    faqs: [
      { question: 'Is Panda 2500 rechargeable?', answer: 'No — Panda 2500 is non-rechargeable, which keeps the device simple and the price low. For a moderate vaper, the device lasts roughly 3-5 days.' },
    ],
    keywords: ['panda australia', 'panda 2500', 'panda disposable vape', 'entry level disposable vape australia'],
    seoTitle: 'Panda Australia — 2500 Puff Entry Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Panda 2500 puff disposables in Australia. Approachable entry-level option. Same-day Sydney shipping.',
    aliases: ['panda', 'panda 2500'],
    accentColor: '#424242',
  }),
  make({
    slug: 'waka-smash',
    name: 'waka-smash',
    displayName: 'Waka Smash',
    origin: 'China',
    tagline: 'Sturdy 6000-Puff Disposables Built To Take A Hit',
    shortDescription:
      "Waka Smash 6000 disposables are built tougher than most — reinforced shell construction, drop-resistant industrial design, and reliable 6000-puff hardware.",
    longDescription:
      "Waka Smash earns its name from the sturdier-than-average build quality. The shell uses reinforced construction that survives drops and tumbles better than typical plastic disposables. The Smash 6000 is USB-C rechargeable with dual mesh coil engineering. Vapes Australia stocks the Waka Smash AU range.",
    highlights: ['Reinforced drop-resistant shell', 'Waka Smash 6000-puff capacity', 'Dual mesh coil', 'USB-C rechargeable', 'Authentic AU stock'],
    bestKnownFor: 'Waka Smash 6000',
    faqs: [
      { question: 'Is Waka Smash actually more durable?', answer: 'The shell construction uses thicker plastic and reinforced internal supports, making the device noticeably more drop-resistant than a typical plastic disposable. Not indestructible, but harder to break.' },
    ],
    keywords: ['waka smash australia', 'waka smash 6000', 'waka smash disposable vape', 'durable disposable vape australia'],
    seoTitle: 'Waka Smash Australia — 6000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Waka Smash 6000 puff disposables in Australia. Drop-resistant reinforced shell. Same-day Sydney shipping.',
    aliases: ['waka', 'waka smash'],
    accentColor: '#33691e',
  }),
  make({
    slug: 'yooz',
    name: 'yooz',
    displayName: 'Yooz',
    origin: 'China',
    tagline: 'The Yooz Ultra 15000 High-Capacity Specialist',
    shortDescription:
      'Yooz Ultra 15000 disposables compete at the top end of the AU long-life market with 15,000-puff capacity and refined hardware.',
    longDescription:
      "Yooz Ultra 15000 is the brand's flagship — 15,000 puffs of e-liquid, dual mesh coil engineering, 850mAh USB-C rechargeable battery, and a premium aluminium-bodied industrial design. The brand positions itself in the premium tier alongside Alfakher Crown Bar and HQD Cuvie Slick. Vapes Australia stocks the Yooz Ultra range.",
    highlights: ['Yooz Ultra 15000 flagship', 'Dual mesh coil', 'USB-C rechargeable 850mAh', 'Aluminium-bodied premium design', 'Authentic AU stock'],
    bestKnownFor: 'Yooz Ultra 15000',
    faqs: [
      { question: 'How long does Yooz Ultra 15000 last?', answer: 'For a moderate vaper, approximately 14-18 days. For a heavy vaper, 10-14 days.' },
    ],
    keywords: ['yooz australia', 'yooz ultra 15000', 'yooz disposable vape'],
    seoTitle: 'Yooz Australia — Ultra 15000 Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Yooz Ultra 15000 puff disposables in Australia. Premium long-life specialist. Same-day Sydney shipping.',
    aliases: ['yooz', 'yooz ultra'],
    accentColor: '#283593',
  }),
  make({
    slug: 'bimo',
    name: 'bimo',
    displayName: 'Bimo',
    origin: 'China',
    tagline: 'The Crystal 12000 — Premium Long-Life Disposable',
    shortDescription:
      'Bimo Crystal 12000 disposables stand out with a transparent crystal-clear shell that displays the e-liquid level at a glance.',
    longDescription:
      "Bimo Crystal 12000 features one of the more distinctive design choices in the AU disposable market: a transparent crystal-clear shell that exposes the internal e-liquid reservoir so you can see at-a-glance how much vape time is left. Otherwise: 12,000 puff capacity, dual mesh coil, USB-C rechargeable. Vapes Australia stocks the Bimo Crystal AU range.",
    highlights: ['Transparent crystal-clear shell', 'Visible e-liquid reservoir', '12000-puff capacity', 'USB-C rechargeable', 'Authentic AU stock'],
    bestKnownFor: 'Bimo Crystal 12000',
    faqs: [
      { question: 'Does the transparent shell affect durability?', answer: 'The crystal shell uses a tougher polycarbonate than typical disposable plastic, so durability is comparable to opaque-shelled devices. The transparency is a design feature, not a structural compromise.' },
    ],
    keywords: ['bimo australia', 'bimo crystal 12000', 'transparent disposable vape australia'],
    seoTitle: 'Bimo Australia — Crystal 12000 Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Bimo Crystal 12000 puff disposables in Australia. Transparent shell shows e-liquid level. Same-day Sydney shipping.',
    aliases: ['bimo', 'bimo crystal'],
    accentColor: '#0097a7',
  }),
  make({
    slug: 'adalya',
    name: 'adalya',
    displayName: 'Adalya',
    origin: 'Turkey',
    tagline: 'Premium Shisha-Brand Disposables',
    shortDescription:
      'Adalya is a Turkish premium shisha tobacco brand bringing its renowned flavour formulations to the disposable vape format with the Love 66 and Two Apples 16,000-puff models.',
    longDescription:
      "Adalya is one of the world's most respected shisha tobacco brands, particularly known for its rich, layered flavour development. The Adalya disposable vape line — Love 66 and Two Apples in 16,000-puff format — translates the brand's shisha flavour expertise into the modern disposable format. Vapes Australia stocks the Adalya AU range.",
    highlights: ['Turkish shisha brand heritage', '16,000-puff capacity', 'Rich, layered flavour formulations', 'Love 66 and Two Apples models', 'Authentic AU stock'],
    bestKnownFor: 'Adalya Two Apples 16000',
    faqs: [
      { question: 'Is Adalya the same as Alfakher?', answer: 'No — both are Middle Eastern premium shisha brands but they\'re separate companies. Adalya is Turkish; Alfakher is from the UAE. Both have brought their flavour expertise to disposable vapes recently.' },
    ],
    keywords: ['adalya australia', 'adalya 16000', 'adalya two apples', 'adalya love 66', 'adalya disposable vape'],
    seoTitle: 'Adalya Australia — 16000 Puff Shisha Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Adalya disposables in Australia. Premium Turkish shisha brand. Love 66 and Two Apples 16000 puff models. Same-day Sydney shipping.',
    aliases: ['adalya'],
    accentColor: '#6d4c41',
  }),
  make({
    slug: 'funky-land',
    name: 'funky-land',
    displayName: 'Funky Land',
    origin: 'China',
    tagline: 'Vibrant 6000-Puff Disposables With Bold Personality',
    shortDescription:
      'Funky Land 6000 disposables bring vibrant colour, playful branding, and reliable mid-range hardware to the Australian disposable market.',
    longDescription:
      "Funky Land takes a deliberately playful approach — vibrant colours, bold packaging, and fun branding sit alongside dependable mid-range hardware. The Funky Land 6000 is USB-C rechargeable with a mesh coil. Flavours lean toward the fun, fruity end of the spectrum. Vapes Australia stocks the Funky Land AU range.",
    highlights: ['Vibrant playful branding', '6000-puff USB-C rechargeable', 'Mesh coil flavour', 'Fun fruity flavour focus', 'Authentic AU stock'],
    bestKnownFor: 'Funky Land 6000',
    faqs: [
      { question: 'Is Funky Land suitable for serious vapers?', answer: 'The playful branding shouldn\'t put off serious vapers — the underlying hardware is solid mid-range, comparable to other 6000-puff disposables.' },
    ],
    keywords: ['funky land australia', 'funky land 6000', 'funky land disposable vape'],
    seoTitle: 'Funky Land Australia — 6000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Funky Land 6000 puff disposables in Australia. Vibrant branding, reliable mid-range hardware. Same-day Sydney shipping.',
    aliases: ['funky land', 'funkyland'],
    accentColor: '#f4511e',
  }),
  make({
    slug: 'golit',
    name: 'golit',
    displayName: 'Golit',
    origin: 'China',
    tagline: 'High-Capacity 15000-Puff Disposables At Competitive Prices',
    shortDescription:
      'Golit 15,000 puff disposables sit at the long-life end of the AU market with aggressive pricing that undercuts most competitors at the same puff count.',
    longDescription:
      "Golit 15000 competes in the premium long-life disposable tier with one key differentiator: price. The device matches the puff count and rechargeable hardware of brands like Alfakher Crown Bar 15000 and HQD Cuvie Slick at a noticeably lower price point. Flavour engineering is solid if not exceptional. Vapes Australia stocks the Golit AU range.",
    highlights: ['15000-puff long-life capacity', 'Competitive pricing vs Alfakher / HQD', 'USB-C rechargeable', 'Dual mesh coil', 'Authentic AU stock'],
    bestKnownFor: 'Golit 15000',
    faqs: [
      { question: 'How does Golit compare to Alfakher Crown Bar 15000?', answer: 'Golit 15000 matches the capacity and hardware features but is priced lower. Alfakher Crown Bar has more refined flavour engineering, while Golit offers better value for money.' },
    ],
    keywords: ['golit australia', 'golit 15000', 'golit disposable vape', 'cheap 15000 puff vape australia'],
    seoTitle: 'Golit Australia — 15000 Puff Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Golit 15000 puff disposables in Australia. Long-life at competitive prices. Same-day Sydney shipping.',
    aliases: ['golit'],
    accentColor: '#4527a0',
  }),
  make({
    slug: 'leafbar',
    name: 'leafbar',
    displayName: 'Leafbar Platinum',
    origin: 'China',
    tagline: 'Premium-Tier Disposables With Refined Hardware',
    shortDescription:
      'Leafbar Platinum sits at the upper end of the disposable vape market with refined hardware engineering and a more sophisticated flavour palette.',
    longDescription:
      "Leafbar Platinum is positioned as a premium-tier brand competing with the likes of RELX MagicGo and HQD Cuvie Slick in the refined-hardware segment. The platinum line uses higher-grade internal components, more uniform coil winding, and a more sophisticated flavour development approach than mid-tier brands. Vapes Australia stocks the Leafbar Platinum AU range.",
    highlights: ['Premium-tier positioning', 'Higher-grade internal components', 'Refined flavour palette', 'USB-C rechargeable', 'Authentic AU stock'],
    bestKnownFor: 'Leafbar Platinum range',
    faqs: [
      { question: 'Is Leafbar Platinum worth the premium price?', answer: 'For vapers who prioritise refined flavour reproduction and premium hardware feel — yes. For value-focused buyers, mid-range brands deliver 80% of the experience at a lower price.' },
    ],
    keywords: ['leafbar australia', 'leafbar platinum', 'leafbar disposable vape', 'premium disposable vape australia'],
    seoTitle: 'Leafbar Platinum Australia — Premium Disposables | Vapes Australia',
    seoDescription: 'Buy authentic Leafbar Platinum disposables in Australia. Premium-tier refined hardware. Same-day Sydney shipping.',
    aliases: ['leafbar', 'leafbar platinum'],
    accentColor: '#37474f',
  }),
]

// Build alias map for resolving brand from product.brand field
const aliasToSlug = new Map<string, string>()
for (const b of BRANDS) {
  aliasToSlug.set(b.slug.toLowerCase(), b.slug)
  aliasToSlug.set(b.name.toLowerCase(), b.slug)
  aliasToSlug.set(b.displayName.toLowerCase(), b.slug)
  for (const a of b.aliases) aliasToSlug.set(a.toLowerCase(), b.slug)
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug)
}

export function getAllBrands(): Brand[] {
  return BRANDS
}

export function getBrandSlugForProduct(p: Product): string | undefined {
  const brand = (p.brand || '').toLowerCase()
  if (aliasToSlug.has(brand)) return aliasToSlug.get(brand)
  const entries = Array.from(aliasToSlug.entries())
  for (let i = 0; i < entries.length; i++) {
    const [alias, slug] = entries[i]
    if (brand.includes(alias)) return slug
  }
  const nameLower = p.name.toLowerCase()
  for (let i = 0; i < entries.length; i++) {
    const [alias, slug] = entries[i]
    if (nameLower.startsWith(alias) || nameLower.includes(' ' + alias + ' ')) return slug
  }
  return undefined
}

export function getProductsByBrand(slug: string): Product[] {
  return PRODUCTS.filter((p) => getBrandSlugForProduct(p) === slug)
}

export function getBrandProductCounts(): { slug: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of PRODUCTS) {
    const s = getBrandSlugForProduct(p)
    if (s) counts.set(s, (counts.get(s) || 0) + 1)
  }
  return Array.from(counts.entries()).map(([slug, count]) => ({ slug, count }))
}

export interface BrandSubline {
  slug: string
  label: string
  productSlugs: string[]
  count: number
  puffCount: number
}

const STOP_TOKENS = new Set([
  'VAPE',
  'VAPES',
  'PUFF',
  'PUFFS',
  'DISPOSABLE',
  'DISPOSABLES',
  'AUSTRALIA',
])

function slugifySubline(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

function extractPuffCount(name: string): number | null {
  const m = name.match(/(\d{3,6})\s*(?:k|K)?\s*PUFFS?/i)
  if (m) return parseInt(m[1], 10)
  return null
}

function longestCommonTokenPrefix(names: string[]): string[] {
  if (!names.length) return []
  const tokenized = names.map((n) =>
    n
      .replace(/[–—-]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 0)
  )
  const minLen = Math.min(...tokenized.map((t) => t.length))
  const lcp: string[] = []
  for (let i = 0; i < minLen; i++) {
    const token = tokenized[0][i].toUpperCase()
    if (tokenized.every((t) => t[i].toUpperCase() === token)) {
      lcp.push(tokenized[0][i])
    } else break
  }
  return lcp
}

/**
 * Auto-detect sub-lines for a brand by grouping products on puff count and
 * building a label from the longest-common name prefix within each group.
 *
 * Pure version: takes the brand + product set. Use this when products come
 * from somewhere other than the static lib/products.ts catalogue.
 */
export function computeBrandSublines(brand: Brand, products: Product[]): BrandSubline[] {
  return runBrandSublines(brand, products)
}

export function getBrandSublines(brandSlug: string): BrandSubline[] {
  const products = getProductsByBrand(brandSlug)
  const brand = getBrandBySlug(brandSlug)
  if (!brand) return []
  return runBrandSublines(brand, products)
}

function runBrandSublines(brand: Brand, products: Product[]): BrandSubline[] {

  // Group products by puff count (skipping non-puff items)
  const groups = new Map<number, Product[]>()
  for (const p of products) {
    const puffs = extractPuffCount(p.name)
    if (!puffs) continue
    if (!groups.has(puffs)) groups.set(puffs, [])
    groups.get(puffs)!.push(p)
  }

  const sublines: BrandSubline[] = []
  for (const [puffs, productsInGroup] of Array.from(groups.entries())) {
    if (productsInGroup.length < 2) continue

    const lcp = longestCommonTokenPrefix(productsInGroup.map((p) => p.name))
    // Strip the puff-count suffix and trailing stop-words from the LCP
    let labelTokens = lcp.filter((t) => {
      const u = t.toUpperCase().replace(/[^A-Z0-9]/g, '')
      if (/^\d{3,6}$/.test(u)) return false
      return true
    })

    // Filter trailing low-value tokens like "BAR" alone shouldn't anchor a label
    while (labelTokens.length > 1 && STOP_TOKENS.has(labelTokens[labelTokens.length - 1].toUpperCase())) {
      labelTokens.pop()
    }

    if (!labelTokens.length) {
      labelTokens = [brand.displayName]
    }

    const formattedLabel = labelTokens
      .map((t) => {
        if (t.length <= 3 && /^[A-Z]+$/.test(t)) return t.toUpperCase()
        return t
          .toLowerCase()
          .split('')
          .map((ch, i) => (i === 0 ? ch.toUpperCase() : ch))
          .join('')
      })
      .join(' ')

    const label = `${formattedLabel} ${puffs >= 1000 ? `${puffs.toLocaleString()}` : puffs} Puffs`

    sublines.push({
      slug: slugifySubline(`${brand.slug}-${puffs}`),
      label,
      productSlugs: productsInGroup.map((p) => p.slug),
      count: productsInGroup.length,
      puffCount: puffs,
    })
  }

  return sublines.sort((a, b) => a.puffCount - b.puffCount)
}
