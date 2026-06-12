import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { TAG_LABELS, TAG_COLORS, getGoogleMapsUrl, type DayPlan } from '../data';

export function DayCard({ day }: { day: DayPlan }) {
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expanded && !details && day.detailsFile) {
      setLoading(true);
      fetch(`/trip/dni/${day.detailsFile}`)
        .then(r => r.text())
        .then(text => {
          setDetails(text);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [expanded, details, day.detailsFile]);

  return (
    <section className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-colors">
      {/* Clickable header */}
      <div
        className="cursor-pointer"
        onClick={() => day.detailsFile && setExpanded(!expanded)}
      >
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
          {/* Expand indicator */}
          {day.detailsFile && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-slate-300">
              <svg
                className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>

        {/* Summary content */}
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
                    onClick={e => e.stopPropagation()}
                    className="shrink-0 mt-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    title={`Otworz ${attraction.name} w Google Maps`}
                  >
                    Maps
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Click hint */}
          {day.detailsFile && !expanded && (
            <p className="text-xs text-slate-600 mt-3 text-center">Kliknij aby zobaczyc szczegoly</p>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-slate-800 p-5">
          {loading && <p className="text-slate-500 text-sm">Ladowanie...</p>}
          {details && (
            <div className="prose prose-invert prose-sm max-w-none
              prose-headings:text-blue-200 prose-headings:font-semibold
              prose-h1:text-lg prose-h1:border-b prose-h1:border-slate-700 prose-h1:pb-2
              prose-h2:text-base prose-h2:mt-6
              prose-h3:text-sm prose-h3:text-slate-400 prose-h3:uppercase prose-h3:tracking-wider
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-li:text-slate-300 prose-li:marker:text-slate-600
              prose-strong:text-blue-100
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-table:text-sm
              prose-th:text-slate-400 prose-th:font-medium prose-th:border-slate-700
              prose-td:border-slate-800 prose-td:text-slate-300
            ">
              <Markdown>{details}</Markdown>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
