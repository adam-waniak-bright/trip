import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  TAG_LABELS, TAG_COLORS, INTENSITY_CONFIG,
  getGoogleMapsUrl, days, type DayPlan,
} from '../data';

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

function extractScheduleTable(markdown: string): string | null {
  const lines = markdown.split('\n');
  const headerIdx = lines.findIndex(l => l.includes('Godzina') && l.includes('Plan'));
  if (headerIdx === -1) return null;

  const tableLines: string[] = [];
  for (let i = headerIdx; i < lines.length; i++) {
    if (lines[i].startsWith('|')) {
      tableLines.push(lines[i]);
    } else if (tableLines.length > 0) {
      break;
    }
  }
  return tableLines.length > 2 ? tableLines.join('\n') : null;
}

const fileCache = new Map<string, string>();

export function DayPage({ dayNumber, onBack }: { dayNumber: number; onBack: () => void }) {
  const day = days.find(d => d.day === dayNumber);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const prevDay = days.find(d => d.day === dayNumber - 1);
  const nextDay = days.find(d => d.day === dayNumber + 1);

  useEffect(() => {
    if (!day?.detailsFile) return;
    const cached = fileCache.get(day.detailsFile);
    if (cached) {
      setMarkdown(extractDaySection(cached, day.day));
      return;
    }
    setLoading(true);
    fetch(`/trip/dni/${day.detailsFile}`)
      .then(r => r.text())
      .then(text => {
        fileCache.set(day.detailsFile!, text);
        setMarkdown(extractDaySection(text, day.day));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [day]);

  if (!day) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 text-lg">Nie znaleziono dnia {dayNumber}</p>
          <button onClick={onBack} className="mt-4 text-amber-700 hover:underline">Wroc do planu</button>
        </div>
      </div>
    );
  }

  const schedule = markdown ? extractScheduleTable(markdown) : null;
  const intensity = INTENSITY_CONFIG[day.intensity];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={day.image} alt={day.imageAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-stone-700 text-sm font-medium hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Plan
        </button>

        {/* Day info on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-white/90 text-amber-800 backdrop-blur-sm">
              Dzien {day.day} | {day.date} ({day.weekday})
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded backdrop-blur-sm ${intensity.color}`}>
              {intensity.icon} {intensity.label}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">{day.title}</h1>
          <p className="text-sm text-white/80 drop-shadow mt-1">{day.route}</p>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Quick info bar */}
        <div className="flex gap-2 flex-wrap">
          {day.tags.map(tag => (
            <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-medium ${TAG_COLORS[tag]}`}>
              {TAG_LABELS[tag]}
            </span>
          ))}
          {day.overnight && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 font-medium">
              Nocleg: {day.overnight}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-stone-600 leading-relaxed">{day.desc}</p>

        {/* Schedule */}
        {loading && <p className="text-stone-400 text-sm">Ladowanie harmonogramu...</p>}
        {schedule && (
          <Section title="Harmonogram" icon="clock">
            <div className="prose prose-stone prose-sm max-w-none
              prose-table:w-full
              prose-th:text-left prose-th:text-stone-500 prose-th:font-medium prose-th:border-stone-300 prose-th:px-3 prose-th:py-2 prose-th:bg-stone-100
              prose-td:border-stone-200 prose-td:text-stone-600 prose-td:px-3 prose-td:py-2
              prose-strong:text-stone-800
            ">
              <Markdown remarkPlugins={[remarkGfm]}>{schedule}</Markdown>
            </div>
          </Section>
        )}

        {/* Attractions */}
        {day.attractions.length > 0 && (
          <Section title="Atrakcje" icon="map">
            <div className="space-y-3">
              {day.attractions.map(attraction => (
                <div key={attraction.name} className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-stone-800">{attraction.name}</div>
                    <p className="text-sm text-stone-500 mt-0.5">{attraction.desc}</p>
                  </div>
                  <a
                    href={getGoogleMapsUrl(attraction)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 mt-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-white text-stone-600 border border-stone-200 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 transition-colors"
                  >
                    Maps
                  </a>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Tips */}
        {day.tips && day.tips.length > 0 && (
          <Section title="Na co zwrocic uwage" icon="alert">
            <ul className="space-y-2">
              {day.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold mt-0.5">!</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Fun facts */}
        {day.funFacts && day.funFacts.length > 0 && (
          <Section title="Ciekawostki" icon="star">
            <ul className="space-y-2">
              {day.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="shrink-0 mt-0.5 text-amber-500">&#9733;</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Navigation prev/next */}
        <div className="flex justify-between items-center pt-4 border-t border-stone-200">
          {prevDay ? (
            <NavButton day={prevDay} direction="prev" />
          ) : <div />}
          {nextDay ? (
            <NavButton day={nextDay} direction="next" />
          ) : <div />}
        </div>
      </main>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  const icons: Record<string, React.ReactNode> = {
    clock: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    map: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    alert: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    star: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-stone-100 bg-stone-50">
        <span className="text-stone-400">{icons[icon]}</span>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function NavButton({ day, direction }: { day: DayPlan; direction: 'prev' | 'next' }) {
  const isPrev = direction === 'prev';
  return (
    <a
      href={`#/day/${day.day}`}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-stone-200 hover:border-amber-200 hover:bg-amber-50 transition-colors group ${isPrev ? '' : 'flex-row-reverse text-right'}`}
    >
      <svg
        className={`w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors ${isPrev ? '' : 'rotate-180'}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-stone-400">
          {isPrev ? 'Poprzedni' : 'Nastepny'}
        </div>
        <div className="text-sm font-medium text-stone-700 group-hover:text-amber-800 transition-colors">
          Dzien {day.day}
        </div>
      </div>
    </a>
  );
}
