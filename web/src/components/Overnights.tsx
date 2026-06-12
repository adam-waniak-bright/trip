interface OvernightOption {
  name: string;
  type: string;
  price: string;
  url: string;
  note?: string;
}

interface OvernightLocation {
  dates: string;
  place: string;
  nights: number;
  confirmed?: boolean;
  options: OvernightOption[];
}

const overnights: OvernightLocation[] = [
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
        type: 'camping / glamping',
        price: '~45-80 EUR / noc',
        url: 'https://www.booking.com/hotel/at/park-am-see.html',
        note: 'Odnowione wagony, restauracja, sauna, plaza prywatna',
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
    ],
  },
  {
    dates: '13-14.09',
    place: 'Levanto (Cinque Terre)',
    nights: 2,
    options: [
      {
        name: 'Apartament w centrum Levanto',
        type: 'apartament (Booking/Airbnb)',
        price: '~80-130 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Levanto&group_adults=4&checkin=2026-09-13&checkout=2026-09-15',
        note: 'Szukac z kuchnia, 2 sypialnie, 4 osoby. Levanto tansze niz wioski CT',
      },
      {
        name: 'Resort Costa Morroni',
        type: 'apartament 4 os.',
        price: '~90-140 EUR / noc',
        url: 'https://www.booking.com/searchresults.html?ss=Costa+Morroni+Levanto',
        note: 'Apartamenty na wzgorzu, basen, widok na morze',
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

export function Overnights() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Noclegi</h1>
        <p className="text-stone-500 mt-2">7 lokalizacji, 14 nocy (2 za darmo u znajomych)</p>
      </div>

      {overnights.map(location => (
        <section
          key={location.dates}
          className={`bg-white rounded-xl border shadow-sm p-6 ${
            location.confirmed ? 'border-emerald-300' : 'border-stone-200'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">{location.place}</h2>
              <p className="text-sm text-stone-500">
                {location.dates} | {location.nights} {location.nights === 1 ? 'noc' : location.nights < 5 ? 'noce' : 'nocy'}
              </p>
            </div>
            {location.confirmed && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                Potwierdzone
              </span>
            )}
            {!location.confirmed && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                Do zarezerwowania
              </span>
            )}
          </div>

          <div className="space-y-3">
            {location.options.map(option => (
              <div
                key={option.name}
                className={`rounded-lg p-4 ${
                  location.confirmed ? 'bg-emerald-50' : 'bg-stone-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-stone-800">{option.name}</div>
                    <div className="text-xs text-stone-400 mt-0.5">{option.type}</div>
                    {option.note && (
                      <p className="text-sm text-stone-600 mt-1">{option.note}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold text-amber-700 text-sm">{option.price}</div>
                    {option.url && (
                      <a
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                      >
                        Rezerwuj
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
