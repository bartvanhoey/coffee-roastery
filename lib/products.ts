export type Category =
  | "Espresso Blends"
  | "Single Origins"
  | "Capsules"
  | "Cold Brew"
  | "Equipment";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  price: number;
  unit: string;
  image: string;
  origin: string;
  altitude?: string;
  process?: string;
  roast: "Light" | "Medium" | "Medium-Dark" | "Dark" | "N/A";
  notes: string[];
  intensity: number; // 0-10
  description: string;
  featured?: boolean;
  limited?: boolean;
  isNew?: boolean;
};

export const categories: Category[] = [
  "Espresso Blends",
  "Single Origins",
  "Capsules",
  "Cold Brew",
  "Equipment",
];

export const categorySlug = (c: Category) =>
  c.toLowerCase().replace(/\s+/g, "-");

export const categoryFromSlug = (s?: string | null) =>
  categories.find((c) => categorySlug(c) === s);

/** Unsplash source with a sane upstream size cap. */
export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    slug: "aurum-no-1",
    name: "Aurum No. 1",
    tagline: "The house espresso since 1962",
    category: "Espresso Blends",
    price: 18,
    unit: "250 g",
    image: img("1512568400610-62da28bc8a13"),
    origin: "Brazil · Colombia · Ethiopia",
    roast: "Medium-Dark",
    notes: ["Dark chocolate", "Hazelnut", "Burnt caramel"],
    intensity: 8,
    description:
      "Our signature. Three lots roasted separately and married after resting, so each origin keeps its voice. Dense crema, a body that coats the palate, and a finish that stays for minutes.",
    featured: true,
  },
  {
    slug: "midnight-velvet",
    name: "Midnight Velvet",
    tagline: "A dark roast without the bitterness",
    category: "Espresso Blends",
    price: 19,
    unit: "250 g",
    image: img("1610632380989-680fe40816c6"),
    origin: "Sumatra · Guatemala",
    roast: "Dark",
    notes: ["Molasses", "Cedar", "Bitter cocoa"],
    intensity: 10,
    description:
      "Slow-developed at low airflow to build sweetness before colour. Made for milk, ristretto, and the very early hours.",
    featured: true,
  },
  {
    slug: "salone-blend",
    name: "Salone",
    tagline: "The café blend, bright and balanced",
    category: "Espresso Blends",
    price: 17,
    unit: "250 g",
    image: img("1504630083234-14187a9df0f5"),
    origin: "Colombia · Honduras",
    roast: "Medium",
    notes: ["Red apple", "Toffee", "Milk chocolate"],
    intensity: 6,
    description:
      "The blend we pull in every Aurum salone. Forgiving on any machine, sweet as a straight shot, structured enough to hold a flat white.",
  },
  {
    slug: "yirgacheffe-reserve",
    name: "Yirgacheffe Reserve",
    tagline: "Jasmine, bergamot, and a lingering sweetness",
    category: "Single Origins",
    price: 24,
    unit: "250 g",
    image: img("1521302080334-4bebac2763a6"),
    origin: "Gedeb, Ethiopia",
    altitude: "2,050 m",
    process: "Washed",
    roast: "Light",
    notes: ["Jasmine", "Bergamot", "Apricot"],
    intensity: 3,
    description:
      "From a single washing station in Gedeb, dried on raised beds for eighteen days. Tea-like, floral, and impossibly clean.",
    featured: true,
  },
  {
    slug: "huila-la-esperanza",
    name: "Huila · La Esperanza",
    tagline: "A juicy, chocolate-laden Colombian",
    category: "Single Origins",
    price: 22,
    unit: "250 g",
    image: img("1514432324607-a09d9b4aefdd"),
    origin: "Huila, Colombia",
    altitude: "1,800 m",
    process: "Washed",
    roast: "Medium",
    notes: ["Plum", "Panela", "Cocoa nib"],
    intensity: 5,
    description:
      "Grown by the Rojas family across three generations. A textbook Huila: structured acidity, brown-sugar sweetness, and a chocolate finish.",
  },
  {
    slug: "kenya-nyeri-aa",
    name: "Nyeri AA",
    tagline: "Blackcurrant and a sparkling finish",
    category: "Single Origins",
    price: 26,
    unit: "250 g",
    image: img("1587734195503-904fca47e0e9"),
    origin: "Nyeri, Kenya",
    altitude: "1,900 m",
    process: "Double washed",
    roast: "Light",
    notes: ["Blackcurrant", "Grapefruit", "Brown sugar"],
    intensity: 4,
    description:
      "SL28 and SL34 varietals from the Othaya cooperative. Loud, vibrant, and unmistakably Kenyan.",
    limited: true,
  },
  {
    slug: "geisha-panama",
    name: "Panama Geisha · Lot 7",
    tagline: "Our rarest release of the year",
    category: "Single Origins",
    price: 68,
    unit: "100 g",
    image: img("1522992319-0365e5f11656"),
    origin: "Boquete, Panama",
    altitude: "1,950 m",
    process: "Natural",
    roast: "Light",
    notes: ["Jasmine", "Peach", "Honey"],
    intensity: 2,
    description:
      "Twelve bags exist. Elegant beyond words, with a florality that fills the room before you take a sip.",
    limited: true,
    isNew: true,
  },
  {
    slug: "capsule-intenso",
    name: "Intenso Capsules",
    tagline: "The No. 1 profile, in aluminium",
    category: "Capsules",
    price: 9.5,
    unit: "10 capsules",
    image: img("1459755486867-b55449bb39ff"),
    origin: "Brazil · Colombia · Ethiopia",
    roast: "Medium-Dark",
    notes: ["Dark chocolate", "Hazelnut", "Caramel"],
    intensity: 8,
    description:
      "Fully recyclable aluminium capsules, nitrogen-flushed within minutes of grinding. Compatible with Nespresso® Original machines.",
  },
  {
    slug: "capsule-lungo-oro",
    name: "Lungo Oro Capsules",
    tagline: "Long, golden, and gentle",
    category: "Capsules",
    price: 9.5,
    unit: "10 capsules",
    image: img("1577968897966-3d4325b36b61"),
    origin: "Honduras · Peru",
    roast: "Medium",
    notes: ["Honey", "Almond", "Vanilla"],
    intensity: 5,
    description:
      "A slower extraction profile roasted for the 110 ml cup. Soft, round, and made for mornings.",
    isNew: true,
  },
  {
    slug: "capsule-decaf-notte",
    name: "Notte Decaf Capsules",
    tagline: "Everything but the caffeine",
    category: "Capsules",
    price: 10,
    unit: "10 capsules",
    image: img("1513530176992-0cf39c4cbed4"),
    origin: "Colombia",
    process: "Sugarcane EA decaf",
    roast: "Medium-Dark",
    notes: ["Cocoa", "Dried fig", "Toffee"],
    intensity: 7,
    description:
      "Decaffeinated using sugarcane ethyl acetate to protect the sweetness. We serve it blind to sceptics.",
  },
  {
    slug: "cold-brew-classic",
    name: "Cold Brew · Classic",
    tagline: "Steeped for 18 hours, never rushed",
    category: "Cold Brew",
    price: 4.5,
    unit: "250 ml",
    image: img("1461023058943-07fcbe16d735"),
    origin: "Brazil · Ethiopia",
    roast: "Medium",
    notes: ["Cacao", "Cherry", "Cream"],
    intensity: 6,
    description:
      "Coarse-ground Aurum No. 1, steeped cold for eighteen hours and bottled in glass. Smooth, sweet, no ice required.",
  },
  {
    slug: "cold-brew-oat-latte",
    name: "Cold Brew · Oat Latte",
    tagline: "Silky, dairy-free, ready to drink",
    category: "Cold Brew",
    price: 4.9,
    unit: "250 ml",
    image: img("1517701604599-bb29b565090c"),
    origin: "Brazil · Ethiopia",
    roast: "Medium",
    notes: ["Oat cream", "Cocoa", "Salted caramel"],
    intensity: 4,
    description:
      "Our classic cold brew, married with barista oat milk. Lightly sweetened with date syrup.",
    isNew: true,
  },
  {
    slug: "cold-brew-tonic",
    name: "Cold Brew · Tonic",
    tagline: "Bright, sparkling, and unexpected",
    category: "Cold Brew",
    price: 5.2,
    unit: "250 ml",
    image: img("1559496417-e7f25cb247f3"),
    origin: "Ethiopia",
    roast: "Light",
    notes: ["Bergamot", "Quinine", "Peach"],
    intensity: 3,
    description:
      "Single-origin Yirgacheffe cold brew over Mediterranean tonic. Our best-seller every summer since 2021.",
    limited: true,
  },
  {
    slug: "barista-portafilter-set",
    name: "Barista Portafilter Set",
    tagline: "Precision-machined, bottomless",
    category: "Equipment",
    price: 145,
    unit: "58 mm",
    image: img("1511920170033-f8396924c348"),
    origin: "Made in Italy",
    roast: "N/A",
    notes: ["Stainless steel", "Walnut handle", "IMS basket"],
    intensity: 0,
    description:
      "The same bottomless portafilter our roastery baristas use, with a hand-oiled walnut handle and a precision IMS basket.",
  },
  {
    slug: "calibrated-tamper",
    name: "Calibrated Tamper",
    tagline: "Thirty pounds, every time",
    category: "Equipment",
    price: 89,
    unit: "58.5 mm",
    image: img("1497935586351-b67a49e012bf"),
    origin: "Made in Italy",
    roast: "N/A",
    notes: ["Spring-loaded", "Flat base", "Walnut"],
    intensity: 0,
    description:
      "A spring-calibrated tamper that clicks at 30 lb. Removes the last variable between you and a perfect shot.",
  },
  {
    slug: "slow-brew-kit",
    name: "Slow Brew Kit",
    tagline: "Everything for the ritual",
    category: "Equipment",
    price: 120,
    unit: "Kettle · dripper · filters",
    image: img("1442512595331-e89e73853f31"),
    origin: "Designed in Trieste",
    roast: "N/A",
    notes: ["Gooseneck kettle", "Ceramic dripper", "100 filters"],
    intensity: 0,
    description:
      "A matte-black gooseneck kettle, hand-glazed ceramic dripper, and a year of oxygen-bleached filters. Slow down.",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getFeatured = () => products.filter((p) => p.featured);

export function getRelated(product: Product, count = 3) {
  return products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const sa = a.category === product.category ? 0 : 1;
      const sb = b.category === product.category ? 0 : 1;
      return sa - sb;
    })
    .slice(0, count);
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
