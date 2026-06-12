import { TAG_LABELS, TAG_COLORS, getGoogleMapsUrl, type DayPlan } from '../data';

export function DayCard({ day }: { day: DayPlan }) {
  return (
    <section className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-colors">
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={day.image}
          alt={day.imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-900/80 text-blue-300 backdrop-blur-sm">
              Dzien {day.day} | {day.date} ({day.weekday})
            </span>
            {day.overnight && (
              <span className="text-xs px-2.5 py-1 rounded bg-slate-900/80 text-slate-400 backdrop-blur-sm">
                Nocleg: {day.overnight}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-white">{day.title}</h2>
          <p className="text-sm text-slate-300">{day.route}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-slate-300 leading-relaxed mb-4">{day.desc}</p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {day.tags.map(tag => (
            <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-medium ${TAG_COLORS[tag]}`}>
              {TAG_LABELS[tag]}
            </span>
          ))}
        </div>

        {/* Attractions */}
        {day.attractions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-widest text-slate-500 font-medium">Atrakcje</h3>
            {day.attractions.map(attraction => (
              <div key={attraction.name} className="flex items-start gap-3 group">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-blue-200">{attraction.name}</div>
                  <p className="text-sm text-slate-400 mt-0.5">{attraction.desc}</p>
                </div>
                <a
                  href={getGoogleMapsUrl(attraction)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 mt-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  title={`Otworz ${attraction.name} w Google Maps`}
                >
                  Maps
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}