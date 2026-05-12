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
      "IGET (Innokin) is Australia's most recognisable disposable vape brand — chances are if you've seen a vape in Sydney, Melbourne, Brisbane or Perth in the past three years, it was an IGET. The brand built its reputation on the legendary IGET Legend 4000 puff device and has since released a comprehensive line-up covering every puff range from the compact IGET Shion 600 right up to the mighty IGET One 12,000 puffs. IGET devices are known for their stable mesh coil hardware, true-to-flavour profile reproduction, and consistent draw activation that just works the first time, every time. Whether you're looking for the famous IGET Bar Plus 6000 puff rechargeable, the screen-equipped IGET Bar Pro, or the pod-and-mod IGET Dual system, AussieVapes carries the largest in-stock IGET range in Australia. All IGET products are sourced through authorised AU channels, age-verified at checkout, and dispatched same-day from our Sydney warehouse on orders before 2pm AEST.",
    highlights: [
      'Largest IGET selection in Australia — Bar, Bar Plus, Bar Pro, Goat, Hot, King, Legend, Max, Moon, One, Shion, XXL',
      'Authentic AU stock with scratch-and-check authenticity codes',
      'Same-day dispatch from Sydney before 2pm AEST',
      '20mg salt nicotine, TGA-compliant prescription model',
      'Free shipping on IGET orders over $100',
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
          'Every authentic IGET sold by AussieVapes carries a scratch-off authenticity code on the back of the packaging. Scratch the panel and enter the code at the official IGET verification page. Counterfeit IGETs typically have blurry print, missing batch codes, or fail authentication — if you ever receive one from us, contact our team for an immediate replacement.',
      },
      {
        question: 'What is the difference between IGET Bar and IGET Bar Plus?',
        answer:
          'The IGET Bar 3500 is the original non-rechargeable model with a single airflow setting. The IGET Bar Plus 6000 is the rechargeable evolution — bigger battery, USB-C charging, larger e-liquid reservoir, adjustable airflow on most flavours, and roughly 1.7x the puff count for less than 1.5x the price.',
      },
      {
        question: 'Do you ship IGET vapes Australia-wide?',
        answer:
          'Yes. AussieVapes ships IGET disposables to every Australian state and territory via discreet, plain-packaging courier. Free standard shipping on orders over $100, express options at checkout, and same-day dispatch from Sydney on weekday orders placed before 2pm AEST.',
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
    seoTitle: 'IGET Australia — Bar, Bar Plus, Goat & More | AussieVapes',
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
      "Alfakher is one of the most respected names in shisha tobacco worldwide — and the Crown Bar disposable vape line brings that same fanatical attention to flavour blending into the modern disposable format. Available in 8,000 puff and 15,000 puff models, the Crown Bar is engineered for long sessions with a dual mesh coil, adjustable airflow, USB-C fast charging and a 650mAh battery. Flavour profiles lean richer and more layered than typical disposables — think Two Apple (the iconic Alfakher shisha blend in vape form), Lemon Mint, Lush Ice, Magic Love and Sweet Passionfruit. AussieVapes is one of Australia's largest authorised Alfakher Crown Bar stockists, with 3-pack, 5-pack, 10-pack and 20-pack bulk options for those who want to save. All Crown Bar inventory is genuine and ships from our Sydney warehouse same-day.",
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
    seoTitle: 'Alfakher Crown Bar Australia — 15000 & 8000 Puffs | AussieVapes',
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
      "HQD is one of the global big-three in disposable vapes alongside IGET and Lost Mary, and is particularly popular with Australian vapers who value design and pocket-friendly form factors. The Cuvie line built HQD's reputation for reliable starter disposables. The HQD Cuvie Slick 20,000 and Slick Plus 12,000 are the brand's current flagship long-puff models, while the HQD Maxx 2500 remains a perennial best-seller for the entry-level segment. HQD's flavour styling tends to be cleaner and less candy-forward than other brands, which makes it a favourite among ex-smokers looking for a more authentic profile. AussieVapes stocks the full HQD range with genuine AU inventory shipped from Sydney.",
    highlights: [
      'Full HQD range — Cuvie, Cuvie Plus, Cuvie Slick, Cuvie Slick Plus, Maxx, Slick, Box',
      'Premium build quality + design-focused form factor',
      'Cleaner, less sweet flavour profiles ideal for ex-smokers',
      'Authentic AU stock, scratch-verify codes',
      'Free shipping on AU orders over $100',
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
          'HQD devices are manufactured in Shenzhen, China by HQD Tech, one of the largest e-cigarette OEMs in the world. AussieVapes only stocks authentic HQD inventory imported through authorised channels.',
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
    seoTitle: 'HQD Australia — Cuvie, Maxx, Slick & Box Range | AussieVapes',
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
      "Few disposable vape brands have shaped the Australian market like Gunnpod. The original Gunnpod 2000 was, for many years, the single best-selling disposable vape in Australia — its simple design, reliable mesh coil and well-balanced flavour line-up made it a go-to recommendation for ex-smokers transitioning to vaping. The brand has since expanded into the Gunnpod Plus 4500, Wave 3500, Lite 1400, Meta 4000, Lume 5000 and the high-capacity Moss 8000, covering every puff tier the AU market wants. AussieVapes carries the complete Gunnpod range with authentic AU stock and same-day Sydney dispatch.",
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
          'Yes — despite being one of the older models, the original Gunnpod 2000 remains in active production and consistently in stock at AussieVapes. It\'s still one of our top sellers, especially among customers who tried it first and prefer to stick with what works.',
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
    seoTitle: 'Gunnpod Australia — 2000, Plus, Wave, Lume & Moss | AussieVapes',
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
      "Lost Mary launched in 2022 as the more design-forward sibling brand of Elf Bar, and quickly became one of the most fashionable disposable vapes globally — including a huge following in Australia. The distinctive curved \"egg\" silhouette of the original BM600 (and later AU-market models) made it instantly Instagrammable, while the newer screen-equipped models added battery and e-liquid percentage indicators. Lost Mary's flavour engineering is known for being fruit-forward, refreshing and well-balanced — Blueberry Sour Raspberry, Watermelon Ice and Triple Mango are universal favourites. AussieVapes stocks the AU-compliant Lost Mary range.",
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
          'The original Lost Mary BM600 is non-rechargeable. Most newer Lost Mary models with 3000+ puffs are rechargeable via USB-C. Check the specific product page on AussieVapes — rechargeability is always listed in the specifications.',
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
    seoTitle: 'Lost Mary Australia — BM600 & Screen Disposables | AussieVapes',
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
      "Vozol is one of the rising stars in the global disposable vape market, particularly favoured by heavy vapers who want the longest possible device life between buys. The Vozol Star series and Gear line consistently top the puff-count charts, with rechargeable USB-C batteries, dual mesh coils and large e-liquid reservoirs. Vozol's flavour engineering is more bold and concentrated than competitors — flavours hit harder out of the gate and maintain consistency right through to the last puff. AussieVapes is one of the first Australian retailers to stock the latest Vozol releases.",
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
          'Yes — all current Vozol disposables in the AussieVapes range are USB-C rechargeable. Most ship with a charging cable in the box.',
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
    seoTitle: 'Vozol Australia — Gear 10000 & 9000-Puff Disposables | AussieVapes',
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
      "RELX is the closed-pod and premium-disposable brand of choice for vapers who prioritise build quality, flavour consistency and refined hardware. Globally, RELX is the second-largest vape company after Juul, with a particularly strong presence in Asia, the Middle East and now Australia. The RELX MagicGo disposable line uses the same ceramic atomiser technology as the premium RELX pod systems — meaning cleaner, more accurate flavour reproduction and zero burnt-coil taste even at the end of life. AussieVapes carries the AU-compliant MagicGo range.",
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
    seoTitle: 'RELX Australia — MagicGo 8000 Disposables | AussieVapes',
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
      "Elux made its name in the UK with the Elux Legend, a 3500-puff disposable that became one of the country's best-selling vapes during 2021-2023. The brand has since pivoted to higher-capacity models, with the Elux 15,000 puff series now widely available in Australia. Elux flavours lean fruity and refreshing, with strong Australian-tuned profiles like Cherry Berry, Pineapple Ice and Watermelon Ice. AussieVapes carries genuine Elux stock direct from authorised distributors.",
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
    seoTitle: 'Elux Australia — 15000 Puff Disposables | AussieVapes',
    seoDescription: 'Buy authentic Elux disposables in Australia. Elux 15000 long-life models with same-day Sydney shipping from AussieVapes.',
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
      "Mr Fog is the dominant disposable vape brand in Canada and a strong seller across North America. Its Australian range centres on the Mr Fog 3600 — a rechargeable USB-C disposable with a balanced flavour line-up engineered for North American taste profiles. Mr Fog has built its reputation on no-marketing, no-hype, just-work hardware that doesn't surprise you. AussieVapes stocks Mr Fog through authorised channels.",
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
    seoTitle: 'Mr Fog Australia — Max Air 3600 Disposables | AussieVapes',
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
      "Serein sits in the enthusiast-tier of the disposable vape market. The Serein Hunter 6000 and Serein Mech-Pro 10,000 use dual mesh coil systems, higher-output batteries (800mAh+), and adjustable airflow rings to deliver cloud production and flavour intensity that's closer to a refillable pod system than a standard disposable. The brand has a small but loyal AU following among experienced vapers. AussieVapes stocks the full Serein range.",
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
    seoTitle: 'Serein Australia — Hunter 6000 & Mech-Pro 10000 | AussieVapes',
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
      "Fisco is a smaller specialist brand with an interesting niche: pod-mod hybrid disposables. The Fisco XPod features a replaceable pod (more like a refillable pod system) while keeping the all-in-one simplicity of a disposable. The Fisco Mix Bar 12,000 takes a different approach with swappable flavour cartridges. AussieVapes stocks the AU-compliant Fisco range.",
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
    seoTitle: 'Fisco Australia — XPod & Mix Bar Hybrids | AussieVapes',
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
      "AliBarBar (or Ali Bar Bar) is a Chinese disposable brand that has built a loyal Australian following on the back of two strong product lines: the AliBarBar 9000 and the AliBarBar Ingot 9000. Both use dual mesh coil systems and large 18mL e-liquid reservoirs. Flavour development leans richer and more layered than typical mid-tier disposables. AussieVapes stocks the full AliBarBar AU range.",
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
    seoTitle: 'AliBarBar Australia — 9000 Puff & Ingot Disposables | AussieVapes',
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
      "JNR is one of the more creative brands in the disposable vape space — instead of yet another rectangular slab, JNR has built a reputation for distinctive industrial design. The JNR PhoneVape is shaped (and roughly the size of) a smartphone. The JNR Shisha Hookah is styled after a portable shisha. The JNR Falcon X has aggressive gaming-aesthetic styling, and the JNR Tank 10,000 is a high-capacity rechargeable tube. AussieVapes stocks the unusual and the practical.",
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
    seoTitle: 'JNR Australia — PhoneVape, FalconX, Shisha Hookah | AussieVapes',
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
      "Kuz is a relatively new brand that has made a name for itself with the Kuz Flow 25,000 — one of the highest-puff disposables available in Australia. The brand also offers the Kuz Lux 9000 and Kuz 6000 for mid-tier shoppers. All Kuz devices use USB-C charging, dual mesh coils, and large e-liquid reservoirs. AussieVapes is an authorised AU stockist.",
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
    seoTitle: 'Kuz Australia — Flow 25000 & Lux 9000 | AussieVapes',
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
      "X-Qlusive (X-Q) caters to vapers who want a single brand with broad coverage. The X-Qlusive 2500 is an entry-level non-rechargeable option, the Mega 3500 sits in the sweet spot for new vapers, the X-POD 3800 introduces refillable pod versatility, and the X-PRO 5500 is the brand's flagship rechargeable disposable. AussieVapes stocks all four ranges.",
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
    seoTitle: 'X-Qlusive Australia — 2500 to X-PRO 5500 | AussieVapes',
    seoDescription: 'Buy authentic X-Qlusive disposables in Australia. 2500, Mega 3500, X-POD 3800 and X-PRO 5500 range. Same-day Sydney shipping.',
    aliases: ['x-qlusive', 'xqlusive', 'x qlusive'],
    accentColor: '#0277bd',
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
