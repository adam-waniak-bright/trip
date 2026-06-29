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
}

export interface OvernightLocation {
  dates: string;
  place: string;
  nights: number;
  confirmed?: boolean;
  options: OvernightOption[];
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
    options: [
      {
        name: 'Camping Klausner-Holl',
        type: 'camping',
        price: '~106 EUR / 2 noce (2 os.)',
        url: 'https://camping.hallstatt.net/',
        note: 'Bezposrednio w Hallstatt, nad jeziorem',
      },
      {
        name: 'Camping am See',
        type: 'camping',
        price: '~25-35 EUR / noc',
        url: 'https://www.obertraun.net/unterkunftsverzeichnis/camping/obertraun/camping-am-see/',
        note: '70 miejsc, prywatna plaza, u stop Dachstein',
      },
      {
        name: 'Park am See',
        type: 'glamping',
        price: '~45-80 EUR / noc',
        url: 'https://www.booking.com/hotel/at/park-am-see.html',
        note: 'Odnowione wagony, restauracja, sauna, plaza prywatna',
      },
      {
        name: 'Apartament w Hallstatt',
        type: 'apartament',
        price: '~90-140 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Hallstatt&group_adults=4&checkin=2026-09-06&checkout=2026-09-08',
        note: 'Z kuchnia, 4 osoby - szukac z widokiem na jezioro',
      },
      {
        name: 'Gasthof / hotel w Obertraun',
        type: 'hotel',
        price: '~110-160 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Obertraun&group_adults=4&checkin=2026-09-06&checkout=2026-09-08',
        note: 'Sniadanie w cenie, parking, blisko kolejki Dachstein',
      },
    ],
  },
  {
    dates: '8-11.09',
    place: 'Brixen / Val di Funes',
    nights: 4,
    options: [
      {
        name: 'Camping Brixen',
        type: 'camping',
        price: '~25-35 EUR / noc',
        url: 'https://www.bookingsuedtirol.com/en/bressanonebrixen/camping',
        note: 'Campingi w okolicach Brixen',
      },
      {
        name: 'Living Puez (Val di Funes)',
        type: 'apartament',
        price: '~70-100 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Val+di+Funes',
        note: 'Apartament z kuchnia, widok na gory, parking',
      },
      {
        name: 'MiraOdle Apartments (Villnoss)',
        type: 'apartament',
        price: '~80-120 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Villnoss+Val+di+Funes',
        note: 'Ogrod, taras, widok na Odle, parking i WiFi',
      },
      {
        name: 'Garni / pensjonat w Brixen',
        type: 'hotel',
        price: '~100-150 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Brixen+Bressanone&group_adults=4&checkin=2026-09-08&checkout=2026-09-12',
        note: 'Sniadanie, w centrum Brixen - blisko sklepow i restauracji',
      },
      {
        name: 'Domek / chalet w Villnoss',
        type: 'domek',
        price: '~120-180 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Villnoss+chalet&group_adults=4&checkin=2026-09-08&checkout=2026-09-12',
        note: 'Caly domek dla 4 os., kuchnia, taras z widokiem na Dolomity',
      },
    ],
  },
  {
    dates: '12.09',
    place: 'Bardolino (Jezioro Garda)',
    nights: 1,
    options: [
      {
        name: 'Camping Serenella',
        type: 'camping',
        price: '~30-50 EUR / noc',
        url: 'https://www.gardalake.com/place/camping-serenella-bardolino/',
        note: '2 baseny, nad jeziorem, bar i restauracja',
      },
      {
        name: 'Campeggio San Nicolo',
        type: 'camping',
        price: '~25-40 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Campeggio+San+Nicolo+Bardolino',
        note: 'Nad jeziorem, domki z kuchnia, grill',
      },
      {
        name: 'Camping Cisano & San Vito',
        type: 'camping',
        price: '~35-55 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Camping+Cisano+San+Vito+Bardolino',
        note: 'Prywatna plaza, baseny, boiska - wiekszy i drozszy',
      },
      {
        name: 'Apartament nad jeziorem',
        type: 'apartament',
        price: '~80-130 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Bardolino&group_adults=4&checkin=2026-09-12&checkout=2026-09-13',
        note: 'Z kuchnia, blisko promenady, parking',
      },
      {
        name: 'Hotel w Bardolino',
        type: 'hotel',
        price: '~110-170 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Bardolino+hotel&group_adults=4&checkin=2026-09-12&checkout=2026-09-13',
        note: 'Sniadanie, basen, blisko jeziora - wygoda na 1 noc',
      },
    ],
  },
  {
    dates: '13-14.09',
    place: 'Levanto (Cinque Terre)',
    nights: 2,
    options: [
      {
        name: 'Apartament w centrum Levanto',
        type: 'apartament',
        price: '~80-130 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Levanto&group_adults=4&checkin=2026-09-13&checkout=2026-09-15',
        note: 'Szukac z kuchnia, 2 sypialnie, 4 osoby. Levanto tansze niz wioski CT',
      },
      {
        name: 'Resort Costa Morroni',
        type: 'apartament',
        price: '~90-140 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Costa+Morroni+Levanto',
        note: 'Apartamenty na wzgorzu, basen, widok na morze. 4 os.',
      },
      {
        name: 'Camping Acquadolce (Levanto)',
        type: 'camping',
        price: '~35-60 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Camping+Acquadolce+Levanto',
        note: 'Domki i miejsca namiotowe, ~1 km od plazy Levanto',
      },
      {
        name: 'Hotel w Levanto',
        type: 'hotel',
        price: '~130-190 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Levanto+hotel&group_adults=4&checkin=2026-09-13&checkout=2026-09-15',
        note: 'Sniadanie, blisko dworca (dojazd do wiosek CT)',
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
        name: 'Camping Il Boschetto di Piemma',
        type: 'camping',
        price: '~35-50 EUR / noc',
        url: 'https://www.booking.com/hotel/it/camping-il-boschetto-di-piemma.html',
        note: 'WYBRANY! 2 baseny, restauracja, 2.5 km od San Gimignano. Ocena 8.1 na Booking.',
      },
      {
        name: 'Agriturismo pod San Gimignano',
        type: 'apartament',
        price: '~90-150 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=San+Gimignano+agriturismo&group_adults=4&checkin=2026-09-15&checkout=2026-09-18',
        note: 'Zapas: apartament w toskanskiej winnicy, basen, sniadanie',
      },
      {
        name: 'Hotel w San Gimignano',
        type: 'hotel',
        price: '~130-200 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=San+Gimignano+hotel&group_adults=4&checkin=2026-09-15&checkout=2026-09-18',
        note: 'Zapas: hotel w obrebie murow lub tuz obok, sniadanie',
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
    { label: 'Budzet / os.', value: '~4 550 - 5 550 zl' },
    { label: 'Kraje', value: 'PL CZ AT IT' },
  ],
  budget: [
    { label: 'Paliwo (~3500 km, 7l/100km, ~1.80 EUR/l, kurs ~4.29)', value: '~1 900 zl' },
    { label: 'Winiety / autostrady (CZ 2x, AT 2-mies., Grossglockner, IT bramki)', value: '~1 000 zl' },
    { label: 'Noclegi (13 nocy, mix camping/apartamenty)', value: '~6 000 - 9 000 zl' },
    { label: 'Jedzenie (obiady restauracja + gotowanie)', value: '~5 000 - 6 000 zl' },
    { label: 'Atrakcje / wstepy / kolejki', value: '~2 800 zl' },
    { label: 'Rezerwa', value: '~1 500 zl' },
  ] as BudgetItem[],
  budgetTotal: '~18 200 - 22 200 zl',
  budgetPerPerson: '~4 550 - 5 550 zl',
  overnights: [
    { dates: '5.09', place: 'Wroclaw', nights: 1, type: 'u znajomych', cost: '0 zl' },
    { dates: '6-7.09', place: 'Hallstatt / Obertraun', nights: 2, type: 'camping/apartament', cost: '300-500 zl/noc' },
    { dates: '8-11.09', place: 'Brixen / Val di Funes', nights: 4, type: 'apartament/camping', cost: '300-500 zl/noc' },
    { dates: '12.09', place: 'Lazise / Bardolino (Garda)', nights: 1, type: 'Camping Lido Lazise / apartament', cost: '200-350 zl/noc' },
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
    route: '280 km | caly dzien',
    desc: 'Przejazd najpieksniejsza droga alpejska w Austrii. Widok na lodowiec Pasterze i najwyzszy szczyt Austrii - Grossglockner (3798m). Krotkie szlaki po drodze.',
    tags: ['mountain', 'drive'],
    intensity: 'active',
    image: '/trip/images/Grossglockner.jpg',
    imageAlt: 'Grossglockner High Alpine Road',
    overnight: 'Brixen / Val di Funes (baza na 4 noce)',
    detailsFile: '03-brixen-08-11.09.md',
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
    route: '~120 km petla z bazy',
    desc: 'Rano Lago di Braies (przyjechac przed 9!). Kolejka na Seceda (2519m) - najslynniejszy widok Dolomitow. Kosciolek St. Magdalena w Val di Funes.',
    tags: ['mountain', 'lake'],
    intensity: 'intense',
    image: '/trip/images/Lago di Braies.jpg',
    imageAlt: 'Lago di Braies - turkusowe jezioro z lodkami',
    overnight: 'Brixen / Val di Funes',
    detailsFile: '03-brixen-08-11.09.md',
    attractions: [
      { name: 'Lago di Braies', desc: 'Turkusowe jezioro alpejskie, szlak wokol ~1.5h. Przyjechac przed 9 rano!', longDesc: 'Jedno z najladniejszych jezior w Dolomitach - intensywnie turkusowa woda otoczona skalami. Latwy szlak wokol jeziora (~3.5 km, ~1.5h). Koniecznie przyjechac przed 9 rano - pozniej setki autokarow turystycznych, brak miejsc parkingowych. Parking platny, jesli pelny - dalszy parking z shuttlem.', cost: 'Parking platny', duration: '~1.5h szlak wokol', mapsQuery: 'Lago di Braies' },
      { name: 'Seceda (Ortisei)', desc: 'Grzbiet Odle na 2519m - najslynniejszy widok Dolomitow. Kolejka ~40 EUR/os. Rezerwacja online!', longDesc: 'Skalny grzbiet Odle/Geisler na wysokosci 2519m - prawdopodobnie najczesciej fotografowany widok w Dolomitach. Grzbiet wyglada jak zeby smoka. Kolejka linowa z Ortisei, z gornej stacji 20 min spaceru do punktu widokowego. Od 2026 wymagana rezerwacja online z okienkami czasowymi!', cost: '~40 EUR/os (kolejka w obie strony)', duration: '2-3h (kolejka + spacer)', mapsQuery: 'Seceda Ortisei' },
      { name: 'Val di Funes - St. Magdalena', desc: 'Ikoniczny kosciolek z widokiem na masyw Odle', longDesc: 'Prawdopodobnie najczesciej fotografowany kosciol w Alpach - maly bialy kosciolek na tle poteznego masywu Odle. Spacer po dolinie od Malga Zannes z widokiem na Odle to 1-2h relaksu w pieknym otoczeniu.', duration: '1-2h spacer', mapsQuery: 'Chiesa di Santa Maddalena Val di Funes' },
    ],
    tips: [
      'Lago di Braies: przyjechac PRZED 9 rano! Potem setki autokarow i brak parkingu',
      'Seceda: od 2026 wymagana rezerwacja online z okienkami czasowymi - zarezerwowac PRZED wyjazdem!',
      'Intensywny dzien logistycznie (~120 km petla) - jesli zmeczeni po Braies, pominac Secede',
    ],
    funFacts: [
      'Lago di Braies stalo sie slawne dzieki wloskiemu serialowi "Un passo dal cielo"',
      'Seceda to jeden z najczesciej fotografowanych widokow w Dolomitach - grzbiet Odle wyglada jak zeby smoka',
      'Kosciolek St. Magdalena w Val di Funes to prawdopodobnie najczesciej fotografowany kosciol w Alpach',
    ],
  },
  {
    day: 5, date: '10.09', weekday: 'CZ',
    title: 'Tre Cime di Lavaredo',
    route: '~90 km dojazd + szlak ~10 km, ~4h',
    desc: 'Ikoniczny szlak Dolomitow - petla wokol Tre Cime di Lavaredo (2999m). Dobrze utrzymany, nie wymaga doswiadczenia. Obiad w schronisku z widokiem.',
    tags: ['mountain'],
    intensity: 'active',
    image: '/trip/images/tre-cime.jpg',
    imageAlt: 'Tre Cime di Lavaredo - trzy szczyty Dolomitow',
    overnight: 'Brixen / Val di Funes',
    detailsFile: '03-brixen-08-11.09.md',
    attractions: [
      { name: 'Lago di Antorno', desc: 'Przystanek po drodze (5 min) - Tre Cime w odbiciu wody. Bezplatny!', longDesc: 'Male jezioro przy szosie, 3 km przed Tre Cime (okolice Misurina). W spokojny poranek Tre Cime odbijaja sie w wodzie - swietne zdjecie na poczatek dnia. Bezplatny parking przy drodze, 5 min spaceru.', duration: '5-10 min', mapsQuery: 'Lago Antorno Misurina' },
      { name: 'Tre Cime di Lavaredo', desc: 'Petla ~10 km, ~4h. Start z Rifugio Auronzo (parking ~30 EUR). Nie wymaga doswiadczenia.', longDesc: 'Symbol Dolomitow - petla wokol trzech ikonicznych szczytow (Cima Grande 2999m, Cima Ovest 2973m, Cima Piccola 2857m). Szlak dobrze utrzymany, w stylu drogi do Morskiego Oka - nie wymaga doswiadczenia wysokogorskiego. Start z Rifugio Auronzo (2320m), najwyzszy punkt ~2450m. Po drodze schroniska z jedzeniem i widokami.', cost: 'Parking ~30 EUR/auto', duration: '~10 km, 3.5-4h petla', mapsQuery: 'Tre Cime di Lavaredo' },
      { name: 'Rifugio Locatelli', desc: 'Schronisko z najlepszym widokiem na Tre Cime - obiad!', longDesc: 'Schronisko gorskie polozene naprzeciwko Tre Cime - najlepszy punkt widokowy na cala scianie polnocna. Idealne miejsce na obiad w polowie petli. Serwuja zupy, pasty, strudel. Trzy szczyty widac stad jak na dloni.', duration: 'Przystanek na szlaku', mapsQuery: 'Rifugio Locatelli' },
    ],
    tips: [
      'Start szlaku z Rifugio Auronzo (2320m) - parking ~30 EUR',
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
    overnight: 'Brixen / Val di Funes',
    detailsFile: '03-brixen-08-11.09.md',
    attractions: [
      { name: 'Lake Sorapis', desc: 'Szlak 215 z Passo Tre Croci, ~12 km, ~5h. Turkusowe jezioro w skalnym kotle. Odcinki z linami.', longDesc: 'Turkusowe jezioro w skalnym kotle - kolor wody to efekt zawiesiny dolomitowej, wyglada jak na Karaibach. Szlak 215 z Passo Tre Croci, miejscami z linami stalowymi (nie wymagaja sprzetu ferratowego, ale trzeba uwazac). Trudniejszy z dwoch opcji na ten dzien - wybrac jesli pogoda sloneczna i pelno sil.', duration: '~12 km, ~5h w obie strony', mapsQuery: 'Lago di Sorapis' },
      { name: 'Lago Federa', desc: 'Szlak od Passo Giau, ~8 km, ~3-4h. Latwiejszy, widokowy.', longDesc: 'Widokowy szlak grzbietowy z panorama na Dolomity. Latwiejszy niz Sorapis, ale tez piekny. Przy jeziorze stoi Rifugio Croda da Lago z obiadem i widokiem. Dobra opcja po 2 dniach intensywnych szlakow lub przy chmurach (mniej spektakularny, ale wciaz wart spaceru).', duration: '~8 km, ~3-4h w obie strony', mapsQuery: 'Lago Federa' },
    ],
    tips: [
      'Po 2 dniach szlakow nogi moga byc ciezkie - ocenic sily rano przed wyborem',
      'Slonecznie + duzo sil = Sorapis (mocniejsze wrazenia). Zmeczenie/chmury = Federa (latwiejszy)',
      'Sorapis: odcinki z linami stalowymi - nie wymagaja sprzetu ferratowego, ale trzeba uwazac',
    ],
    funFacts: [
      'Kolor wody Lake Sorapis to efekt zawiesiny dolomitowej - turkusowy jak na Karaibach, ale w gorach',
      'Dolomity zawdzieczaja nazwe francuskiemu geologowi Deodat de Dolomieu, ktory zbadal sklad skal w XVIII w.',
    ],
  },
  {
    day: 7, date: '12.09', weekday: 'SB',
    title: 'Dolomity -> Jezioro Garda',
    route: '200 km | ~3h',
    desc: 'Popoludnie w Sirmione - zamek Scaligero na wodzie, ruiny rzymskie. Wieczor w Bardolino - promenada, wino.',
    tags: ['lake', 'city', 'drive'],
    intensity: 'moderate',
    image: '/trip/images/Garda.jpg',
    imageAlt: 'Sirmione - zamek Scaligero na Jeziorze Garda',
    overnight: 'Camping Lido Lazise / Bardolino',
    detailsFile: '04-bardolino-12.09.md',
    attractions: [
      { name: 'Sirmione', desc: 'Zamek Scaligero (XIII w.) na wodzie, Grotte di Catullo, waskie uliczki', longDesc: 'Polwysep wcinajacy sie w Jezioro Garda z XIII-wiecznym zamkiem Scaligero na wodzie. Na czubku polwyspu ruiny rzymskiej willi Grotte di Catullo (I w. p.n.e.) z pieknymi widokami na jezioro. Waskie uliczki z lodziarniami i sklepami. Wejscie do zamku ~8 EUR.', cost: 'Zamek ~8 EUR/os', duration: '2.5-3h', mapsQuery: 'Sirmione Castle' },
      { name: 'Bardolino', desc: 'Promenada nad jeziorem, lokalne wino Bardolino', longDesc: 'Kameralne miasteczko na wschodnim brzegu Gardy. Dluga promenada nad jeziorem idealna na wieczorny spacer. Znane z lokalnego czerwonego wina Bardolino - warto sprobowac w jednej z enotek na promenadzie.', duration: 'Wieczor', mapsQuery: 'Bardolino Lake Garda' },
    ],
    tips: [
      'Tylko 1 dzien na Garde - realistycznie zmiescicie 1-2 atrakcje, nie wszystkie',
      'Sirmione bliziej Bardolino = lepsza logistyka niz Malcesine',
      'Monte Baldo mozna pominac - macie juz 4 dni gor w Dolomitach',
    ],
    funFacts: [
      'Jezioro Garda to najwieksze jezioro we Wloszech - 370 km2, wieksze niz Malta',
      'Zamek Scaligero w Sirmione to jeden z najlepiej zachowanych zamkow na wodzie we Wloszech',
      'Grotte di Catullo to ruiny rzymskiej willi z I w. p.n.e. - nalezaly (podobno) do poety Katullusa',
    ],
  },
  {
    day: 8, date: '13.09', weekday: 'ND',
    title: 'Garda -> Cinque Terre',
    route: '330 km | ~3.5h',
    desc: 'Trzy wioski popoludniu: Riomaggiore, Manarola, Corniglia. Wieczor na plazy w Levanto.',
    tags: ['beach', 'city', 'drive'],
    intensity: 'active',
    image: '/trip/images/Vernazza.jpg',
    imageAlt: 'Vernazza - kolorowy port w Cinque Terre',
    overnight: 'Levanto',
    detailsFile: '05-levanto-13-14.09.md',
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
    detailsFile: '05-levanto-13-14.09.md',
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
    overnight: 'Camping Il Boschetto di Piemma (baza na 3 noce)',
    detailsFile: '06-san-gimignano-15-17.09.md',
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
    overnight: 'Camping Il Boschetto di Piemma',
    detailsFile: '06-san-gimignano-15-17.09.md',
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
    overnight: 'Camping Il Boschetto di Piemma',
    detailsFile: '06-san-gimignano-15-17.09.md',
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
    detailsFile: '07-powrot-18-19.09.md',
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
    detailsFile: '07-powrot-18-19.09.md',
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