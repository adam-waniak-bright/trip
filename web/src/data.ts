export type Tag = 'mountain' | 'lake' | 'city' | 'beach' | 'drive';
export type Intensity = 'chill' | 'moderate' | 'active' | 'intense';

export interface Attraction {
  name: string;
  desc: string;
  longDesc?: string;
  cost?: string;
  duration?: string;
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
  tips?: string[];
  funFacts?: string[];
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

export type AccommodationType =
  | 'camping' | 'apartament' | 'hotel' | 'glamping' | 'domek' | 'prywatnie';

export const ACCOMMODATION_LABELS: Record<AccommodationType, string> = {
  camping: 'Camping',
  apartament: 'Apartament',
  hotel: 'Hotel',
  glamping: 'Glamping',
  domek: 'Domek',
  prywatnie: 'Prywatnie',
};

export const ACCOMMODATION_COLORS: Record<AccommodationType, string> = {
  camping: 'bg-emerald-100 text-emerald-700',
  apartament: 'bg-sky-100 text-sky-700',
  hotel: 'bg-violet-100 text-violet-700',
  glamping: 'bg-amber-100 text-amber-700',
  domek: 'bg-lime-100 text-lime-700',
  prywatnie: 'bg-stone-100 text-stone-500',
};

export interface OvernightOption {
  name: string;
  type: AccommodationType;
  price: string;
  url: string;
  note?: string;
  // Adres pokazywany na karcie noclegu
  address?: string;
  // Zapytanie do Google Maps, gdy sam adres nie wystarcza (np. Plus Code)
  mapsQuery?: string;
}

export interface OvernightLocation {
  dates: string;
  place: string;
  nights: number;
  confirmed?: boolean;
  options: OvernightOption[];
}

// Wylicza daty zameldowania i wymeldowania z zakresu `dates` + liczby nocy.
// Zakres "6-7.09" + 2 noce => zameldowanie 6.09, wymeldowanie 8.09 (rano).
// Zwraca null dla noclegow bez sensownego check-in/out (np. u znajomych).
export function getCheckInOut(location: OvernightLocation): { checkIn: string; checkOut: string } | null {
  if (location.options.every(o => o.type === 'prywatnie')) return null;
  const match = location.dates.match(/^(\d+)/);
  if (!match) return null;
  const startDay = parseInt(match[1], 10);
  const checkOutDay = startDay + location.nights;
  return { checkIn: `${startDay}.09`, checkOut: `${checkOutDay}.09` };
}

export const overnights: OvernightLocation[] = [
  {
    dates: '5.09',
    place: 'Wroclaw',
    nights: 1,
    confirmed: true,
    options: [
      { name: 'U znajomych', type: 'prywatnie', price: '0 zl', url: '', note: 'Potwierdzone' },
    ],
  },
  {
    dates: '6-7.09',
    place: 'Hallstatt / Obertraun',
    nights: 2,
    confirmed: true,
    options: [
      {
        name: 'Barbi Exclusive Apartment (Bad Mitterndorf)',
        type: 'apartament',
        price: '214,5 EUR (~920 zł) / 2 noce',
        url: 'https://www.booking.com/Share-vsQwpCq',
        address: 'Sonnenalm 8/28, 8983 Bad Mitterndorf, Austria',
        note: 'ZAREZERWOWANE. Zameldowanie 6.09, wymeldowanie 8.09.',
      },
    ],
  },
  {
    dates: '8-11.09',
    place: 'Sillian (baza na Dolomity)',
    nights: 4,
    confirmed: true,
    options: [
      {
        name: 'Ferienwohnung Frieda (Sillian Austria)',
        type: 'apartament',
        price: '530 EUR (~2 274 zł) / 4 noce',
        url: 'https://www.booking.com/Share-ac9Az7B',
        address: '42 Sillian, 9920 Sillian, Austria',
        mapsQuery: 'Ferienwohnung Frieda, 42 Sillian, 9920 Sillian, Austria',
        note: 'ZAREZERWOWANE. 2 sypialnie, kuchnia, parking. 1h od atrakcji. Zameldowanie 8.09, wymeldowanie 12.09.',
      },
    ],
  },
  {
    dates: '12-14.09',
    place: 'Levanto (Cinque Terre)',
    nights: 3,
    confirmed: true,
    options: [
      {
        name: 'Apartament Corso (Levanto)',
        type: 'apartament',
        price: '2 414,20 zł / 3 noce',
        url: 'https://www.airbnb.pl/rooms/871427864698746858',
        address: 'Levanto (Plus Code 5JC6+HC), Province of La Spezia, Włochy',
        mapsQuery: '5JC6+HC Levanto, Province of La Spezia, Italy',
        note: 'ZAREZERWOWANE (Airbnb). Zameldowanie 12.09, wymeldowanie 15.09.',
      },
    ],
  },
  {
    dates: '15-17.09',
    place: 'San Gimignano',
    nights: 3,
    confirmed: true,
    options: [
      {
        name: 'Agriturismo La Magione',
        type: 'apartament',
        price: '290 EUR (~1 244 zł) / 3 noce',
        url: 'https://www.booking.com/Share-eKIc9K9',
        address: 'Strada della Magione 9, 53035 Quercegrossa, Włochy',
        note: 'ZAREZERWOWANE. Bardzo klimatyczne miejsce z basenem i widokami. Zameldowanie 15.09, wymeldowanie 18.09.',
      },
    ],
  },
  {
    dates: '18.09',
    place: 'Wroclaw',
    nights: 1,
    confirmed: true,
    options: [
      { name: 'U znajomych', type: 'prywatnie', price: '0 zl', url: '', note: 'Potwierdzone' },
    ],
  },
];

export interface BudgetItem { label: string; value: string }

export const config = {
  title: 'Road Trip 2026',
  subtitle: 'Austria & Wlochy | 5-19 wrzesien',
  summary: [
    { label: 'Czas trwania', value: '14 dni' },
    { label: 'Dystans', value: '~3 500 km' },
    { label: 'Uczestnicy', value: '4 osoby' },
    { label: 'Budzet / os.', value: '~4 590 - 4 840 zl' },
    { label: 'Kraje', value: 'PL CZ AT IT' },
  ],
  budget: [
    { label: 'Paliwo (~3500 km, 7l/100km, ~1.80 EUR/l, kurs ~4.29)', value: '~1 900 zl' },
    { label: 'Winiety / autostrady (CZ 2x, AT 2-mies., Grossglockner, IT bramki)', value: '~1 000 zl' },
    { label: 'Noclegi (12 nocy apartamenty + 2 noce u znajomych)', value: '~6 852 zl (zarezerwowane)' },
    { label: 'Jedzenie (obiady restauracja + gotowanie)', value: '~5 000 - 6 000 zl' },
    { label: 'Atrakcje / wstepy / kolejki (Seceda pominieta: -160 EUR)', value: '~2 100 zl' },
    { label: 'Rezerwa', value: '~1 500 zl' },
  ] as BudgetItem[],
  budgetTotal: '~18 350 - 19 350 zl',
  budgetPerPerson: '~4 590 - 4 840 zl',
  overnights: [
    { dates: '5.09', place: 'Wroclaw', nights: 1, type: 'u znajomych', cost: '0 zl' },
    { dates: '6-7.09', place: 'Hallstatt / Obertraun', nights: 2, type: 'Barbi Exclusive Apartment (Bad Mitterndorf)', cost: '214,5 EUR (~920 zl) / 2 noce' },
    { dates: '8-11.09', place: 'Sillian (baza na Dolomity)', nights: 4, type: 'Ferienwohnung Frieda (Sillian)', cost: '530 EUR (~2 274 zl) / 4 noce' },
    { dates: '12-14.09', place: 'Levanto (Cinque Terre)', nights: 3, type: 'Apartament Corso (Airbnb)', cost: '2 414,20 zl / 3 noce' },
    { dates: '15-17.09', place: 'Toskania (Quercegrossa)', nights: 3, type: 'Agriturismo La Magione', cost: '290 EUR (~1 244 zl) / 3 noce' },
    { dates: '18.09', place: 'Wroclaw', nights: 1, type: 'u znajomych', cost: '0 zl' },
  ],
};

export const INTENSITY_CONFIG: Record<Intensity, { label: string; icon: string; color: string }> = {
  chill: { label: 'Luzik', icon: '😎', color: 'bg-green-100 text-green-700' },
  moderate: { label: 'Umiarkowany', icon: '🚶', color: 'bg-sky-100 text-sky-700' },
  active: { label: 'Aktywny', icon: '🥾', color: 'bg-amber-100 text-amber-700' },
  intense: { label: 'Intensywny', icon: '🔥', color: 'bg-red-100 text-red-700' },
};

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getGoogleMapsUrl(attraction: Attraction) {
  return mapsSearchUrl(attraction.mapsQuery);
}

export function getOvernightMapsUrl(option: OvernightOption) {
  return mapsSearchUrl(option.mapsQuery ?? option.address ?? option.name);
}

// Zdjecia z Unsplash - ID zweryfikowane z wynikow wyszukiwania
// Aby zmienic: unsplash.com -> szukaj -> kliknij zdjecie -> ID z URL
export const days: DayPlan[] = [
  {
    day: 0, date: '5.09', weekday: 'SB',
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
    tips: [
      'Kupic e-winiete czeska i austriacka online PRZED wyjazdem',
      'Pobrac mapy offline (Google Maps / Maps.me) na caly trip',
      'Przygotowac gotowke EUR na autostrady wloskie i Grossglockner',
      'Spakowac: buty trekkingowe, ciepla kurtka, kurtka przeciwdeszczowa, stroje kapielowe',
    ],
    funFacts: [
      'Lacznie pokonacie ~3500 km - to jak przejechac cala Polske wzdluz i wszerz',
      'Odwiedzicie 4 kraje w 14 dni: Polske, Czechy, Austrie i Wlochy',
    ],
  },
  {
    day: 1, date: '6.09', weekday: 'ND',
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
      { name: 'Czeski Krumlov', desc: 'Bajkowe stare miasto (UNESCO), zamek nad Weltawa, renesansowe kamienice', longDesc: 'Jedno z najlepiej zachowanych sredniowiecznych miast w Europie. Zamek z wieza widokowa nad meandrem Weltawy, renesansowe kamienice i waskie brukowane uliczki. Wystarczy 1-2h na spacer po starym miescie i zdjecia z mostu.', duration: '1-2h', mapsQuery: 'Cesky Krumlov Old Town' },
      { name: 'Jezioro Hallstatt', desc: 'Spacer nad jeziorem o zachodzie slonca', longDesc: 'Alpejskie jezioro otoczone gorami, z widokiem na jedno z najczesciej fotografowanych miasteczek na swiecie. Wieczorny spacer promenada przy zlotym swietle zachodzacego slonca to idealny poczatek tripu.', duration: '1-2h spacer', mapsQuery: 'Hallstatt Lake Austria' },
    ],
    tips: [
      'Wyjazd o 7:00 z Wroclawia zeby zdazyc na spacer po Krumlowie',
      'W Krumlowie wystarczy 1-2h - nie probujcie zobaczyc wszystkiego',
      'Zachod slonca nad Hallstatt to najlepszy moment na zdjecia - dotrzyjcie przed 18:30',
    ],
    funFacts: [
      'Czeski Krumlov ma drugi co do wielkosci zamek w Czechach (po Hradczanach)',
      'Hallstatt jest tak popularne, ze Chinczycy zbudowali jego kopie w prowincji Guangdong',
    ],
  },
  {
    day: 2, date: '7.09', weekday: 'PN',
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
      { name: 'Five Fingers (Krippenstein)', desc: '5 platform ze szkla nad przepascia na 2100m. Kolejka z Obertraun ~35-40 EUR/os', longDesc: 'Piec stalowo-szklanych platform wystajacych 4m nad przepascia na wysokosci 2100m. Panorama 360 stopni na masyw Dachstein, jezioro Hallstattersee i okoliczne szczyty. Dojazd kolejka linowa z Obertraun (3 przystanki). Z gornej stacji 20 min spaceru do platform.', cost: '~35-40 EUR/os (kolejka w obie strony + jaskinia)', duration: '2-3h (kolejka + spacer)', mapsQuery: '5fingers Krippenstein' },
      { name: 'Jaskinia lodowa Dachstein', desc: 'Kolejka Krippenstein, przystanek Schonbergalm (po drodze na Five Fingers). Temp. ~0 st.!', longDesc: 'Naturalna jaskinia z lodowymi formacjami siegajacymi 500 lat wstecz. Znajduje sie na poziomie Schonbergalm - posrednim przystanku kolejki na Krippenstein. Temperatura w srodku okolo 0 st. - koniecznie zabrac ciepla kurtke! Wliczona w bilet kolejki lub niewielka doplata.', cost: 'Wliczona w bilet kolejki', duration: '~45 min zwiedzanie', mapsQuery: 'Dachstein Ice Cave' },
      { name: 'Jezioro Hallstattersee', desc: 'Kajaki, SUP, plazowanie w Obertraun', longDesc: 'Krystalicznie czyste jezioro alpejskie idealne na popoludniowy relaks. Mozna wypozyczyc kajaki lub SUP na miejscu. Plaza w Obertraun jest spokojniejsza i mniej zatloczona niz bezposrednio w Hallstatt.', duration: '2h plazowanie/kajaki', mapsQuery: 'Hallstattersee' },
    ],
    tips: [
      'Zabrac ciepla kurtke do jaskini lodowej - temperatura ~0 st.!',
      'Five Fingers to NIE to samo co Hallstatt Skywalk (860m) - Five Fingers jest na 2100m',
      'Plaza w Obertraun jest spokojniejsza niz w Hallstatt',
    ],
    funFacts: [
      'Hallstatt to najstarsza osada solna na swiecie - wydobycie soli trwa tu od 7000 lat',
      'Five Fingers zawdziecza nazwe 5 platformom wystajacym nad przepascia jak palce dloni',
      'Jaskinia lodowa Dachstein ma w srodku lodowe formacje siegajace 500 lat wstecz',
    ],
  },
  {
    day: 3, date: '8.09', weekday: 'WT',
    title: 'Grossglockner -> Dolomity',
    route: '245 km | caly dzien',
    desc: 'Przejazd najpieksniejsza droga alpejska w Austrii. Widok na lodowiec Pasterze i najwyzszy szczyt Austrii - Grossglockner (3798m). Krotkie szlaki po drodze.',
    tags: ['mountain', 'drive'],
    intensity: 'active',
    image: '/trip/images/Grossglockner.jpg',
    imageAlt: 'Grossglockner High Alpine Road',
    overnight: 'Sillian, Austria (baza na 4 noce)',
    detailsFile: '03-sillian-08-11.09.md',
    attractions: [
      { name: 'Grossglockner Hochalpenstrasse', desc: 'Najpieksniejsza droga alpejska w Austrii (48 km). Oplata ~40 EUR/auto', longDesc: 'Legendarna droga alpejska z 36 zakretami, prowadzaca przez przeleczy na wysokosci ponad 2500m. Po drodze liczne punkty widokowe i krotkie szlaki. Otwarta tylko od maja do pazdziernika. Przystanki: Edelweissspitze (2571m), Fuscher Torl. Na 2500m moze byc 5-10 st. nawet we wrzesniu!', cost: '~40 EUR/auto', duration: 'Caly dzien (przejazd + przystanki)', mapsQuery: 'Grossglockner High Alpine Road' },
      { name: 'Kaiser-Franz-Josefs-Hohe', desc: 'Widok na lodowiec Pasterze i Grossglockner (3798m)', longDesc: 'Punkt widokowy na koncu drogi Grossglockner z panorama na lodowiec Pasterze (najwiekszy w Alpach Wschodnich) i najwyzszy szczyt Austrii. Szlak Gamsgrubenweg (~45 min, latwy) oferuje najlepsze widoki z bliska. Restauracja i wystawa na miejscu.', duration: '1.5-2h (szlak + widoki)', mapsQuery: 'Kaiser Franz Josefs Höhe' },
    ],
    tips: [
      'Cieplo sie ubrac - na 2500m moze byc 5-10 st. nawet we wrzesniu!',
      'Grossglockner Road: oplata ~40 EUR za auto, platnosc karta lub gotowka',
      'Szlak Gamsgrubenweg (~45 min) to najlepszy krotki szlak przy Kaiser-Franz-Josefs-Hohe',
    ],
    funFacts: [
      'Grossglockner (3798m) to najwyzszy szczyt Austrii',
      'Droga Grossglockner Hochalpenstrasse ma 48 km i 36 zakretow - otwarta tylko od maja do pazdziernika',
      'Lodowiec Pasterze kurczy sie o 10-15m rocznie - za 50 lat moze calkowicie zniknac',
    ],
  },
  {
    day: 4, date: '9.09', weekday: 'SR',
    title: 'Lago di Braies & Val di Funes',
    route: '~230 km petla z bazy',
    desc: 'Rano Lago di Braies (przyjechac przed 9!). Po poludniu Val di Funes - kosciolek St. Magdalena i widok na masyw Odle.',
    tags: ['mountain', 'lake'],
    intensity: 'active',
    image: '/trip/images/Lago di Braies.jpg',
    imageAlt: 'Lago di Braies - turkusowe jezioro z lodkami',
    overnight: 'Sillian, Austria',
    detailsFile: '03-sillian-08-11.09.md',
    attractions: [
      { name: 'Lago di Braies', desc: 'Turkusowe jezioro alpejskie, szlak wokol ~1.5h. Przyjechac przed 9 rano!', longDesc: 'Jedno z najladniejszych jezior w Dolomitach - intensywnie turkusowa woda otoczona skalami. Latwy szlak wokol jeziora (~3.5 km, ~1.5h). Koniecznie przyjechac przed 9 rano - pozniej setki autokarow turystycznych, brak miejsc parkingowych. Parking platny, jesli pelny - dalszy parking z shuttlem.', cost: 'Parking platny', duration: '~1.5h szlak wokol', mapsQuery: 'Lago di Braies' },
      { name: 'Val di Funes - St. Magdalena', desc: 'Ikoniczny kosciolek z widokiem na masyw Odle', longDesc: 'Prawdopodobnie najczesciej fotografowany kosciol w Alpach - maly bialy kosciolek na tle poteznego masywu Odle. Spacer po dolinie od Malga Zannes z widokiem na Odle to 1-2h relaksu w pieknym otoczeniu. Po pominieciu Seceda macie tu caly popoludnie zamiast 2h w biegu.', duration: '3-3.5h spacer + zdjecia', mapsQuery: 'Chiesa di Santa Maddalena Val di Funes' },
    ],
    tips: [
      'Lago di Braies: przyjechac PRZED 9 rano! Potem setki autokarow i brak parkingu',
      'Z Sillian do Braies tylko ~45 km (~50 min) - wyjazd 7:00 daje przyjazd ~7:50, spokojnie przed tlumami',
      'Seceda POMINIETA: z Sillian to ~120 km w jedna strone, dzien uroslby do ~330 km i powrotu po 20:00',
      'Powrot z Val di Funes do Sillian to ~110 km (~1h40) - nie planowac niczego po 19:00',
    ],
    funFacts: [
      'Lago di Braies stalo sie slawne dzieki wloskiemu serialowi "Un passo dal cielo"',
      'Kosciolek St. Magdalena w Val di Funes to prawdopodobnie najczesciej fotografowany kosciol w Alpach',
      'Masyw Odle (Geisler) to po ladinsku po prostu "igly" - od ostrych, iglastych szczytow',
    ],
  },
  {
    day: 5, date: '10.09', weekday: 'CZ',
    title: 'Tre Cime di Lavaredo',
    route: '~55 km dojazd + szlak ~10 km, ~4h',
    desc: 'Ikoniczny szlak Dolomitow - petla wokol Tre Cime di Lavaredo (2999m). Dobrze utrzymany, nie wymaga doswiadczenia. Obiad w schronisku z widokiem.',
    tags: ['mountain'],
    intensity: 'active',
    image: '/trip/images/tre-cime.jpg',
    imageAlt: 'Tre Cime di Lavaredo - trzy szczyty Dolomitow',
    overnight: 'Sillian, Austria',
    detailsFile: '03-sillian-08-11.09.md',
    attractions: [
      { name: 'Lago di Antorno', desc: 'Przystanek po drodze (5 min) - Tre Cime w odbiciu wody. Bezplatny!', longDesc: 'Male jezioro przy szosie, 3 km przed Tre Cime (okolice Misurina). W spokojny poranek Tre Cime odbijaja sie w wodzie - swietne zdjecie na poczatek dnia. Bezplatny parking przy drodze, 5 min spaceru.', duration: '5-10 min', mapsQuery: 'Lago Antorno Misurina' },
      { name: 'Tre Cime di Lavaredo', desc: 'Petla ~10 km, ~4h. Start z Rifugio Auronzo (parking ~30 EUR). Nie wymaga doswiadczenia.', longDesc: 'Symbol Dolomitow - petla wokol trzech ikonicznych szczytow (Cima Grande 2999m, Cima Ovest 2973m, Cima Piccola 2857m). Szlak dobrze utrzymany, w stylu drogi do Morskiego Oka - nie wymaga doswiadczenia wysokogorskiego. Start z Rifugio Auronzo (2320m), najwyzszy punkt ~2450m. Po drodze schroniska z jedzeniem i widokami.', cost: 'Parking ~30 EUR/auto', duration: '~10 km, 3.5-4h petla', mapsQuery: 'Tre Cime di Lavaredo' },
      { name: 'Rifugio Locatelli', desc: 'Schronisko z najlepszym widokiem na Tre Cime - obiad!', longDesc: 'Schronisko gorskie polozene naprzeciwko Tre Cime - najlepszy punkt widokowy na cala scianie polnocna. Idealne miejsce na obiad w polowie petli. Serwuja zupy, pasty, strudel. Trzy szczyty widac stad jak na dloni.', duration: 'Przystanek na szlaku', mapsQuery: 'Rifugio Locatelli' },
    ],
    tips: [
      'Tre Cime to najblizsza atrakcja Dolomitow z Sillian - tylko ~55 km (~1h10) przez Innichen/Misurina',
      'Start szlaku z Rifugio Auronzo (2320m) - parking ~30 EUR',
      'Wyjazd 7:30 = parking przed 9:00 (bywa pelny w sezonie). Jesli wolicie pospac, 8:30 tez wystarczy',
      'Szlak dobrze utrzymany (styl "Morskie Oko") - nie wymaga doswiadczenia wysokogorskiego',
      'Przystanek na Lago di Antorno po drodze - 5 min, swietne zdjecie Tre Cime w odbiciu',
    ],
    funFacts: [
      'Tre Cime di Lavaredo (Drei Zinnen) to symbol Dolomitow - pojawiaja sie na co 3. pocztowce z regionu',
      'Podczas I wojny swiatowej Wlosi i Austriacy walczyli na szczytach Tre Cime - do dzis widac resztki okopow',
      'Najwyzszy z trzech szczytow (Cima Grande) ma 2999m - brakuje 1m do okraglych 3000',
    ],
  },
  {
    day: 6, date: '11.09', weekday: 'PT',
    title: 'Lake Sorapis lub Lago Federa',
    route: 'Szlak 5h lub 3-4h',
    desc: 'Do wyboru wg pogody i sil: Sorapis - turkusowe jezioro w skalnym kotle (trudniejszy). Federa - latwiejszy szlak widokowy od Passo Giau.',
    tags: ['mountain'],
    intensity: 'active',
    image: '/trip/images/Lake Sorapis.jpg',
    imageAlt: 'Lake Sorapis - turkusowe jezioro w Dolomitach',
    overnight: 'Sillian, Austria',
    detailsFile: '03-sillian-08-11.09.md',
    attractions: [
      { name: 'Lake Sorapis', desc: 'Szlak 215 z Passo Tre Croci, ~12 km, ~5h. Turkusowe jezioro w skalnym kotle. Odcinki z linami.', longDesc: 'Turkusowe jezioro w skalnym kotle - kolor wody to efekt zawiesiny dolomitowej, wyglada jak na Karaibach. Szlak 215 z Passo Tre Croci, miejscami z linami stalowymi (nie wymagaja sprzetu ferratowego, ale trzeba uwazac). Trudniejszy z dwoch opcji na ten dzien - wybrac jesli pogoda sloneczna i pelno sil.', duration: '~12 km, ~5h w obie strony', mapsQuery: 'Lago di Sorapis' },
      { name: 'Lago Federa', desc: 'Szlak od Passo Giau, ~8 km, ~3-4h. Latwiejszy, widokowy.', longDesc: 'Widokowy szlak grzbietowy z panorama na Dolomity. Latwiejszy niz Sorapis, ale tez piekny. Przy jeziorze stoi Rifugio Croda da Lago z obiadem i widokiem. Dobra opcja po 2 dniach intensywnych szlakow lub przy chmurach (mniej spektakularny, ale wciaz wart spaceru).', duration: '~8 km, ~3-4h w obie strony', mapsQuery: 'Lago Federa' },
    ],
    tips: [
      'Po 2 dniach szlakow nogi moga byc ciezkie - ocenic sily rano przed wyborem',
      'Slonecznie + duzo sil = Sorapis (mocniejsze wrazenia). Zmeczenie/chmury = Federa (latwiejszy)',
      'Dojazd z Sillian: Sorapis ~70 km (~1h20), Federa ~100 km (~1h50) - Federa wymaga wczesniejszego startu',
      'Sorapis: odcinki z linami stalowymi - nie wymagaja sprzetu ferratowego, ale trzeba uwazac',
      'WIECZOREM SPAKOWAC AUTO - jutro wyjazd o 7:00 i ~640 km do Levanto',
    ],
    funFacts: [
      'Kolor wody Lake Sorapis to efekt zawiesiny dolomitowej - turkusowy jak na Karaibach, ale w gorach',
      'Dolomity zawdzieczaja nazwe francuskiemu geologowi Deodat de Dolomieu, ktory zbadal sklad skal w XVIII w.',
    ],
  },
  {
    day: 7, date: '12.09', weekday: 'SB',
    title: 'Dolomity -> Garda (przystanek) -> Cinque Terre',
    route: '640 km | ~7h',
    desc: 'Wczesny wyjazd (7:00). Krotki przystanek w Sirmione nad Garda - zamek Scaligero na wodzie, obiad. Po poludniu dojazd do Levanto (baza na 3 noce).',
    tags: ['lake', 'city', 'drive'],
    intensity: 'active',
    image: '/trip/images/Garda.jpg',
    imageAlt: 'Sirmione - zamek Scaligero na Jeziorze Garda',
    overnight: 'Levanto (baza na 3 noce)',
    detailsFile: '04-levanto-12-14.09.md',
    attractions: [
      { name: 'Sirmione', desc: 'Przystanek nad Garda (2h): zamek Scaligero (XIII w.) na wodzie, obiad', longDesc: 'Polwysep wcinajacy sie w Jezioro Garda z XIII-wiecznym zamkiem Scaligero na wodzie. Waskie uliczki z lodziarniami i sklepami. Idealny przystanek na obiad w polowie trasy do Cinque Terre. Wejscie do zamku ~8 EUR. Grotte di Catullo (ruiny rzymskiej willi na czubku polwyspu) leza ~1.2 km dalej - przy 2h postoju nie ma na nie czasu.', cost: 'Zamek ~8 EUR/os', duration: '2h przystanek', mapsQuery: 'Sirmione Castle' },
    ],
    tips: [
      'Najdluzszy przejazd tripu poza powrotem (~640 km) - wyjazd z Sillian o 7:00, spakowac auto POPRZEDNIEGO WIECZORU',
      'Z Sillian pierwsza godzina to przejazd Pustertal na zachod do Brixen, zanim wjedziecie na A22',
      'Sirmione skrocone do 2h - sam zamek + obiad, bez Grotte di Catullo. Przy takim tempie Levanto ~16:30',
      'Parking w Sirmione poza polwyspem (ruch ograniczony) - do centrum kilka minut spaceru',
    ],
    funFacts: [
      'Jezioro Garda to najwieksze jezioro we Wloszech - 370 km2, wieksze niz Malta',
      'Zamek Scaligero w Sirmione to jeden z najlepiej zachowanych zamkow na wodzie we Wloszech',
      'Grotte di Catullo to ruiny rzymskiej willi z I w. p.n.e. - nalezaly (podobno) do poety Katullusa',
    ],
  },
  {
    day: 8, date: '13.09', weekday: 'ND',
    title: 'Cinque Terre - trzy wioski',
    route: 'Pociagiem z Levanto',
    desc: 'Trzy wioski pociagiem: Riomaggiore, Manarola, Corniglia. Wieczor na plazy w Levanto.',
    tags: ['beach', 'city'],
    intensity: 'active',
    image: '/trip/images/Vernazza.jpg',
    imageAlt: 'Vernazza - kolorowy port w Cinque Terre',
    overnight: 'Levanto',
    detailsFile: '04-levanto-12-14.09.md',
    attractions: [
      { name: 'Riomaggiore', desc: 'Kolorowe domy spadajace ku morzu, przekaska z widokiem', longDesc: 'Najpoludniowsza wioska Cinque Terre. Kolorowe domy kaskadowo opadaja ku morzu tworzac ikoniczny widok. Mala kamienista plaza na dole. Swietna na szybka przekaske z widokiem na wybrzeze.', duration: '~45 min', mapsQuery: 'Riomaggiore Cinque Terre' },
      { name: 'Manarola', desc: 'Najladniejsza wioska na zdjecia, widok z Via dell\'Amore, obiad', longDesc: 'Najladniejsza z 5 wiosek do fotografowania - kolorowe domy na tle skalistego klifu. Najlepszy punkt widokowy: zejsc do portu i obejrzec sie. Lokalne deserowe wino Sciacchetra warte sprobowania. Dobra na spokojny obiad z widokiem.', duration: '~1.5h z obiadem', mapsQuery: 'Manarola Cinque Terre' },
      { name: 'Corniglia', desc: '5. wioska na szczycie klifu - najciszejsza, panorama na CT', longDesc: 'Jedyna wioska bez dostepu do morza - stoi na 100m klifie. Najciszejsza i najmniej komercyjna z 5 wiosek, z panorama na cale Cinque Terre. Dojscie z dworca: 382 schody (Lardarina) lub autobus wahadlowy.', duration: '~1h', mapsQuery: 'Corniglia Cinque Terre' },
    ],
    tips: [
      'Kupic Cinque Terre Card (~16 EUR/os) na stacji w Levanto - sprawdzic 2-dniowa (~29 EUR/os)',
      'Pociagi kursuja co 15-20 min miedzy wioskami - wygodniejsze niz szlaki z plecakiem',
      'Corniglia: 382 schody z dworca lub autobus wahadlowy - zdecydowac przed wejsciem',
      'Sobota = tlumy w CT. Wrzesien pomaga, ale wioski beda pelne',
    ],
    funFacts: [
      'Cinque Terre to 5 wiosek na klifach liguryjskiego wybrzeza - UNESCO od 1997',
      'Tarasy uprawne (winnice) w CT budowane sa od XII w. - laczna dlugosc murkow to ~6700 km!',
      'Corniglia to jedyna wioska bez dostepu do morza - stoi na 100m klifie',
    ],
  },
  {
    day: 9, date: '14.09', weekday: 'PN',
    title: 'Cinque Terre - szlak, Vernazza i plaza',
    route: 'Szlak + Vernazza + plaza',
    desc: 'Sentiero Azzurro: Monterosso -> Vernazza (~1.5h). Castello Doria + obiad z owocami morza. Popoludnie na plazy w Monterosso.',
    tags: ['beach', 'mountain'],
    intensity: 'moderate',
    image: '/trip/images/Monterosso.jpg',
    imageAlt: 'Monterosso al Mare - plaza w Cinque Terre',
    overnight: 'Levanto',
    detailsFile: '04-levanto-12-14.09.md',
    attractions: [
      { name: 'Sentiero Azzurro', desc: 'Monterosso -> Vernazza, ~3.5 km, ~1.5h. Widoki na wybrzeze i winnice', longDesc: 'Najladniejszy odcinek Niebieskiego Szlaku laczacego 5 wiosek. Widoki na strome wybrzeze, tarasy z winnicami i otwarte morze. Umiarkowany - schody i podejscia, ale nie wymaga kondycji gorskiej. Wymaga Cinque Terre Card.', cost: 'Wymaga CT Card', duration: '~3.5 km, ~1.5h', mapsQuery: 'Sentiero Azzurro Cinque Terre' },
      { name: 'Vernazza', desc: 'Castello Doria (1.5 EUR, najlepszy widok na port) + obiad z owocami morza', longDesc: 'Najbardzej klimatyczna wioska Cinque Terre - maly port z sredniowieczna wiezyczka. Castello Doria nad portem to 10 min wejscia z najlepszym widokiem na zatoczke. Najlepsze restauracje z owocami morza w CT - sprobowac trofie al pesto, fritto misto, anchovies.', cost: 'Castello ~1.5 EUR/os', duration: '~2h (zwiedzanie + obiad)', mapsQuery: 'Vernazza Cinque Terre' },
      { name: 'Monterosso al Mare', desc: 'Najlepsza piasczysta plaza w Cinque Terre', longDesc: 'Najwieksza i najstarsza z 5 wiosek - jedyna z prawdziwa duza piasczysta plaza. Lezaki + parasol ~15-20 EUR za zestaw, albo darmowa czesc plazy z wlasnym recznikiem. Stare miasto tez warte spaceru po plazowaniu.', cost: 'Lezaki ~15-20 EUR/zestaw', duration: '3h plazowanie', mapsQuery: 'Monterosso al Mare beach' },
    ],
    tips: [
      'Sprawdzic status Sentiero Azzurro na cinqueterre.eu tydzien przed i rano - bywa zamykany po deszczach',
      'W Vernazza sprobowac: trofie al pesto, fritto misto, anchovies',
      'Lezaki + parasol na plazy w Monterosso ~15-20 EUR za zestaw, albo darmowa czesc z wlasnym recznikiem',
    ],
    funFacts: [
      'Sentiero Azzurro (Niebieski Szlak) biegnie wzdluz calego wybrzeza CT - laczy 5 wiosek na 12 km',
      'Monterosso to najwieksza i najstarsza z 5 wiosek - jedyna z prawdziwa piasczysta plaza',
    ],
  },
  {
    day: 10, date: '15.09', weekday: 'WT',
    title: 'Cinque Terre -> Toskania',
    route: '200 km | ~2.5h',
    desc: 'Spacer po San Gimignano - "sredniowieczny Manhattan" z 14 wiezami. Degustacja wina Vernaccia w twierdzy La Rocca.',
    tags: ['city', 'drive'],
    intensity: 'moderate',
    image: '/trip/images/Gimignano.jpg',
    imageAlt: 'San Gimignano - sredniowieczne wieze w Toskanii',
    overnight: 'San Gimignano / Toskania (baza na 3 noce)',
    detailsFile: '05-san-gimignano-15-17.09.md',
    attractions: [
      { name: 'San Gimignano', desc: '14 sredniowiecznych wiez, Piazza della Cisterna, Gelateria Dondoli', longDesc: 'Sredniowieczny Manhattan - kiedys 72 wieze, zostalo 14. Kazda rodzina budowala wyzsza od sasiada jako symbol prestizu. Piazza della Cisterna (trojkatny plac z XIII-wieczna studnia), Duomo z freskami, Torre Grossa z panorama na cala Toskanie. Gelateria Dondoli na glownym placu to wielokrotny mistrz swiata gelato.', cost: 'Torre Grossa ~9 EUR/os', duration: '3-4h', mapsQuery: 'San Gimignano' },
      { name: 'Vernaccia Wine Experience', desc: 'Degustacja bialego wina w twierdzy La Rocca z widokiem', longDesc: 'Degustacja lokalnego bialego wina Vernaccia di San Gimignano - najstarszego wloskiego wina z certyfikatem DOCG (od 1966). W twierdzy La Rocca na wzgorzu nad miastem, z widokiem na toskanskie wzgorza. Idealne na zakonczenie dnia.', duration: '~1h', mapsQuery: 'Vernaccia di San Gimignano Wine Experience' },
    ],
    tips: [
      'Parking poza murami miasta - do centrum 5-10 min spaceru',
      'Gelateria Dondoli na Piazza della Cisterna - wielokrotnie nagradzane lody, warto stac w kolejce',
      'Torre Grossa (~9 EUR) - jedyna wieza do zwiedzania, panorama na cala Toskanie',
    ],
    funFacts: [
      'San Gimignano mialo kiedys 72 wieze - zostalo 14. Kazda rodzina budowala wyzsza od sasiada',
      'Vernaccia di San Gimignano to najstarsze wloskie biale wino z certyfikatem DOCG (od 1966)',
      'Dante Alighieri odwiedzil San Gimignano w 1300 r. jako ambasador Florencji',
    ],
  },
  {
    day: 11, date: '16.09', weekday: 'SR',
    title: 'Toskania - Volterra, Pienza i Val d\'Orcia',
    route: '~200 km petla',
    desc: 'Volterra rano - etruskie miasto z panoramami. Pienza popoludniu - idealne miasto renesansu. Val d\'Orcia o zachodzie slonca.',
    tags: ['city'],
    intensity: 'active',
    image: '/trip/images/Siena.jpg',
    imageAlt: 'Toskania - Val d\'Orcia',
    overnight: 'San Gimignano / Toskania',
    detailsFile: '05-san-gimignano-15-17.09.md',
    attractions: [
      { name: 'Volterra', desc: 'Etruskie miasto (800 p.n.e.!), Teatro Romano, Balze - klify erozyjne', longDesc: 'Jedno z najstarszych miast w Toskanii - Etruskowie zalozyli je ok. 800 p.n.e. Piazza dei Priori z najstarszym ratuszem w Toskanii, ruiny rzymskiego Teatro Romano, i Balze - spektakularne klify erozyjne na skraju miasta. Slynie tez z lokalnego rzemiosla alabastrowego. Mniej turystow niz San Gimignano - bardziej autentyczne.', duration: '2-2.5h', mapsQuery: 'Volterra Italy' },
      { name: 'Pienza', desc: 'Idealne miasto renesansu (UNESCO). Widok na Val d\'Orcia, pecorino', longDesc: 'Jedyne "idealne miasto" renesansu w Europie - zaprojektowane od zera przez papieza Piusa II w XV w. Corso Rossellino (glowna ulica) z katedra i palazzo. Widok na Val d\'Orcia z murow to ikoniczny krajobraz Toskanii. Koniecznie sprobowac pecorino di Pienza - slynny ser owczy, degustacja w sklepikach.', duration: '1.5-2h', mapsQuery: 'Pienza Italy' },
      { name: 'Val d\'Orcia (SP146)', desc: 'Ikoniczny krajobraz Toskanii - wzgorza, cyprysy. Najlepsze swiatlo o zachodzie!', longDesc: 'Droga SP146 z Pienzy do Montalcino przez najslynniejszy krajobraz Toskanii - lagodne wzgorza, samotne cyprysy, wiejskie drogi. To te widoki z kazdego przewodnika po Wloszech. Mozliwosc zatrzymania sie na zdjecia. Najlepsze swiatlo popoludniu i o zachodzie slonca (~19:15) - zlociste wzgorza.', duration: '~1h przejazd z przystankami', mapsQuery: 'Val d\'Orcia' },
    ],
    tips: [
      'Volterra rano, Pienza popoludniu - idealny podzial swiatla do zdjec',
      'W Pienzy sprobowac pecorino di Pienza - slynny ser owczy, degustacja w sklepikach na Corso Rossellino',
      'Przejazd SP146 przez Val d\'Orcia o zachodzie slonca (~19:15) - zlociste wzgorza z cyprysami',
    ],
    funFacts: [
      'Volterra to jedno z najstarszych miast w Toskanii - Etruskowie zalozyli je ok. 800 p.n.e.',
      'Pienza zostala zaprojektowana jako "idealne miasto" przez papieza Piusa II w XV w. - jedyne takie w Europie',
      'Val d\'Orcia jest na liscie UNESCO - to ten krajobraz z cyprysami, ktory kojarzy sie z Toskania',
    ],
  },
  {
    day: 12, date: '17.09', weekday: 'CZ',
    title: 'Toskania - Siena i Monteriggioni',
    route: '~40 km do Sieny',
    desc: 'Siena na spokojnie: Piazza del Campo, Duomo, Torre del Mangia. Monteriggioni po drodze. Relaks i pakowanie wieczorem.',
    tags: ['city'],
    intensity: 'moderate',
    image: '/trip/images/Tuscany.jpg',
    imageAlt: 'Toskania - wzgorza z cyprysami',
    overnight: 'San Gimignano / Toskania',
    detailsFile: '05-san-gimignano-15-17.09.md',
    attractions: [
      { name: 'Siena - Piazza del Campo', desc: 'Muszlowy plac, miejsce wyscigow Palio. Torre del Mangia (400 schodow)', longDesc: 'Jeden z najpiekniejszych placow na swiecie - w ksztalcie muszli, opadajacy ku ratuszowi. Dwa razy w roku (lipiec i sierpien) odbywa sie tu Palio - wyscig konny z tradycja od 1633 r. Torre del Mangia (102m, 400 schodow) oferuje panorame na cala Siene i okolice - warto wejsc!', cost: 'Torre ~10 EUR/os', duration: '2-3h z wieza', mapsQuery: 'Piazza del Campo Siena' },
      { name: 'Duomo di Siena', desc: 'Jedna z najladniejszych katedr we Wloszech, marmurowa posadzka', longDesc: 'Gotyko-romansko katedra z fasada z bialego i zielonego marmuru. Wnetrze zapiera dech - 56 marmurowych paneli posadzkowych (odslanianych od pol. sierpnia do konca pazdziernika - trafiacie idealnie!). Kazateelnica Nicoli Pisano, freski Pinturicchia w Bibliotece Piccolomini.', duration: '~1h', mapsQuery: 'Duomo di Siena' },
      { name: 'Monteriggioni', desc: 'Sredniowieczna wioska otoczona murami obronnymi', longDesc: 'Sredniowieczna wioska calkowicie otoczona murami obronnymi z 14 wiezami - Dante wspominal ja w Boskiej Komedii, porownujac wieze do olbrzymow strzegacych piekla. Spacer po murach (~4 EUR) i po malym placu wewnatrz. Kameralne - 20-30 min wystarczy.', cost: 'Mury ~4 EUR/os', duration: '20-30 min', mapsQuery: 'Monteriggioni' },
    ],
    tips: [
      'Siena na spokojnie - wiecej czasu na Duomo, Torre del Mangia i spacer',
      'Torre del Mangia: 400 schodow, ~10 EUR - panorama warta wysilku',
      'Monteriggioni po drodze powrotnej - 20-30 min wystarczy',
      'Wieczorem pakowanie - jutro dlugi dzien powrotny!',
    ],
    funFacts: [
      'Na Piazza del Campo odbywa sie Palio - wyscig konny z tradycja od 1633 r., 2x w roku',
      'Posadzka Duomo di Siena to 56 marmurowych paneli - odslanianych od polowy sierpnia do konca pazdziernika. Trafiacie idealnie!',
      'Monteriggioni pojawia sie w Boskiej Komedii Dantego - porownuje wieze do olbrzymow strzegacych piekla',
    ],
  },
  {
    day: 13, date: '18.09', weekday: 'PT',
    title: 'Toskania -> Wroclaw',
    route: '1300 km | ~13-16h',
    desc: 'Dlugi dzien powrotny. 3 kierowcow, zmiana co ~4.5h. Przystanek w Parmie na obiad - parmezan, prosciutto, tortelli.',
    tags: ['drive'],
    intensity: 'intense',
    image: '/trip/images/road.jpg',
    imageAlt: 'Road trip - droga przez Alpy',
    overnight: 'Wroclaw (u znajomych)',
    detailsFile: '06-powrot-18-19.09.md',
    attractions: [
      { name: 'Parma', desc: 'Przystanek na obiad: Prosciutto di Parma, Parmigiano, tortelli d\'erbetta', longDesc: 'Stolica wloskiego jedzenia - Prosciutto di Parma i Parmigiano Reggiano to znaki towarowe chronione prawem UE. Przystanek na 1-1.5h na obiad w prosciutterii lub trattori w centrum. Must try: Prosciutto di Parma, Parmigiano Reggiano, tortelli d\'erbetta. Jesli czas pozwala - Piazza del Duomo (10 min spacer).', duration: '1-1.5h na obiad', mapsQuery: 'Parma Italy center' },
    ],
    tips: [
      'Wyjazd o 7:00 rano - kazda godzina opoznienia = przyjazd po polnocy',
      '3 kierowcow, zmiana co ~4.5h. Jesli kierowca czuje zmeczenie - natychmiastowa zmiana!',
      'Plan B: jesli o 17-18:00 zmeczenie - nocleg w Monachium/Regensburgu',
      'Sprawdzic waznosc winiet czeskiej i austriackiej - moze trzeba kupic drugie!',
    ],
    funFacts: [
      'Parma to stolica wloskiego jedzenia - Prosciutto di Parma i Parmigiano Reggiano to znaki towarowe chronione prawem UE',
      'Przejezdzacie obok Brenneru (1370m) - najwazniejszej przeleczy alpejskiej, uzywanej od czasow rzymskich',
    ],
  },
  {
    day: 14, date: '19.09', weekday: 'SB',
    title: 'Wroclaw -> Gdansk',
    route: '460 km | ~5h',
    desc: 'Spokojny poranek we Wroclawiu, pozegnanie z para wroclawska. Wyjazd po obiedzie, przyjazd do Gdanska wieczorem.',
    tags: ['drive'],
    intensity: 'chill',
    image: '/trip/images/gdansk.jpg',
    imageAlt: 'Gdansk - powrot do domu',
    detailsFile: '06-powrot-18-19.09.md',
    attractions: [],
    tips: [
      'Spokojny poranek - odpoczynek po wczorajszym maratonie',
      'Rozliczenie kosztow tripu przed wyjazdem - latwiej na swiezo',
    ],
    funFacts: [
      'Lacznie przejechaliscie ~3500 km, odwiedziliscie 4 kraje i zobaczyliscie Alpy, Dolomity, morze i toskanskie wzgorza',
    ],
  },
];