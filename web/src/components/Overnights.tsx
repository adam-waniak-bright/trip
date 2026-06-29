import { useMemo, useState } from 'react';
import {
  overnights,
  ACCOMMODATION_LABELS,
  ACCOMMODATION_COLORS,
  type AccommodationType,
} from '../data';

type Filter = AccommodationType | 'all';

export function Overnights() {
  const [filter, setFilter] = useState<Filter>('all');

  // Typy faktycznie wystepujace w danych (bez 'prywatnie' - nie filtrujemy noclegow u znajomych)
  const availableTypes = useMemo(() => {
    const set = new Set<AccommodationType>();
    overnights.forEach(loc => loc.options.forEach(o => set.add(o.type)));
    set.delete('prywatnie');
    return (Object.keys(ACCOMMODATION_LABELS) as AccommodationType[]).filter(t => set.has(t));
  }, []);

  // Lokalizacje z opcjami przefiltrowanymi wg typu; puste lokalizacje znikaja
  const visibleLocations = useMemo(() => {
    if (filter === 'all') return overnights;
    return overnights
      .map(loc => ({ ...loc, options: loc.options.filter(o => o.type === filter) }))
      .filter(loc => loc.options.length > 0);
  }, [filter]);

  const totalNights = overnights.reduce((sum, loc) => sum + loc.nights, 0);
  const freeNights = overnights
    .filter(loc => loc.options.every(o => o.type === 'prywatnie'))
    .reduce((sum, loc) => sum + loc.nights, 0);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Noclegi</h1>
        <p className="text-stone-500 mt-2">
          {overnights.length} lokalizacji, {totalNights} nocy ({freeNights} za darmo u znajomych)
        </p>
      </div>

      {/* Filtr wg typu obiektu */}
      <div className="flex justify-center gap-1 flex-wrap">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          Wszystkie
        </FilterButton>
        {availableTypes.map(type => (
          <FilterButton key={type} active={filter === type} onClick={() => setFilter(type)}>
            {ACCOMMODATION_LABELS[type]}
          </FilterButton>
        ))}
      </div>

      {visibleLocations.map(location => (
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-stone-800">{option.name}</span>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${ACCOMMODATION_COLORS[option.type]}`}
                      >
                        {ACCOMMODATION_LABELS[option.type]}
                      </span>
                    </div>
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

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
        active ? 'bg-amber-100 text-amber-800' : 'text-stone-500 hover:bg-stone-100'
      }`}
    >
      {children}
    </button>
  );
}