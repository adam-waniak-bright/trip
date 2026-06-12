export type Tag = 'mountain' | 'lake' | 'city' | 'beach' | 'drive';

export interface Attraction {
  name: string;
  desc: string;
  mapsQuery: string;
}

export interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  title: string;
  route: string;
  desc: string;
  tags: Tag[];
  image: string;
  imageAlt: string;
  attractions: Attraction[];
  overnight?: string;
}

export const TAG_LABELS: Record<Tag, string> = {
  mountain: 'Gory',
  lake: 'Jezioro',
  city: 'Miasto',
  beach: 'Plaza',
  drive: 'Dojazd',
};

export const TAG_COLORS: Record<Tag, string> = {
  mountain: 'bg-emerald-900/60 text-emerald-300',
  lake: 'bg-sky-900/60 text-sky-300',
  city: 'bg-amber-900/60 text-amber-300',
  beach: 'bg-violet-900/60 text-violet-300',
  drive: 'bg-slate-700/60 text-slate-400',
};

export interface BudgetItem { label: string; value: string }

export const config = {
  title: 'Road Trip 2026',
  subtitle: 'Austria & Wlochy | 5-19 wrzesien',
  googleMapsUrl: 'https://www.google.com/maps/d/viewer?mid=YOUR_MAP_ID',
  summary: [
    { label: 'Czas trwania', value: '14 dni' },
    { label: 'Dystans', value: '~3 500 km' },
    { label: 'Uczestnicy', value: '4 osoby' },
    { label: 'Budzet / os.', value: '~5 500 zl' },
    { label: 'Kraje', value: 'PL CZ AT IT' },
  ],
  budget: [
    { label: 'Paliwo (~3500 km)', value: '~3 900 zl' },
    { label: 'Winiety / autostrady', value: '~1 200 zl' },
    { label: 'Noclegi (13 nocy)', value: '~6 000 - 9 000 zl' },
    { label: 'Jedzenie', value: '~5 000 - 6 000 zl' },
    { label: 'Atrakcje / wstepy', value: '~1 500 zl' },
    { label: 'Rezerwa', value: '~1 500 zl' },
  ] as BudgetItem[],
  budgetTotal: '~19 000 - 23 000 zl',
  budgetPerPerson: '~4 750 - 5 750 zl',
  overnights: [
    { dates: '5.09', place: 'Wroclaw', nights: 1, type: 'u znajomych', cost: '0 zl' },
    { dates: '6-7.09', place: 'Hallstatt / Obertraun', nights: 2, type: 'camping/apartament', cost: '300-500 zl/noc' },
    { dates: '8-11.09', place: 'Brixen / Val di Funes', nights: 4, type: 'apartament/camping', cost: '300-500 zl/noc' },
    { dates: '12.09', place: 'Bardolino (Garda)', nights: 1, type: 'camping/apartament', cost: '200-350 zl/noc' },
    { dates: '13-14.09', place: 'Levanto (Cinque Terre)', nights: 2, type: 'apartament', cost: '400-600 zl/noc' },
    { dates: '15-17.09', place: 'San Gimignano (camping)', nights: 3, type: 'Camping Il Boschetto di Piemma', cost: '200-350 zl/noc' },
    { dates: '18.09', place: 'Wroclaw', nights: 1, type: 'u znajomych', cost: '0 zl' },
  ],
};

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getGoogleMapsUrl(attraction: Attraction) {
  return mapsUrl(attraction.mapsQuery);
}

export const days: DayPlan[] = [
  {
    day: 0, date: '5.09', weekday: 'PT',
    title: 'Gdansk -> Wroclaw',
    route: '460 km | ~5h',
    desc: 'Dojazd z Gdanska do Wroclawia. Nocleg u znajomych, pakowanie auta, zakupy na droge.',
    tags: ['drive'],
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80',
    imageAlt: 'Gdansk stare miasto',
    overnight: 'Wroclaw (u znajomych)',
    attractions: [],
  },
  {
    day: 1, date: '6.09', weekday: 'SB',
    title: 'Wroclaw -> Czeski Krumlov -> Hallstatt',
    route: '620 km | ~6.5h',
    desc: 'Przystanek w Czeskim Krumlowie - spacer po bajkowym starym miescie z zamkiem nad Weltawa. Wieczor nad jeziorem Hallstatt o zachodzie slonca.',
    tags: ['city', 'lake', 'drive'],
    image: 'https://images.unsplash.com/photo-1560862309-09c525bfddba?w=800&q=80',
    imageAlt: 'Czeski Krumlov stare miasto',
    overnight: 'Hallstatt / Obertraun',
    attractions: [
      { name: 'Czeski Krumlov', desc: 'Bajkowe stare miasto (UNESCO), zamek nad Weltawa, renesansowe kamienice', mapsQuery: 'Cesky Krumlov Old Town' },
      { name: 'Jezioro Hallstatt', desc: 'Spacer nad jeziorem o zachodzie slonca', mapsQuery: 'Hallstatt Lake Austria' },
    ],
  },
  {
    day: 2, date: '7.09', weekday: 'ND',
    title: 'Hallstatt i okolice',
    route: 'Dzien na miejscu',
    desc: 'Punkt widokowy Hallstatt Skywalk z panorama na jezioro i miasteczko. Jaskinia lodowa Dachstein lub kajaki na jeziorze.',
    tags: ['mountain', 'lake'],
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
    imageAlt: 'Hallstatt widok z gory',
    overnight: 'Hallstatt / Obertraun',
    attractions: [
      { name: 'Hallstatt Skywalk', desc: 'Punkt widokowy World Heritage View, latwy szlak ~1h', mapsQuery: 'Hallstatt Skywalk World Heritage View' },
      { name: 'Jaskinia lodowa Dachstein', desc: 'Kolejka linowa + jaskinia. Temperatura ~0 st. - wziac kurtke!', mapsQuery: 'Dachstein Ice Cave' },
      { name: 'Jezioro Hallstattersee', desc: 'Kajaki, SUP, plazowanie w Obertraun', mapsQuery: 'Hallstattersee' },
    ],
  },
  {
    day: 3, date: '8.09', weekday: 'PN',
    title: 'Grossglockner -> Dolomity',
    route: '280 km | caly dzien',
    desc: 'Przejazd najpieksniejsza droga alpejska w Austrii. Widok na lodowiec Pasterze i najwyzszy szczyt Austrii - Grossglockner (3798m). Krotkie szlaki po drodze.',
    tags: ['mountain', 'drive'],
    image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&q=80',
    imageAlt: 'Grossglockner droga alpejska',
    overnight: 'Brixen / Val di Funes (baza na 4 noce)',
    attractions: [
      { name: 'Grossglockner Hochalpenstrasse', desc: 'Najpieksniejsza droga alpejska w Austrii (48 km). Oplata ~40 EUR/auto', mapsQuery: 'Grossglockner High Alpine Road' },
      { name: 'Kaiser-Franz-Josefs-Hohe', desc: 'Widok na lodowiec Pasterze i Grossglockner (3798m)', mapsQuery: 'Kaiser Franz Josefs Höhe' },
    ],
  },
  {
    day: 4, date: '9.09', weekday: 'WT',
    title: 'Lago di Braies & Val di Funes',
    route: '~60 km z bazy',
    desc: 'Rano szlak wokol turkusowego Lago di Braies (przyjechac przed 9!). Popoludnie w Val di Funes - kosciolek St. Magdalena z widokiem na masyw Odle.',
    tags: ['mountain', 'lake'],
    image: 'https://images.unsplash.com/photo-1501904249109-a5a4e28a3005?w=800&q=80',
    imageAlt: 'Lago di Braies turkusowe jezioro',
    overnight: 'Brixen / Val di Funes',
    attractions: [
      { name: 'Lago di Braies', desc: 'Turkusowe jezioro alpejskie, szlak wokol ~1.5h. Przyjechac przed 9 rano!', mapsQuery: 'Lago di Braies' },
      { name: 'Val di Funes - St. Magdalena', desc: 'Ikoniczny kosciolek z widokiem na masyw Odle', mapsQuery: 'Chiesa di Santa Maddalena Val di Funes' },
    ],
  },
  {
    day: 5, date: '10.09', weekday: 'SR',
    title: 'Tre Cime di Lavaredo',
    route: 'Szlak ~10 km, ~4h',
    desc: 'Ikoniczny szlak Dolomitow - petla wokol Tre Cime. Dobrze utrzymany, niesamowite widoki. Obiad w schronisku.',
    tags: ['mountain'],
    image: 'https://images.unsplash.com/photo-1559304022-afbf28bc0e60?w=800&q=80',
    imageAlt: 'Tre Cime di Lavaredo Dolomity',
    overnight: 'Brixen / Val di Funes',
    attractions: [
      { name: 'Tre Cime di Lavaredo', desc: 'Petla ~10 km, ~4h. Start z Rifugio Auronzo (parking ~30 EUR). Nie wymaga doswiadczenia.', mapsQuery: 'Tre Cime di Lavaredo' },
      { name: 'Rifugio Locatelli', desc: 'Schronisko z najlepszym widokiem na Tre Cime - obiad!', mapsQuery: 'Rifugio Locatelli' },
    ],
  },
  {
    day: 6, date: '11.09', weekday: 'CZ',
    title: 'Lake Sorapis lub Lago Federa',
    route: 'Szlak 5h lub 3-4h',
    desc: 'Do wyboru wg pogody i sil: Sorapis - turkusowe jezioro w skalnym kotle (trudniejszy). Federa - latwiejszy szlak widokowy od Passo Giau.',
    tags: ['mountain'],
    image: 'https://images.unsplash.com/photo-1586205984700-baa613e29bde?w=800&q=80',
    imageAlt: 'Lake Sorapis turkusowe jezioro Dolomity',
    overnight: 'Brixen / Val di Funes',
    attractions: [
      { name: 'Lake Sorapis', desc: 'Szlak 215 z Passo Tre Croci, ~12 km, ~5h. Turkusowe jezioro w skalnym kotle. Odcinki z linami.', mapsQuery: 'Lago di Sorapis' },
      { name: 'Lago Federa', desc: 'Szlak od Passo Giau, ~8 km, ~3-4h. Latwiejszy, widokowy.', mapsQuery: 'Lago Federa' },
    ],
  },
  {
    day: 7, date: '12.09', weekday: 'PT',
    title: 'Dolomity -> Jezioro Garda',
    route: '200 km | ~3h',
    desc: 'Popoludnie w Sirmione - zamek Scaligero na wodzie, ruiny rzymskie. Wieczor w Bardolino - promenada, wino.',
    tags: ['lake', 'city', 'drive'],
    image: 'https://images.unsplash.com/photo-1602083562069-8e93f48e3118?w=800&q=80',
    imageAlt: 'Sirmione zamek Scaligero Jezioro Garda',
    overnight: 'Bardolino',
    attractions: [
      { name: 'Sirmione', desc: 'Zamek Scaligero (XIII w.) na wodzie, Grotte di Catullo, waskie uliczki', mapsQuery: 'Sirmione Castle' },
      { name: 'Bardolino', desc: 'Promenada nad jeziorem, lokalne wino Bardolino', mapsQuery: 'Bardolino Lake Garda' },
    ],
  },
  {
    day: 8, date: '13.09', weekday: 'SB',
    title: 'Garda -> Cinque Terre',
    route: '330 km | ~3.5h',
    desc: 'Popoludnie w kolorowych wioskach: Riomaggiore, Manarola. Kolacja z owocami morza w Vernazza.',
    tags: ['beach', 'city', 'drive'],
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80',
    imageAlt: 'Manarola Cinque Terre kolorowe domy',
    overnight: 'Levanto',
    attractions: [
      { name: 'Riomaggiore', desc: 'Kolorowe domy spadajace ku morzu', mapsQuery: 'Riomaggiore Cinque Terre' },
      { name: 'Manarola', desc: 'Najladniejsza wioska na zdjecia, widok z Via dell\'Amore', mapsQuery: 'Manarola Cinque Terre' },
      { name: 'Vernazza', desc: 'Port z wiezyczka, najlepsze owoce morza', mapsQuery: 'Vernazza Cinque Terre' },
    ],
  },
  {
    day: 9, date: '14.09', weekday: 'ND',
    title: 'Cinque Terre',
    route: 'Szlaki + plaza',
    desc: 'Sentiero Azzurro: Monterosso -> Vernazza - najladniejszy odcinek szlaku nadmorskiego (~1.5h). Plaza w Monterosso.',
    tags: ['beach', 'mountain'],
    image: 'https://images.unsplash.com/photo-1553342360-e0f6c3d92aff?w=800&q=80',
    imageAlt: 'Monterosso al Mare plaza Cinque Terre',
    overnight: 'Levanto',
    attractions: [
      { name: 'Sentiero Azzurro', desc: 'Monterosso -> Vernazza, ~3.5 km, ~1.5h. Widoki na wybrzeze i winnice', mapsQuery: 'Sentiero Azzurro Cinque Terre' },
      { name: 'Monterosso al Mare', desc: 'Najlepsza piasczysta plaza w Cinque Terre', mapsQuery: 'Monterosso al Mare beach' },
    ],
  },
  {
    day: 10, date: '15.09', weekday: 'PN',
    title: 'Cinque Terre -> Toskania',
    route: '200 km | ~2.5h',
    desc: 'Spacer po San Gimignano - "sredniowieczny Manhattan" z 14 wiezami. Degustacja wina Vernaccia w twierdzy La Rocca.',
    tags: ['city', 'drive'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    imageAlt: 'San Gimignano sredniowieczne wieze Toskania',
    overnight: 'Camping Il Boschetto di Piemma (baza na 3 noce)',
    attractions: [
      { name: 'San Gimignano', desc: '14 sredniowiecznych wiez, Piazza della Cisterna, Gelateria Dondoli', mapsQuery: 'San Gimignano' },
      { name: 'Vernaccia Wine Experience', desc: 'Degustacja bialego wina w twierdzy La Rocca z widokiem', mapsQuery: 'Vernaccia di San Gimignano Wine Experience' },
    ],
  },
  {
    day: 11, date: '16.09', weekday: 'WT',
    title: 'Toskania - Siena i okolice',
    route: '~40 km do Sieny',
    desc: 'Siena: muszlowy Piazza del Campo, Duomo z marmurowa posadzka. Monteriggioni: sredniowieczna wioska otoczona murami.',
    tags: ['city'],
    image: 'https://images.unsplash.com/photo-1542729716-fbc0dfd8eb01?w=800&q=80',
    imageAlt: 'Siena Piazza del Campo',
    overnight: 'Camping Il Boschetto di Piemma',
    attractions: [
      { name: 'Siena - Piazza del Campo', desc: 'Muszlowy plac, miejsce wyscigow Palio. Torre del Mangia (400 schodow)', mapsQuery: 'Piazza del Campo Siena' },
      { name: 'Duomo di Siena', desc: 'Jedna z najladniejszych katedr we Wloszech, marmurowa posadzka', mapsQuery: 'Duomo di Siena' },
      { name: 'Monteriggioni', desc: 'Sredniowieczna wioska otoczona murami obronnymi', mapsQuery: 'Monteriggioni' },
    ],
  },
  {
    day: 12, date: '17.09', weekday: 'SR',
    title: 'Toskania - Volterra i relaks',
    route: '~30 km do Volterry',
    desc: 'Volterra - etruskie miasto na wzgorzu z panoramami na Toskanie. Popoludnie: relaks na campingu, degustacja wina i oliwy.',
    tags: ['city'],
    image: 'https://images.unsplash.com/photo-1505778276668-26b3ff7af103?w=800&q=80',
    imageAlt: 'Toskania wzgorza o zachodzie slonca',
    overnight: 'Camping Il Boschetto di Piemma',
    attractions: [
      { name: 'Volterra', desc: 'Etruskie miasto (800 p.n.e.!), Teatro Romano, Balze - klify erozyjne', mapsQuery: 'Volterra Italy' },
    ],
  },
  {
    day: 13, date: '18.09', weekday: 'CZ',
    title: 'Toskania -> Wroclaw',
    route: '1300 km | ~13-16h',
    desc: 'Dlugi dzien powrotny. 3 kierowcow, zmiana co ~4.5h. Przystanek w Parmie na obiad - parmezan, prosciutto, tortelli.',
    tags: ['drive'],
    image: 'https://images.unsplash.com/photo-1504711331409-6b5e05e37053?w=800&q=80',
    imageAlt: 'Autostrada przez Alpy',
    overnight: 'Wroclaw (u znajomych)',
    attractions: [
      { name: 'Parma', desc: 'Przystanek na obiad: Prosciutto di Parma, Parmigiano, tortelli d\'erbetta', mapsQuery: 'Parma Italy center' },
    ],
  },
  {
    day: 14, date: '19.09', weekday: 'PT',
    title: 'Wroclaw -> Gdansk',
    route: '460 km | ~5h',
    desc: 'Spokojny poranek we Wroclawiu, pozegnanie z para wroclawska. Wyjazd po obiedzie, przyjazd do Gdanska wieczorem.',
    tags: ['drive'],
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80',
    imageAlt: 'Gdansk',
    attractions: [],
  },
];