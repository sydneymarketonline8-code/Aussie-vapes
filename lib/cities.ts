export interface City {
  slug: string
  name: string
  state: string
  population: string
  deliveryWindow: string
  postcodeRange: string
  popularSuburbs: string[]
  introCopy: string
  longDescription: string
  highlights: string[]
  faqs: { question: string; answer: string }[]
  keywords: string[]
}

export const CITIES: City[] = [
  {
    slug: 'sydney',
    name: 'Sydney',
    state: 'NSW',
    population: '5.3 million',
    deliveryWindow: '1–2 business days standard, same-day available metro',
    postcodeRange: '1000–2999',
    popularSuburbs: ['CBD', 'Bondi', 'Parramatta', 'Surry Hills', 'Newtown', 'Manly', 'Chatswood', 'Liverpool', 'Penrith', 'Hornsby'],
    introCopy:
      "Aussie Vapes is headquartered in Sydney — meaning Sydney customers get the fastest possible service. Order before 11am AEST on a weekday and we offer same-day delivery to most Sydney metro postcodes.",
    longDescription:
      "Aussie Vapes Sydney customers enjoy a unique advantage: we're physically based in Sydney. Our warehouse dispatches Sydney metro orders within hours of placement, and we partner with same-day couriers covering the entire Greater Sydney area — from the CBD and Eastern Suburbs through to the Inner West, Northern Beaches, North Shore, Hills District, Western Sydney and the South West corridor. Standard Sydney delivery is 1-2 business days; same-day is available on most weekday orders placed before 11am AEST. Aussie Vapes is the most trusted online vape store for Sydney smokers transitioning to vaping — and we stock the deepest range of authentic IGET, Alfakher, HQD, Gunnpod, Lost Mary and 35+ more brands at prices that beat every Sydney retail vape shop.",
    highlights: [
      'Same-day delivery to most Sydney metro postcodes (order before 11am AEST)',
      '1-2 business days standard',
      'Direct dispatch from Sydney warehouse — no interstate handoff',
      'Free shipping across all of Sydney over $100',
      'Pickup by appointment for B2B / wholesale orders',
    ],
    faqs: [
      { question: 'Does Aussie Vapes deliver same-day in Sydney?', answer: 'Yes — Aussie Vapes offers same-day delivery to most Sydney metro postcodes on weekday orders placed before 11am AEST. Standard Sydney delivery is 1-2 business days.' },
      { question: 'What suburbs does Aussie Vapes deliver to in Sydney?', answer: 'Every Sydney postcode (1000-2999), including the Eastern Suburbs, Inner West, Northern Beaches, North Shore, Hills, Western Sydney, South West, and the Sutherland Shire. Regional NSW postcodes also covered with standard 2-4 business day delivery.' },
      { question: 'Is there an Aussie Vapes Sydney store?', answer: "Aussie Vapes operates as an online-only retailer from a single Sydney warehouse — this lets us pass on lower prices and a wider range than retail stores can offer. Pickup is available by appointment for wholesale orders only." },
    ],
    keywords: [
      'aussie vapes sydney',
      'vapes sydney',
      'sydney vape store',
      'vape shop sydney',
      'aussie vapes sydney delivery',
      'sydney disposable vapes',
      'iget sydney',
      'vape delivery sydney same day',
    ],
  },
  {
    slug: 'melbourne',
    name: 'Melbourne',
    state: 'VIC',
    population: '5.1 million',
    deliveryWindow: '2–4 business days standard, 1–2 days express',
    postcodeRange: '3000–3999',
    popularSuburbs: ['CBD', 'St Kilda', 'Fitzroy', 'Richmond', 'Brunswick', 'South Yarra', 'Carlton', 'Footscray', 'Frankston', 'Geelong'],
    introCopy:
      "Aussie Vapes ships to every Melbourne postcode with reliable 2-4 day standard delivery and 1-2 day express. Same fast service, same Sydney warehouse, same authentic stock.",
    longDescription:
      "Aussie Vapes is the largest online vape store serving Melbourne customers. Even though we dispatch from Sydney, our courier partnerships deliver to Melbourne metro postcodes in 2-4 business days standard, or 1-2 days via express. Melbourne vapers get the same deep brand range, same authenticity guarantee, same 30-day returns and same free shipping over $100 as our Sydney customers. We cover every Melbourne postcode from the CBD and Inner suburbs (St Kilda, Fitzroy, Richmond, Brunswick) through to outer Melbourne, the Mornington Peninsula, Geelong, Bendigo and Ballarat. Authentic IGET, Alfakher Crown Bar, HQD, Gunnpod, Lost Mary, Vozol, RELX and 35+ more brands — Aussie Vapes Melbourne is the smarter way to buy vapes in Victoria.",
    highlights: [
      '2-4 business days standard to Melbourne metro',
      '1-2 business days express to Melbourne CBD',
      'Free shipping to all Melbourne postcodes over $100',
      'Discreet plain-packaging delivery',
      'Authentic AU stock with scratch authentication codes',
    ],
    faqs: [
      { question: 'How long does Aussie Vapes take to Melbourne?', answer: 'Standard delivery to Melbourne is 2-4 business days. Express is 1-2 business days. Orders placed before 2pm AEST weekdays dispatch same-day from our Sydney warehouse.' },
      { question: 'Does Aussie Vapes ship to all Melbourne suburbs?', answer: 'Yes — every Victorian postcode is covered, including all Melbourne metro suburbs, the Mornington Peninsula, Geelong, Bendigo, Ballarat and regional VIC.' },
      { question: 'Why buy from Aussie Vapes instead of a Melbourne shop?', answer: 'Wider range (2,000+ products vs typical retail of 100-200), lower prices (direct from authorised distributors), authentic stock with scratch verification, 30-day returns, and discreet doorstep delivery.' },
    ],
    keywords: [
      'aussie vapes melbourne',
      'vapes melbourne',
      'melbourne vape store',
      'vape shop melbourne',
      'aussie vapes melbourne delivery',
      'melbourne disposable vapes',
      'iget melbourne',
    ],
  },
  {
    slug: 'brisbane',
    name: 'Brisbane',
    state: 'QLD',
    population: '2.5 million',
    deliveryWindow: '2–4 business days standard, 1–2 days express',
    postcodeRange: '4000–4999',
    popularSuburbs: ['CBD', 'Fortitude Valley', 'South Brisbane', 'West End', 'Paddington', 'Newstead', 'Indooroopilly', 'Logan', 'Ipswich', 'Gold Coast'],
    introCopy:
      "Aussie Vapes delivers to every Brisbane and Queensland postcode in 2-4 days standard. From the CBD to the Gold Coast and Sunshine Coast — fast, discreet, authentic.",
    longDescription:
      "Aussie Vapes is the trusted online vape store for Brisbane, the Gold Coast, the Sunshine Coast, and all of Queensland. Standard delivery to Brisbane metro postcodes is 2-4 business days; express is 1-2 days. Aussie Vapes Brisbane customers get the full Aussie Vapes range — IGET, Alfakher Crown Bar, HQD, Gunnpod, Lost Mary, Vozol, and 35+ more brands — all dispatched same-day from our Sydney warehouse. Free standard shipping on orders over $100 applies to every QLD postcode, including Brisbane, Gold Coast, Sunshine Coast, Townsville, Cairns and regional Queensland.",
    highlights: [
      '2-4 business days standard to Brisbane metro',
      '1-2 business days express',
      'Free shipping to all QLD postcodes over $100',
      'Discreet plain-packaging',
      'Same-day Sydney dispatch on weekday orders before 2pm AEST',
    ],
    faqs: [
      { question: 'How long does Aussie Vapes take to Brisbane?', answer: 'Standard delivery is 2-4 business days; express is 1-2 days. Dispatch is same-day on weekday orders placed before 2pm AEST.' },
      { question: 'Does Aussie Vapes ship to the Gold Coast and Sunshine Coast?', answer: 'Yes — every Queensland postcode is covered, including Brisbane metro, Gold Coast, Sunshine Coast, Townsville, Cairns and regional QLD.' },
    ],
    keywords: [
      'aussie vapes brisbane',
      'vapes brisbane',
      'brisbane vape store',
      'vape shop brisbane',
      'aussie vapes gold coast',
      'brisbane disposable vapes',
    ],
  },
  {
    slug: 'perth',
    name: 'Perth',
    state: 'WA',
    population: '2.2 million',
    deliveryWindow: '4–7 business days standard, 3–4 days express',
    postcodeRange: '6000–6999',
    popularSuburbs: ['CBD', 'Fremantle', 'Northbridge', 'Subiaco', 'Joondalup', 'Rockingham', 'Mandurah', 'Cottesloe', 'Cannington', 'Midland'],
    introCopy:
      "Aussie Vapes delivers to Perth and every Western Australian postcode. Standard 4-7 days, express 3-4 days — same authentic stock, same trusted service.",
    longDescription:
      "Aussie Vapes serves Perth and Western Australia with reliable Australia-wide courier partnerships. While WA delivery takes slightly longer than east-coast cities due to distance, Aussie Vapes Perth customers receive the same authentic stock, same brand range and same prices as customers in Sydney or Melbourne. Standard Perth delivery is 4-7 business days; express drops that to 3-4. Free standard shipping on orders over $100 applies to every WA postcode — Perth metro, Fremantle, Mandurah, Bunbury, regional WA and Northwest WA.",
    highlights: [
      '4-7 business days standard to Perth metro',
      '3-4 business days express',
      'Free shipping to all WA postcodes over $100',
      'Authentic AU stock — no grey market',
      'Discreet plain-packaging delivery',
    ],
    faqs: [
      { question: 'How long does Aussie Vapes take to Perth?', answer: 'Standard delivery to Perth is 4-7 business days; express is 3-4 days. Aussie Vapes dispatches same-day on weekday orders before 2pm AEST.' },
      { question: 'Does Aussie Vapes ship to regional WA?', answer: 'Yes — every WA postcode is covered including Perth metro, Fremantle, Mandurah, Bunbury, Geraldton, Kalgoorlie, and Northwest WA. Regional WA may add 2-3 days to capital city times.' },
    ],
    keywords: [
      'aussie vapes perth',
      'vapes perth',
      'perth vape store',
      'vape shop perth',
      'aussie vapes wa',
      'perth disposable vapes',
    ],
  },
  {
    slug: 'adelaide',
    name: 'Adelaide',
    state: 'SA',
    population: '1.4 million',
    deliveryWindow: '3–5 business days standard, 2–3 days express',
    postcodeRange: '5000–5999',
    popularSuburbs: ['CBD', 'Glenelg', 'Norwood', 'North Adelaide', 'Port Adelaide', 'Marion', 'Salisbury', 'Mount Barker', 'Victor Harbor', 'Murray Bridge'],
    introCopy:
      "Aussie Vapes delivers to Adelaide and South Australia in 3-5 days standard. Same authentic stock, same Sydney-warehouse fast dispatch.",
    longDescription:
      "Aussie Vapes is the go-to online vape store for Adelaide and all of South Australia. Standard delivery to Adelaide metro is 3-5 business days; express drops that to 2-3 days. Every Adelaide postcode is covered — CBD, Glenelg, Norwood, Port Adelaide, the Adelaide Hills, McLaren Vale wine region, and regional SA from Mount Gambier to Whyalla. Same brand range, same authentic stock, same Aussie Vapes 30-day return guarantee as our Sydney and Melbourne customers.",
    highlights: [
      '3-5 business days standard to Adelaide metro',
      '2-3 business days express',
      'Free shipping to all SA postcodes over $100',
      '40+ brands including IGET, Alfakher, HQD, Gunnpod',
      'Authentic AU stock with scratch authentication codes',
    ],
    faqs: [
      { question: 'How long does Aussie Vapes take to Adelaide?', answer: 'Standard delivery to Adelaide is 3-5 business days; express is 2-3 days. Aussie Vapes dispatches same-day on weekday orders placed before 2pm AEST.' },
      { question: 'Does Aussie Vapes ship to regional SA?', answer: 'Yes — every SA postcode is covered, including Adelaide metro, the Adelaide Hills, McLaren Vale, Barossa Valley, Mount Gambier, Whyalla and regional SA.' },
    ],
    keywords: [
      'aussie vapes adelaide',
      'vapes adelaide',
      'adelaide vape store',
      'vape shop adelaide',
      'aussie vapes sa',
      'adelaide disposable vapes',
    ],
  },
]

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug)
}
