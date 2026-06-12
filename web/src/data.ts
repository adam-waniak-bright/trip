export type Tag = 'mountain' | 'lake' | 'city' | 'beach' | 'drive';
export type Intensity = 'chill' | 'moderate' | 'active' | 'intense';

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
  intensity: Intensity;
  image: string;
  imageAlt: string;
  attractions: Attraction[];
  overnight?: string;
  // Plik md ze szczegolami (w public/dni/)
  detailsFile?: string;
}

export const TAG_LABELS: Record<Tag, string> = {
  mountain: 'Gory',
  lake: 'Jezioro',
  city: 'Miasto',
  beach: 'Plaza',
  drive: 'Dojazd',
};

export const TAG_COLORS: Record<Tag, string> = {
  mountain: 'bg-emerald-100 text-emerald-700',
  lake: 'bg-sky-100 text-sky-700',
  city: 'bg-amber-100 text-amber-700',
  beach: 'bg-violet-100 text-violet-700',
  drive: 'bg-stone-100 text-stone-500',
};

export interface BudgetItem { label: string; value: string }

export const config = {
  title: 'Road Trip 2026',
  subtitle: 'Austria & Wlochy | 5-19 wrzesien',
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

export const INTENSITY_CONFIG: Record<Intensity, { label: string; icon: string; color: string }> = {
  chill: { label: 'Luzik', icon: '😎', color: 'bg-green-100 text-green-700' },
  moderate: { label: 'Umiarkowany', icon: '🚶', color: 'bg-sky-100 text-sky-700' },
  active: { label: 'Aktywny', icon: '🥾', color: 'bg-amber-100 text-amber-700' },
  intense: { label: 'Intensywny', icon: '🔥', color: 'bg-red-100 text-red-700' },
};

export function getGoogleMapsUrl(attraction: Attraction) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.mapsQuery)}`;
}

// Zdjecia z Unsplash - ID zweryfikowane z wynikow wyszukiwania
// Aby zmienic: unsplash.com -> szukaj -> kliknij zdjecie -> ID z URL
export const days: DayPlan[] = [
  {
    day: 0, date: '5.09', weekday: 'PT',
    title: 'Gdansk -> Wroclaw',
    route: '460 km | ~5h',
    desc: 'Dojazd z Gdanska do Wroclawia. Nocleg u znajomych, pakowanie auta, zakupy na droge.',
    tags: ['drive'],
    intensity: 'moderate',
    image: '/trip/images/road.jpg',
    imageAlt: 'Poczatek road tripu',
    overnight: 'Wroclaw (u znajomych)',
    detailsFile: '01-wroclaw-05.09.md',
    attractions: [],
  },
  {
    day: 1, date: '6.09', weekday: 'SB',
    title: 'Wroclaw -> Czeski Krumlov -> Hallstatt',
    route: '620 km | ~6.5h',
    desc: 'Przystanek w Czeskim Krumlowie - spacer po bajkowym starym miescie z zamkiem nad Weltawa. Wieczor nad jeziorem Hallstatt o zachodzie slonca.',
    tags: ['city', 'lake', 'drive'],
    intensity: 'active',
    image: '/trip/images/Krumlov.jpg',
    imageAlt: 'Czeski Krumlov - zamek i stare miasto nad Weltawa',
    overnight: 'Hallstatt / Obertraun',
    detailsFile: '02-hallstatt-06-07.09.md',
    attractions: [
      { name: 'Czeski Krumlov', desc: 'Bajkowe stare miasto (UNESCO), zamek nad Weltawa, renesansowe kamienice', mapsQuery: 'Cesky Krumlov Old Town' },
      { name: 'Jezioro Hallstatt', desc: 'Spacer nad jeziorem o zachodzie slonca', mapsQuery: 'Hallstatt Lake Austria' },
    ],
  },
  {
    day: 2, date: '7.09', weekday: 'ND',
    title: 'Hallstatt i okolice',
    route: 'Dzien na miejscu',
    desc: 'Five Fingers (2100m) - 5 platform nad przepascia z panorama 360. Jaskinia lodowa Dachstein. Spacer po Hallstatt.',
    tags: ['mountain', 'lake'],
    intensity: 'active',
    image: '/trip/images/Hallstatt.jpg',
    imageAlt: 'Hallstatt - miasteczko nad jeziorem w Alpach',
    overnight: 'Hallstatt / Obertraun',
    detailsFile: '02-hallstatt-06-07.09.md',
    attractions: [
      { name: 'Five Fingers (Krippenstein)', desc: '5 platform ze szkla nad przepascia na 2100m. Kolejka z Obertraun ~35-40 EUR/os', mapsQuery: '5fingers Krippenstein' },
      { name: 'Jaskinia lodowa Dachstein', desc: 'Ta sama kolejka co Five Fingers, poziom Schonbergalm. Temp. ~0 st.!', mapsQuery: 'Dachstein Ice Cave' },
      { name: 'Jezioro Hallstattersee', desc: 'Kajaki, SUP, plazowanie w Obertraun', mapsQuery: 'Hallstattersee' },
    ],
  },
  {
    day: 3, date: '8.09', weekday: 'PN',
    title: 'Grossglockner -> Dolomity',
    route: '280 km | caly dzien',
    desc: 'Przejazd najpieksniejsza droga alpejska w Austrii. Widok na lodowiec Pasterze i najwyzszy szczyt Austrii - Grossglockner (3798m). Krotkie szlaki po drodze.',
    tags: ['mountain', 'drive'],
    intensity: 'active',
    image: '/trip/images/Grossglockner.jpg',
    imageAlt: 'Grossglockner High Alpine Road',
    overnight: 'Brixen / Val di Funes (baza na 4 noce)',
    detailsFile: '03-brixen-08-11.09.md',
    attractions: [
      { name: 'Grossglockner Hochalpenstrasse', desc: 'Najpieksniejsza droga alpejska w Austrii (48 km). Oplata ~40 EUR/auto', mapsQuery: 'Grossglockner High Alpine Road' },
      { name: 'Kaiser-Franz-Josefs-Hohe', desc: 'Widok na lodowiec Pasterze i Grossglockner (3798m)', mapsQuery: 'Kaiser Franz Josefs Höhe' },
    ],
  },
  {
    day: 4, date: '9.09', weekday: 'WT',
    title: 'Lago di Braies & Val di Funes',
    route: '~60 km z bazy',
    desc: 'Rano Lago di Braies (przyjechac przed 9!). Kolejka na Secede (2519m) - najslynniejszy widok Dolomitow. Val di Funes.',
    tags: ['mountain', 'lake'],
    intensity: 'intense',
    image: '/trip/images/Lago di Braies.jpg',
    imageAlt: 'Lago di Braies - turkusowe jezioro z lodkami',
    overnight: 'Brixen / Val di Funes',
    detailsFile: '03-brixen-08-11.09.md',
    attractions: [
      { name: 'Lago di Braies', desc: 'Turkusowe jezioro alpejskie, szlak wokol ~1.5h. Przyjechac przed 9 rano!', mapsQuery: 'Lago di Braies' },
      { name: 'Seceda (Ortisei)', desc: 'Grzbiet Odle na 2519m - najslynniejszy widok Dolomitow. Kolejka ~40 EUR/os. Rezerwacja online!', mapsQuery: 'Seceda Ortisei' },
      { name: 'Val di Funes - St. Magdalena', desc: 'Ikoniczny kosciolek z widokiem na masyw Odle', mapsQuery: 'Chiesa di Santa Maddalena Val di Funes' },
    ],
  },
  {
    day: 5, date: '10.09', weekday: 'SR',
    title: 'Tre Cime di Lavaredo',
    route: 'Szlak ~10 km, ~4h',
    desc: 'Ikoniczny szlak Dolomitow - petla wokol Tre Cime. Przystanek na Lago di Antorno po drodze. Obiad w schronisku.',
    tags: ['mountain'],
    intensity: 'active',
    image: '/trip/images/tre-cime.jpg',
    imageAlt: 'Tre Cime di Lavaredo - trzy szczyty Dolomitow',
    overnight: 'Brixen / Val di Funes',
    detailsFile: '03-brixen-08-11.09.md',
    attractions: [
      { name: 'Lago di Antorno', desc: 'Przystanek po drodze (5 min) - Tre Cime w odbiciu wody. Bezplatny!', mapsQuery: 'Lago Antorno Misurina' },
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
    intensity: 'active',
    image: '/trip/images/Lake Sorapis.jpg',
    imageAlt: 'Lake Sorapis - turkusowe jezioro w Dolomitach',
    overnight: 'Brixen / Val di Funes',
    detailsFile: '03-brixen-08-11.09.md',
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
    intensity: 'moderate',
    image: '/trip/images/Garda.jpg',
    imageAlt: 'Sirmione - zamek Scaligero na Jeziorze Garda',
    overnight: 'Bardolino',
    detailsFile: '04-bardolino-12.09.md',
    attractions: [
      { name: 'Sirmione', desc: 'Zamek Scaligero (XIII w.) na wodzie, Grotte di Catullo, waskie uliczki', mapsQuery: 'Sirmione Castle' },
      { name: 'Bardolino', desc: 'Promenada nad jeziorem, lokalne wino Bardolino', mapsQuery: 'Bardolino Lake Garda' },
    ],
  },
  {
    day: 8, date: '13.09', weekday: 'SB',
    title: 'Garda -> Cinque Terre',
    route: '330 km | ~3.5h',
    desc: 'Wszystkie 5 wiosek: Riomaggiore, Manarola, Corniglia, Vernazza. Castello Doria + kolacja z owocami morza.',
    tags: ['beach', 'city', 'drive'],
    intensity: 'intense',
    image: '/trip/images/Vernazza.jpg',
    imageAlt: 'Vernazza - kolorowy port w Cinque Terre',
    overnight: 'Levanto',
    detailsFile: '05-levanto-13-14.09.md',
    attractions: [
      { name: 'Riomaggiore', desc: 'Kolorowe domy spadajace ku morzu', mapsQuery: 'Riomaggiore Cinque Terre' },
      { name: 'Manarola', desc: 'Najladniejsza wioska na zdjecia, widok z Via dell\'Amore', mapsQuery: 'Manarola Cinque Terre' },
      { name: 'Corniglia', desc: '5. wioska na szczycie klifu - najciszejsza, panorama na CT', mapsQuery: 'Corniglia Cinque Terre' },
      { name: 'Vernazza', desc: 'Castello Doria (1.5 EUR, najlepszy widok) + owoce morza', mapsQuery: 'Vernazza Cinque Terre' },
    ],
  },
  {
    day: 9, date: '14.09', weekday: 'ND',
    title: 'Cinque Terre',
    route: 'Szlaki + plaza',
    desc: 'Sentiero Azzurro: Monterosso -> Vernazza - najladniejszy odcinek szlaku nadmorskiego (~1.5h). Plaza w Monterosso.',
    tags: ['beach', 'mountain'],
    intensity: 'moderate',
    image: '/trip/images/Monterosso.jpg',
    imageAlt: 'Monterosso al Mare - plaza w Cinque Terre',
    overnight: 'Levanto',
    detailsFile: '05-levanto-13-14.09.md',
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
    intensity: 'moderate',
    image: '/trip/images/Gimignano.jpg',
    imageAlt: 'San Gimignano - sredniowieczne wieze w Toskanii',
    overnight: 'Camping Il Boschetto di Piemma (baza na 3 noce)',
    detailsFile: '06-san-gimignano-15-17.09.md',
    attractions: [
      { name: 'San Gimignano', desc: '14 sredniowiecznych wiez, Piazza della Cisterna, Gelateria Dondoli', mapsQuery: 'San Gimignano' },
      { name: 'Vernaccia Wine Experience', desc: 'Degustacja bialego wina w twierdzy La Rocca z widokiem', mapsQuery: 'Vernaccia di San Gimignano Wine Experience' },
    ],
  },
  {
    day: 11, date: '16.09', weekday: 'WT',
    title: 'Toskania - Volterra, Pienza i Val d\'Orcia',
    route: '~200 km petla',
    desc: 'Volterra rano - etruskie miasto z panoramami. Pienza popoludniu - idealne miasto renesansu. Val d\'Orcia o zachodzie slonca.',
    tags: ['city'],
    intensity: 'active',
    image: '/trip/images/Siena.jpg',
    imageAlt: 'Toskania - Val d\'Orcia',
    overnight: 'Camping Il Boschetto di Piemma',
    detailsFile: '06-san-gimignano-15-17.09.md',
    attractions: [
      { name: 'Volterra', desc: 'Etruskie miasto (800 p.n.e.!), Teatro Romano, Balze - klify erozyjne', mapsQuery: 'Volterra Italy' },
      { name: 'Pienza', desc: 'Idealne miasto renesansu (UNESCO). Widok na Val d\'Orcia, pecorino', mapsQuery: 'Pienza Italy' },
      { name: 'Val d\'Orcia (SP146)', desc: 'Ikoniczny krajobraz Toskanii - wzgorza, cyprysy. Najlepsze swiatlo o zachodzie!', mapsQuery: 'Val d\'Orcia' },
    ],
  },
  {
    day: 12, date: '17.09', weekday: 'SR',
    title: 'Toskania - Siena i Monteriggioni',
    route: '~40 km do Sieny',
    desc: 'Siena na spokojnie: Piazza del Campo, Duomo, Torre del Mangia. Monteriggioni po drodze. Relaks i pakowanie wieczorem.',
    tags: ['city'],
    intensity: 'moderate',
    image: '/trip/images/Tuscany.jpg',
    imageAlt: 'Toskania - wzgorza z cyprysami',
    overnight: 'Camping Il Boschetto di Piemma',
    detailsFile: '06-san-gimignano-15-17.09.md',
    attractions: [
      { name: 'Siena - Piazza del Campo', desc: 'Muszlowy plac, miejsce wyscigow Palio. Torre del Mangia (400 schodow)', mapsQuery: 'Piazza del Campo Siena' },
      { name: 'Duomo di Siena', desc: 'Jedna z najladniejszych katedr we Wloszech, marmurowa posadzka', mapsQuery: 'Duomo di Siena' },
      { name: 'Monteriggioni', desc: 'Sredniowieczna wioska otoczona murami obronnymi', mapsQuery: 'Monteriggioni' },
    ],
  },
  {
    day: 13, date: '18.09', weekday: 'CZ',
    title: 'Toskania -> Wroclaw',
    route: '1300 km | ~13-16h',
    desc: 'Dlugi dzien powrotny. 3 kierowcow, zmiana co ~4.5h. Przystanek w Parmie na obiad - parmezan, prosciutto, tortelli.',
    tags: ['drive'],
    intensity: 'intense',
    image: '/trip/images/road.jpg',
    imageAlt: 'Road trip - droga przez Alpy',
    overnight: 'Wroclaw (u znajomych)',
    detailsFile: '07-powrot-18-19.09.md',
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
    intensity: 'chill',
    image: '/trip/images/gdansk.jpg',
    imageAlt: 'Gdansk - powrot do domu',
    detailsFile: '07-powrot-18-19.09.md',
    attractions: [],
  },
];