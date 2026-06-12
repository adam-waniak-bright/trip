import { useState } from 'react';
import { DayCard } from './components/DayCard';
import { Budget } from './components/Budget';
import { Overnights } from './components/Overnights';
import { config, days } from './data';

type Page = 'plan' | 'overnights';

export default function App() {
  const [page, setPage] = useState<Page>('plan');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Header */}
      <header className="bg-white px-6 pt-8 pb-4 text-center border-b border-stone-200 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">{config.title}</h1>
        <p className="text-amber-700 mt-2 text-lg">{config.subtitle}</p>

        {/* Summary */}
        <div className="flex justify-center gap-8 mt-6 flex-wrap">
          {config.summary.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-amber-700">{s.value}</div>
              <div className="text-[11px] uppercase tracking-widest text-stone-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="flex justify-center gap-1 mt-6">
          <button
            onClick={() => setPage('plan')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
              page === 'plan'
                ? 'bg-amber-100 text-amber-800'
                : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            Plan podrozy
          </button>
          <button
            onClick={() => setPage('overnights')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
              page === 'overnights'
                ? 'bg-amber-100 text-amber-800'
                : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            Noclegi
          </button>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {page === 'plan' && (
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=16IQuqpejq6fe-leaWg6lxkww4-XdOP0&hl=en&ehbc=2E312F"
                className="w-full h-[480px]"
                title="Mapa trasy"
                loading="lazy"
              />
            </div>

            {/* Days */}
            {days.map(day => (
              <DayCard key={day.day} day={day} />
            ))}

            <Budget />
          </div>
        )}

        {page === 'overnights' && <Overnights />}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-stone-400 text-sm border-t border-stone-200">
        Road Trip 2026 | 5-19 wrzesien
      </footer>
    </div>
  );
}
