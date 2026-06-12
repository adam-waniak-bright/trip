import { config } from '../data';

export function Budget() {
  return (
    <section className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
      <h2 className="text-lg font-bold text-stone-900 mb-4">Budzet (4 osoby)</h2>

      <div className="space-y-2 mb-4">
        {config.budget.map(b => (
          <div key={b.label} className="flex justify-between text-sm">
            <span className="text-stone-500">{b.label}</span>
            <span className="text-stone-800">{b.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-stone-200 pt-3 space-y-1">
        <div className="flex justify-between font-bold text-amber-700">
          <span>Razem</span>
          <span>{config.budgetTotal}</span>
        </div>
        <div className="flex justify-between font-bold text-amber-700">
          <span>Na osobe</span>
          <span>{config.budgetPerPerson}</span>
        </div>
      </div>

      {/* Overnights table */}
      <h3 className="text-sm uppercase tracking-widest text-stone-400 font-medium mt-6 mb-3">Noclegi</h3>
      <div className="space-y-2">
        {config.overnights.map(o => (
          <div key={o.dates} className="flex items-baseline gap-3 text-sm">
            <span className="text-amber-700 font-mono text-xs w-16 shrink-0">{o.dates}</span>
            <span className="text-stone-700 flex-1">{o.place}</span>
            <span className="text-stone-400 text-xs">{o.cost}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
