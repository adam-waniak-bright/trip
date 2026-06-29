# Noclegi: typy obiektów, filtr i rozdzielenie danych od prezentacji

Data: 2026-06-29

## Cel

Ulepszyć istniejący tab "Noclegi" (`web/src/components/Overnights.tsx`):

1. **Oddzielić warstwę danych od prezentacji** — przenieść zaszyte na sztywno dane
   noclegów z komponentu do `web/src/data.ts` (jak `days`, `config`).
2. **Oznaczyć każdą opcję typem obiektu** (camping, apartament, hotel, glamping,
   domek, prywatnie) — kolorowy badge.
3. **Dodać filtr wg typu obiektu** u góry widoku.
4. **Dodać więcej opcji noclegowych** do każdej płatnej lokalizacji, z miksem typów
   pokazującym rozrzut cenowy (camping → apartament → hotel/glamping).
5. Linki rezerwacyjne zostają jak są (przycisk "Rezerwuj" → strona obiektu /
   wyszukiwarka Booking dla miejscowości).

## Architektura

Reszta aplikacji trzyma dane w `data.ts`; noclegi to wyjątek (dane zaszyte w
komponencie). Wyrównujemy to do istniejącego wzorca.

- Interfejsy `OvernightOption`, `OvernightLocation` oraz tablica `overnights`
  przenoszą się do `data.ts`.
- Nowy typ `AccommodationType` z mapami etykiet i kolorów — analogicznie do
  istniejących `TAG_LABELS` / `TAG_COLORS`.
- `Overnights.tsx` importuje dane z `data.ts` i odpowiada **tylko** za render +
  logikę filtra.

## Model danych (w `data.ts`)

```ts
export type AccommodationType =
  | 'camping' | 'apartament' | 'hotel' | 'glamping' | 'domek' | 'prywatnie';

export const ACCOMMODATION_LABELS: Record<AccommodationType, string> = {
  camping: 'Camping', apartament: 'Apartament', hotel: 'Hotel',
  glamping: 'Glamping', domek: 'Domek', prywatnie: 'Prywatnie',
};

export const ACCOMMODATION_COLORS: Record<AccommodationType, string> = {
  camping:    'bg-emerald-100 text-emerald-700',
  apartament: 'bg-sky-100 text-sky-700',
  hotel:      'bg-violet-100 text-violet-700',
  glamping:   'bg-amber-100 text-amber-700',
  domek:      'bg-lime-100 text-lime-700',
  prywatnie:  'bg-stone-100 text-stone-500',
};

export interface OvernightOption {
  name: string;
  type: AccommodationType;   // było: string — teraz zamknięty union
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

export const overnights: OvernightLocation[] = [ /* ... */ ];
```

Migracja istniejących wpisów: złożone wartości `type` (`'camping / glamping'`,
`'apartament 4 os.'`, `'apartament (Booking/Airbnb)'`) mapujemy na jeden główny typ
(`glamping`, `apartament`), a dodatkowy kontekst trafia do `note`.

## Rozbudowa danych — więcej opcji na lokalizację

Każda płatna lokalizacja ma mieć mix typów (rozrzut cenowy). Wrocław (5.09, 18.09)
zostaje "u znajomych" (`prywatnie`).

- **Hallstatt / Obertraun (6-7.09)** — obecne 3 campingi + apartament w Hallstatt +
  hotel/Gasthof.
- **Brixen / Val di Funes (8-11.09)** — obecny camping + 2 apartamenty + hotel/pensjonat
  w Brixen + glamping/domek.
- **Bardolino / Garda (12.09)** — obecne 3 campingi + apartament nad jeziorem + hotel.
- **Levanto (13-14.09)** — obecne 2 apartamenty + camping w okolicy + hotel.
- **San Gimignano (15-17.09)** — wybrany camping (potwierdzony) zostaje pierwszy +
  2-3 alternatywy (agriturismo/apartament, hotel) jako opcje zapasowe.

Zastrzeżenie: propozycje są realistyczne, ale **nieweryfikowane** (nazwy/ceny
przybliżone; linki często do wyszukiwarki Booking, nie konkretnej rezerwacji) —
zgodnie z konwencją już obecną w `data.ts`.

## Prezentacja + filtr (`Overnights.tsx`)

**Filtr wg typu:**
- Przyciski: `Wszystkie` + po jednym na każdy typ faktycznie występujący w danych
  (camping, apartament, hotel, glamping, domek). Typ `prywatnie` pomijany w filtrze.
- Stan: `useState<AccommodationType | 'all'>('all')`.
- Wybór typu → w każdej lokalizacji widoczne tylko opcje tego typu; lokalizacje bez
  pasującej opcji są ukrywane (Wrocław "u znajomych" znika przy każdym filtrze poza
  "Wszystkie" — to OK).
- Styl przycisków jak nawigacja w `App.tsx`: aktywny `bg-amber-100 text-amber-800`,
  nieaktywny `text-stone-500 hover:bg-stone-100`.

**Etykieta typu na opcji:**
- Badge z `ACCOMMODATION_LABELS[type]`, kolor z `ACCOMMODATION_COLORS[type]`, obok
  nazwy obiektu (zastępuje obecny szary tekst `option.type`).

**Layout:** karty lokalizacji, statusy "Potwierdzone"/"Do zarezerwowania", przycisk
"Rezerwuj" — bez zmian. Podpis pod nagłówkiem liczony dynamicznie z danych
(liczba lokalizacji / nocy), zamiast zaszytego "7 lokalizacji".

## Testowanie

Projekt nie ma testów (Vite + React, brak runnera). Weryfikacja:
- `npm run build` (tsc + vite build) przechodzi bez błędów typów.
- `npm run lint` bez błędów.
- Wizualny sprawdz: tab Noclegi renderuje opcje z badge'ami, filtr przełącza typy,
  lokalizacje bez pasujących opcji znikają.