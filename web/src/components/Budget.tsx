import { config } from '../data';

export function Budget() {
  return (
    <section className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Budzet (4 osoby)</h2>

      <div className="space-y-2 mb-4">
        {config.budget.map(b => (
          <div key={b.label} className="flex justify-between text-sm">
            <span className="text-slate-400">{b.label}</span>
            <span className="text-slate-200">{b.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-3 space-y-1">
        <div className="flex justify-between font-bold text-blue-400">
          <span>Razem</span>
          <span>{config.budgetTotal}</span>
        </div>
        <div className="flex justify-between font-bold text-blue-400">
          <span>Na osobe</span>
          <span>{config.budgetPerPerson}</span>
        </div>
      </div>

      {/* Overnights table */}
      <h3 className="text-sm uppercase tracking-widest text-slate-500 font-medium mt-6 mb-3">Noclegi</h3>
      <div className="space-y-2">
        {config.overnights.map(o => (
          <div key={o.dates} className="flex items-baseline gap-3 text-sm">
            <span className="text-blue-300 font-mono text-xs w-16 shrink-0">{o.dates}</span>
            <span className="text-slate-200 flex-1">{o.place}</span>
            <span className="text-slate-500 text-xs">{o.cost}</span>
          </div>
        ))}
      </div>
    </section>
  );
}