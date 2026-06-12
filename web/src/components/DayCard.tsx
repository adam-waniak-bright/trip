import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TAG_LABELS, TAG_COLORS, INTENSITY_CONFIG, getGoogleMapsUrl, type DayPlan } from '../data';

/** Extract the section for a specific day from a multi-day markdown file */
function extractDaySection(markdown: string, dayNumber: number): string {
  const lines = markdown.split('\n');
  const dayHeader = `## Dzien ${dayNumber} |`;
  const startIndex = lines.findIndex(l => l.startsWith(dayHeader));
  if (startIndex === -1) return markdown;

  let endIndex = lines.length;
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ') || lines[i].startsWith('---')) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex, endIndex).join('\n');
}

const fileCache = new Map<string, string>();

export function DayCard({ day }: { day: DayPlan }) {
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expanded && !details && day.detailsFile) {
      const cached = fileCache.get(day.detailsFile);
      if (cached) {
        setDetails(extractDaySection(cached, day.day));
        return;
      }
      setLoading(true);
      fetch(`/trip/dni/${day.detailsFile}`)
        .then(r => r.text())
        .then(text => {
          fileCache.set(day.detailsFile!, text);
          setDetails(extractDaySection(text, day.day));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [expanded, details, day.detailsFile, day.day]);

  return (
    <section className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-white/90 text-amber-800 backdrop-blur-sm">
                Dzien {day.day} | {day.date} ({day.weekday})
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded backdrop-blur-sm ${INTENSITY_CONFIG[day.intensity].color}`}>
                {INTENSITY_CONFIG[day.intensity].icon} {INTENSITY_CONFIG[day.intensity].label}
              </span>
              {day.overnight && (
                <span className="text-xs px-2.5 py-1 rounded bg-white/80 text-stone-600 backdrop-blur-sm">
                  Nocleg: {day.overnight}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white drop-shadow-md">{day.title}</h2>
            <p className="text-sm text-white/80 drop-shadow">{day.route}</p>
          </div>
          {/* Expand indicator */}
          {day.detailsFile && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-600">
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
          <p className="text-stone-600 leading-relaxed mb-4">{day.desc}</p>

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
              <h3 className="text-sm uppercase tracking-widest text-stone-400 font-medium">Atrakcje</h3>
              {day.attractions.map(attraction => (
                <div key={attraction.name} className="flex items-start gap-3 group">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-stone-800">{attraction.name}</div>
                    <p className="text-sm text-stone-500 mt-0.5">{attraction.desc}</p>
                  </div>
                  <a
                    href={getGoogleMapsUrl(attraction)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="shrink-0 mt-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                    title={`Otworz ${attraction.name} w Google Maps`}
                  >
                    Maps
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Day page link + click hint */}
          <div className="flex items-center justify-between mt-4">
            <a
              href={`#/day/${day.day}`}
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              Zobacz dzien
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            {day.detailsFile && !expanded && (
              <p className="text-xs text-stone-400">Kliknij karte aby rozwinac</p>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-stone-200 p-5 bg-stone-50">
          {loading && <p className="text-stone-400 text-sm">Ladowanie...</p>}
          {details && (
            <div className="prose prose-stone prose-sm max-w-none
              prose-headings:text-stone-800 prose-headings:font-semibold
              prose-h2:text-base prose-h2:mt-4 prose-h2:mb-2
              prose-h3:text-sm prose-h3:text-stone-500 prose-h3:uppercase prose-h3:tracking-wider prose-h3:mt-4
              prose-h4:text-sm prose-h4:text-stone-700 prose-h4:mt-3
              prose-p:text-stone-600 prose-p:leading-relaxed
              prose-li:text-stone-600 prose-li:marker:text-stone-400
              prose-strong:text-stone-800
              prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline
              prose-table:w-full
              prose-th:text-left prose-th:text-stone-500 prose-th:font-medium prose-th:border-stone-300 prose-th:px-3 prose-th:py-2 prose-th:bg-stone-100
              prose-td:border-stone-200 prose-td:text-stone-600 prose-td:px-3 prose-td:py-2
            ">
              <Markdown remarkPlugins={[remarkGfm]}>{details}</Markdown>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
