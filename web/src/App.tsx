import { DayCard } from './components/DayCard';
import { Budget } from './components/Budget';
import { config, days } from './data';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-10 text-center border-b border-slate-800">
        <h1 className="text-4xl font-bold tracking-tight text-white">{config.title}</h1>
        <p className="text-blue-300 mt-2 text-lg">{config.subtitle}</p>

        {/* Summary */}
        <div className="flex justify-center gap-8 mt-6 flex-wrap">
          {config.summary.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-blue-400">{s.value}</div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Map */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-2">
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=16IQuqpejq6fe-leaWg6lxkww4-XdOP0&hl=en&ehbc=2E312F"
            className="w-full h-[480px]"
            title="Mapa trasy"
            loading="lazy"
          />
        </div>
      </section>

      {/* Days */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {days.map(day => (
          <DayCard key={day.day} day={day} />
        ))}

        <Budget />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-600 text-sm border-t border-slate-800">
        Road Trip 2026 | 5-19 wrzesien
      </footer>
    </div>
  );
}