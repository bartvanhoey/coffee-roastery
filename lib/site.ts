import { img } from "./products";

export const site = {
  name: "Aurum",
  fullName: "Aurum Coffee Roasters",
  tagline: "Gold standard, cup after cup.",
  founded: 1962,
  city: "Trieste",
  email: "hello@aurumcoffee.example",
  phone: "+39 040 000 0000",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Portfolio" },
  { href: "/roastery", label: "The Craft" },
  { href: "/about", label: "About" },
  { href: "/stores", label: "Salones" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: "63", label: "Years of roasting" },
  { value: "14", label: "Origin countries" },
  { value: "41", label: "Salones worldwide" },
  { value: "100%", label: "Direct trade" },
];

export const origins = [
  {
    country: "Ethiopia",
    region: "Gedeb, Yirgacheffe",
    altitude: "2,050 m",
    note: "Jasmine and bergamot",
    image: img("1521302080334-4bebac2763a6", 900),
  },
  {
    country: "Colombia",
    region: "Huila",
    altitude: "1,800 m",
    note: "Plum and panela",
    image: img("1514432324607-a09d9b4aefdd", 900),
  },
  {
    country: "Kenya",
    region: "Nyeri, Othaya",
    altitude: "1,900 m",
    note: "Blackcurrant and citrus",
    image: img("1587734195503-904fca47e0e9", 900),
  },
  {
    country: "Panama",
    region: "Boquete",
    altitude: "1,950 m",
    note: "Peach and honey",
    image: img("1522992319-0365e5f11656", 900),
  },
  {
    country: "Brazil",
    region: "Cerrado Mineiro",
    altitude: "1,150 m",
    note: "Hazelnut and cocoa",
    image: img("1524350876685-274059332603", 900),
  },
  {
    country: "Sumatra",
    region: "Gayo Highlands",
    altitude: "1,400 m",
    note: "Cedar and molasses",
    image: img("1447933601403-0c6688de566e", 900),
  },
];

export const timeline = [
  {
    year: "1962",
    title: "A cart on the Molo Audace",
    text: "Elio Ferrante starts roasting six kilos a day on Trieste's waterfront, selling espresso to dockworkers from a converted fish cart.",
  },
  {
    year: "1978",
    title: "The first salone",
    text: "Via San Nicolò opens: marble counter, brass lamps, one blend. The room still looks the same today.",
  },
  {
    year: "1994",
    title: "Direct trade, before it had a name",
    text: "Elio's daughter Marta flies to Huila and signs a handshake agreement with the Rojas family. It has been renewed every year since.",
  },
  {
    year: "2008",
    title: "The Milano roastery",
    text: "A former textile mill in Lambrate becomes our second roastery and the home of the Aurum Academy.",
  },
  {
    year: "2019",
    title: "Carbon neutral, cup to cup",
    text: "Every kilo roasted, shipped, and served is offset through reforestation on the farms we buy from.",
  },
  {
    year: "2024",
    title: "Porto Vecchio",
    text: "A new flagship roastery opens in Trieste's old port, two hundred metres from where the cart first stood.",
  },
];

export const values = [
  {
    title: "Origin first",
    text: "We buy from 38 families we know by name, at prices set together, years in advance. Quality follows trust.",
  },
  {
    title: "Roast for sweetness",
    text: "Every profile is built to protect the sugars, not to chase colour. Bitterness is a failure, not a style.",
  },
  {
    title: "Serve it properly",
    text: "Our baristas train for six months before they touch a machine in a salone. A great coffee ruined is still ruined.",
  },
  {
    title: "Leave it better",
    text: "Carbon neutral since 2019, recyclable everything since 2021, and a percent of every sale back to origin.",
  },
];

export const team = [
  {
    name: "Marta Ferrante",
    role: "Chair & Head of Sourcing",
    image: img("1544005313-94ddf0286df2", 800),
  },
  {
    name: "Tomas Lindqvist",
    role: "Head Roaster",
    image: img("1500648767791-00dcc994a43e", 800),
  },
  {
    name: "Aiko Tanaka",
    role: "Director of Salones",
    image: img("1494790108377-be9c29b29330", 800),
  },
  {
    name: "Daniel Reyes",
    role: "Head of Coffee Quality",
    image: img("1507003211169-0a1dd7228f2d", 800),
  },
];

export const craftSteps = [
  {
    n: "01",
    title: "Source",
    video: "/videos/beans.mp4",
    poster: img("1524350876685-274059332603", 1200),
    text: "Green coffee arrives in hermetic GrainPro bags and rests for four weeks in a climate-controlled cellar before we cup a single sample.",
    detail: "38 partner farms · 14 countries",
  },
  {
    n: "02",
    title: "Roast",
    video: "/videos/roaster.mp4",
    poster: img("1511537190424-bbbab87ac5eb", 1200),
    text: "Small batches on Probat and Loring drums, profiled by ear and by refractometer. We chase sweetness, never colour.",
    detail: "12 kg batches · 11-minute profiles",
  },
  {
    n: "03",
    title: "Grind",
    video: "/videos/grinder.mp4",
    poster: img("1497935586351-b67a49e012bf", 1200),
    text: "Every salone dials in every blend every morning. Particle distribution is measured, not guessed.",
    detail: "Dialled in daily · 18 g dose",
  },
  {
    n: "04",
    title: "Extract",
    video: "/videos/espresso.mp4",
    poster: img("1504630083234-14187a9df0f5", 1200),
    text: "Nine bars, 93 degrees, 28 seconds. A recipe that took sixty years to write and takes half a minute to pour.",
    detail: "1:2 ratio · 28 seconds",
  },
  {
    n: "05",
    title: "Serve",
    video: "/videos/milk.mp4",
    poster: img("1541167760496-1628856ab772", 1200),
    text: "Milk steamed to 62 degrees, texture like wet paint. Served in warmed porcelain, never a paper cup, never rushed.",
    detail: "62 °C · Micro-foam",
  },
];

export const stores = [
  {
    city: "Trieste",
    name: "Porto Vecchio Roastery",
    address: "Magazzino 26, Porto Vecchio",
    hours: "07:00 – 20:00",
    flagship: true,
    image: img("1511537190424-bbbab87ac5eb", 1200),
  },
  {
    city: "Trieste",
    name: "Salone San Nicolò",
    address: "Via San Nicolò 12",
    hours: "06:30 – 21:00",
    flagship: false,
    image: img("1453614512568-c4024d13c247", 1200),
  },
  {
    city: "Milano",
    name: "Lambrate Roastery & Academy",
    address: "Via Ventura 5",
    hours: "07:30 – 19:30",
    flagship: true,
    image: img("1600093463592-8e36ae95ef56", 1200),
  },
  {
    city: "Wien",
    name: "Salone Graben",
    address: "Graben 21",
    hours: "07:00 – 20:00",
    flagship: false,
    image: img("1445116572660-236099ec97a0", 1200),
  },
  {
    city: "Paris",
    name: "Salone Marais",
    address: "Rue de Bretagne 38",
    hours: "08:00 – 19:00",
    flagship: false,
    image: img("1501339847302-ac426a4a7cbb", 1200),
  },
  {
    city: "London",
    name: "Salone Shoreditch",
    address: "Redchurch Street 17",
    hours: "07:00 – 18:00",
    flagship: false,
    image: img("1507133750040-4a8f57021571", 1200),
  },
  {
    city: "Tokyo",
    name: "Salone Daikanyama",
    address: "Sarugakucho 11-1",
    hours: "08:00 – 20:00",
    flagship: false,
    image: img("1509042239860-f550ce710b93", 1200),
  },
  {
    city: "New York",
    name: "Salone Tribeca",
    address: "Franklin Street 60",
    hours: "06:30 – 19:00",
    flagship: false,
    image: img("1495474472287-4d71bcdd2085", 1200),
  },
];
